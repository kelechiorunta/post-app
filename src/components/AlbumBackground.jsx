import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { fetchImageFromIndexedDB, saveImageToIndexedDB } from '../util/utils';

export default function AlbumBackground() {
    const [picture, setPicture] = useState(''); // State to store the image data
    const [placeholder, setPlaceholder] = useState(''); // State to store the image data
    const [loading, setLoading] = useState(true); // Loading state for placeholder effect
    const [isLoadingPic, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPicture = async () => {
            const pictureKey = `cachedPicture`;
            const placeholderKey = `cachedPlaceholder`;
                
            try {
                // Load cached picture from localStorage (outside of state)
                // const cachedPicture = localStorage.getItem(`cachedPicture`);
                // const cachedPlaceholder = localStorage.getItem(`cachedPlaceholder`);
                const cachedPicture = await fetchImageFromIndexedDB(pictureKey);
                const cachedPlaceholder = await fetchImageFromIndexedDB(placeholderKey);
                if (cachedPicture || cachedPlaceholder) {
                    console.log('Loaded picture from localStorage');
                    setPicture(cachedPicture); // Set the cached picture in state
                    setPlaceholder(cachedPlaceholder); // Set the cached placeholder in state
                    setLoading(false); // Stop loading
                    // return; // Exit function early since we have the cached image
                }

                // Fetch picture from the server
                const responsePlaceholder = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/picture/pholder`, 
                    { responseType: 'arraybuffer', withCredentials: true } // Fetch as binary data
                );

                const responsePic = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/picture/pic`, 
                    { responseType: 'arraybuffer', withCredentials: true } // Fetch as binary data
                );

                const base64ImagePlaceholder = `data:image/jpeg;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(responsePlaceholder.data))
                )}`;

                // Convert the binary data to a Base64-encoded string
                const base64ImagePic = `data:image/jpeg;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(responsePic.data))
                )}`;

                // Cache the image in localStorage for future requests
                // if (!responsePic || !responsePlaceholder){
                //     localStorage.removeItem('cachedPicture');
                //     localStorage.removeItem('cachedPlaceholder');
                // }
                // localStorage.setItem(`cachedPicture`, base64ImagePic);
                // localStorage.setItem(`cachedPlaceholder`, base64ImagePlaceholder);
                await saveImageToIndexedDB(pictureKey, base64ImagePic);
                await saveImageToIndexedDB(placeholderKey, base64ImagePlaceholder);
                setPicture(base64ImagePic); // Set the picture in state
                setPlaceholder(base64ImagePlaceholder); // Set the picture in state
                // setLoading(false); // Stop loading
            } catch (err) {
                // localStorage.removeItem('cachedPicture')
                console.error('Error fetching picture:', err.message);
                setLoading(false); // Stop loading even if an error occurs
            }
        };

        fetchPicture();
    }, [picture, placeholder]); // Only re-run when `id` changes

    // Handle the image load event
    const handleImageLoad = () => {
        setIsLoading(false); // Remove placeholder once the main image has loaded
      };
  return (
    <div className='relative bg-slate-950 overflow-hidden bg-cover bg-center text-white w-screen flex flex-col pt-16 min-h-screen'>
        {/* Album */}
        {isLoadingPic && (
            
            <img
                // key={n} // Unique key for each element
                className="absolute rounded-md w-full h-full blur-md animate-pulse"
                src={placeholder || `${process.env.REACT_APP_BASE_URL}/picture/pholder`} // Add index to the src if needed
                alt={`Loading placeholder`}
                width={560}
                height="auto"
            />

    )}

    {/* Actual image from the backend */}
    
        <img
        className={`absolute rounded-md w-full h-full transition-opacity duration-700 ${
            isLoadingPic ? 'opacity-0' : 'opacity-100'
        }`} // Smooth fade-in effect
        src={picture || `${process.env.REACT_APP_BASE_URL}/picture/pic`} // Set the image source to the Base64 string//{pictureUrl}//{`${process.env.REACT_APP_BASE_URL}/sip/propertyPicture/${user.username}/${n}`} // Backend image URL
        alt="User profile"
        width={560}
        height={'auto'}
        onLoad={handleImageLoad} // Triggered when the image loads
        />

    </div>
  )
}
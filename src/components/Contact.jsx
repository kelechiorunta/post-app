// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// export default function Contact() {
//     const { id } = useParams();
//     const [cachedPic, setCachedPic] = useState('');


//     useEffect(() => {
//         const fetchPic = async() => {
//             try{
//                 const cachedPic = localStorage.getItem('cachedPicture');
//                 if (cachedPic) {
//                     setCachedPic(cachedPic)
//                 } else {
//                     const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/picture/${id}`, 
//                         {withCredentials: true,
//                             // headers:{
//                             //     'Content-Type': 'image/jpeg'
//                             // }
//                         })
//                         localStorage.setItem('cachedPicture', JSON.stringify(response.data))
//                 }
//             }
//             catch(err){
//                 console.log(err?.message)
//             }
//         }

//         fetchPic();
//     }, [cachedPic])
//   return (
//     <div className='pt-16 z-20 bg-white min-h-screen text-black'>
//         {id}
//         <img
//                     key={id} // Unique key for each element
//                     className="rounded-md w-full h-full blur-md animate-pulse"
//                     src={cachedPic || `${process.env.REACT_APP_BASE_URL}/picture/${id}`} // Add index to the src if needed
//                     alt={`Loading placeholder ${id}`}
//                     width={560}
//                     height="auto"
//                 />
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Contact() {
    const { id } = useParams(); // Picture index from route params
    const [picture, setPicture] = useState(''); // State to store the image data
    const [loading, setLoading] = useState(true); // Loading state for placeholder effect

    useEffect(() => {
        const fetchPicture = async () => {
            try {
                // Load cached picture from localStorage (outside of state)
                const cachedPicture = localStorage.getItem(`cachedPicture:${id}`);
                if (cachedPicture) {
                    console.log('Loaded picture from localStorage');
                    setPicture(cachedPicture); // Set the cached picture in state
                    // setLoading(false); // Stop loading
                    return; // Exit function early since we have the cached image
                }

                // Fetch picture from the server
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/picture/${id}`, 
                    { responseType: 'arraybuffer', withCredentials: true } // Fetch as binary data
                );

                // Convert the binary data to a Base64-encoded string
                const base64Image = `data:image/jpeg;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(response.data))
                )}`;

                // Cache the image in localStorage for future requests
                localStorage.setItem(`cachedPicture:${id}`, base64Image);

                setPicture(base64Image); // Set the picture in state
                // setLoading(false); // Stop loading
            } catch (err) {
                console.error('Error fetching picture:', err.message);
                setLoading(false); // Stop loading even if an error occurs
            }
        };

        fetchPicture();
    }, [id]); // Only re-run when `id` changes

    return (
        <div className="pt-16 z-20 bg-slate-700 min-h-screen text-black">
            <div className="flex justify-center items-center">
                {/* {loading ? (
                    // Placeholder for when the image is loading
                    <div className="animate-pulse bg-gray-300 w-80 h-80 rounded-md" />
                ) : (                                                                                                                                                                                                                                                                                                                                                                 */}
                    {/* // Render the fetched picture */}
                    <img
                        key={id}
                        className="rounded-md w-full max-w-md h-auto"
                        src={picture || `${process.env.REACT_APP_BASE_URL}/picture/${id}`} // Set the image source to the Base64 string
                        alt={`Fetched picture ${id}`}
                        width={600}
                        height={600}
                    />
                {/* )} */}
                <Link to={`/contact/0`}>Move to site 1</Link>
                <Link to={`/contact/1`}>Move to site 2</Link>
                <Link to={`/contact/2`}>Move to site 3</Link>
            </div>
        </div>
    );
}



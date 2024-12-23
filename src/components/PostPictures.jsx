import React, { memo, useState, useMemo } from 'react';

const PostPictures = ({index}) => {
    const [isLoadingPic, setIsLoading] = useState(true);
  
    const user = JSON.parse(localStorage.getItem('userData'))
    console.log(user)
    // Placeholder image (use a local or remote placeholder URL)
    let placeholder = `${process.env.REACT_APP_BASE_URL}/post/placeholderPicture/${index}`//`./images/${user.email}-small.png`//'./placeholder.png'//`${process.env.REACT_APP_BASE_URL}/stream/picture`; // Replace this with a valid image path
  
    // Memoize the picture URL to avoid unnecessary re-renders
    let pictureUrl = useMemo(() => {
      return `${process.env.REACT_APP_BASE_URL}/post/fullPicture/${index}`;
    }, [`${process.env.REACT_APP_BASE_URL}/post/fullPicture/${index}`]); // Empty dependency array since it doesn't depend on props or state
  
    // Handle the image load event
    const handleImageLoad = () => {
      setIsLoading(false); // Remove placeholder once the main image has loaded
    };
  
    return (
      <div className="absolute flex rounded-md w-full h-full overflow-hidden">
        {console.log("PICTURE", pictureUrl)}
        {/* Display the placeholder image until the actual image is loaded */}
        {isLoadingPic && (
            
                <img
                    key={index} // Unique key for each element
                    clasName="absolute rounded-md w-full h-full blur-md animate-pulse"
                    src={placeholder}//{`${process.env.REACT_APP_BASE_URL}/sip/propertyPlaceholder/${user.username}/${n}`} // Add index to the src if needed
                    alt={`Loading placeholder ${index}`}
                    width={600}
                    height={400}
                />
    
        )}
  
        {/* Actual image from the backend */}
        
            <img
            className={`absolute rounded-md w-full h-full transition-transform transition-opacity ease-in-out duration-700 ${
                isLoadingPic ? 'opacity-0' : 'opacity-100'
              } hover:scale-110 hover:duration-150`}
               // Smooth fade-in effect
            src={pictureUrl}//{`${process.env.REACT_APP_BASE_URL}/sip/propertyPicture/${user.username}/${n}`} // Backend image URL
            alt="User profile"
            width={200}
            height={200}
            onLoad={handleImageLoad} // Triggered when the image loads
            />
      
        
      </div>
    );
  };
  
  export default memo(PostPictures);
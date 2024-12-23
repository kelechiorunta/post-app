import React, {useState, useEffect} from 'react';
import AlbumBackground from './AlbumBackground.jsx';


export default function Album() {

  return (
    <div className='relative bg-slate-950 overflow-hidden bg-cover bg-center text-white w-screen flex flex-col pt-16 min-h-screen'>
        <h1 className='text-5xl z-20 mt-10'>Album</h1>
        <div className='absolute top-0 left-0'>
            <AlbumBackground/>
        </div>
        {/* <img
            // key={id}
            className="absolute top-0 left-0 rounded-md w-full bg-cover bg-center w min-h-[60%]"
            src={picture || `${process.env.REACT_APP_BASE_URL}/picture`} // Set the image source to the Base64 string
            alt={`Fetched picture`}
            width={600}
            height={600}
        /> */}
    
    </div>
  )
}

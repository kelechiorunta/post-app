import React from 'react'
import { useParams, useOutletContext, useNavigate } from 'react-router-dom'
import PostPictures from './PostPictures.jsx';
import BibleQuotes from './BibleQuotes/bibleQuotes.js';

export default function Page3() {
    const { id } = useParams();
    const { handleLink } = useOutletContext();
    const navigate = useNavigate();
  return (
    <div className='z-20 bg-white min-h-[400px]'>
        <div
            key={id}
            className="relative w-[600px] h-[400px] m-auto overflow-hidden"
          >
            <button
              onClick={()=>{handleLink(false); navigate('/dashboard/page2')}}
              className="absolute z-20 top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              &#x2715; {/* Close icon (X) */}
            </button>
            <PostPictures index={id} />
            
          </div>
          <p className='text-2xl text-black z-50 font-bold'>{BibleQuotes[id].quote}</p>
          <p className='text-xl z-50 font-bold text-red-500'>{BibleQuotes[id].book + " " + BibleQuotes[id].verse}</p>
        {/* {id} */}
        {/* <button onClick={()=>handleLink(false)}>Close Modal</button> */}
    </div>
  )
}

import React, {useContext, useState, useEffect} from 'react'
// import Home from './Home'
import { slideNo } from './ContextSlide.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import axios from 'axios';

export default function Page1() {
  const { slide } = useContext(slideNo);
  const [intro, setIntroduction] = useState('')
  useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/text/page`,
                {
                    withCredentials: true,
                    responseType: 'text', // Explicitly request raw text (HTML in this case)
                }
            );
            setIntroduction(response.data || '');
        } catch (err) {
            console.error('Error fetching post:', err);
            // setError('Failed to load content');
        }
    };
    fetchPost();
}, [intro]);

  return (
    <div className='flex flex-col gap-4 text-black bg-white min-h-screen overflow-hidden '>
      {/* <h1 className='text-5xl z-20 text-black mt-4 -mb-20'>Dashboard Page</h1> */}
    
      {/* <div className='text-2xl font-bold w-[60%] mx-auto'>{intro}</div> */}
      <div className='w-full p-4' dangerouslySetInnerHTML={{ __html: intro }}></div>
      <div className='min-w-[200px] min-h-[200px] z-20 overflow-hidden' ><VideoPlayer slide={slide}/></div>
    </div>

      
  )
}

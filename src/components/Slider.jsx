import React, { useEffect, useRef, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideNo } from './ContextSlide';

export default function Slider({slides}) {

  const { slide, setSlide } = useContext(slideNo);

  const [loading, setLoading] = useState(false)
//   const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [prevSlide, setPrevSlide] = useState(0); // Track the previous slide index

  const moveSlideForward = () => {
    setDirection(1);
    setPrevSlide(slide);
    setSlide((n) => (n + 1) % slides.length);
  };

  const moveSlideBackward = () => {
    setDirection(-1);
    setPrevSlide(slide);
    setSlide((n) => (n - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!document.hidden) {
      const timerId = setTimeout(() => {
        direction === 1 ? moveSlideForward() : moveSlideBackward();
      }, 5000); // Slide changes every 3 seconds
  
      return () => {
        clearTimeout(timerId);
      };
    }
    setLoading(false)
  }, [slide, direction, loading]);

//   const staggerVariant = {
//     hidden:{x: '100%', opacity: 0}, 
//     visible:{x: '0',  opacity:1, transition: {duration: 0.8}},
// }

  return (
    <div className={`slideContainer shadow-2xl shadow-black bg-cover bg-center ease-in-out flex flex-col m-auto items-center justify-center gap-x-2 bg-transparent text-white
            rounded-full text-2xl xsm:max-sm:px-2 -ml-8 xsm:max-[400px]:max-w-[300px] xsm:max-sm:min-h-[300px] max-w-[400px] h-[400px]`}>
      <div className={`bg-cover bg-center transition-opacity duration-200 ease-in-out flex relative`}>
        {/* <nav className=' text-white flex justify-between absolute z-0'>
            <button className='rounded p-4 bg-gray-600'  onClick={moveSlideBackward}><FaArrowLeft size={30} fill='white'/></button>
            <button className='rounded p-4 bg-gray-600' onClick={moveSlideForward}><FaArrowRight size={30} fill='white'/></button>
        </nav> */}
        
        <div className={`bg-cover bg-center transition-opacity duration-200 ease-in-out rounded-full xsm:max-[400px]:max-w-[300px] xsm:max-sm:min-h-[300px] w-[400px] h-[400px]`}
        style={{ overflow: 'hidden', position: 'relative'}}>
            <AnimatePresence onLoadingComplete={()=>setLoading(true)} initial={false} custom={direction}>
            {slides.length>0 && slides.map((slidepic, index) => (
                (index === slide || index === prevSlide) && (
                <motion.div
                className={`transition-opacity duration-200 ease-in-out bg-cover bg-center rounded-full xsm:max-[400px]:max-w-[400px] xsm:max-sm:min-h-[300px] md:max-xl:h-[400px] w-[400px] xl:max-2xl:w-[400px] h-[400px]`}
                    key={index}
                    onLayoutAnimationStart={()=>setLoading(false)}
                    initial={{ x: index === slide ? (direction === 1 ? '100%' : '-100%') : (direction === 1 ? '-100%' : '100%')}}
                    animate={{ x: index === slide ? 0 : (direction === 1 ? '-100%' : '100%') }}
                    exit={{ x: index === slide ? (direction === 1 ? '-100%' : '100%') : (direction === 1 ? '-100%' : '100%')}}
                    transition={{ duration: 1, ease:'easeInOut' }}
                    style={{ position: 'absolute', width:'100%' }}
                >
                    {slidepic.pic}
                </motion.div>
                )
            ))}
           </AnimatePresence> 
      </div>
    </div>
</div> 
  );
}
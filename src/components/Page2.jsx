import React, { memo, useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { Loader } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
// import PostPictures from './PostPictures.jsx';

const PostPictures = lazy(() => import('./PostPictures.jsx')); // Lazy load

function Page2() {
  // Motion configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger effect between children
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Start off-screen or transparent
    visible: { opacity: 1, y: 0 }, // End fully visible
  };

  // Memoize the array to avoid re-creation on re-renders
  const items = useMemo(() => Array.from({ length: 15 }, (_, index) => index), []);

  // Cache animation trigger
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [linked, setLinked] = useState(false);

  useEffect(() => {
    if (!animationTriggered) {
      setAnimationTriggered(true); // Ensures animation is only triggered once
    }
  }, [animationTriggered]);

  return (
    <motion.div
      className="text-black flex flex-wrap gap-x-4 gap-y-2 items-start py-4 px-4 bg-white text-7xl min-h-[125vh]"
      variants={containerVariants}
      initial="hidden"
      animate={animationTriggered ? "visible" : "hidden"} // Controlled animation
    >
      <Suspense fallback={
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      }>
        {items && items.map((index) => (
          <motion.div
            key={index}
            className="relative w-[200px] h-[200px] overflow-hidden"
            variants={itemVariants}
          >
            <Link onClick={()=>setLinked(true)}
            to={`/dashboard/page2/post/${index}`}><PostPictures index={index} /></Link>
          </motion.div>
        ))}
      </Suspense>
      {linked && <section className="fixed min-h-[400px] inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full min-h-[400px]">
            <Outlet context={{ handleLink: setLinked }} />
        </div>
      </section>
      }

    </motion.div>
  );
}

export default memo(Page2);

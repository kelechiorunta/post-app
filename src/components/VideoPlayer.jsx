import React, { memo, useMemo } from 'react';

const VideoPlayer = ({ slide }) => {
    localStorage.setItem('cachedUrl', `${process.env.REACT_APP_BASE_URL}/video`)
    const videoUrl = useMemo(() => {
        return `${process.env.REACT_APP_BASE_URL}/video/${slide}`;
      }, [`${process.env.REACT_APP_BASE_URL}/video/${slide}`]);
  return (
    <video className='rounded-md max-w-[600px] shadow-md z-20 m-auto min-w-[300px]' controls width="640" preload="metadata">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default memo(VideoPlayer);
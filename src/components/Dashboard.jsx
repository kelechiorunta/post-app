import React from 'react';
import LandingImage from './LandingImage.jsx';
import NatureImage from './NatureImage.jsx';
import ProfileImage from './ProfileImage.jsx';
import { BrowserRouter, Outlet, Link, Route, Routes, useLocation } from 'react-router-dom';
import Profile from './Profile.jsx';
import Home from './Home.jsx';


export default function Dashboard() {
    const location = useLocation();
  return (
    <div className='flex flex-col gap-4 h-full min-h-screen'>
        {/* <div className='absolute top-0 left-0 w-full h-full gap-4 flex mx-auto shadow-md overflow-hidden rounded-xl'>
            <ProfileImage/>             
        </div> */}
        {/* <h1 className='z-20 mt-20'>{location.pathname}</h1> */}
        <div className='flex items-start pt-16 min-h-[121vh] justify-between'>
            <nav className='z-20 bg-[#1f2937] flex flex-col justify-start gap-y-4 p-4 min-h-[125vh] max-h-[121vh] h-full w-[25%] border'>
                <Link className={`text-left h-full z-20 ${(location.pathname==='/dashboard/page1') && 'bg-blue-600'} hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:bg-slate-200 focus:text-black`} 
                to="page1">Introduction</Link> 
                <Link className={`text-left h-full z-20 ${(location.pathname==='/dashboard/page2') && 'bg-blue-600'} hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:bg-slate-200 focus:text-black`}
                to="page2">Post Collections</Link>
                <Link className={`text-left h-full z-20 ${(location.pathname==='/dashboard/page2/post/:id') && 'bg-blue-600'} hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300 focus:bg-slate-200 focus:text-black`}
                to="page4">Post Selections</Link>
            </nav>
            <section className='w-[90%] z-20 overflow-hidden border border-black container max-w-full bg-transparent min-h-screen'>
                <Outlet/>
            </section>
        </div>
        
        
    </div>
  )
}

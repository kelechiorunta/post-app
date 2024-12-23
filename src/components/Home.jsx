import React, {useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import DashboardImage from './DashboardImage.jsx';
import { slideNo } from './ContextSlide';

export default function Home() {
    const { slide, setSlide } = useContext(slideNo);
    const apiRoute = `http://localhost:7000`
    const navigate = useNavigate();
    const handleLogout = async() => {
        try{
            const res = await axios.get(`${apiRoute}/auth/logout`, {withCredentials: true});
            navigate('/login')
        }
        catch(err){
            console.error(err?.message);
        }
    }
  return (
    <div className='container w-full max-w-full flex flex-col gap-4'>
        <h1 className='text-5xl z-20 text-black mt-24 -mb-20'>Welcome to the Home Page</h1>
        <div className='min-w-[200px] min-h-[200px] z-20 overflow-hidden' ><VideoPlayer slide={slide}/></div>
        <div className='absolute top-0 left-0 w-full h-full gap-4 flex mx-auto shadow-md overflow-hidden rounded-xl'>
            <DashboardImage/>            
        </div>
        <button
        onClick={handleLogout}
        className='text-2xl p-2 rounded-md m-auto shadow-md border z-10 w-max bg-blue-500'>
            Logout
        </button> 
    </div>
  )
}

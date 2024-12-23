import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import LandingImage from './LandingImage.jsx';
import Typer from './Typer.jsx';
import ProfileImage from './ProfileImage.jsx';
import Slider from './Slider.jsx';
import NatureImage from './NatureImage.jsx';
import PeopleImage from './PeopleImage.jsx';
import { slideNo } from './ContextSlide.jsx';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [greetings, setGreetings] = useState('');
    const [intros, setIntros] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingIntro, setLoadingIntro] = useState(true);
    const navigate = useNavigate();

    const { slide } = useContext(slideNo);

    const slides = [
        {id:0, pic: <PeopleImage/>},
        {id:1, pic: <NatureImage/>},
        {id:2, pic: <LandingImage/>},
        {id:3, pic: <ProfileImage/>},
    ]
    useEffect(() => {
        const fetchPost = async() => {
            setLoading(true)
            try{
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/transformgreetings`,
                    { withCredentials: true, responseType: 'text' }
                  );
                  setGreetings(response.data || '')
                  // console.log(response.data); // Post content as plain text
                }
            catch(err){
                console.log("Error")
            }finally{
                setLoading(false);
            }
        } 
          fetchPost();
        }, []);

        useEffect(() => {
            const fetchIntros = async() => {
                setLoadingIntro(true)
                try{
                    const response = await axios.get(
                        `${process.env.REACT_APP_BASE_URL}/intros/${slide}`,
                        { withCredentials: true, responseType: 'text' }
                      );
                      setIntros(response.data || '')
                      // console.log(response.data); // Post content as plain text
                    }
                catch(err){
                    console.log("Error")
                }finally{
                    setLoadingIntro(false);
                }
            } 
              fetchIntros();
            }, [slide]);
  return (
    <div className='flex gap-4 flex-wrap'>
        <div className='absolute top-0 left-0 w-full h-full gap-4 flex mx-auto shadow-md overflow-hidden rounded-xl'>
            <LandingImage />              
        </div>
        {<div className={`absolute bg-transparent top-[25%] right-10 w-[400px] h-max gap-4 flex mx-auto shadow-md rounded-xl ${loading? 'opacity-0 bg-transparent' : 'opacity-95'} `}>
            <Slider slides={slides}/>            
        </div>
        }
        <Typer texts={[greetings.toString(), "Your First Inspiration"]} />
        <div className={`flex flex-col gap-2 z-10 px-2 w-[800px] text-left transition-opacity duration-500 ${
                loadingIntro ? 'opacity-0' : 'opacity-100'
            }`}>
            <h1 className='intros text-6xl z-10 py-4 min-w-[60%] max-w-[70%] w-full leading-tight text-left'>{intros}</h1>
            <button onClick={()=>navigate('/dashboard')}
            className={`px-4 py-3 rounded-md bg-white w-max text-black `}>Get Started</button>
        </div>
        
    </div>
  )
}

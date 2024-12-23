import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom'; // Outlet is used to render the nested route elements
import { motion } from 'framer-motion';
import axios from 'axios';


const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Initial state is null (checking)
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const apiRoute = `http://localhost:7000`

    useEffect(() => {
        const verifyToken = async () => {
            try{
                const res = await axios.get(`${apiRoute}/auth/verify-token`, {withCredentials: true}) // Call the token check function
                console.log(res?.data?.isValid)
                setIsAuthenticated(res?.data?.isValid); // Set authentication status
                setLoading(false); // Set loading to false after checking
        }
        catch(err){
                console.error(err.message);
                localStorage.clear();        
        }
        finally{
            setLoading(false)
        }
            }
        console.log(isAuthenticated)
        verifyToken();
    }, [loading]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while checking
    }
    // If authenticated, allow access to the component, otherwise redirect to login
    return isAuthenticated ?
     <motion.div
        className='container max-w-full min-h-screen'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.75, ease: 'easeInOut' }}>
        <Outlet />
     </motion.div> 
        : 
     <Navigate to="/login" state={{path: location.pathname}} replace/>;
};

export default ProtectedRoute;
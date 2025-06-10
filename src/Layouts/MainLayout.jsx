import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <div className=''>
            <Toaster position="top-right" />
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
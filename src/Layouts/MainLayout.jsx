import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../Provider/ThemeProvider';

const MainLayout = () => {
    return (
        <ThemeProvider>
            <div className='min-h-screen bg-base-200 dark:bg-dark-bg transition-colors'>
                <Toaster position="top-right" />
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default MainLayout;
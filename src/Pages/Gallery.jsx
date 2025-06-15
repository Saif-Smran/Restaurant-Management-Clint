import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import axiosInstance from '../axios/axiosConfig';

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    

    const images = [
        {
            src: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
            alt: "Elegant restaurant interior"
        },
        {
            src: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
            alt: "Cozy dining setup"
        },
        {
            src: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
            alt: "Gourmet dish presentation"
        },
        {
            src: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
            alt: "Colorful food plating"
        },
        {
            src: "https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg",
            alt: "Chef in action"
        },
        {
            src: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
            alt: "Restaurant bar"
        },
        {
            src: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
            alt: "Outdoor dining"
        },
        {
            src: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
            alt: "Dessert presentation"
        },
        {
            src: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
            alt: "Restaurant entrance"
        },
        {
            src: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg",
            alt: "Wine selection"
        }
    ];

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <Helmet>
                <title>Gallery | RestoEase</title>
            </Helmet>
            {/* Hero Section with Title */}
            <div 
                className="h-[40vh] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop")',
                    backgroundAttachment: 'fixed'
                }}
            >
                <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
                    Our Gallery
                </h1>
            </div>

            {/* Gallery Grid */}
            <div className="container bg-base-300 mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <div 
                            key={index}
                            onClick={() => {
                                setPhotoIndex(index);
                                setIsOpen(true);
                            }}
                            className="group relative cursor-pointer h-[300px]"
                        >
                            <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
                                <div className="w-full h-full relative">
                                    <img 
                                        src={image.src} 
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                                        <span className="text-white text-lg font-semibold">Click to View</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                index={photoIndex}
                slides={images}
            />
        </div>
    );
};

export default Gallery; 
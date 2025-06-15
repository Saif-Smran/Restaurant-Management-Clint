import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../axios/axiosConfig';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axiosInstance.get('/slides');
                setSlides(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load slider data');
                setLoading(false);
            }
        };

        fetchSlides();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center bg-gray-100">
                <div className="loader w-16 h-16 border-t-4 border-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center bg-gray-100">
                <div className="text-center text-red-600">
                    <p className="text-xl font-semibold">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <section className="relative w-full h-[80vh] overflow-hidden text-center">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide._id || index}>
                        <div
                            className="w-full h-full bg-cover bg-center flex items-center justify-center px-6 md:px-20"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="bg-black/50 p-6 md:p-10 rounded-lg text-white max-w-xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{slide.title}</h2>
                                <p className="mb-6 text-sm md:text-base text-center">{slide.description}</p>
                                {slide.buttonText && slide.buttonLink && (
                                    <div className="text-center">
                                        <Link
                                            to={slide.buttonLink}
                                            className="btn btn-primary inline-flex items-center gap-2"
                                        >
                                            {slide.buttonText} <FaArrowRight />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Slider;
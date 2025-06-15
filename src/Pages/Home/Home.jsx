import React from 'react';
import { Helmet } from 'react-helmet';
import Slider from './Slider';
import TopFoods from './TopFoods';
import WhyChooseUs from './WhyChooseUs';
import CustomerReviews from './CustomerReviews';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>RestoEase - Home | Delicious Food Delivery</title>
            </Helmet>
            <div className="space-y-8 sm:space-y-12 lg:space-y-16 ">
                <Slider />
                <TopFoods />
                <WhyChooseUs />
                <CustomerReviews />
            </div>
        </div>
    );
};

export default Home;
import React from 'react';
import Slider from './Slider';
import TopFoods from './TopFoods';
import WhyChooseUs from './WhyChooseUs';
import CustomerReviews from './CustomerReviews';

const Home = () => {
    return (
        <div>
            <Slider />
            <TopFoods />
            <WhyChooseUs />
            <CustomerReviews />
        </div>
    );
};

export default Home;
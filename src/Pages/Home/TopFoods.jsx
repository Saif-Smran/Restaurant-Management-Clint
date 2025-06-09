import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FoodCard from '../../Components/FoodCard';

const TopFoods = () => {
    const [topFoods, setTopFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopFoods = async () => {
            try {
                const response = await axios.get('http://localhost:3000/foods');
                // Sort by purchaseCount and take top 6
                const sortedFoods = response.data
                    .sort((a, b) => b.purchaseCount - a.purchaseCount)
                    .slice(0, 6);
                setTopFoods(sortedFoods);
                setLoading(false);
            } catch (err) {
                setError('Failed to load top foods');
                setLoading(false);
            }
        };

        fetchTopFoods();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="loader w-16 h-16 border-t-4 border-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
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
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Selling Foods</h2>
                <p className="text-gray-600">Our most popular dishes loved by customers</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {topFoods.map(food => (
                    <FoodCard key={food._id} food={food} />
                ))}
            </div>

            <div className="text-center">
                <Link 
                    to="/foods"
                    className="inline-block px-8 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
                >
                    See All Foods
                </Link>
            </div>
        </section>
    );
};

export default TopFoods; 
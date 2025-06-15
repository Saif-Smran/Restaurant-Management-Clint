import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios/axiosConfig';
import FoodCard from '../../Components/FoodCard';

const TopFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopFoods = async () => {
            try {
                const { data } = await axiosInstance.get('/foods');
                // Sort by purchaseCount and take top 6
                const sortedFoods = data
                    .sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0))
                    .slice(0, 6);
                setFoods(sortedFoods);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching top foods:', err);
                setError('Failed to load top foods');
                setLoading(false);
            }
        };

        fetchTopFoods();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <section className="py-16 bg-base-300">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 font-poppins">Top Foods</h2>
                    <p className="text-base-content/70 font-nunito">Discover our most popular dishes</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {foods.map(food => (
                        <FoodCard key={food._id} food={food} />
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        to="/foods"
                        className="btn btn-primary font-quicksand"
                    >
                        View All Foods
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TopFoods; 
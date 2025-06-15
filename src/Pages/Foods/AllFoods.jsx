import { useState, useEffect } from 'react';
import axiosInstance from '../../axios/axiosConfig';
import FoodCard from '../../Components/FoodCard';
import { FaSearch } from 'react-icons/fa';

const AllFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const { data } = await axiosInstance.get('/foods');
                setFoods(data);
                setFilteredFoods(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load foods');
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    useEffect(() => {
        const results = foods.filter(food =>
            food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoods(results);
    }, [searchTerm, foods]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Search is already handled by the useEffect above
    };

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
        <div className="min-h-screen bg-base-300">
            {/* Hero Section with Title */}
            <div 
                className="bg-gradient-to-r from-primary/90 to-primary text-white py-20 mb-8"
                style={{
                    backgroundImage: 'url("https://i.ibb.co/HDymfxRD/Leonardo-Phoenix-10-On-the-menu-a-tantalizing-array-of-culinar-2.jpg")',
                    backgroundBlendMode: 'overlay'
                }}
            >
                <div className="bg-black/50 p-6 md:p-10 rounded-lg text-white max-w-xl mx-auto ">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
                        Our Menu
                    </h1>
                    <p className="text-center text-lg max-w-2xl mx-auto">
                        Discover our wide selection of delicious dishes prepared with the finest ingredients
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="container mx-auto px-4 mb-8">
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for your favorite food..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </form>
            </div>

            {/* Food Cards Grid */}
            <div className="container mx-auto px-4 pb-16">
                {filteredFoods.length === 0 ? (
                    <div className="text-center text-gray-600 py-16">
                        <p className="text-xl">No foods found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredFoods.map(food => (
                            <FoodCard key={food._id} food={food} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllFoods; 
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axiosInstance from '../../axios/axiosConfig';
import FoodCard from '../../Components/FoodCard';
import { FaSearch } from 'react-icons/fa';

const SORT_OPTIONS = [
    { value: '', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A-Z' },
    { value: 'name-desc', label: 'Name: Z-A' },
    { value: 'quantity-asc', label: 'Quantity: Low to High' },
    { value: 'quantity-desc', label: 'Quantity: High to Low' },
    { value: 'popular', label: 'Most Popular' },
];

const AllFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [sortOption, setSortOption] = useState('');

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
        let results = foods.filter(food =>
            food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // Sorting logic
        if (sortOption) {
            results = [...results]; // copy array
            switch (sortOption) {
                case 'price-asc':
                    results.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    results.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    results.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    results.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'quantity-asc':
                    results.sort((a, b) => a.quantity - b.quantity);
                    break;
                case 'quantity-desc':
                    results.sort((a, b) => b.quantity - a.quantity);
                    break;
                case 'popular':
                    results.sort((a, b) => b.purchaseCount - a.purchaseCount);
                    break;
                default:
                    break;
            }
        }
        setFilteredFoods(results);
    }, [searchTerm, foods, sortOption]);

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
            <Helmet>
                <title>All Foods | RestoEase Menu</title>
            </Helmet>
            {/* Hero Section with Title */}
            <div 
                className="h-[30vh] sm:h-[40vh] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: 'url("https://i.ibb.co/HDymfxRD/Leonardo-Phoenix-10-On-the-menu-a-tantalizing-array-of-culinar-2.jpg")',
                    backgroundBlendMode: 'overlay'
                }}
            >
                <div className="bg-black/50 p-4 sm:p-6 md:p-10 rounded-lg text-white max-w-xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6">
                        Our Menu
                    </h1>
                    <p className="text-center text-base sm:text-lg max-w-2xl mx-auto">
                        Discover our wide selection of delicious dishes prepared with the finest ingredients
                    </p>
                </div>
            </div>

            {/* Search Section */}
            <div className="container mx-auto px-4 py-8 sm:py-12">
                {/* Sorting Dropdown */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-2xl mx-auto mb-6 gap-4">
                    <form onSubmit={handleSearch} className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for foods..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </form>
                    <div className="w-full sm:w-64">
                        <select
                            value={sortOption}
                            onChange={e => setSortOption(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Food Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredFoods.map(food => (
                        <FoodCard key={food._id} food={food} />
                    ))}
                </div>

                {filteredFoods.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">No foods found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllFoods; 
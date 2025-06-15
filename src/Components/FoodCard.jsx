import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FoodCard = ({ food }) => {
    const { _id, name, image, category, price, purchaseCount, quantity } = food;

    // Format price with commas and BDT symbol
    const formattedPrice = new Intl.NumberFormat('en-BD', {
        style: 'currency',
        currency: 'BDT',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);

    return (
        <div className="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-raleway shadow-lg">
                    {category}
                </div>
                {quantity === 0 && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-white text-xl font-semibold font-poppins bg-black/40 px-4 py-2 rounded-lg">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-base-content dark:text-dark-text font-poppins line-clamp-1">{name}</h3>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-primary font-bold font-raleway text-lg">
                        {formattedPrice}
                    </span>
                    <span className="text-base-content dark:text-gray-400 text-sm font-nunito">
                        {purchaseCount} {purchaseCount === 1 ? 'Purchase' : 'Purchases'}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-base-content dark:text-gray-400 text-sm font-nunito">
                        Available: {quantity}
                    </span>
                    <span className={`text-sm font-nunito ${quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
                <Link 
                    to={`/food/${_id}`}
                    className={`block w-full text-center py-2 rounded-md transition-colors duration-300 font-quicksand ${
                        quantity > 0 
                            ? 'bg-primary text-white hover:bg-primary-dark' 
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={(e) => quantity === 0 && e.preventDefault()}
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    food: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        purchaseCount: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired
};

export default FoodCard; 
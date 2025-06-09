import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FoodCard = ({ food }) => {
    const { _id, name, image, category, price, purchaseCount } = food;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
                    {category}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
                <div className="flex justify-between items-center mb-3">
                    <span className="text-primary font-bold">${price}</span>
                    <span className="text-gray-600 text-sm">
                        {purchaseCount} {purchaseCount === 1 ? 'Purchase' : 'Purchases'}
                    </span>
                </div>
                <Link 
                    to={`/food/${_id}`}
                    className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
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
        purchaseCount: PropTypes.number.isRequired
    }).isRequired
};

export default FoodCard; 
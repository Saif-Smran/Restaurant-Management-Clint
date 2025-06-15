import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaShoppingCart,
  FaUtensils,
  FaGlobe,
  FaUser,
  FaEnvelope,
  FaBox,
  FaShoppingBag,
} from 'react-icons/fa';
import axiosInstance from '../../axios/axiosConfig';

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const { data } = await axiosInstance.get(`/foods/${id}`);
        setFood(data);
      } catch (err) {
        setError('Failed to load food details', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, [id]);

  if (loading || error || !food) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        {loading ? (
          <div className="loader w-16 h-16 border-t-4 border-primary rounded-full animate-spin"></div>
        ) : (
          <div className="text-center text-red-600">
            <p className="text-xl font-semibold font-poppins">{error || 'Food not found'}</p>
            <Link
              to="/foods"
              className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark font-quicksand"
            >
              Back to Foods
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-base-100 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-base-content font-poppins">{food.name}</h1>
                <span className="bg-primary text-white font-bold px-3 py-1 rounded-full text-sm font-raleway">
                  {food.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-base-content font-nunito">
                <InfoRow icon={<FaGlobe />} label={`Origin: ${food.origin}`} />
                <InfoRow icon={<FaBox />} label={`Available: ${food.quantity}`} />
                <InfoRow icon={<FaShoppingBag />} label={`Purchased: ${food.purchaseCount} times`} />
                <InfoRow icon={<FaUtensils />} label={`Price: ৳${food.price}`} />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 font-poppins">Added By</h3>
                <div className="bg-base-200 p-4 rounded-lg space-y-2">
                  <InfoRow icon={<FaUser />} label={food?.addedBy?.name} />
                  <InfoRow icon={<FaEnvelope />} label={food?.addedBy?.email} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 font-poppins">Description</h3>
                <p className="text-base-content font-nunito">{food.description}</p>
              </div>

              <Link
                to={food.quantity > 0 ? `/food/purchase/${food._id}` : '#'}
                onClick={(e) => food.quantity === 0 && e.preventDefault()}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white transition-colors font-quicksand ${
                  food.quantity > 0
                    ? 'bg-primary hover:bg-primary-dark'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                <FaShoppingCart />
                {food.quantity > 0 ? 'Purchase Now' : 'Out of Stock'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable row component
const InfoRow = ({ icon, label }) => (
  <div className="flex items-center gap-2 font-nunito">{icon}<span>{label}</span></div>
);

export default FoodDetails;

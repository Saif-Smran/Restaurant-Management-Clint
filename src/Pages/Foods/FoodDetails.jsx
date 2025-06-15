import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
    <div className="min-h-screen bg-base-200 py-8 sm:py-12">
      <Helmet>
        <title>{food ? `${food.name} | RestoEase` : 'Food Details | RestoEase'}</title>
      </Helmet>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-base-100 rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-[300px] sm:h-[400px] lg:h-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="w-full lg:w-1/2 p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content mb-4">{food.name}</h1>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaUtensils className="text-primary" />
                  <span className="text-base-content">{food.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-primary" />
                  <span className="text-base-content">{food.origin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBox className="text-primary" />
                  <span className="text-base-content">Available: {food.quantity} units</span>
                </div>
              </div>

              <p className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                ${food.price}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-base-content/80">{food.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Added By</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={food.addedBy?.photoURL || '/default-avatar.png'}
                    alt={food.addedBy?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{food.addedBy?.name}</p>
                    <p className="text-sm text-base-content/70">{food.addedBy?.email}</p>
                  </div>
                </div>
              </div>

              <Link
                to={`/food/purchase/${food._id}`}
                className="btn btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <FaShoppingCart />
                Purchase Now
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

import { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Lottie from 'lottie-react';
// import addFoodAnimation from '../../assets/animations/add-food.json';

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const foodData = {
            name: form.name.value,
            image: form.image.value,
            category: form.category.value,
            quantity: form.quantity.value,
            price: form.price.value,
            addedBy: {
                name: user.displayName,
                email: user.email
            },
            origin: form.origin.value,
            description: form.description.value,
            purchaseCount: "0",
            addedTime: new Date().toISOString()
        };

        try {
            const response = await axios.post('http://localhost:3000/foods', foodData);

            if (response.status === 201) {
                toast.success('Food item added successfully!');
                form.reset();
                navigate('/foods'); // Navigate to foods page after successful addition
            }
        } catch (error) {
            console.error('Error adding food:', error);
            toast.error(error.response?.data?.error || 'Failed to add food item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="md:flex">
                        {/* Animation Section */}
                        <div className="md:w-1/2 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">


                            <div className="w-full h-full">
                                {/* <Lottie 
                                        animationData={addFoodAnimation}
                                        loop={true}
                                        autoplay={true}
                                    /> */}
                                <img src="https://i.ibb.co/ccyM2Ddp/Leonardo-Phoenix-10-A-vibrant-and-mouthwatering-image-of-a-new-3.jpg" alt="Add New Food" className='w-full h-full object-cover' />
                            </div>

                        </div>

                        {/* Form Section */}
                        <div className="md:w-1/2 p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Add New Food</h2>
                                <p className="mt-2 text-sm text-gray-600">Fill in the details below to add a new food item</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Food Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Food Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Price (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            min="0.01"
                                            step="0.01"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Food Origin
                                    </label>
                                    <input
                                        type="text"
                                        name="origin"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                                        placeholder="Add ingredients, making procedure, etc..."
                                    ></textarea>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-2">Adding as:</p>
                                    <p className="font-semibold">{user?.displayName}</p>
                                    <p className="text-gray-500">{user?.email}</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    {loading ? 'Adding Food...' : 'Add Food Item'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFood; 
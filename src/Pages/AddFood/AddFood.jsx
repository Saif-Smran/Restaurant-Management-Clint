import { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
import axiosInstance from '../../axios/axiosConfig';
import { Helmet } from 'react-helmet';
// import addFoodAnimation from '../../assets/animations/add-food.json';

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const foodData = {
            name: form.name.value,
            image: form.image.value,
            category: form.category.value,
            quantity: parseInt(form.quantity.value),
            price: parseInt(form.price.value),
            addedBy: {
                name: user.displayName,
                email: user.email
            },
            origin: form.origin.value,
            description: form.description.value,
            purchaseCount: 0,
            addedTime: new Date().toISOString()
        };

        try {
            const token = await user.getIdToken();
            const response = await axiosInstance.post('/foods', foodData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201 || response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Food Added!',
                    text: 'Your food item has been added successfully.',
                    timer: 1500,
                    showConfirmButton: false
                });

                navigate('/my-foods');
            }
        } catch (err) {
            console.error('Error adding food:', err);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Food',
                text: err.response?.data?.error || err.message || 'Failed to add food item'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Add New Food | RestoEase</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <div className="bg-base-100 rounded-xl shadow-2xl overflow-hidden">
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
                                <h2 className="text-3xl font-bold text-base-content font-poppins">Add New Food</h2>
                                <p className="mt-2 text-sm text-base-content font-nunito">Fill in the details below to add a new food item</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-base-content font-poppins">
                                        Food Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-nunito"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-base-content font-poppins">
                                        Food Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-nunito"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-base-content font-poppins">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        name="category"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-nunito"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-base-content font-poppins">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            name="quantity"
                                            min="1"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-nunito"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-base-content font-poppins">
                                            Price (BDT)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            min="0.01"
                                            step="0.01"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-nunito"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-base-content font-poppins">
                                        Origin
                                    </label>
                                    <input
                                        type="text"
                                        name="origin"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-nunito"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-base-content font-poppins">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-nunito"
                                        placeholder="Add ingredients, making procedure, etc..."
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary w-full font-quicksand"
                                    >
                                        {loading ? 'Adding Food...' : 'Add Food'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFood; 
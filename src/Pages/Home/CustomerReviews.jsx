import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const CustomerReviews = () => {
    const reviews = [
        {
            name: "Sarah Johnson",
            image: "https://i.ibb.co/8X7dBZ4/reviewer1.jpg",
            rating: 5,
            review: "The food quality and service are exceptional! Every dish I've tried has been a delightful experience. The flavors are authentic and the portions are generous.",
            position: "Food Blogger"
        },
        {
            name: "Michael Chen",
            image: "https://i.ibb.co/VqFkwx9/reviewer2.jpg",
            rating: 5,
            review: "I'm impressed by the consistency in quality. The delivery is always on time, and the food arrives hot and fresh. Their customer service is outstanding!",
            position: "Regular Customer"
        },
        {
            name: "Emily Rodriguez",
            image: "https://i.ibb.co/Ry8vxqT/reviewer3.jpg",
            rating: 5,
            review: "The variety of dishes and the attention to dietary preferences make this my go-to restaurant. The online ordering system is user-friendly and efficient.",
            position: "Food Critic"
        }
    ];

    return (
        <section className="py-16 bg-base-200">
            <div className="max-w-11/12 mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-base-content mb-4 font-poppins">What Our Customers Say</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto font-nunito">
                        Don't just take our word for it - hear what our valued customers have to say about their dining experience with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div 
                            key={index}
                            className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex justify-center mb-6">
                                <FaQuoteLeft className="text-4xl text-primary opacity-20" />
                            </div>
                            <p className="text-base-content/70 mb-6 text-center text-xl font-caveat">
                                "{review.review}"
                            </p>
                            <div className="flex items-center justify-center mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400" />
                                ))}
                            </div>
                            <div className="text-center">
                                <img 
                                    src={review.image} 
                                    alt={review.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
                                />
                                <h4 className="font-semibold text-base-content font-poppins">{review.name}</h4>
                                <p className="text-base-content/70 text-sm font-nunito">{review.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews; 
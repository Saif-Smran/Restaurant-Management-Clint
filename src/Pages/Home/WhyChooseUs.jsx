import { FaUtensils, FaTruck, FaClock, FaLeaf } from 'react-icons/fa';

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaUtensils className="text-4xl text-primary" />,
            title: "Gourmet Quality",
            description: "Experience culinary excellence with our premium ingredients and expert chefs crafting each dish to perfection."
        },
        {
            icon: <FaTruck className="text-4xl text-primary" />,
            title: "Fast Delivery",
            description: "Enjoy your favorite meals delivered hot and fresh to your doorstep with our efficient delivery service."
        },
        {
            icon: <FaClock className="text-4xl text-primary" />,
            title: "24/7 Service",
            description: "We're here whenever you're hungry. Order anytime with our round-the-clock food service."
        },
        {
            icon: <FaLeaf className="text-4xl text-primary" />,
            title: "Fresh Ingredients",
            description: "We source only the freshest, highest-quality ingredients to ensure every dish meets our premium standards."
        }
    ];

    return (
        <section className="py-16 bg-base-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold  mb-4 font-poppins">Why Choose Us</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto font-nunito">
                        Experience the perfect blend of taste, quality, and service. We're committed to making every meal special.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="bg-base-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                        >
                            <div className="mb-4 flex justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-base-content mb-3 font-poppins">
                                {feature.title}
                            </h3>
                            <p className="text-base-content/70 font-nunito">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs; 
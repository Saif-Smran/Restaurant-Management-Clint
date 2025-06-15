# RestoEase - Restaurant Management System

🔗 **Live Site:** [https://resturent-management-clint.web.app](https://resturent-management-clint.web.app)


RestoEase is a modern web application for restaurant management and food delivery services. Built with React and Vite, it offers a seamless experience for both customers and restaurant administrators.

## 🌟 Features

### For Customers
- Browse and search through available food items
- View detailed food information including price, description, and availability
- Place food orders with quantity selection
- View order history and status
- User authentication with email/password and Google sign-in
- Responsive design for all devices
- Dark/Light mode support

### For Restaurant Administrators
- Add new food items with images and descriptions
- Manage existing food inventory
- Track order history and status
- View customer information
- Update food availability and prices

### Technical Features
- Modern UI with Tailwind CSS and DaisyUI
- Responsive design with mobile-first approach
- Dark/Light theme support
- Secure authentication with Firebase
- RESTful API integration
- Form validation and error handling
- Loading states and animations
- SEO optimization with React Helmet

## 🛠️ Technologies Used

- **Frontend Framework:** React.js
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, DaisyUI
- **Authentication:** Firebase
- **State Management:** React Context API
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **UI Components:** 
  - React Icons
  - Lottie Animations
  - SweetAlert2
  - React Hot Toast
- **Fonts:** Poppins, Nunito, Quicksand, Raleway, Caveat

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/restaurant-management-clint.git
cd restaurant-management-clint
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, animations)
├── Components/      # Reusable components
├── Layouts/         # Layout components
├── Pages/          # Page components
├── Provider/       # Context providers
├── Routes/         # Route configurations
├── axios/          # API configuration
└── main.jsx        # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Themes
The application supports both light and dark themes. The theme preference is saved in localStorage and can be toggled using the theme switch in the navigation bar.

### Fonts
The application uses multiple fonts for different purposes:
- Poppins: Headings
- Nunito: Body text
- Quicksand: Buttons
- Raleway: Price tags
- Caveat: Special text

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- A H M Saif Smran - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries

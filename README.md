# RestoEase - Restaurant Management Client

🔗 **Live Site:** [https://resturent-management-clint.web.app](https://resturent-management-clint.web.app)


RestoEase is a modern web application for restaurant management and food ordering. This package contains the client (React + Vite). It provides a seamless experience for customers and a personal dashboard for users to manage their foods and orders.

## 🌟 Features

### For Customers (Users)
- Browse and search through available food items
- View detailed food information including price, description, and availability
- Place food orders with quantity selection
- View order history and status
- User authentication with email/password and Google sign-in
- Responsive design for all devices
- Dark/Light mode support

### User Dashboard
- Overview with stats (Total Foods, Total Orders, Revenue, Average Order Value)
- Add new food items with images and descriptions
- Manage existing food inventory (update/delete)
- Track personal orders

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
- **Styling:** Tailwind CSS, DaisyUI (theme tokens like bg-base-100/200, text-base-content)
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
- Node.js (v18+ recommended)
- npm
- Firebase project (Web app)

### Installation

1. Clone the repository:
```pwsh
git clone https://github.com/Saif-Smran/Restaurant-Management-Clint.git
cd Restaurant-Management-Clint
```

2. Install dependencies:
```pwsh
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
```
Optional: If you deploy the server separately, you can override the axios base URL by setting:
```env
# default is https://restaurant-management-server-rust.vercel.app
VITE_API_BASE_URL=https://your-server-url
```

4. Start the development server:
```pwsh
npm run dev
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, animations)
├── Components/      # Reusable components
├── Layouts/         # Layout components
├── Pages/           # Page components
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

## 🧭 Routing

- Public pages under `/` use `MainLayout`.
- User dashboard lives under `/dashboard` and uses `DashboardLayout` with a persistent left sidebar.
  - `/dashboard` → Overview
  - `/dashboard/add-food` → Add Food
  - `/dashboard/my-foods` → Manage Foods
  - `/dashboard/my-orders` → My Orders

Protected routes use Firebase auth; unauthorized users are redirected to `/auth/login`.

## 🎨 Theming

The app uses DaisyUI theme tokens for consistent light/dark mode.

- Backgrounds: `bg-base-100`, `bg-base-200`, `bg-base-300`
- Text: `text-base-content`, `text-base-content/70`
- Accents: `text-primary`, `text-info`, `text-success`, `text-accent`, `text-error`

Toggle theme using the switch in the navbar.

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

# Dashboard Feature

## Overview
The Dashboard provides a comprehensive overview of user activities and restaurant management data.

## Features

### 📊 Analytics Cards
- **Total Foods**: Number of food items added by the user
- **Total Orders**: Total number of orders received
- **Total Revenue**: Total earnings from all orders
- **Average Order Value**: Average value per order

### ⚡ Quick Actions
- **Add New Food**: Quick link to add a new food item
- **Manage Foods**: Navigate to the food management page
- **View Orders**: Access all orders

### 📋 Recent Activities
- **Recent Foods**: Shows the 5 most recently added food items with quick actions (View, Edit, Delete)
- **Recent Orders**: Displays the 5 latest orders with details

## Access
- Route: `/dashboard`
- Authentication: Required (Protected Route)
- Available in Navbar dropdown for logged-in users

## Components Used
- **Analytics**: Statistics cards component
- **DashboardCard**: Reusable card component for sections
- **Dashboard Service**: API service for data fetching

## API Endpoints
- `GET /foods/user/:email` - Fetch user's food items
- `GET /orders/user/:email` - Fetch user's orders
- `DELETE /foods/:id` - Delete a food item

## Features
- ✅ Real-time data updates
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Loading states
- ✅ Error handling with toast notifications
- ✅ Quick actions for common tasks
- ✅ Interactive food management

## Navigation
- Added to Navbar dropdown menu
- Available in both desktop and mobile menus
- Positioned as the first item in user menu for easy access

# Roxiler Systems Assignment - Database Seeder

## Overview
This seeder populates the database with sample data for easy demonstration and testing of the Roxiler Systems application.

## How to Run the Seeder

### Prerequisites
1. Ensure PostgreSQL is running
2. Backend server dependencies are installed (`npm install`)
3. Database connection is properly configured in `.env`

### Running the Seeder
```bash
cd backend
npm run seed
```

## Sample Data Created

### 👥 Users (6 total)

#### Admin Account
- **Email:** `admin@roxiler.com`
- **Password:** `Admin123!`
- **Role:** `admin`
- **Permissions:** Full access to all features

#### Store Owner Accounts
1. **John Smith**
   - **Email:** `john@storeowner.com`
   - **Password:** `Admin123!`
   - **Role:** `store_owner`
   - **Manages:** 3 stores

2. **Sarah Johnson**
   - **Email:** `sarah@storeowner.com`
   - **Password:** `Admin123!`
   - **Role:** `store_owner`
   - **Manages:** 3 stores

#### Customer Accounts
1. **Michael Brown**
   - **Email:** `michael@customer.com`
   - **Password:** `Admin123!`
   - **Role:** `user`

2. **Emily Davis**
   - **Email:** `emily@customer.com`
   - **Password:** `Admin123!`
   - **Role:** `user`

3. **David Wilson**
   - **Email:** `david@customer.com`
   - **Password:** `Admin123!`
   - **Role:** `user`

### 🏪 Stores (6 total)

#### John Smith's Stores
1. **Tech Paradise Electronics Store**
   - Email: contact@techparadise.com
   - Address: 100 Technology Boulevard, Electronics District

2. **Fashion Forward Clothing Boutique**
   - Email: info@fashionforward.com
   - Address: 200 Style Street, Fashion Quarter

3. **Sports Equipment Pro Shop**
   - Email: sales@sportsequipment.com
   - Address: 500 Athletic Avenue, Sports Complex

#### Sarah Johnson's Stores
1. **Gourmet Food Market & Delicatessen**
   - Email: hello@gourmetfood.com
   - Address: 300 Culinary Court, Food District

2. **Books & More Academic Bookstore**
   - Email: support@booksandmore.com
   - Address: 400 Literature Lane, Education Zone

3. **Home & Garden Supply Center**
   - Email: orders@homegarden.com
   - Address: 600 Domestic Drive, Home Improvement Hub

### ⭐ Ratings (14 total)
- Each store has multiple ratings from different customers
- Ratings range from 3 to 5 stars
- Demonstrates the rating system functionality

## Demo Scenarios

### 1. Admin Experience
Login as admin to:
- View comprehensive dashboard with all stores and users
- Manage users (create, edit, delete)
- Create stores and assign owners
- View all ratings and analytics

### 2. Store Owner Experience
Login as either store owner to:
- View only their own stores
- See detailed ratings for their stores
- Manage their store information
- No access to user management or other stores

### 3. Customer Experience
Login as any customer to:
- Browse all stores
- View store ratings and averages
- Rate stores (if rating system is implemented)
- View their own ratings

## Testing Different Features

### User Management (Admin Only)
1. Login as admin
2. Navigate to Users section
3. Try creating, editing, and filtering users

### Store Management
1. Login as admin or store owner
2. Navigate to Stores section
3. View stores (filtered by role)
4. Create new stores (admin can assign owners)

### Role-Based Access Control
1. Try accessing different sections with different user roles
2. Verify that store owners only see their stores
3. Confirm users cannot access admin features

### Rating System
1. Login as store owner to view ratings for their stores
2. Check average ratings calculation
3. View detailed rating information

## Resetting Data
To reset and re-seed the database:
```bash
npm run seed
```
This will clear all existing data and create fresh sample data.

## Notes
- All users have the same password: `Admin123!`
- Email addresses follow a pattern for easy identification
- Store names are descriptive and categorized
- Ratings are distributed to show variety in averages
- All data follows the application's validation rules

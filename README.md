# Roxiler Systems Assignment

A full-stack web application with role-based access control, user management, store management, and rating system.

## Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Sequelize** ORM
- **JWT** authentication
- **bcrypt** for password hashing
- **Express Validator** for input validation

### Frontend
- **React.js** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Store Owner, User)
- Secure password requirements
- Password update functionality

### 👥 User Management (Admin Only)
- Create, view, edit, and delete users
- Filter users by name, email, and role
- Pagination support

### 🏪 Store Management
- **Admin**: Full store management, can assign store owners
- **Store Owner**: Manage only their own stores
- **User**: View all stores and their ratings
- Store filtering and search functionality

### ⭐ Rating System
- Users can rate stores (1-5 stars)
- Store owners can view detailed ratings for their stores
- Average rating calculation and display
- Rating statistics and analytics

### 📊 Dashboard
- **Admin**: Comprehensive dashboard with system-wide analytics
- **User**: Personal dashboard with store browsing
- **Store Owner**: Redirected to store management (no dashboard access)

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/AzariushHussain/Roxiler_Systems_Assignment.git
cd Roxiler_Systems_Assignment
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
FRONTEND_URL=http://localhost:5173
DB_URL=tour_db_url
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
DB_NAME=Roxiler_Systems
JWT_SECRET=your_jwt_secret_key
TOKEN_EXPIRATION=30d
PORT=8000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Database Setup & Seeding
```bash
cd ../backend
npm run seed
```

This will create all necessary tables and populate them with sample data.

### 5. Start the Application
**Backend (Terminal 1):**
```bash
cd backend
npm start
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to access the application.

## 🎭 Demo Accounts

### Admin Account
- **Email:** `admin@roxiler.com`
- **Password:** `Admin123!`
- **Access:** Full system administration

### Store Owner Accounts
- **Email:** `john@storeowner.com` or `sarah@storeowner.com`
- **Password:** `Admin123!`
- **Access:** Manage their own stores only

### Customer Accounts
- **Email:** `michael@customer.com`, `emily@customer.com`, or `david@customer.com`
- **Password:** `Admin123!`
- **Access:** Browse and rate stores

## 🚀 Key Features Demonstration

### Admin Experience
1. Login as admin
2. Access comprehensive dashboard
3. Manage users (create/edit/delete)
4. Create stores and assign owners
5. View system-wide analytics

### Store Owner Experience
1. Login as store owner
2. View only owned stores
3. See detailed customer ratings
4. Manage store information
5. No access to user management

### Customer Experience
1. Login as customer
2. Browse all available stores
3. View store ratings and reviews
4. Rate stores (if implemented)
5. Update profile and password

## 📁 Project Structure

```
Roxiler_Systems_Assignment/
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middlewares/    # Authentication & validation
│   ├── validators/     # Input validation rules
│   ├── utils/          # Utility functions
│   ├── seeders/        # Database seeding
│   └── app.js          # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── services/   # API services
│   │   └── App.jsx     # Main app component
│   └── index.html
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/admin/users` - User registration by admin
- `PUT /auth/user/password` - Update password

### Users (Admin Only)
- `GET /users` - Get all users with filters
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Stores
- `GET /stores` - Get stores (filtered by role)
- `POST /stores` - Create store

### Ratings
- `POST /ratings/submit` - Submit rating

## 🛡️ Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Role-based route protection
- SQL injection prevention via Sequelize ORM
- CORS configuration

## 🎨 UI/UX Features

- Responsive design with Tailwind CSS
- Role-based navigation
- Loading states and error handling
- Clean, modern interface
- Intuitive user flows

## 🧪 Testing the Application

1. **User Management**: Login as admin and test user CRUD operations
2. **Store Management**: Test store creation and filtering with different roles
3. **Authentication**: Test login/logout and password updates
4. **Role Access**: Verify that users can only access appropriate features
5. **Rating System**: Test rating submission and viewing as different roles

## 🔄 Resetting Data

To reset the database with fresh sample data:
```bash
cd backend
npm run seed
```

## 📝 Notes

- All demo accounts use the same password: `Admin123!`
- The application includes comprehensive error handling
- Data persistence is handled through PostgreSQL
- The frontend includes proper loading states and user feedback
- Role-based access is enforced both frontend and backend

## 🤝 Support

If you encounter any issues:
1. Ensure PostgreSQL is running
2. Check environment variables in `.env`
3. Verify all dependencies are installed
4. Check the console for error messages

For additional help, refer to the `SEEDER_README.md` for detailed seeding instructions.

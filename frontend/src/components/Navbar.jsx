import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ user, logout }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">Roxiler Systems</h1>
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="ml-10 flex items-baseline space-x-4">
                {(user.role === 'admin') && (
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/dashboard')
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                
                <Link
                  to="/stores"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/stores')
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Stores
                </Link>
                
                {user.role === 'admin' && (
                  <Link
                    to="/users"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/users')
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    Users
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user.email}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {user.role}
            </span>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/profile')
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

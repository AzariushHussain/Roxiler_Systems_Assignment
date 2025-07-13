import React, { useState } from 'react';
import { usersAPI } from '../services/api';
import { authAPI } from '../services/api';

const CreateUser = ({ onUserCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.register(formData);
      onUserCreated(response.data);
      setFormData({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'user'
      });
    } catch (error) {
        console.error('Error creating user:', error);
      setError(error.response?.data?.errors[0]?.msg || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create New User</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="create-user-name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            id="create-user-name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="create-user-email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="create-user-email"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="create-user-password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="create-user-password"
            required
            autoComplete="new-password"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="create-user-address" className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            id="create-user-address"
            rows="3"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="create-user-role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            id="create-user-role"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="store_owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create User'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;

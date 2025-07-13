import React, { useState, useEffect } from 'react';
import { storesAPI, usersAPI } from '../services/api';

const CreateStore = ({ onStoreCreated, onCancel, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    owner_id: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await usersAPI.getAll({ limit: 100 });
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

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
      const response = await storesAPI.create(formData);
      onStoreCreated(response.data);
      setFormData({
        name: '',
        email: '',
        address: '',
        owner_id: ''
      });
    } catch (error) {
        console.error('Error creating store:', error);
      setError(error.response?.data?.errors[0]?.msg || 'Failed to create store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Store</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Store Name *</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Enter store name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Store Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Store contact email (optional)"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Store Address</label>
          <textarea
            name="address"
            id="address"
            rows="3"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Store address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {user && user.role === 'admin' && (
          <div>
            <label htmlFor="owner_id" className="block text-sm font-medium text-gray-700">
              Assign Store Owner *
            </label>
            {loadingUsers ? (
              <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
                Loading users...
              </div>
            ) : (
              <select
                name="owner_id"
                id="owner_id"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                value={formData.owner_id}
                onChange={handleChange}
              >
                <option value="">Select a store owner</option>
                {users
                  .filter(userItem => userItem.role === 'store_owner')
                  .map(userItem => (
                    <option key={userItem.id} value={userItem.id}>
                      {userItem.name} ({userItem.email}) - {userItem.role}
                    </option>
                  ))}
              </select>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Only users with 'store_owner' role can be assigned as store owners
            </p>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Store'}
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

export default CreateStore;

import React, { useState, useEffect } from 'react';
import { storesAPI, ratingsAPI } from '../services/api';
import CreateStore from './CreateStore';

const StoresList = ({ user }) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await storesAPI.getAll(filters);
      setStores(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1 
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage
    });
  };

  const handleRateStore = (store) => {
    setSelectedStore(store);
    setRating(store.userRating || 5);
    setShowRatingModal(true);
  };

  const submitRating = async () => {
    try {
      await ratingsAPI.submit({
        storeId: selectedStore.id,
        rating: parseInt(rating)
      });
      setShowRatingModal(false);
      fetchStores(); 
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleCreateStore = (newStore) => {
    setShowCreateModal(false);
    fetchStores(); 
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stores</h1>
            <p className="mt-1 text-sm text-gray-600">
              Browse and rate stores
            </p>
          </div>
          {(user.role === 'admin') && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create New Store
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Stores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Store Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search by store name..."
                value={filters.name}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search by address..."
                value={filters.address}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stores.map((store) => (
          <div key={store.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{store.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{store.email}</p>
              <p className="text-sm text-gray-600 mb-4">{store.address}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">
                    {store.averageRating} avg rating
                  </span>
                </div>
                {store.userRating && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Your rating: {store.userRating}
                  </span>
                )}
              </div>

              {user.role === 'user' && (
                <button
                  onClick={() => handleRateStore(store)}
                  className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {store.userRating ? 'Update Rating' : 'Rate Store'}
                </button>
              )}

              {user.role === 'store_owner' && store.ratings && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Ratings:</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {store.ratings.slice(0, 3).map((ratingItem, index) => (
                      <div key={index} className="text-xs text-gray-600 border-l-2 border-gray-200 pl-2">
                        <span className="font-medium">{ratingItem.user.name}</span>: ★{ratingItem.rating}
                        {ratingItem.review && <p className="italic">"{ratingItem.review}"</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {pagination?.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.limit, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-primary text-white rounded">
              {pagination.currentPage}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {showRatingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Rate {selectedStore.name}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (1-5 stars)
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={submitRating}
                className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Rating
              </button>
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <CreateStore
              user={user}
              onStoreCreated={handleCreateStore}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoresList;

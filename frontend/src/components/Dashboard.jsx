import React, { useState, useEffect } from 'react';
import { storesAPI } from '../services/api';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalStores: 0,
    averageRating: 0,
    myRatings: 0
  });
  const [recentStores, setRecentStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await storesAPI.getAll({ limit: 5 });
      
      if (response.data && response.data.data) {
        const stores = response.data.data;
        
        setRecentStores(stores);
        setStats({
          totalStores: response.data.total || 0,
          averageRating: stores.length > 0 ? stores.reduce((acc, store) => acc + parseFloat(store.averageRating || 0), 0) / stores.length : 0,
          myRatings: stores.filter(store => store.userRating).length
        });
      } else {
        setRecentStores([]);
        setStats({
          totalStores: 0,
          averageRating: 0,
          myRatings: 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setRecentStores([]);
      setStats({
        totalStores: 0,
        averageRating: 0,
        myRatings: 0
      });
      
      if (error.response?.status !== 401) {
        alert('Failed to fetch dashboard data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {user.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Stores</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalStores}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">★</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.averageRating.toFixed(1)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">My Ratings</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.myRatings}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Stores</h3>
          <div className="space-y-4">
            {recentStores.map((store) => (
              <div key={store.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{store.name}</h4>
                  <p className="text-sm text-gray-500">{store.address}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Avg Rating:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    ★ {store.averageRating}
                  </span>
                  {store.userRating && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      My: {store.userRating}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

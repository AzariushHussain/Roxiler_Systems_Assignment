import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api';
import { authAPI} from '../services/api';
import CreateUser from './CreateUser';

const UsersList = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    role: '',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    fetchUsers();
  }, [filters.name, filters.email, filters.role, filters.page, filters.limit]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getAll(filters);
      console.log('Fetched users:', response.data);
      
      if (response.data && response.data.data) {
        setUsers(response.data.data);
        setPagination(response.data.pagination || {});
      } else {
        setUsers([]);
        setPagination({});
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      setPagination({});
      if (error.response?.status !== 401) {
        alert('Failed to fetch users. Please try again.');
      }
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

  const handleEditUser = (userToEdit) => {
    setSelectedUser(userToEdit);
    setEditForm({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const submitEdit = async () => {
    try {
      await usersAPI.update(selectedUser.id, editForm);
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.delete(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleCreateUser = async (newUser) => {
    await authAPI.register(newUser)
    setShowCreateModal(false);

    fetchUsers(); 
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
            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage system users and their roles
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create New User
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Users</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="filter-name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="filter-name"
                autoComplete="off"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search by name..."
                value={filters.name}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="filter-email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="filter-email"
                autoComplete="off"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search by email..."
                value={filters.email}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="filter-role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                name="role"
                id="filter-role"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                value={filters.role}
                onChange={handleFilterChange}
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="store_owner">Store Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((userItem) => (
              <tr key={userItem.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{userItem.name}</div>
                    <div className="text-sm text-gray-500">{userItem.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    userItem.role === 'admin' ? 'bg-red-100 text-red-800' :
                    userItem.role === 'store_owner' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {userItem.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(userItem.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEditUser(userItem)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  {userItem.id !== user.id && (
                    <button
                      onClick={() => handleDeleteUser(userItem.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination?.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
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

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Edit User
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="store_owner">Store Owner</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={submitEdit}
                className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
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
            <CreateUser
              onUserCreated={handleCreateUser}
              onCancel={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;

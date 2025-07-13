module.exports = {
  'admin': {
    can: ['addUser', 'addStore', 'viewDashboard', 'viewAllUsers', 'viewStores', 'viewAllRatings', 'createStore', 'updateUser', 'deleteUser'],
  },
  'store_owner': {
    can: ['viewOwnDashboard', 'viewRatings', 'viewUsersWithRatings', 'viewStores'],
  },
  'user': {
    can: ['viewStores', 'rateStore', 'updateOwnRating'],
  },
};
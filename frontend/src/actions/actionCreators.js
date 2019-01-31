export const updateUserData = data => ({
  type: 'USERS',
  data,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const updateTrolly = (userId, value) => ({
  type: 'UPDATE_TROLLY',
  userId,
  value,
});

// Checkout

import client from './client';

// Check if we should use mock auth (no backend available)
const USE_MOCK_AUTH = true; // Set to false when backend is available

export const getUserProfile = async () => {
  if (USE_MOCK_AUTH) {
    // Return stored user from localStorage
    const storedUser = localStorage.getItem('vault_user');
    if (storedUser) {
      return {
        success: true,
        data: JSON.parse(storedUser),
      };
    }
    throw { response: { status: 401 } };
  }
  
  const { data } = await client.get('/user/profile');
  return data;
};

export const updateUserProfile = async (payload) => {
  if (USE_MOCK_AUTH) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const storedUser = localStorage.getItem('vault_user');
    if (storedUser) {
      const updatedUser = { ...JSON.parse(storedUser), ...payload };
      localStorage.setItem('vault_user', JSON.stringify(updatedUser));
      return {
        success: true,
        data: updatedUser,
      };
    }
    throw { response: { status: 401 } };
  }
  
  const { data } = await client.put('/user/profile', payload);
  return data;
};

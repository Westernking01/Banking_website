import client from './client';

export const getUserProfile = async () => {
  const { data } = await client.get('/user/profile');
  return data;
};

export const updateUserProfile = async (payload) => {
  const { data } = await client.put('/user/profile', payload);
  return data;
};

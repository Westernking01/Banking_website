import client from './client';

export const loginUser = async (email, password) => {
  const { data } = await client.post('/auth/login', { email, password });
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await client.post('/auth/register', { name, email, password });
  return data;
};

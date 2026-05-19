import client from './client';

export const getTransactions = async (params = {}) => {
  const { data } = await client.get('/transactions', { params });
  return data;
};

export const createTransaction = async (payload) => {
  const { data } = await client.post('/transactions', payload);
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await client.get('/transactions/stats');
  return data;
};

import client from './client';

export const transferFunds = async (payload) => {
  const { data } = await client.post('/transfer', payload);
  return data;
};

export const payBill = async (amount, billerName) => {
  const { data } = await client.post('/transfer/pay-bill', { amount, billerName });
  return data;
};

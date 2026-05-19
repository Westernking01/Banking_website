import client from './client';

export const getCards = async () => {
  const { data } = await client.get('/cards');
  return data;
};

export const createCard = async (payload = {}) => {
  const { data } = await client.post('/cards', payload);
  return data;
};

export const freezeCard = async (cardId) => {
  const { data } = await client.patch(`/cards/${cardId}/freeze`);
  return data;
};

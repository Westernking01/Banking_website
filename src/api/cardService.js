import client from './client';

// Check if we should use mock data (no backend available)
const USE_MOCK_DATA = true;

// Mock card data
const generateMockCard = () => ({
  _id: 'card_' + Date.now(),
  cardNumber: '4532 •••• •••• 7891',
  lastFour: '7891',
  expiryDate: '12/28',
  cvv: '***',
  cardType: 'Virtual',
  network: 'Visa',
  isFrozen: false,
  spendingLimit: 12500,
  currentSpending: 8240.50,
  createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months ago
});

// Store mock card in memory
let mockCard = null;

const getMockCard = () => {
  if (!mockCard) {
    const stored = localStorage.getItem('vault_card');
    if (stored) {
      mockCard = JSON.parse(stored);
    } else {
      mockCard = generateMockCard();
      localStorage.setItem('vault_card', JSON.stringify(mockCard));
    }
  }
  return mockCard;
};

const saveMockCard = (card) => {
  mockCard = card;
  localStorage.setItem('vault_card', JSON.stringify(card));
  return card;
};

export const getCards = async () => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, data: [getMockCard()] };
  }
  const { data } = await client.get('/cards');
  return data;
};

export const createCard = async (payload = {}) => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const card = generateMockCard();
    return { success: true, data: saveMockCard(card) };
  }
  const { data } = await client.post('/cards', payload);
  return data;
};

export const freezeCard = async (cardId) => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const card = getMockCard();
    card.isFrozen = !card.isFrozen;
    return { success: true, data: saveMockCard(card) };
  }
  const { data } = await client.patch(`/cards/${cardId}/freeze`);
  return data;
};

export const updateSpendingLimit = async (cardId, spendingLimit) => {
  if (USE_MOCK_DATA) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const card = getMockCard();
    card.spendingLimit = spendingLimit;
    return { success: true, data: saveMockCard(card) };
  }
  const { data } = await client.patch(`/cards/${cardId}/limit`, { spendingLimit });
  return data;
};

import client from './client';

// Mock user for demo purposes (when backend is unavailable)
const MOCK_USER = {
  id: "U87431",
  name: "Eleanor Vance",
  email: "demo@vault.com",
  avatar: "https://i.pravatar.cc/150?img=47",
  token: "mock-jwt-token-" + Date.now(),
};

// Check if we should use mock auth (no backend available)
const USE_MOCK_AUTH = true; // Set to false when backend is available

export const loginUser = async (email, password) => {
  if (USE_MOCK_AUTH) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Allow any email/password combination for demo
    // In production, this would validate against a real backend
    if (email && password) {
      return {
        success: true,
        data: {
          ...MOCK_USER,
          email: email,
          token: "mock-jwt-token-" + Date.now(),
        },
      };
    }
    throw { response: { data: { message: 'Invalid credentials' } } };
  }
  
  const { data } = await client.post('/auth/login', { email, password });
  return data;
};

export const registerUser = async (name, email, password) => {
  if (USE_MOCK_AUTH) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (name && email && password) {
      return {
        success: true,
        data: {
          ...MOCK_USER,
          name: name,
          email: email,
          token: "mock-jwt-token-" + Date.now(),
        },
      };
    }
    throw { response: { data: { message: 'Registration failed' } } };
  }
  
  const { data } = await client.post('/auth/register', { name, email, password });
  return data;
};

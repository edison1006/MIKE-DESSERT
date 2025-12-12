const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// 获取 token
const getToken = () => {
  return localStorage.getItem('mikaDessertToken');
};

// 设置 token
const setToken = (token) => {
  localStorage.setItem('mikaDessertToken', token);
};

// 清除 token
const clearToken = () => {
  localStorage.removeItem('mikaDessertToken');
};

// 通用 API 请求函数
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || error.message || 'Request failed');
  }

  return response.json();
};

// 认证 API
export const authAPI = {
  register: async (email, password, name) => {
    const data = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    if (data.access_token) {
      setToken(data.access_token);
    }
    return data;
  },

  login: async (email, password) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.access_token) {
      setToken(data.access_token);
    }
    return data;
  },

  logout: () => {
    clearToken();
  },

  getCurrentUser: async () => {
    return apiRequest('/api/auth/me');
  },
};

// 产品 API
export const productsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/api/products${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return apiRequest(`/api/products/${id}`);
  },
};

// 订单 API
export const ordersAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/api/orders${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return apiRequest(`/api/orders/${id}`);
  },

  create: async (orderData) => {
    return apiRequest('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  update: async (id, updates) => {
    return apiRequest(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },
};

// AI 客服 API
export const chatbotAPI = {
  chat: async (message, language = 'en', sessionId = null) => {
    return apiRequest('/api/chatbot/chat', {
      method: 'POST',
      body: JSON.stringify({ message, language, session_id: sessionId }),
    });
  },

  getWelcomeMessage: async (language = 'en') => {
    return apiRequest(`/api/chatbot/welcome?language=${language}`);
  },
};

export { getToken, setToken, clearToken };









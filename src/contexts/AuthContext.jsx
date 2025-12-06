import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 从 localStorage 加载用户信息
    const savedUser = localStorage.getItem('mikaDessertUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('mikaDessertUser');
      }
    }
    setIsLoading(false);
  }, []);

  const register = (email, password, name) => {
    // 检查用户是否已存在
    const users = JSON.parse(localStorage.getItem('mikaDessertUsers') || '[]');
    const existingUser = users.find((u) => u.email === email);
    
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // 创建新用户
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };

    // 保存用户到列表（实际应用中密码应该加密）
    users.push({ ...newUser, password });
    localStorage.setItem('mikaDessertUsers', JSON.stringify(users));

    // 登录新用户
    setUser(newUser);
    localStorage.setItem('mikaDessertUser', JSON.stringify(newUser));

    return newUser;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('mikaDessertUsers') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    setUser(userWithoutPassword);
    localStorage.setItem('mikaDessertUser', JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mikaDessertUser');
  };

  const value = {
    user,
    isLoading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


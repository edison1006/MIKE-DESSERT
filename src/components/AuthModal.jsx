import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../data/translations';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const { language } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        onClose();
        resetForm();
      } else {
        if (!name.trim()) {
          throw new Error('Name is required');
        }
        await register(email, password, name);
        onClose();
        resetForm();
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    resetForm();
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="auth-modal-header">
          <h2>{isLogin ? getTranslation(language, 'auth.signIn') : getTranslation(language, 'auth.createAccount')}</h2>
          <p>{isLogin ? getTranslation(language, 'auth.welcomeBack') : getTranslation(language, 'auth.joinUs')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-form-group">
              <label htmlFor="name">{getTranslation(language, 'auth.fullName')}</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={getTranslation(language, 'auth.fullName')}
                required={!isLogin}
              />
            </div>
          )}

          <div className="auth-form-group">
            <label htmlFor="email">{getTranslation(language, 'auth.email')}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={getTranslation(language, 'auth.email')}
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">{getTranslation(language, 'auth.password')}</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={getTranslation(language, 'auth.password')}
              required
              minLength={6}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : isLogin ? getTranslation(language, 'auth.signIn') : getTranslation(language, 'auth.createAccount')}
          </button>
        </form>

        <div className="auth-modal-footer">
          <p>
            {isLogin ? getTranslation(language, 'auth.dontHaveAccount') + ' ' : getTranslation(language, 'auth.alreadyHaveAccount') + ' '}
            <button type="button" className="auth-switch-btn" onClick={switchMode}>
              {isLogin ? getTranslation(language, 'auth.signUp') : getTranslation(language, 'auth.signIn')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;


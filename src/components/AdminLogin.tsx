import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { Screen } from '../App';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo credentials - in production, this would be server-side validation
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setTimeout(() => {
        onLogin();
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Access</h1>
            <p className="text-gray-600">Secure administrative dashboard</p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="text-blue-600" size={16} />
              <span className="text-blue-800 font-semibold text-sm">Demo Credentials</span>
            </div>
            <p className="text-blue-700 text-sm">Username: <code className="bg-blue-100 px-1 rounded">admin</code></p>
            <p className="text-blue-700 text-sm">Password: <code className="bg-blue-100 px-1 rounded">admin123</code></p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Administrator Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none transition-all"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              ← Back to App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (userType: 'student' | 'tutor') => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'tutor'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-teal-50 p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {isSignUp ? 'Join EduLink' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600">
            {isSignUp ? 'Connect with fellow students' : 'Continue your learning journey'}
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">I am a:</p>
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                userType === 'student'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Student (Need Help)
            </button>
            <button
              type="button"
              onClick={() => setUserType('tutor')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                userType === 'tutor'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Tutor (Offer Help)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name (e.g., Tanisha Sharma)"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email (e.g., tulsi.gupta@college.edu)"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow ${
              userType === 'student' 
                ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                : 'bg-gradient-to-r from-teal-400 to-green-400'
            }`}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-purple-50 to-teal-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={() => onLogin(userType)}
            className="w-full mt-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center space-x-2"
          >
            <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-blue-400 rounded"></div>
            <span>Google</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-500 font-medium"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
import React, { useEffect } from 'react';
import { GraduationCap, Users } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-teal-100 flex flex-col items-center justify-center p-8">
      <div className="animate-bounce mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <GraduationCap size={40} className="text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
            <Users size={16} className="text-white" />
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2 animate-fade-in">
        EduLink
      </h1>
      
      <p className="text-lg text-gray-600 text-center animate-fade-in-delay">
        Empowering Student Collaboration
      </p>
      
      <div className="mt-12 flex space-x-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-200"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
import React, { useEffect } from 'react';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-400 to-teal-400 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 animate-bounce">
          <BookOpen size={24} />
        </div>
        <div className="absolute top-40 right-16 animate-pulse">
          <Users size={20} />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-300">
          <GraduationCap size={28} />
        </div>
      </div>

      {/* Main Logo */}
      <div className="text-center z-10">
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <GraduationCap size={48} className="text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4 animate-fade-in">
          EduLink
        </h1>
        
        <p className="text-lg opacity-90 mb-8 px-8 animate-fade-in-delay">
          Empowering Student Collaboration
        </p>

        {/* Loading Animation */}
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-8 text-center">
        <p className="text-sm opacity-75">
          Connecting Students • Sharing Knowledge
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
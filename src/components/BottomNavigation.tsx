import React from 'react';
import { Home, Search, Plus, MessageCircle, User, Trophy, Bot } from 'lucide-react';
import { Screen } from '../App';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home' },
    { screen: 'search' as Screen, icon: Search, label: 'Search' },
    { screen: 'ai-tutor' as Screen, icon: Bot, label: 'AI Tutor' },
    { screen: 'chat' as Screen, icon: MessageCircle, label: 'Chat' },
    { screen: 'profile' as Screen, icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg z-50">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center space-y-1 p-2 transition-colors ${
                isActive ? 'text-purple-500' : 'text-gray-400'
              }`}
            >
              <div className={`p-1 rounded-full ${
                isActive && item.screen === 'upload' 
                  ? 'bg-gradient-to-r from-purple-500 to-teal-500 shadow-md' 
                  : ''
              }`}>
                <IconComponent 
                  size={20} 
                  className={item.screen === 'upload' && isActive ? 'text-white' : ''}
                />
              </div>
              <span className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
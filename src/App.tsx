import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import UploadScreen from './components/UploadScreen';
import ChatScreen from './components/ChatScreen';
import ProfileScreen from './components/ProfileScreen';
import PaymentScreen from './components/PaymentScreen';
import BottomNavigation from './components/BottomNavigation';

export type Screen = 'splash' | 'login' | 'home' | 'search' | 'upload' | 'chat' | 'profile' | 'payment';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return <HomeScreen onNavigate={navigateToScreen} />;
      case 'search':
        return <SearchScreen onNavigate={navigateToScreen} />;
      case 'upload':
        return <UploadScreen onNavigate={navigateToScreen} />;
      case 'chat':
        return <ChatScreen onNavigate={navigateToScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigateToScreen} />;
      case 'payment':
        return <PaymentScreen onNavigate={navigateToScreen} />;
      default:
        return <HomeScreen onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-['Poppins']">
      <div className="w-full max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden">
        {renderScreen()}
        {isLoggedIn && currentScreen !== 'splash' && currentScreen !== 'login' && (
          <BottomNavigation currentScreen={currentScreen} onNavigate={navigateToScreen} />
        )}
      </div>
    </div>
  );
}

export default App;
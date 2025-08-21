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
import TutorAdminPanel from './components/TutorAdminPanel';
import StudentAdminPanel from './components/StudentAdminPanel';

export type Screen = 'splash' | 'login' | 'home' | 'search' | 'upload' | 'chat' | 'profile' | 'payment' | 'tutor-admin' | 'student-admin';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'student' | 'tutor'>('student');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (type: 'student' | 'tutor') => {
    setIsLoggedIn(true);
    setUserType(type);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'home':
        return <HomeScreen onNavigate={navigateToScreen} userType={userType} />;
      case 'search':
        return <SearchScreen onNavigate={navigateToScreen} userType={userType} />;
      case 'upload':
        return <UploadScreen onNavigate={navigateToScreen} />;
      case 'chat':
        return <ChatScreen onNavigate={navigateToScreen} />;
      case 'profile':
        return <ProfileScreen onNavigate={navigateToScreen} userType={userType} />;
      case 'payment':
        return <PaymentScreen onNavigate={navigateToScreen} />;
      case 'tutor-admin':
        return <TutorAdminPanel onNavigate={navigateToScreen} />;
      case 'student-admin':
        return <StudentAdminPanel onNavigate={navigateToScreen} />;
      default:
        return <HomeScreen onNavigate={navigateToScreen} userType={userType} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-['Poppins']">
      <div className="w-full max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden">
        {renderScreen()}
        {isLoggedIn && currentScreen !== 'splash' && currentScreen !== 'login' && currentScreen !== 'tutor-admin' && currentScreen !== 'student-admin' && (
          <BottomNavigation currentScreen={currentScreen} onNavigate={navigateToScreen} />
        )}
      </div>
    </div>
  );
}

export default App;
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
import NotificationScreen from './components/NotificationScreen';
import AdminPanel from './components/AdminPanel';
import AdvisoryChat from './components/AdvisoryChat';
import AdminLogin from './components/AdminLogin';
import SuperAdminPanel from './components/SuperAdminPanel';

export type Screen = 'splash' | 'login' | 'home' | 'search' | 'upload' | 'chat' | 'profile' | 'payment' | 'tutor-admin' | 'student-admin' | 'notifications' | 'admin' | 'advisory' | 'admin-login' | 'super-admin';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'student' | 'tutor'>('student');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (type: 'student' | 'tutor') => {
    setIsLoggedIn(true);
    setUserType(type);
    setCurrentScreen('home');
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setCurrentScreen('super-admin');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onNavigate={navigateToScreen} />;
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
      case 'notifications':
        return <NotificationScreen onNavigate={navigateToScreen} />;
      case 'admin':
        return <AdminPanel onNavigate={navigateToScreen} />;
      case 'advisory':
        return <AdvisoryChat onNavigate={navigateToScreen} userType={userType} />;
      case 'admin-login':
        return <AdminLogin onLogin={handleAdminLogin} onBack={() => setCurrentScreen('login')} />;
      case 'super-admin':
        return <SuperAdminPanel onNavigate={navigateToScreen} onLogout={handleAdminLogout} />;
      default:
        return <HomeScreen onNavigate={navigateToScreen} userType={userType} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 flex items-center justify-center font-['Inter']">
      <div className="app-container fade-in">
        {renderScreen()}
        {isLoggedIn && currentScreen !== 'splash' && currentScreen !== 'login' && currentScreen !== 'tutor-admin' && currentScreen !== 'student-admin' && (
          <BottomNavigation currentScreen={currentScreen} onNavigate={navigateToScreen} />
        )}
      </div>
      
      {/* Web-only background decoration */}
      <div className="hidden md:block fixed inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
}

export default App;
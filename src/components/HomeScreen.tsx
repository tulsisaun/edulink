import React from 'react';
import { Search, Bell, TrendingUp, Star, MapPin, BookOpen, Users, Calculator, Zap, Trophy, Clock, Calendar, BarChart3, Target, Video, Bot, GraduationCap } from 'lucide-react';
import { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  userType: 'student' | 'tutor';
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, userType }) => {
  const trendingServices = [
    { title: 'Mathematics Assignment Help', price: '₹150', rating: 4.8, tutor: 'Kalyani M.' },
    { title: 'Python Programming Notes', price: '₹200', rating: 4.9, tutor: 'Arjun K.' },
    { title: 'English Essay Writing', price: '₹100', rating: 4.7, tutor: 'Janhavi S.' }
  ];

  const quickLinks = [
    { icon: BookOpen, label: 'Study Notes', color: 'bg-blue-100 text-blue-600' },
    { icon: Users, label: 'Group Study', color: 'bg-purple-100 text-purple-600' },
    { icon: Calculator, label: 'Math Help', color: 'bg-teal-100 text-teal-600' },
    { icon: Search, label: userType === 'student' ? 'Find Tutor' : 'Find Students', color: 'bg-orange-100 text-orange-600' },
    { icon: Calendar, label: 'Study Planner', color: 'bg-indigo-100 text-indigo-600' },
    { icon: BarChart3, label: 'Grade Tracker', color: 'bg-green-100 text-green-600' },
    { icon: Target, label: 'Mock Tests', color: 'bg-red-100 text-red-600' },
    { icon: Bot, label: 'AI Tutor', color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto smooth-scroll">
      {/* Header */}
      <div className={`p-6 pt-12 ${
        userType === 'student' 
          ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
          : 'bg-gradient-to-r from-teal-400 to-green-400'
      } md:rounded-t-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-xl font-bold">
              Hi, {userType === 'student' ? 'Janhavi' : 'Kalyani'}! 👋
            </h1>
            <p className="text-white/80">
              {userType === 'student' 
                ? 'Ready for peer learning today?' 
                : 'Ready to help fellow students?'
              }
            </p>
          </div>
          <button className="relative">
            <button onClick={() => onNavigate('notifications')}>
              <Bell className="text-white" size={24} />
            </button>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></span>
          </button>
        </div>

        {/* Search Bar */}
        <button
          onClick={() => onNavigate('search')}
          className="w-full bg-white rounded-xl p-4 flex items-center space-x-3 card-shadow hover:card-shadow-hover transition-all duration-200 hover-lift"
        >
          <Search className="text-gray-400" size={20} />
          <span className="text-gray-500">
            {userType === 'student' 
              ? 'Find peer tutors, notes, guidance...' 
              : 'Find students who need help...'
            }
          </span>
        </button>
      </div>

      {/* Live Activity Feed */}
      <div className="p-4 space-y-6 pb-24">
        {/* Live Updates */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 slide-up">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-orange-700 font-bold text-sm">🔥 Live Updates</span>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-orange-800">• <strong>Arjun K.</strong> just posted Python notes</p>
            <p className="text-orange-800">• <strong>3 students</strong> need Math help right now</p>
            <p className="text-orange-800">• <strong>New group study</strong> starting in 30 mins</p>
          </div>
        </div>

        {/* Achievement Badge */}
        {userType === 'student' && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 slide-up">
            <div className="flex items-center space-x-3">
              <Trophy className="text-yellow-500" size={24} />
              <div>
                <h3 className="font-bold text-yellow-800">🎉 Achievement Unlocked!</h3>
                <p className="text-yellow-700 text-sm">Completed 5 study sessions this week</p>
              </div>
            </div>
          </div>
        )}

      {/* Scrollable Content */}
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 md:text-xl">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              ...quickLinks.slice(0, 4),
              { icon: GraduationCap, label: 'College Advisory', color: 'bg-green-100 text-green-600' },
              { icon: Trophy, label: 'Achievements', color: 'bg-yellow-100 text-yellow-600' },
              { icon: MapPin, label: 'Campus Map', color: 'bg-teal-100 text-teal-600' },
              { icon: BookOpen, label: 'Digital Library', color: 'bg-emerald-100 text-emerald-600' }
            ].map((link, index) => (
              <button
                key={index}
                onClick={() => {
                  if (link.label === 'College Advisory') onNavigate('advisory');
                  else if (link.label === 'Study Planner') onNavigate('study-planner');
                  else if (link.label === 'Grade Tracker') onNavigate('grade-tracker');
                  else if (link.label === 'Mock Tests') onNavigate('mock-test');
                  else if (link.label === 'AI Tutor') onNavigate('ai-tutor');
                  else if (link.label === 'Achievements') onNavigate('achievements');
                  else if (link.label === 'Campus Map') onNavigate('campus-map');
                  else if (link.label === 'Digital Library') onNavigate('digital-library');
                  else onNavigate('search');
                }}
                className="bg-white p-4 rounded-xl card-shadow flex flex-col items-center space-y-3 hover:card-shadow-hover transition-all duration-200 hover-lift"
              >
                <div className={`w-14 h-14 rounded-full ${link.color} flex items-center justify-center`}>
                  <link.icon size={24} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{link.label}</span>
              </button>
            ))}
          </div>
          
          {/* Additional Features Row */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            {quickLinks.slice(4).map((link, index) => (
              <button
                key={index + 4}
                onClick={() => {
                  if (link.label === 'Study Planner') onNavigate('study-planner');
                  else if (link.label === 'Grade Tracker') onNavigate('grade-tracker');
                  else if (link.label === 'Mock Tests') onNavigate('mock-test');
                  else if (link.label === 'AI Tutor') onNavigate('ai-tutor');
                  else onNavigate('search');
                }}
                className="bg-white p-4 rounded-xl card-shadow flex flex-col items-center space-y-3 hover:card-shadow-hover transition-all duration-200 hover-lift"
              >
                <div className={`w-14 h-14 rounded-full ${link.color} flex items-center justify-center`}>
                  <link.icon size={24} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Admin Access (for demo) */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-red-800">🔒 Super Admin Panel</h3>
              <p className="text-red-600 text-sm">Complete system administration & management</p>
            </div>
            <button 
              onClick={() => onNavigate('admin-login')}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Access Panel
            </button>
          </div>
        </div>

        {/* Study Streak */}
        <div className="bg-white p-5 rounded-xl card-shadow border border-purple-100 hover:card-shadow-hover transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Zap className="text-purple-500" size={20} />
              <h3 className="font-bold text-gray-800">Study Streak</h3>
            </div>
            <span className="text-purple-600 font-bold text-xl">7 days 🔥</span>
          </div>
          <div className="flex space-x-1 mb-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 h-2 bg-purple-200 rounded-full">
                <div className="h-full bg-purple-500 rounded-full"></div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm">Keep it up! You're on fire 🚀</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl card-shadow text-center hover:card-shadow-hover transition-all duration-200 hover-lift">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="text-blue-600" size={16} />
            </div>
            <p className="text-xl font-bold text-gray-800">24h</p>
            <p className="text-xs text-gray-600">Study Time</p>
          </div>
          <div className="bg-white p-4 rounded-xl card-shadow text-center hover:card-shadow-hover transition-all duration-200 hover-lift">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="text-green-600" size={16} />
            </div>
            <p className="text-xl font-bold text-gray-800">12</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-xl card-shadow text-center hover:card-shadow-hover transition-all duration-200 hover-lift">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="text-purple-600" size={16} />
            </div>
            <p className="text-xl font-bold text-gray-800">4.8</p>
            <p className="text-xs text-gray-600">Rating</p>
          </div>
        </div>

        {/* Trending Services */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              {userType === 'student' ? 'Available Tutors' : 'Students Need Help'}
            </h2>
            <div className="flex items-center space-x-1 text-orange-500">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">Hot</span>
            </div>
          </div>

          <div className="space-y-3">
            {(userType === 'student' ? trendingServices : [
              { title: 'Need help with Calculus Integration', price: '₹300', rating: 4.8, tutor: 'Tanisha T.' },
              { title: 'Java Programming doubt clearing', price: '₹250', rating: 4.7, tutor: 'Rohit K.' },
              { title: 'English Essay writing help needed', price: '₹150', rating: 4.6, tutor: 'Priya S.' }
            ]).map((service, index) => (
              <button 
                key={index} 
                onClick={() => onNavigate('chat')}
                className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-800 flex-1">{service.title}</h3>
                  <span className="text-teal-600 font-bold text-lg">{service.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {service.tutor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{service.tutor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-sm font-medium text-gray-600">{service.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Request */}
        <div className={`p-5 rounded-xl border ${
          userType === 'student' 
            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100' 
            : 'bg-gradient-to-r from-teal-50 to-green-50 border-teal-100'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className={userType === 'student' ? 'text-blue-500' : 'text-teal-500'} size={16} />
            <span className={`text-sm font-semibold ${
              userType === 'student' ? 'text-blue-600' : 'text-teal-600'
            }`}>
              {userType === 'student' ? 'Tutor Near You' : 'Student Near You'}
            </span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">
            {userType === 'student' 
              ? 'Expert Math Tutor Available' 
              : 'Student needs Calculus help urgently'
            }
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {userType === 'student' 
              ? 'Kalyani from IIT Bombay - 4.9★ rating, specializes in advanced mathematics' 
              : 'Tanisha from DTU needs help with integration by parts - urgent exam prep'
            }
          </p>
          <div className="flex items-center justify-between">
            <span className="text-teal-600 font-bold text-lg">
              {userType === 'student' ? '₹250/hour' : '₹300 budget'}
            </span>
            <button 
              onClick={() => onNavigate('chat')}
              className={`text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                userType === 'student' 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-teal-500 hover:bg-teal-600'
              }`}
            >
              {userType === 'student' ? 'Contact Tutor' : 'Help Student'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
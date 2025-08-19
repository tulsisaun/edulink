import React from 'react';
import { Search, Bell, TrendingUp, Star, MapPin, BookOpen, Users, Calculator } from 'lucide-react';
import { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const trendingServices = [
    { title: 'Mathematics Assignment Help', price: '₹150', rating: 4.8, tutor: 'Kalyani M.' },
    { title: 'Python Programming Notes', price: '₹200', rating: 4.9, tutor: 'Arjun K.' },
    { title: 'English Essay Writing', price: '₹100', rating: 4.7, tutor: 'Janhavi S.' }
  ];

  const quickLinks = [
    { icon: BookOpen, label: 'Study Notes', color: 'bg-blue-100 text-blue-600' },
    { icon: Users, label: 'Group Study', color: 'bg-purple-100 text-purple-600' },
    { icon: Calculator, label: 'Math Help', color: 'bg-teal-100 text-teal-600' },
    { icon: Search, label: 'Find Tutor', color: 'bg-orange-100 text-orange-600' }
  ];

  return (
    <div className="h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 to-teal-400 p-6 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-xl font-bold">Hi, Tanisha! 👋</h1>
            <p className="text-purple-100">Ready for peer learning today?</p>
          </div>
          <button className="relative">
            <Bell className="text-white" size={24} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></span>
          </button>
        </div>

        {/* Search Bar */}
        <button
          onClick={() => onNavigate('search')}
          className="w-full bg-white rounded-xl p-4 flex items-center space-x-3 shadow-sm"
        >
          <Search className="text-gray-400" size={20} />
          <span className="text-gray-500">Find peer tutors, notes, guidance...</span>
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => onNavigate('search')}
                className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center space-y-3 hover:shadow-md transition-shadow"
              >
                <div className={`w-14 h-14 rounded-full ${link.color} flex items-center justify-center`}>
                  <link.icon size={24} />
                </div>
                <span className="text-sm font-semibold text-gray-700">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Services */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Trending Peer Support</h2>
            <div className="flex items-center space-x-1 text-orange-500">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">Hot</span>
            </div>
          </div>

          <div className="space-y-3">
            {trendingServices.map((service, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
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
              </div>
            ))}
          </div>
        </div>

        {/* Featured Request */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="text-blue-500" size={16} />
            <span className="text-blue-600 text-sm font-semibold">Peer Near You</span>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Concept clarity needed - Data Structures</h3>
          <p className="text-sm text-gray-600 mb-4">B.Tech CSE student needs guidance on linked lists and trees</p>
          <div className="flex items-center justify-between">
            <span className="text-teal-600 font-bold text-lg">₹300</span>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors">
              Offer Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
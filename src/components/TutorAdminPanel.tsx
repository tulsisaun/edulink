import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Users, BookOpen, TrendingUp, Star, MessageCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { Screen } from '../App';

interface TutorAdminPanelProps {
  onNavigate: (screen: Screen) => void;
}

const TutorAdminPanel: React.FC<TutorAdminPanelProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'requests' | 'earnings'>('dashboard');

  const stats = [
    { label: 'Total Earnings', value: '₹12,450', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Active Services', value: '8', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { label: 'Students Helped', value: '24', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { label: 'Rating', value: '4.8', icon: Star, color: 'bg-yellow-100 text-yellow-600' }
  ];

  const myServices = [
    {
      id: 1,
      title: 'Mathematics Assignment Help',
      price: '₹250/hour',
      status: 'active',
      students: 5,
      rating: 4.9,
      views: 45
    },
    {
      id: 2,
      title: 'Python Programming Notes',
      price: '₹180',
      status: 'active',
      students: 8,
      rating: 4.8,
      views: 67
    },
    {
      id: 3,
      title: 'Calculus Concept Clarity',
      price: '₹200/session',
      status: 'paused',
      students: 3,
      rating: 4.7,
      views: 23
    }
  ];

  const studentRequests = [
    {
      id: 1,
      student: 'Tanisha T.',
      subject: 'Mathematics',
      topic: 'Integration by parts help needed',
      budget: '₹300',
      urgency: 'high',
      time: '2 hours ago'
    },
    {
      id: 2,
      student: 'Rohit K.',
      subject: 'Programming',
      topic: 'Java OOP concepts explanation',
      budget: '₹250',
      urgency: 'medium',
      time: '5 hours ago'
    },
    {
      id: 3,
      student: 'Priya S.',
      subject: 'English',
      topic: 'Essay writing guidance',
      budget: '₹150',
      urgency: 'low',
      time: '1 day ago'
    }
  ];

  const earnings = [
    { date: '2024-01-15', student: 'Tanisha T.', service: 'Math Tutoring', amount: '₹300', status: 'completed' },
    { date: '2024-01-14', student: 'Arjun K.', service: 'Python Notes', amount: '₹180', status: 'completed' },
    { date: '2024-01-13', student: 'Kavya N.', service: 'Calculus Help', amount: '₹250', status: 'pending' },
    { date: '2024-01-12', student: 'Rohit M.', service: 'Assignment Help', amount: '₹200', status: 'completed' }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm">
            <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <DollarSign className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Payment received</p>
              <p className="text-xs text-gray-600">₹300 from Tanisha T.</p>
            </div>
            <span className="text-xs text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">New message</p>
              <p className="text-xs text-gray-600">From Rohit K. about Java help</p>
            </div>
            <span className="text-xs text-gray-500">5h ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-800">My Services</h3>
        <button 
          onClick={() => onNavigate('upload')}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Add New
        </button>
      </div>
      
      {myServices.map((service) => (
        <div key={service.id} className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{service.title}</h4>
              <p className="text-teal-600 font-bold text-lg">{service.price}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              service.status === 'active' 
                ? 'bg-green-100 text-green-600' 
                : 'bg-yellow-100 text-yellow-600'
            }`}>
              {service.status}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-4">
              <span>{service.students} students</span>
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-current" size={14} />
                <span>{service.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{service.views} views</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center space-x-1">
              <Edit size={14} />
              <span>Edit</span>
            </button>
            <button className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center space-x-1">
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-800">Student Requests</h3>
      
      {studentRequests.map((request) => (
        <div key={request.id} className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-800">{request.student}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  request.urgency === 'high' ? 'bg-red-100 text-red-600' :
                  request.urgency === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {request.urgency}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{request.topic}</p>
              <p className="text-purple-600 text-xs font-semibold">{request.subject}</p>
            </div>
            <div className="text-right">
              <p className="text-teal-600 font-bold text-lg">{request.budget}</p>
              <p className="text-gray-400 text-xs">{request.time}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onNavigate('chat')}
              className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-lg text-sm font-semibold"
            >
              Accept & Chat
            </button>
            <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-semibold">
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-5 rounded-xl text-white">
        <h3 className="font-bold mb-2">Total Earnings</h3>
        <p className="text-3xl font-bold">₹12,450</p>
        <p className="text-green-100 text-sm">This month: ₹3,200</p>
      </div>
      
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h4 className="font-bold text-gray-800 mb-4">Recent Transactions</h4>
        <div className="space-y-3">
          {earnings.map((earning, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{earning.service}</p>
                <p className="text-gray-600 text-xs">{earning.student} • {earning.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{earning.amount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  earning.status === 'completed' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {earning.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 to-teal-400 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('profile')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Tutor Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'services', label: 'Services' },
            { key: 'requests', label: 'Requests' },
            { key: 'earnings', label: 'Earnings' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-purple-600'
                  : 'bg-white/20 text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'requests' && renderRequests()}
        {activeTab === 'earnings' && renderEarnings()}
      </div>
    </div>
  );
};

export default TutorAdminPanel;
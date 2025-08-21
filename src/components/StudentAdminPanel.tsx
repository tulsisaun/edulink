import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Users, DollarSign, Clock, Star, MessageCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { Screen } from '../App';

interface StudentAdminPanelProps {
  onNavigate: (screen: Screen) => void;
}

const StudentAdminPanel: React.FC<StudentAdminPanelProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'requests' | 'tutors' | 'history'>('dashboard');

  const stats = [
    { label: 'Total Spent', value: '₹2,450', icon: DollarSign, color: 'bg-red-100 text-red-600' },
    { label: 'Active Requests', value: '3', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { label: 'Tutors Connected', value: '8', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { label: 'Completed', value: '12', icon: Clock, color: 'bg-green-100 text-green-600' }
  ];

  const myRequests = [
    {
      id: 1,
      title: 'Need help with Calculus Integration',
      subject: 'Mathematics',
      budget: '₹300',
      status: 'active',
      responses: 5,
      posted: '2 hours ago'
    },
    {
      id: 2,
      title: 'Java OOP concepts explanation needed',
      subject: 'Programming',
      budget: '₹250',
      status: 'in_progress',
      responses: 3,
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'English essay writing guidance',
      subject: 'English',
      budget: '₹150',
      status: 'completed',
      responses: 7,
      posted: '3 days ago'
    }
  ];

  const availableTutors = [
    {
      id: 1,
      name: 'Kalyani M.',
      subject: 'Mathematics',
      rating: 4.9,
      price: '₹250/hour',
      experience: '2 years',
      college: 'IIT Bombay',
      specialties: ['Calculus', 'Algebra', 'Statistics']
    },
    {
      id: 2,
      name: 'Arjun K.',
      subject: 'Programming',
      rating: 4.8,
      price: '₹200/hour',
      experience: '3 years',
      college: 'DTU',
      specialties: ['Java', 'Python', 'DSA']
    },
    {
      id: 3,
      name: 'Janhavi S.',
      subject: 'English',
      rating: 4.7,
      price: '₹150/hour',
      experience: '1.5 years',
      college: 'Mumbai University',
      specialties: ['Essay Writing', 'Grammar', 'Literature']
    }
  ];

  const history = [
    { date: '2024-01-15', tutor: 'Kalyani M.', service: 'Math Tutoring', amount: '₹300', status: 'completed', rating: 5 },
    { date: '2024-01-14', tutor: 'Arjun K.', service: 'Python Help', amount: '₹200', status: 'completed', rating: 5 },
    { date: '2024-01-13', tutor: 'Janhavi S.', service: 'Essay Writing', amount: '₹150', status: 'completed', rating: 4 },
    { date: '2024-01-12', tutor: 'Kalyani M.', service: 'Calculus Help', amount: '₹250', status: 'completed', rating: 5 }
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

      {/* Quick Actions */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onNavigate('upload')}
            className="bg-purple-50 p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-purple-100 transition-colors"
          >
            <BookOpen className="text-purple-600" size={24} />
            <span className="text-sm font-semibold text-purple-700">Post Request</span>
          </button>
          <button 
            onClick={() => onNavigate('search')}
            className="bg-teal-50 p-4 rounded-xl flex flex-col items-center space-y-2 hover:bg-teal-100 transition-colors"
          >
            <Users className="text-teal-600" size={24} />
            <span className="text-sm font-semibold text-teal-700">Find Tutors</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">New response</p>
              <p className="text-xs text-gray-600">Kalyani M. responded to your math request</p>
            </div>
            <span className="text-xs text-gray-500">2h ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Clock className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Session completed</p>
              <p className="text-xs text-gray-600">Java programming help with Arjun K.</p>
            </div>
            <span className="text-xs text-gray-500">1d ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-800">My Requests</h3>
        <button 
          onClick={() => onNavigate('upload')}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          New Request
        </button>
      </div>
      
      {myRequests.map((request) => (
        <div key={request.id} className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{request.title}</h4>
              <p className="text-purple-600 text-sm font-semibold">{request.subject}</p>
              <p className="text-gray-500 text-xs">{request.posted}</p>
            </div>
            <div className="text-right">
              <p className="text-teal-600 font-bold text-lg">{request.budget}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                request.status === 'active' ? 'bg-blue-100 text-blue-600' :
                request.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                {request.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">{request.responses} tutor responses</p>
            <div className="flex space-x-2">
              <button className="bg-blue-50 text-blue-600 py-2 px-3 rounded-lg text-sm font-semibold flex items-center space-x-1">
                <Eye size={14} />
                <span>View</span>
              </button>
              <button className="bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-semibold flex items-center space-x-1">
                <Edit size={14} />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTutors = () => (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-800">Available Tutors</h3>
      
      {availableTutors.map((tutor) => (
        <div key={tutor.id} className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {tutor.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-gray-800">{tutor.name}</h4>
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <p className="text-purple-600 text-sm font-semibold">{tutor.subject}</p>
              <p className="text-gray-600 text-xs">{tutor.college} • {tutor.experience}</p>
            </div>
            <div className="text-right">
              <p className="text-teal-600 font-bold">{tutor.price}</p>
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400 fill-current" size={14} />
                <span className="text-sm font-medium text-gray-600">{tutor.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tutor.specialties.map((specialty, index) => (
              <span key={index} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                {specialty}
              </span>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onNavigate('chat')}
              className="flex-1 bg-purple-500 text-white py-2 px-3 rounded-lg text-sm font-semibold"
            >
              Contact
            </button>
            <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-semibold">
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-5 rounded-xl text-white">
        <h3 className="font-bold mb-2">Learning Journey</h3>
        <p className="text-3xl font-bold">12 Sessions</p>
        <p className="text-blue-100 text-sm">Total spent: ₹2,450</p>
      </div>
      
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h4 className="font-bold text-gray-800 mb-4">Recent Sessions</h4>
        <div className="space-y-3">
          {history.map((session, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{session.service}</p>
                <p className="text-gray-600 text-xs">{session.tutor} • {session.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600">{session.amount}</p>
                <div className="flex items-center space-x-1">
                  {[...Array(session.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={12} />
                  ))}
                </div>
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
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('profile')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">Student Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'dashboard', label: 'Dashboard' },
            { key: 'requests', label: 'My Requests' },
            { key: 'tutors', label: 'Find Tutors' },
            { key: 'history', label: 'History' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600'
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
        {activeTab === 'requests' && renderRequests()}
        {activeTab === 'tutors' && renderTutors()}
        {activeTab === 'history' && renderHistory()}
      </div>
    </div>
  );
};

export default StudentAdminPanel;
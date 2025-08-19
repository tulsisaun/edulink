import React from 'react';
import { Edit, Star, Shield, BookOpen, MessageCircle, Award, Settings, LogOut } from 'lucide-react';
import { Screen } from '../App';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Completed', value: '24', icon: BookOpen },
    { label: 'Rating', value: '4.8', icon: Star },
    { label: 'Reviews', value: '18', icon: MessageCircle }
  ];

  const recentPosts = [
    { title: 'Python Programming Help', type: 'offer', price: '₹200', status: 'active' },
    { title: 'Need Calculus Assignment Help', type: 'request', price: '₹150', status: 'completed' },
    { title: 'English Essay Writing Service', type: 'offer', price: '₹100', status: 'active' }
  ];

  const reviews = [
    {
      reviewer: 'Arjun K.',
      rating: 5,
      comment: 'Excellent help with mathematics! Very patient and knowledgeable.',
      date: '2 days ago'
    },
    {
      reviewer: 'Priya S.',
      rating: 5,
      comment: 'Great notes and explanation. Helped me understand complex topics easily.',
      date: '1 week ago'
    }
  ];

  return (
    <div className="h-screen bg-gray-50 pb-20 overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-400 to-teal-400 p-6 pt-16">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-purple-500">TT</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <Shield className="text-white" size={12} />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-white text-xl font-bold">Tanisha Tulsi</h1>
            <p className="text-purple-100 font-medium">B.Tech Computer Science • 3rd Year</p>
            <p className="text-purple-100 text-sm">Delhi Technological University</p>
          </div>
          <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
            <Edit className="text-white" size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/20 rounded-xl p-3 text-center">
              <stat.icon className="text-white mx-auto mb-1" size={20} />
              <p className="text-white font-bold text-xl">{stat.value}</p>
              <p className="text-purple-100 text-xs font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Verification Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Award className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-blue-800">Verified Peer Tutor</h3>
              <p className="text-blue-600 text-sm font-medium">College ID and academic records verified</p>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">My Knowledge Sharing</h2>
            <button
              onClick={() => onNavigate('upload')}
              className="text-purple-500 text-sm font-semibold"
            >
              Create New
            </button>
          </div>
          <div className="space-y-3">
            {recentPosts.map((post, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{post.title}</h3>
                  <span className="text-teal-600 font-bold text-lg">{post.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.type === 'offer' 
                        ? 'bg-teal-100 text-teal-600 font-medium' 
                        : 'bg-purple-100 text-purple-600 font-medium'
                    }`}>
                      {post.type === 'offer' ? 'Tutoring' : 'Learning'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.status === 'active'
                        ? 'bg-green-100 text-green-600 font-medium'
                        : 'bg-gray-100 text-gray-600 font-medium'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <button className="text-purple-500 text-sm font-semibold">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Peer Feedback</h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {review.reviewer.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-800">{review.reviewer}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={14} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2 font-medium">{review.comment}</p>
                <p className="text-gray-400 text-xs font-medium">{review.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <Settings className="text-gray-400" size={20} />
              <span className="text-gray-700 font-medium">Settings</span>
            </div>
          </button>
          
          <button
            onClick={() => onNavigate('payment')}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-green-500 rounded"></div>
              <span className="text-gray-700 font-medium">Wallet & Payments</span>
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <LogOut className="text-red-400" size={20} />
              <span className="text-red-600 font-medium">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
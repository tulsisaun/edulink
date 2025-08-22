import React from 'react';
import { ArrowLeft, Bell, MessageCircle, DollarSign, Star, Clock, CheckCircle } from 'lucide-react';
import { Screen } from '../App';

interface NotificationScreenProps {
  onNavigate: (screen: Screen) => void;
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ onNavigate }) => {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Kalyani M.',
      description: 'Sent you integration practice problems',
      time: '2 minutes ago',
      unread: true,
      icon: MessageCircle,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: '₹250 for Math tutoring session',
      time: '1 hour ago',
      unread: true,
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 3,
      type: 'review',
      title: 'New review received',
      description: 'Arjun K. rated you 5 stars ⭐',
      time: '3 hours ago',
      unread: false,
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Session reminder',
      description: 'Math tutoring with Tanisha T. in 30 mins',
      time: '5 hours ago',
      unread: false,
      icon: Clock,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 5,
      type: 'success',
      title: 'Session completed',
      description: 'Python programming help with Rohit K.',
      time: '1 day ago',
      unread: false,
      icon: CheckCircle,
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-4 pt-12 shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('home')}>
            <ArrowLeft className="text-gray-600" size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
          <button className="ml-auto text-purple-500 text-sm font-semibold">
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3 pb-24">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow ${
              notification.unread ? 'border-l-4 border-purple-400' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-full ${notification.color} flex items-center justify-center`}>
                <notification.icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold text-gray-800 ${notification.unread ? 'text-gray-900' : ''}`}>
                    {notification.title}
                  </h3>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{notification.description}</p>
                <p className="text-gray-400 text-xs">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationScreen;
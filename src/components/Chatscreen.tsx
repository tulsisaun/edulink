import React, { useState } from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Screen } from '../App';

interface ChatScreenProps {
  onNavigate: (screen: Screen) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onNavigate }) => {
  const [message, setMessage] = useState('');
  const [messages] = useState([
    {
      id: 1,
      sender: 'Kalyani M.',
      text: 'Hi! I saw your request for Mathematics help',
      time: '10:30 AM',
      isMe: false
    },
    {
      id: 2,
      sender: 'You',
      text: 'Hi Kalyani! Yes, I need help with calculus integration',
      time: '10:32 AM',
      isMe: true
    },
    {
      id: 3,
      sender: 'Kalyani M.',
      text: 'Perfect! I have good experience with calculus. What specific topics?',
      time: '10:33 AM',
      isMe: false
    },
    {
      id: 4,
      sender: 'You',
      text: 'Integration by parts and substitution methods',
      time: '10:35 AM',
      isMe: true
    },
    {
      id: 5,
      sender: 'Kalyani M.',
      text: 'Haan bilkul! I can help with both. When do you need this?',
      time: '10:36 AM',
      isMe: false
    },
    {
      id: 6,
      sender: 'Kalyani M.',
      text: 'Main step by step explain kar dungi with examples',
      time: '10:37 AM',
      isMe: false
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="h-screen bg-gray-50 pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 pt-12 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => onNavigate('search')}>
              <ArrowLeft className="text-gray-600" size={24} />
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">KM</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Kalyani M.</h2>
              <p className="text-sm text-green-500">Online • Typing...</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
              <Phone className="text-blue-500" size={20} />
            </button>
            <button className="p-2 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors">
              <Video className="text-purple-500" size={20} />
            </button>
            <button>
              <MoreVertical className="text-gray-400" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs ${msg.isMe ? 'order-2' : 'order-1'}`}>
              <div
                className={`p-3 rounded-2xl ${
                  msg.isMe
                    ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-br-md shadow-sm'
                    : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <p className={`text-xs text-gray-500 mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </p>
            </div>
            {!msg.isMe && (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center mr-2 order-0 flex-shrink-0">
                <span className="text-white text-xs font-bold">KM</span>
              </div>
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
            <span className="text-white text-xs font-bold">KM</span>
          </div>
          <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button type="button" className="p-2">
            <Paperclip className="text-gray-400" size={20} />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask your doubt..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button type="button" className="absolute right-3 top-3">
              <Smile className="text-gray-400" size={16} />
            </button>
          </div>
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full hover:shadow-md transition-shadow"
          >
            <Send className="text-white" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
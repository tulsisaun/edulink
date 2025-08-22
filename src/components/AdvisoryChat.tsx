import React, { useState } from 'react';
import { Send, User, Shield } from 'lucide-react';

interface Message {
  sender: 'admin' | 'student';
  text: string;
}

const AdvisoryChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'admin', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage: Message = { sender: 'student', text: input };
    setMessages([...messages, newMessage]);

    // Simulated admin reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'admin', text: 'Thanks for your query, we’ll get back to you soon!' }
      ]);
    }, 1500);

    setInput('');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl p-4 flex items-center space-x-3">
          <Shield size={28} />
          <h2 className="text-lg font-semibold">Advisory Chat</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-center max-w-xs px-4 py-2 rounded-xl text-sm shadow
                  ${msg.sender === 'student'
                    ? 'bg-indigo-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'}
                `}
              >
                {msg.sender === 'admin' && <User size={16} className="mr-2 text-gray-500" />}
                <span>{msg.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex items-center space-x-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryChat;

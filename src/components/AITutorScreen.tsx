import React, { useState } from 'react';
import { ArrowLeft, Send, Bot, Lightbulb, BookOpen, Calculator, Zap, Brain } from 'lucide-react';
import { Screen } from '../App';

interface AITutorScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  time: string;
  type?: 'text' | 'formula' | 'code' | 'explanation';
}

const AITutorScreen: React.FC<AITutorScreenProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      message: 'Hi Janhavi! I\'m your AI Study Assistant. I can help you with Mathematics, Physics, Programming, and more. What would you like to learn today? 🤖',
      time: '10:00 AM',
      type: 'text'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    { name: 'Mathematics', icon: Calculator, color: 'bg-blue-500' },
    { name: 'Physics', icon: Zap, color: 'bg-purple-500' },
    { name: 'Programming', icon: Brain, color: 'bg-green-500' },
    { name: 'Chemistry', icon: BookOpen, color: 'bg-orange-500' }
  ];

  const quickQuestions = [
    'Explain integration by parts',
    'What is Newton\'s second law?',
    'How do arrays work in Python?',
    'Solve: ∫x²dx',
    'Explain object-oriented programming',
    'What is the periodic table?'
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        {
          message: 'Great question! Let me break this down step by step for you:\n\n1. First, identify the components\n2. Apply the relevant formula\n3. Solve systematically\n\nWould you like me to show you a specific example?',
          type: 'explanation'
        },
        {
          message: 'Here\'s the mathematical solution:\n\n∫x² dx = x³/3 + C\n\nThis uses the power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C',
          type: 'formula'
        },
        {
          message: 'Here\'s a Python code example:\n\n```python\ndef calculate_area(radius):\n    return 3.14159 * radius ** 2\n\narea = calculate_area(5)\nprint(f"Area: {area}")```',
          type: 'code'
        }
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: randomResponse.message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: randomResponse.type as any
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const sendQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 pt-12">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('home')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <Bot className="text-white" size={24} />
            <div>
              <h1 className="text-xl font-bold text-white">AI Study Assistant</h1>
              <p className="text-white/80 text-sm">Powered by Advanced AI</p>
            </div>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="flex space-x-2 overflow-x-auto">
          {subjects.map((subject) => (
            <button
              key={subject.name}
              onClick={() => setSelectedSubject(subject.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedSubject === subject.name
                  ? 'bg-white text-purple-600'
                  : 'bg-white/20 text-white'
              }`}
            >
              <subject.icon size={16} />
              <span>{subject.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`p-4 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-md'
                  : 'bg-white text-gray-800 rounded-bl-md shadow-sm border'
              }`}>
                {message.type === 'formula' ? (
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                    <pre className="whitespace-pre-wrap">{message.message}</pre>
                  </div>
                ) : message.type === 'code' ? (
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                    <pre className="whitespace-pre-wrap">{message.message}</pre>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                )}
              </div>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-right text-gray-500' : 'text-left text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
            {message.sender === 'ai' && (
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-2 order-0">
                <Bot className="text-white" size={16} />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="text-white" size={16} />
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="p-4 bg-white border-t">
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">Quick Questions:</p>
          <div className="flex space-x-2 overflow-x-auto">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => sendQuickQuestion(question)}
                className="bg-purple-50 text-purple-600 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-purple-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask me anything about your studies..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <button className="absolute right-3 top-3">
              <Lightbulb className="text-gray-400" size={16} />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            <Send className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutorScreen;
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Video, VideoOff, Mic, MicOff, Phone, 
  Monitor, Users, MessageCircle, Settings, Volume2 
} from 'lucide-react';
import { Screen } from '../App';

interface VideoCallScreenProps {
  onNavigate: (screen: Screen) => void;
}

const VideoCallScreen: React.FC<VideoCallScreenProps> = ({ onNavigate }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Kalyani', message: 'Let me share my screen to show the solution', time: '10:30' },
    { sender: 'You', message: 'Perfect! I can see it clearly now', time: '10:32' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        sender: 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setChatMessage('');
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 pt-12 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={() => onNavigate('chat')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <div>
            <h1 className="text-white font-bold">Kalyani Mehta</h1>
            <p className="text-gray-300 text-sm">Mathematics Tutoring • {formatDuration(callDuration)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-gray-700 rounded-full">
            <Settings className="text-white" size={20} />
          </button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Main Video */}
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center relative">
          {isScreenSharing ? (
            <div className="w-full h-full bg-white flex items-center justify-center">
              <div className="text-center">
                <Monitor className="text-gray-400 mx-auto mb-4" size={64} />
                <h3 className="text-gray-600 font-bold text-xl mb-2">Screen Sharing Active</h3>
                <p className="text-gray-500">Kalyani is sharing her screen</p>
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-800 mb-2">Integration by Parts Formula</h4>
                  <p className="text-gray-700">∫u dv = uv - ∫v du</p>
                  <p className="text-sm text-gray-600 mt-2">Where u and v are functions of x</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-4xl font-bold">KM</span>
              </div>
              <h3 className="text-white font-bold text-xl">Kalyani Mehta</h3>
              <p className="text-white/80">Mathematics Tutor</p>
            </div>
          )}

          {/* Self Video */}
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">JS</span>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <VideoOff className="text-gray-400" size={20} />
              </div>
            )}
          </div>

          {/* Participants Count */}
          <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              <Users className="text-white" size={16} />
              <span className="text-white text-sm font-semibold">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setIsAudioOn(!isAudioOn)}
            className={`p-4 rounded-full transition-colors ${
              isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isAudioOn ? (
              <Mic className="text-white" size={20} />
            ) : (
              <MicOff className="text-white" size={20} />
            )}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-4 rounded-full transition-colors ${
              isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isVideoOn ? (
              <Video className="text-white" size={20} />
            ) : (
              <VideoOff className="text-white" size={20} />
            )}
          </button>

          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`p-4 rounded-full transition-colors ${
              isScreenSharing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Monitor className="text-white" size={20} />
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
          >
            <MessageCircle className="text-white" size={20} />
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className="p-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <Phone className="text-white" size={20} />
          </button>
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800">Chat</h3>
              <button onClick={() => setShowChat(false)}>
                <ArrowLeft className="text-gray-600" size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === 'You' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'You' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCallScreen;
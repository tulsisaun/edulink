import React, { useState } from "react";
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
} from "lucide-react";
import OpenAI from "openai";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
}

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Browser मध्ये चालवण्यासाठी
});

const ChatScreen: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Tutor",
      text: "Hi! I am your AI Tutor. Ask me anything 😊",
      time: "10:30 AM",
      isMe: false,
    },
  ]);
  const [loading, setLoading] = useState(false);

  // मेसेज पाठवण्यासाठी
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setLoading(true);

    try {
      // API कॉल
      const res = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: newMessage.text }],
      });

      const replyText = res.choices[0].message?.content || "Sorry, no answer!";

      const reply: Message = {
        id: Date.now(),
        sender: "AI Tutor",
        text: replyText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: false,
      };

      setMessages((prev) => [...prev, reply]);
    } catch (error) {
      console.error("API Error:", error);
      const errorMsg: Message = {
        id: Date.now(),
        sender: "AI Tutor",
        text: "⚠️ Sorry, something went wrong!",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: false,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 pt-12 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button>
              <ArrowLeft className="text-gray-600" size={24} />
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">AI Tutor</h2>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-blue-50 rounded-full hover:bg-blue-100">
              <Phone className="text-blue-500" size={20} />
            </button>
            <button className="p-2 bg-purple-50 rounded-full hover:bg-purple-100">
              <Video className="text-purple-500" size={20} />
            </button>
            <button>
              <MoreVertical className="text-gray-400" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-xs ${msg.isMe ? "order-2" : "order-1"}`}>
              <div
                className={`p-3 rounded-2xl ${
                  msg.isMe
                    ? "bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 rounded-bl-md border shadow-sm"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <p
                className={`text-xs text-gray-500 mt-1 ${
                  msg.isMe ? "text-right" : "text-left"
                }`}
              >
                {msg.time}
              </p>
            </div>
            {!msg.isMe && (
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center mr-2 order-0">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <p className="text-gray-500 text-sm italic">AI is typing...</p>
        )}
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 border-t">
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
              className="w-full px-4 py-3 bg-gray-100 rounded-full focus:ring-2 focus:ring-purple-400 outline-none"
            />
            <button type="button" className="absolute right-3 top-3">
              <Smile className="text-gray-400" size={16} />
            </button>
          </div>
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"
          >
            <Send className="text-white" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
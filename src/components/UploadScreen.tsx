import React, { useState } from 'react';
import { ArrowLeft, Upload, Tag, DollarSign, Clock, BookOpen } from 'lucide-react';
import { Screen } from '../App';

interface UploadScreenProps {
  onNavigate: (screen: Screen) => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onNavigate }) => {
  const [postType, setPostType] = useState<'request' | 'offer'>('request');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    budget: '',
    deadline: '',
    tags: '',
    attachments: []
  });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'Commerce', 'Biology', 'Economics'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show success message
    alert('Post created successfully! 🎉');
    // Navigate back to home
    onNavigate('home');
  };

  const fillDummyData = () => {
    if (postType === 'request') {
      setFormData({
        title: 'Need help with Calculus Integration',
        description: 'I am struggling with integration by parts and substitution methods. Need someone to explain step by step with examples. I have my exam next week.',
        subject: 'Mathematics',
        budget: '300',
        deadline: '2024-02-15T18:00',
        tags: 'calculus, integration, doubt clearing, urgent',
        attachments: []
      });
    } else {
      setFormData({
        title: 'Mathematics Tutoring - Calculus Expert',
        description: 'I am a 4th year B.Tech student from IIT Bombay. I can help with calculus, algebra, and statistics. I have 2+ years of tutoring experience.',
        subject: 'Mathematics',
        budget: '250',
        deadline: '2024-02-20T20:00',
        tags: 'math tutor, calculus, algebra, experienced',
        attachments: []
      });
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-4 pt-12 shadow-sm sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('home')}>
            <ArrowLeft className="text-gray-600" size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Share Knowledge</h1>
          <button
            onClick={fillDummyData}
            className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold"
          >
            Fill Demo
          </button>
        </div>

        {/* Post Type Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-2">
          <button
            onClick={() => setPostType('request')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
              postType === 'request'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Need Guidance
          </button>
          <button
            onClick={() => setPostType('offer')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
              postType === 'offer'
                ? 'bg-white text-teal-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Peer Tutoring
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          {postType === 'request' ? 'Get help from peer tutors' : 'Share your knowledge with others'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-5 pb-24">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {postType === 'request' ? 'What guidance do you need?' : 'What can you teach?'}
          </label>
          <input
            type="text"
            placeholder={postType === 'request' ? 'e.g., Concept clarity in Calculus' : 'e.g., Mathematics Peer Tutoring'}
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Subject Area</label>
          <select
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Details</label>
          <textarea
            placeholder={postType === 'request' 
              ? 'Describe what you need guidance on, your current level, specific doubts...' 
              : 'Describe your expertise, qualifications, teaching approach...'
            }
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none resize-none"
            required
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <DollarSign size={16} />
              <span>{postType === 'request' ? 'Budget Range' : 'Tutoring Fee'}</span>
            </div>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500">₹</span>
            <input
              type="number"
              placeholder={postType === 'request' ? '200' : '250'}
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="w-full pl-8 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none"
              min="50"
              max="5000"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Range: ₹50 - ₹5000</p>
        </div>

        {/* Deadline/Timeline */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{postType === 'request' ? 'When do you need help?' : 'When are you available?'}</span>
            </div>
          </label>
          <input
            type="datetime-local"
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
            className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Tag size={16} />
              <span>Tags</span>
            </div>
          </label>
          <input
            type="text"
            placeholder="e.g., doubt, notes, concept clarity, online session"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            className="w-full px-4 py-4 bg-white rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center space-x-2">
              <Upload size={16} />
              <span>Study Materials (optional)</span>
            </div>
          </label>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-white hover:bg-gray-50 transition-colors">
            <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-gray-500 text-sm mb-2">Upload notes, assignments, or reference materials</p>
            <button
              type="button"
              className="text-purple-500 text-sm font-semibold"
            >
              Choose Files
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
            postType === 'request'
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-xl'
              : 'bg-gradient-to-r from-teal-500 to-green-500 hover:shadow-xl'
          }`}
        >
          {postType === 'request' ? 'Request Guidance' : 'Start Peer Tutoring'}
        </button>
      </form>
    </div>
  );
};

export default UploadScreen;
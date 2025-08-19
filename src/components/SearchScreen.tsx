import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, ArrowLeft } from 'lucide-react';
import { Screen } from '../App';

interface SearchScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Math', 'Programming', 'English', 'Science', 'Commerce'];
  
  const results = [
    {
      title: 'Advanced Calculus Problem Solving',
      tutor: 'Priya Sharma',
      rating: 4.9,
      price: '₹250/hour',
      location: 'Delhi University',
      tags: ['Math', 'Engineering'],
      verified: true
    },
    {
      title: 'Java Programming Complete Notes',
      tutor: 'Rohit Kumar',
      rating: 4.8,
      price: '₹180',
      location: 'IIT Bombay',
      tags: ['Programming', 'CS'],
      verified: true
    },
    {
      title: 'English Literature Essay Help',
      tutor: 'Kavya Nair',
      rating: 4.7,
      price: '₹120/assignment',
      location: 'Mumbai University',
      tags: ['English', 'Literature'],
      verified: false
    },
    {
      title: 'Organic Chemistry Lab Reports',
      tutor: 'Ankit Gupta',
      rating: 4.6,
      price: '₹200',
      location: 'AIIMS Delhi',
      tags: ['Chemistry', 'Medical'],
      verified: true
    }
  ];

  return (
    <div className="h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 pt-12 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('home')}>
            <ArrowLeft className="text-gray-600" size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Search Services</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Find peer tutors, notes, guidance..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-purple-400 focus:outline-none"
          />
          <button className="absolute right-3 top-3">
            <Filter className="text-gray-400" size={20} />
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex space-x-2 mt-4 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 font-medium">{results.length} peer tutors found</span>
          <button className="text-purple-500 text-sm font-semibold">Sort by rating</button>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{result.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {result.tutor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{result.tutor}</span>
                    {result.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-teal-600 font-bold text-xl">{result.price}</span>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={14} />
                  <span className="text-sm font-medium text-gray-600">{result.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="text-gray-400" size={14} />
                  <span className="text-sm font-medium text-gray-600">{result.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {result.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('chat')}
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
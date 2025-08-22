import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, ArrowLeft, Zap } from 'lucide-react';
import { Screen } from '../App';

interface SearchScreenProps {
  onNavigate: (screen: Screen) => void;
  userType?: 'student' | 'tutor';
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onNavigate, userType = 'student' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Math', 'Programming', 'English', 'Science', 'Commerce'];
  
  const studyNotes = [
    {
      title: 'Complete Calculus Notes with Examples',
      tutor: 'Kalyani Mehta',
      rating: 4.9,
      price: '₹250',
      location: 'IIT Bombay',
      tags: ['Math', 'Engineering'],
      verified: true,
      description: 'Detailed notes covering integration, differentiation, limits'
    },
    {
      title: 'Data Structures & Algorithms - Complete Guide',
      tutor: 'Arjun Kumar',
      rating: 4.8,
      price: '₹300',
      location: 'DTU Delhi',
      tags: ['Programming', 'CS'],
      verified: true,
      description: 'Arrays, LinkedList, Trees, Graphs with code examples'
    },
    {
      title: 'Organic Chemistry Reaction Mechanisms',
      tutor: 'Priya Sharma',
      rating: 4.7,
      price: '₹200',
      location: 'AIIMS Delhi',
      tags: ['Chemistry', 'Medical'],
      verified: true,
      description: 'Complete reaction mechanisms with practice problems'
    },
    {
      title: 'English Literature - Poetry Analysis',
      tutor: 'Janhavi Singh',
      rating: 4.6,
      price: '₹150',
      location: 'Mumbai University',
      tags: ['English', 'Literature'],
      verified: false,
      description: 'Detailed analysis of poems with themes and techniques'
    },
    {
      title: 'Microeconomics - Supply & Demand',
      tutor: 'Rohit Gupta',
      rating: 4.8,
      price: '₹180',
      location: 'Delhi School of Economics',
      tags: ['Economics', 'Commerce'],
      verified: true,
      description: 'Market structures, elasticity, consumer behavior'
    }
  ];

  const studentRequests = [
    {
      title: 'Need help with Calculus Integration',
      student: 'Tanisha Tulsi',
      rating: 4.8,
      budget: '₹300',
      location: 'DTU Delhi',
      tags: ['Math', 'Urgent'],
      verified: true,
      description: 'Struggling with integration by parts and substitution methods'
    },
    {
      title: 'Java Programming - OOP Concepts',
      student: 'Rohit Kumar',
      rating: 4.7,
      budget: '₹250',
      location: 'NSIT Delhi',
      tags: ['Programming', 'Java'],
      verified: true,
      description: 'Need help understanding inheritance and polymorphism'
    },
    {
      title: 'English Essay Writing Guidance',
      student: 'Kavya Nair',
      rating: 4.6,
      budget: '₹150',
      location: 'DU Delhi',
      tags: ['English', 'Writing'],
      verified: false,
      description: 'Need help with essay structure and grammar'
    },
    {
      title: 'Chemistry Lab Report Help',
      student: 'Priya Sinha',
      rating: 4.5,
      budget: '₹200',
      location: 'Jamia Delhi',
      tags: ['Chemistry', 'Lab'],
      verified: true,
      description: 'Need assistance with organic chemistry lab reports'
    },
    {
      title: 'Economics Assignment Help',
      student: 'Arjun Mehta',
      rating: 4.7,
      budget: '₹180',
      location: 'LSR Delhi',
      tags: ['Economics', 'Assignment'],
      verified: true,
      description: 'Microeconomics assignment on market structures'
    }
  ];
  const groupStudyData = [
    {
      title: 'JEE Advanced Physics Group',
      members: 12,
      subject: 'Physics',
      nextSession: 'Today 6 PM',
      location: 'Online',
      description: 'Solving previous year questions together'
    },
    {
      title: 'CA Foundation Accounts Study Circle',
      members: 8,
      subject: 'Accounts',
      nextSession: 'Tomorrow 4 PM',
      location: 'CP Delhi',
      description: 'Group discussion on journal entries and ledgers'
    },
    {
      title: 'GATE CSE Preparation Group',
      members: 15,
      subject: 'Computer Science',
      nextSession: 'Sunday 10 AM',
      location: 'Online',
      description: 'Mock tests and doubt clearing sessions'
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
          <h1 className="text-xl font-bold text-gray-800">
            {userType === 'student' ? 'Find Tutors' : 'Find Students'}
          </h1>
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
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-full text-sm font-semibold whitespace-nowrap flex items-center space-x-1">
            <Zap size={14} />
            <span>AI Match</span>
          </button>
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
      <div className="p-4 pb-24">
        {userType === 'student' ? (
          /* Study Notes Section for Students */
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Available Tutors</h3>
            <span className="text-gray-600 font-medium">{studyNotes.length} notes found</span>
          </div>

          <div className="space-y-4">
            {studyNotes.map((note, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{note.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{note.description}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {note.tutor.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{note.tutor}</span>
                      {note.verified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-teal-600 font-bold text-xl">{note.price}</span>
                </div>

                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={14} />
                    <span className="text-sm font-medium text-gray-600">{note.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="text-gray-400" size={14} />
                    <span className="text-sm font-medium text-gray-600">{note.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {note.tags.map((tag, tagIndex) => (
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
        ) : (
          /* Student Requests Section for Tutors */
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Students Need Help</h3>
              <span className="text-gray-600 font-medium">{studentRequests.length} requests found</span>
            </div>

            <div className="space-y-4">
              {studentRequests.map((request, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{request.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{request.description}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {request.student.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">{request.student}</span>
                        {request.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-teal-600 font-bold text-xl">{request.budget}</span>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={14} />
                      <span className="text-sm font-medium text-gray-600">{request.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="text-gray-400" size={14} />
                      <span className="text-sm font-medium text-gray-600">{request.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {request.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-teal-50 text-teal-600 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onNavigate('chat')}
                      className="bg-teal-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors"
                    >
                      Help Student
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Group Study Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Group Study</h3>
            <span className="text-gray-600 font-medium">{groupStudyData.length} groups active</span>
          </div>

          <div className="space-y-4">
            {groupStudyData.map((group, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{group.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{group.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{group.members} members</span>
                      <span>Next: {group.nextSession}</span>
                      <span>{group.location}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                    {group.subject}
                  </span>
                </div>

                <button
                  onClick={() => onNavigate('chat')}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
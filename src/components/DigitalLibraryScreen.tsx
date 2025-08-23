import React, { useState } from 'react';
import { ArrowLeft, Search, BookOpen, Download, Eye, Star, Filter, Clock } from 'lucide-react';
import { Screen } from '../App';

interface DigitalLibraryScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  type: 'textbook' | 'notes' | 'research' | 'reference';
  pages: number;
  rating: number;
  downloads: number;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  thumbnail: string;
}

const DigitalLibraryScreen: React.FC<DigitalLibraryScreenProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Advanced Calculus - Complete Guide',
      author: 'Dr. R.K. Sharma',
      subject: 'Mathematics',
      type: 'textbook',
      pages: 450,
      rating: 4.8,
      downloads: 1250,
      uploadedBy: 'Kalyani M.',
      uploadDate: '2024-01-15',
      fileSize: '15.2 MB',
      thumbnail: '📚'
    },
    {
      id: '2',
      title: 'Data Structures & Algorithms Notes',
      author: 'Prof. Arjun Kumar',
      subject: 'Computer Science',
      type: 'notes',
      pages: 120,
      rating: 4.9,
      downloads: 890,
      uploadedBy: 'Arjun K.',
      uploadDate: '2024-01-12',
      fileSize: '8.5 MB',
      thumbnail: '💻'
    },
    {
      id: '3',
      title: 'Organic Chemistry Mechanisms',
      author: 'Dr. Priya Patel',
      subject: 'Chemistry',
      type: 'reference',
      pages: 280,
      rating: 4.7,
      downloads: 650,
      uploadedBy: 'Priya S.',
      uploadDate: '2024-01-10',
      fileSize: '12.8 MB',
      thumbnail: '🧪'
    },
    {
      id: '4',
      title: 'Machine Learning Research Papers',
      author: 'Various Authors',
      subject: 'Computer Science',
      type: 'research',
      pages: 85,
      rating: 4.6,
      downloads: 420,
      uploadedBy: 'Rohit G.',
      uploadDate: '2024-01-08',
      fileSize: '6.2 MB',
      thumbnail: '🤖'
    }
  ]);

  const filters = ['All', 'Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'English'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || book.subject === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'textbook': return 'bg-blue-100 text-blue-600';
      case 'notes': return 'bg-green-100 text-green-600';
      case 'research': return 'bg-purple-100 text-purple-600';
      case 'reference': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('home')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <BookOpen className="text-white" size={24} />
            <h1 className="text-xl font-bold text-white">Digital Library</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-white/60" size={20} />
          <input
            type="text"
            placeholder="Search books, notes, research papers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/20 rounded-xl border border-white/20 text-white placeholder-white/60 focus:bg-white/30 focus:outline-none"
          />
        </div>

        {/* Filter Tags */}
        <div className="flex space-x-2 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-white text-emerald-600'
                  : 'bg-white/20 text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <BookOpen className="text-blue-500 mx-auto mb-2" size={20} />
            <p className="text-xl font-bold text-gray-800">{books.length}</p>
            <p className="text-sm text-gray-600">Books</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <Download className="text-green-500 mx-auto mb-2" size={20} />
            <p className="text-xl font-bold text-gray-800">3.2K</p>
            <p className="text-sm text-gray-600">Downloads</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <Star className="text-yellow-500 mx-auto mb-2" size={20} />
            <p className="text-xl font-bold text-gray-800">4.8</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </div>
        </div>

        {/* Books Grid */}
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-2xl">
                  {book.thumbnail}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{book.title}</h3>
                      <p className="text-gray-600 text-sm">by {book.author}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(book.type)}`}>
                      {book.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>{book.pages} pages</span>
                    <span>{book.fileSize}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={14} />
                      <span>{book.rating}</span>
                    </div>
                    <span>{book.downloads} downloads</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <p>Uploaded by {book.uploadedBy}</p>
                      <p>{book.uploadDate}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1">
                        <Eye size={14} />
                        <span>Preview</span>
                      </button>
                      <button className="bg-green-50 text-green-600 px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1">
                        <Download size={14} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalLibraryScreen;
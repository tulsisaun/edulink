import React, { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Search, Clock, Phone, Info } from 'lucide-react';
import { Screen } from '../App';

interface CampusMapScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Location {
  id: string;
  name: string;
  type: 'academic' | 'hostel' | 'food' | 'transport' | 'admin' | 'recreation';
  description: string;
  coordinates: { x: number; y: number };
  timings?: string;
  contact?: string;
  facilities?: string[];
}

const CampusMapScreen: React.FC<CampusMapScreenProps> = ({ onNavigate }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const locations: Location[] = [
    {
      id: '1',
      name: 'Main Library',
      type: 'academic',
      description: 'Central library with 50,000+ books and digital resources',
      coordinates: { x: 40, y: 30 },
      timings: '8:00 AM - 10:00 PM',
      facilities: ['WiFi', 'AC', 'Study Rooms', 'Computer Lab']
    },
    {
      id: '2',
      name: 'Computer Science Block',
      type: 'academic',
      description: 'CS Department with labs and classrooms',
      coordinates: { x: 60, y: 40 },
      timings: '9:00 AM - 6:00 PM',
      facilities: ['Programming Labs', 'WiFi', 'Projectors']
    },
    {
      id: '3',
      name: 'Boys Hostel A',
      type: 'hostel',
      description: 'Accommodation for 200 students',
      coordinates: { x: 20, y: 60 },
      timings: '24/7',
      contact: '+91-9876543210',
      facilities: ['Mess', 'WiFi', 'Laundry', 'Common Room']
    },
    {
      id: '4',
      name: 'Central Canteen',
      type: 'food',
      description: 'Main dining facility with variety of cuisines',
      coordinates: { x: 50, y: 50 },
      timings: '7:00 AM - 10:00 PM',
      facilities: ['North Indian', 'South Indian', 'Chinese', 'Snacks']
    },
    {
      id: '5',
      name: 'Bus Stop',
      type: 'transport',
      description: 'Main campus bus stop',
      coordinates: { x: 80, y: 20 },
      timings: '6:00 AM - 11:00 PM',
      facilities: ['DTC Bus', 'Metro Feeder', 'Auto Stand']
    },
    {
      id: '6',
      name: 'Sports Complex',
      type: 'recreation',
      description: 'Indoor and outdoor sports facilities',
      coordinates: { x: 30, y: 80 },
      timings: '6:00 AM - 9:00 PM',
      facilities: ['Gym', 'Basketball', 'Cricket', 'Badminton']
    }
  ];

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-500';
      case 'hostel': return 'bg-green-500';
      case 'food': return 'bg-orange-500';
      case 'transport': return 'bg-purple-500';
      case 'admin': return 'bg-red-500';
      case 'recreation': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || location.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('home')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <MapPin className="text-white" size={24} />
            <h1 className="text-xl font-bold text-white">Campus Map</h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-white/60" size={20} />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/20 rounded-xl border border-white/20 text-white placeholder-white/60 focus:bg-white/30 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'all', label: 'All' },
            { key: 'academic', label: 'Academic' },
            { key: 'hostel', label: 'Hostels' },
            { key: 'food', label: 'Food' },
            { key: 'transport', label: 'Transport' },
            { key: 'recreation', label: 'Sports' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeFilter === filter.key
                  ? 'bg-white text-teal-600'
                  : 'bg-white/20 text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-green-100">
        {/* Interactive Campus Map */}
        <div className="w-full h-64 relative bg-gradient-to-br from-green-200 to-blue-200 overflow-hidden">
          <div className="absolute inset-0 bg-green-300 opacity-30"></div>
          
          {/* Campus Buildings */}
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className={`absolute w-4 h-4 ${getLocationColor(location.type)} rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform`}
              style={{
                left: `${location.coordinates.x}%`,
                top: `${location.coordinates.y}%`
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {location.name}
              </div>
            </button>
          ))}

          {/* Campus Roads */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-400 opacity-50"></div>
          <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-400 opacity-50"></div>
        </div>

        {/* Location Details */}
        {selectedLocation && (
          <div className="bg-white p-5 rounded-t-xl shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${getLocationColor(selectedLocation.type)} rounded-full flex items-center justify-center`}>
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{selectedLocation.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{selectedLocation.type}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-700 text-sm mb-4">{selectedLocation.description}</p>
            
            {selectedLocation.timings && (
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="text-gray-500" size={16} />
                <span className="text-sm text-gray-600">{selectedLocation.timings}</span>
              </div>
            )}
            
            {selectedLocation.contact && (
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="text-gray-500" size={16} />
                <span className="text-sm text-gray-600">{selectedLocation.contact}</span>
              </div>
            )}
            
            {selectedLocation.facilities && (
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">Facilities:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.facilities.map((facility, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center space-x-1">
                <Navigation size={14} />
                <span>Get Directions</span>
              </button>
              <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-semibold flex items-center justify-center space-x-1">
                <Info size={14} />
                <span>More Info</span>
              </button>
            </div>
          </div>
        )}

        {/* Location List */}
        {!selectedLocation && (
          <div className="p-4 space-y-3">
            <h3 className="font-bold text-gray-800">Campus Locations</h3>
            {filteredLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${getLocationColor(location.type)} rounded-full flex items-center justify-center`}>
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{location.name}</h4>
                    <p className="text-sm text-gray-600">{location.description}</p>
                    <p className="text-xs text-gray-500 capitalize">{location.type}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusMapScreen;
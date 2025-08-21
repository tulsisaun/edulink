import React from 'react';
import { ArrowLeft, Star, MapPin, BookOpen, Clock } from 'lucide-react';
import type { User, Service } from '../App';

interface TutorListScreenProps {
  tutors: User[];
  services: Service[];
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

const TutorListScreen: React.FC<TutorListScreenProps> = ({ tutors, services, onNavigate, onBack }) => {
  const getTutorServices = (tutorId: string) => {
    return services.filter(service => service.tutor.id === tutorId);
  };

  const getTutorStats = (tutorId: string) => {
    const tutorServices = getTutorServices(tutorId);
    const totalReviews = tutorServices.reduce((sum, service) => sum + service.reviews, 0);
    const avgRating = tutorServices.length > 0 
      ? tutorServices.reduce((sum, service) => sum + service.rating, 0) / tutorServices.length 
      : 0;
    
    return { totalReviews, avgRating, servicesCount: tutorServices.length };
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Find Tutors</h1>
            <p className="text-sm text-gray-600">{tutors.length} expert tutors available</p>
          </div>
        </div>
      </div>

      {/* Tutors List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {tutors.map((tutor) => {
            const stats = getTutorStats(tutor.id);
            const tutorServices = getTutorServices(tutor.id);
            
            return (
              <div
                key={tutor.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  // Navigate to tutor's first service or create a tutor profile view
                  if (tutorServices.length > 0) {
                    onNavigate('service-detail', tutorServices[0]);
                  }
                }}
              >
                {/* Tutor Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {tutor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{tutor.name}</h3>
                      {tutor.verified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {tutor.college}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{stats.avgRating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({stats.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <BookOpen className="w-4 h-4" />
                        {stats.servicesCount} services
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Preview */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Available Services:</h4>
                  {tutorServices.slice(0, 2).map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{service.title}</h5>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <span>{service.category}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.deliveryTime}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-teal-600">₹{service.price}</div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {tutorServices.length > 2 && (
                    <div className="text-center">
                      <span className="text-sm text-teal-600 font-medium">
                        +{tutorServices.length - 2} more services
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('chat', tutor);
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Chat Now
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (tutorServices.length > 0) {
                        onNavigate('service-detail', tutorServices[0]);
                      }
                    }}
                    className="flex-1 bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                  >
                    View Services
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TutorListScreen;
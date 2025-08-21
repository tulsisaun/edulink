import React from 'react';
import { ArrowLeft, Star, Clock, MessageCircle, Shield, Award, Users } from 'lucide-react';
import { Service, User } from '../App';

interface ServiceDetailScreenProps {
  service: Service | null;
  onChatStart: (partner: User, service?: Service) => void;
  onBack: () => void;
}

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  service,
  onChatStart,
  onBack
}) => {
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Service not found</p>
      </div>
    );
  }

  const sampleReviews = [
    {
      id: '1',
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Amazing notes! Very detailed and easy to understand. Helped me score 95% in my exam.',
      date: '2 days ago'
    },
    {
      id: '2',
      name: 'Rahul Verma',
      rating: 4,
      comment: 'Good quality content. Delivery was on time. Recommended!',
      date: '1 week ago'
    },
    {
      id: '3',
      name: 'Sneha Patel',
      rating: 5,
      comment: 'Best tutor on the platform! Very patient and explains concepts clearly.',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center p-4">
          <button
            onClick={onBack}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Service Details</h1>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* Service Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h2>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm text-white font-semibold">
                    {service.tutor.avatar}
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">{service.tutor.name}</span>
                    {service.tutor.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center ml-2">
                        <span className="text-xs text-white">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{service.tutor.college}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-600">₹{service.price}</div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={14} className="mr-1" />
                {service.deliveryTime}
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{service.description}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
              <span className="font-semibold">{service.rating}</span>
              <span className="text-gray-600 ml-1">({service.reviews} reviews)</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users size={14} className="mr-1" />
              <span>{service.reviews + 15} students helped</span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <Shield size={16} className="mr-2 text-green-500" />
              Quality Guaranteed
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Award size={16} className="mr-2 text-purple-500" />
              Expert Tutor
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-2 text-blue-500" />
              On-time Delivery
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MessageCircle size={16} className="mr-2 text-teal-500" />
              24/7 Support
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => onChatStart(service.tutor, service)}
              className="flex-1 bg-gradient-to-r from-purple-400 to-teal-400 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              <MessageCircle size={18} className="inline mr-2" />
              Chat with Tutor
            </button>
            <button className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors">
              Book Service
            </button>
          </div>
        </div>

        {/* Tutor's Other Services */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">More from {service.tutor.name}</h3>
          <div className="space-y-3">
            {service.tutor.subjects?.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{subject} Help</p>
                  <p className="text-sm text-gray-600">Expert guidance available</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-teal-600">₹{200 + index * 50}</p>
                  <p className="text-xs text-gray-500">per session</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Reviews</h3>
          <div className="space-y-4">
            {sampleReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm text-white font-semibold">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{review.name}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailScreen;
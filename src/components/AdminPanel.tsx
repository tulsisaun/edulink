import React from 'react';
import { Users, Settings, Bell, Shield } from 'lucide-react';

interface AdminPanelProps {
  onNavigate: (screen: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and monitor the platform</p>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => onNavigate('student-admin')}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border hover:shadow-lg transition"
          >
            <Users size={36} className="text-blue-600 mb-3" />
            <span className="font-semibold text-gray-700">Manage Students</span>
          </button>

          <button
            onClick={() => onNavigate('tutor-admin')}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border hover:shadow-lg transition"
          >
            <Users size={36} className="text-green-600 mb-3" />
            <span className="font-semibold text-gray-700">Manage Tutors</span>
          </button>

          <button
            onClick={() => onNavigate('notifications')}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border hover:shadow-lg transition"
          >
            <Bell size={36} className="text-yellow-600 mb-3" />
            <span className="font-semibold text-gray-700">Notifications</span>
          </button>

          <button
            onClick={() => onNavigate('super-admin')}
            className="flex flex-col items-center p-6 bg-gray-50 rounded-xl border hover:shadow-lg transition"
          >
            <Settings size={36} className="text-purple-600 mb-3" />
            <span className="font-semibold text-gray-700">System Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

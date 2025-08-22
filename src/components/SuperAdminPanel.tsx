import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Users, Settings, Database, Shield, BarChart3, 
  FileText, Download, Upload, Trash2, Edit, Eye, Plus,
  Activity, AlertTriangle, CheckCircle, XCircle, Clock,
  Search, Filter, Mail, Phone, MapPin, Calendar
} from 'lucide-react';
import { Screen } from '../App';
import { dbOperations } from '../lib/database';

interface SuperAdminPanelProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const SuperAdminPanel: React.FC<SuperAdminPanelProps> = ({ onNavigate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'content' | 'system' | 'analytics' | 'security' | 'backup'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in production, this would come from your database
  const [systemStats, setSystemStats] = useState({
    totalUsers: 1247,
    activeUsers: 89,
    totalPosts: 456,
    totalMessages: 2341,
    systemUptime: '99.9%',
    storageUsed: '2.4 GB',
    lastBackup: '2 hours ago'
  });

  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Janhavi Sharma',
      email: 'janhavi.sharma@dtu.ac.in',
      college: 'DTU Delhi',
      userType: 'student',
      status: 'active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      posts: 5,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Kalyani Mehta',
      email: 'kalyani@iitb.ac.in',
      college: 'IIT Bombay',
      userType: 'tutor',
      status: 'active',
      joinDate: '2024-01-10',
      lastActive: '1 hour ago',
      posts: 12,
      rating: 4.9
    },
    {
      id: '3',
      name: 'Arjun Kumar',
      email: 'arjun@nsit.ac.in',
      college: 'NSIT Delhi',
      userType: 'student',
      status: 'blocked',
      joinDate: '2024-01-20',
      lastActive: '1 day ago',
      posts: 2,
      rating: 3.5
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: '1',
      title: 'Mathematics Assignment Help',
      author: 'Kalyani Mehta',
      type: 'offer',
      status: 'active',
      views: 45,
      responses: 8,
      created: '2024-01-22',
      category: 'Mathematics'
    },
    {
      id: '2',
      title: 'Need Python Programming Help',
      author: 'Janhavi Sharma',
      type: 'request',
      status: 'active',
      views: 23,
      responses: 5,
      created: '2024-01-21',
      category: 'Programming'
    }
  ]);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{systemStats.totalUsers}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Activity className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{systemStats.activeUsers}</p>
              <p className="text-sm text-gray-600">Active Now</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{systemStats.totalPosts}</p>
              <p className="text-sm text-gray-600">Total Posts</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <BarChart3 className="text-orange-600" size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{systemStats.systemUptime}</p>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('users')}
            className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Users className="text-blue-600 mx-auto mb-2" size={24} />
            <p className="text-sm font-semibold text-blue-700">Manage Users</p>
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
          >
            <FileText className="text-purple-600 mx-auto mb-2" size={24} />
            <p className="text-sm font-semibold text-purple-700">Content Management</p>
          </button>
          <button 
            onClick={() => setActiveTab('system')}
            className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <Settings className="text-green-600 mx-auto mb-2" size={24} />
            <p className="text-sm font-semibold text-green-700">System Settings</p>
          </button>
          <button 
            onClick={() => setActiveTab('backup')}
            className="p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
          >
            <Download className="text-orange-600 mx-auto mb-2" size={24} />
            <p className="text-sm font-semibold text-orange-700">Backup & Restore</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Recent System Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New user registration', user: 'Priya Sharma', time: '5 minutes ago', type: 'success' },
            { action: 'Post reported', user: 'Anonymous', time: '15 minutes ago', type: 'warning' },
            { action: 'System backup completed', user: 'System', time: '2 hours ago', type: 'info' },
            { action: 'User blocked', user: 'Admin', time: '3 hours ago', type: 'error' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'success' ? 'bg-green-100' :
                activity.type === 'warning' ? 'bg-yellow-100' :
                activity.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                {activity.type === 'success' ? <CheckCircle className="text-green-600" size={16} /> :
                 activity.type === 'warning' ? <AlertTriangle className="text-yellow-600" size={16} /> :
                 activity.type === 'error' ? <XCircle className="text-red-600" size={16} /> :
                 <Activity className="text-blue-600" size={16} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold">
              <Plus size={16} className="inline mr-1" />
              Add User
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-semibold">
              <Filter size={16} className="inline mr-1" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">User Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Activity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.college}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.userType === 'tutor' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {user.userType}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-gray-600">{user.lastActive}</p>
                    <p className="text-xs text-gray-500">{user.posts} posts • {user.rating}★</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {/* Content Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-gray-800">456</p>
          <p className="text-sm text-gray-600">Total Posts</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-gray-800">89</p>
          <p className="text-sm text-gray-600">Active Posts</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-gray-800">23</p>
          <p className="text-sm text-gray-600">Reported</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-gray-800">12</p>
          <p className="text-sm text-gray-600">Pending Review</p>
        </div>
      </div>

      {/* Content Management */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Content Management</h3>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold">
            <Plus size={16} className="inline mr-1" />
            Create Post
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{post.title}</h4>
                    <p className="text-sm text-gray-600">by {post.author}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      post.type === 'offer' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {post.type}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      post.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {post.views} views • {post.responses} responses • {post.created}
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystem = () => (
    <div className="space-y-6">
      {/* System Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">System Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
            <input
              type="text"
              defaultValue="EduLink"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
            <input
              type="email"
              defaultValue="admin@edulink.com"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Max File Size (MB)</label>
            <input
              type="number"
              defaultValue="10"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold">
            Save Settings
          </button>
        </div>
      </div>

      {/* Database Management */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Database Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <Database className="text-blue-600 mb-2" size={24} />
            <h4 className="font-semibold text-blue-800">Database Size</h4>
            <p className="text-blue-600">{systemStats.storageUsed}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <CheckCircle className="text-green-600 mb-2" size={24} />
            <h4 className="font-semibold text-green-800">Last Backup</h4>
            <p className="text-green-600">{systemStats.lastBackup}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Activity className="text-purple-600 mb-2" size={24} />
            <h4 className="font-semibold text-purple-800">Uptime</h4>
            <p className="text-purple-600">{systemStats.systemUptime}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-gray-800">2,341</p>
          <p className="text-sm text-gray-600">Total Messages</p>
          <p className="text-xs text-green-600">+12% this week</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-gray-800">89</p>
          <p className="text-sm text-gray-600">Active Sessions</p>
          <p className="text-xs text-blue-600">+5% today</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-gray-800">4.8</p>
          <p className="text-sm text-gray-600">Avg Rating</p>
          <p className="text-xs text-purple-600">+0.2 this month</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-gray-800">156</p>
          <p className="text-sm text-gray-600">New Users</p>
          <p className="text-xs text-orange-600">+23% this month</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">User Activity Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="text-gray-400 mx-auto mb-2" size={48} />
            <p className="text-gray-500">Analytics charts would be displayed here</p>
            <p className="text-sm text-gray-400">Integration with Chart.js or similar library</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Security Status */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Security Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <CheckCircle className="text-green-600 mb-2" size={24} />
            <h4 className="font-semibold text-green-800">SSL Certificate</h4>
            <p className="text-green-600">Valid & Active</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <Shield className="text-green-600 mb-2" size={24} />
            <h4 className="font-semibold text-green-800">Firewall</h4>
            <p className="text-green-600">Protected</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="text-yellow-600 mb-2" size={24} />
            <h4 className="font-semibold text-yellow-800">Failed Logins</h4>
            <p className="text-yellow-600">3 attempts today</p>
          </div>
        </div>
      </div>

      {/* Access Logs */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Recent Access Logs</h3>
        <div className="space-y-3">
          {[
            { user: 'admin', action: 'Login successful', ip: '192.168.1.100', time: '2 minutes ago', status: 'success' },
            { user: 'unknown', action: 'Failed login attempt', ip: '203.45.67.89', time: '15 minutes ago', status: 'error' },
            { user: 'admin', action: 'User blocked', ip: '192.168.1.100', time: '1 hour ago', status: 'warning' },
            { user: 'admin', action: 'Settings updated', ip: '192.168.1.100', time: '2 hours ago', status: 'info' }
          ].map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  log.status === 'success' ? 'bg-green-100' :
                  log.status === 'error' ? 'bg-red-100' :
                  log.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {log.status === 'success' ? <CheckCircle className="text-green-600" size={16} /> :
                   log.status === 'error' ? <XCircle className="text-red-600" size={16} /> :
                   log.status === 'warning' ? <AlertTriangle className="text-yellow-600" size={16} /> :
                   <Activity className="text-blue-600" size={16} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{log.action}</p>
                  <p className="text-xs text-gray-600">{log.user} • {log.ip}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBackup = () => (
    <div className="space-y-6">
      {/* Backup Status */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Backup & Restore</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Automatic Backups</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold text-green-800">Daily Backup</p>
                  <p className="text-sm text-green-600">Last: 2 hours ago</p>
                </div>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-semibold text-blue-800">Weekly Backup</p>
                  <p className="text-sm text-blue-600">Last: 2 days ago</p>
                </div>
                <CheckCircle className="text-blue-600" size={20} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Manual Actions</h4>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center space-x-2">
                <Download size={16} />
                <span>Create Backup Now</span>
              </button>
              <button className="w-full p-3 bg-green-500 text-white rounded-lg font-semibold flex items-center justify-center space-x-2">
                <Upload size={16} />
                <span>Restore from Backup</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Backup History</h3>
        <div className="space-y-3">
          {[
            { name: 'daily_backup_2024_01_22.sql', size: '2.4 MB', date: '2024-01-22 02:00', type: 'auto' },
            { name: 'weekly_backup_2024_01_21.sql', size: '15.2 MB', date: '2024-01-21 03:00', type: 'auto' },
            { name: 'manual_backup_2024_01_20.sql', size: '14.8 MB', date: '2024-01-20 14:30', type: 'manual' },
            { name: 'daily_backup_2024_01_19.sql', size: '2.3 MB', date: '2024-01-19 02:00', type: 'auto' }
          ].map((backup, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="text-gray-400" size={20} />
                <div>
                  <p className="font-semibold text-gray-800">{backup.name}</p>
                  <p className="text-sm text-gray-600">{backup.size} • {backup.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  backup.type === 'auto' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                }`}>
                  {backup.type}
                </span>
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => onNavigate('login')}>
              <ArrowLeft className="text-white" size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <Shield className="text-white" size={24} />
              <h1 className="text-xl font-bold text-white">Super Admin Panel</h1>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { key: 'users', label: 'Users', icon: Users },
            { key: 'content', label: 'Content', icon: FileText },
            { key: 'system', label: 'System', icon: Settings },
            { key: 'analytics', label: 'Analytics', icon: Activity },
            { key: 'security', label: 'Security', icon: Shield },
            { key: 'backup', label: 'Backup', icon: Download }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-red-600'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'content' && renderContent()}
        {activeTab === 'system' && renderSystem()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'backup' && renderBackup()}
      </div>
    </div>
  );
};

export default SuperAdminPanel;
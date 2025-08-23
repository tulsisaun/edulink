import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Plus, Clock, BookOpen, AlertCircle, CheckCircle, Target } from 'lucide-react';
import { Screen } from '../App';

interface StudyPlannerScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Task {
  id: string;
  title: string;
  subject: string;
  type: 'assignment' | 'exam' | 'study' | 'project';
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  description?: string;
}

const StudyPlannerScreen: React.FC<StudyPlannerScreenProps> = ({ onNavigate }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Calculus Assignment - Integration',
      subject: 'Mathematics',
      type: 'assignment',
      deadline: '2024-01-25T23:59',
      priority: 'high',
      completed: false,
      description: 'Complete problems 1-15 from Chapter 7'
    },
    {
      id: '2',
      title: 'Data Structures Mid-term',
      subject: 'Computer Science',
      type: 'exam',
      deadline: '2024-01-28T10:00',
      priority: 'high',
      completed: false,
      description: 'Arrays, LinkedList, Stacks, Queues'
    },
    {
      id: '3',
      title: 'Python Project - Web Scraper',
      subject: 'Programming',
      type: 'project',
      deadline: '2024-01-30T17:00',
      priority: 'medium',
      completed: false,
      description: 'Build a web scraper using BeautifulSoup'
    }
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    subject: '',
    type: 'assignment',
    priority: 'medium',
    deadline: '',
    description: ''
  });

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.title && newTask.subject && newTask.deadline) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title!,
        subject: newTask.subject!,
        type: newTask.type as Task['type'],
        deadline: newTask.deadline!,
        priority: newTask.priority as Task['priority'],
        completed: false,
        description: newTask.description
      };
      setTasks(prev => [...prev, task]);
      setNewTask({
        title: '',
        subject: '',
        type: 'assignment',
        priority: 'medium',
        deadline: '',
        description: ''
      });
      setShowAddTask(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-yellow-100 text-yellow-600';
      case 'low': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return BookOpen;
      case 'exam': return AlertCircle;
      case 'study': return Target;
      case 'project': return Calendar;
      default: return BookOpen;
    }
  };

  const upcomingTasks = tasks.filter(task => !task.completed).sort((a, b) => 
    new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="text-white" size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <Calendar className="text-white" size={24} />
              <h1 className="text-xl font-bold text-white">Study Planner</h1>
            </div>
          </div>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            <Plus size={16} className="inline mr-1" />
            Add Task
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-white text-2xl font-bold">{upcomingTasks.length}</p>
            <p className="text-white/80 text-sm">Pending</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-white text-2xl font-bold">{completedTasks.length}</p>
            <p className="text-white/80 text-sm">Completed</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <p className="text-white text-2xl font-bold">
              {Math.round((completedTasks.length / tasks.length) * 100) || 0}%
            </p>
            <p className="text-white/80 text-sm">Progress</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 space-y-6">
        {/* Upcoming Tasks */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            {upcomingTasks.map((task) => {
              const TypeIcon = getTypeIcon(task.type);
              const isUrgent = new Date(task.deadline).getTime() - Date.now() < 24 * 60 * 60 * 1000;
              
              return (
                <div key={task.id} className={`bg-white p-4 rounded-xl shadow-sm border-l-4 ${
                  isUrgent ? 'border-red-400' : 'border-blue-400'
                }`}>
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center mt-1"
                    >
                      {task.completed && <CheckCircle className="text-green-500" size={16} />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <TypeIcon className="text-gray-600" size={16} />
                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{task.subject}</p>
                      {task.description && (
                        <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                        <span>{new Date(task.deadline).toLocaleTimeString()}</span>
                        {isUrgent && <span className="text-red-500 font-semibold">⚠️ Urgent</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Completed Tasks</h2>
            <div className="space-y-3">
              {completedTasks.map((task) => {
                const TypeIcon = getTypeIcon(task.type);
                
                return (
                  <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm opacity-75">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="text-green-500 mt-1" size={20} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <TypeIcon className="text-gray-400" size={16} />
                          <h3 className="font-semibold text-gray-600 line-through">{task.title}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{task.subject}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Task</h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-400 focus:outline-none"
              />
              
              <input
                type="text"
                placeholder="Subject"
                value={newTask.subject}
                onChange={(e) => setNewTask(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-400 focus:outline-none"
              />
              
              <select
                value={newTask.type}
                onChange={(e) => setNewTask(prev => ({ ...prev, type: e.target.value as Task['type'] }))}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-400 focus:outline-none"
              >
                <option value="assignment">Assignment</option>
                <option value="exam">Exam</option>
                <option value="study">Study Session</option>
                <option value="project">Project</option>
              </select>
              
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-400 focus:outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              
              <input
                type="datetime-local"
                value={newTask.deadline}
                onChange={(e) => setNewTask(prev => ({ ...prev, deadline: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-400 focus:outline-none"
              />
              
              <textarea
                placeholder="Description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-purple-400 focus:outline-none resize-none"
              />
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="flex-1 bg-purple-500 text-white py-3 rounded-lg font-semibold"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlannerScreen;
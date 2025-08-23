import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Plus, Target, Award } from 'lucide-react';
import { Screen } from '../App';

interface GradeTrackerScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Grade {
  id: string;
  subject: string;
  examType: string;
  marks: number;
  totalMarks: number;
  date: string;
  semester: string;
}

const GradeTrackerScreen: React.FC<GradeTrackerScreenProps> = ({ onNavigate }) => {
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: '1',
      subject: 'Mathematics',
      examType: 'Mid-term',
      marks: 85,
      totalMarks: 100,
      date: '2024-01-15',
      semester: 'Semester 5'
    },
    {
      id: '2',
      subject: 'Data Structures',
      examType: 'Assignment',
      marks: 92,
      totalMarks: 100,
      date: '2024-01-12',
      semester: 'Semester 5'
    },
    {
      id: '3',
      subject: 'Computer Networks',
      examType: 'Quiz',
      marks: 78,
      totalMarks: 100,
      date: '2024-01-10',
      semester: 'Semester 5'
    },
    {
      id: '4',
      subject: 'Database Systems',
      examType: 'Project',
      marks: 88,
      totalMarks: 100,
      date: '2024-01-08',
      semester: 'Semester 5'
    }
  ]);

  const [showAddGrade, setShowAddGrade] = useState(false);

  const calculateGPA = () => {
    const totalPercentage = grades.reduce((sum, grade) => sum + (grade.marks / grade.totalMarks) * 100, 0);
    return (totalPercentage / grades.length / 10).toFixed(2);
  };

  const getSubjectAverage = (subject: string) => {
    const subjectGrades = grades.filter(g => g.subject === subject);
    const total = subjectGrades.reduce((sum, grade) => sum + (grade.marks / grade.totalMarks) * 100, 0);
    return (total / subjectGrades.length).toFixed(1);
  };

  const subjects = [...new Set(grades.map(g => g.subject))];

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft className="text-white" size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <BarChart3 className="text-white" size={24} />
              <h1 className="text-xl font-bold text-white">Grade Tracker</h1>
            </div>
          </div>
          <button
            onClick={() => setShowAddGrade(true)}
            className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            <Plus size={16} className="inline mr-1" />
            Add Grade
          </button>
        </div>

        {/* GPA Card */}
        <div className="bg-white/20 backdrop-blur rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Current GPA</p>
              <p className="text-white text-3xl font-bold">{calculateGPA()}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Award className="text-white" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 space-y-6">
        {/* Subject Performance */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Subject Performance</h3>
          <div className="space-y-3">
            {subjects.map((subject) => {
              const average = parseFloat(getSubjectAverage(subject));
              const isGood = average >= 80;
              
              return (
                <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isGood ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      {isGood ? (
                        <TrendingUp className="text-green-600" size={20} />
                      ) : (
                        <TrendingDown className="text-yellow-600" size={20} />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{subject}</h4>
                      <p className="text-sm text-gray-600">
                        {grades.filter(g => g.subject === subject).length} assessments
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${isGood ? 'text-green-600' : 'text-yellow-600'}`}>
                      {average}%
                    </p>
                    <p className="text-xs text-gray-500">Average</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Grades */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Recent Grades</h3>
          <div className="space-y-3">
            {grades.slice().reverse().map((grade) => {
              const percentage = (grade.marks / grade.totalMarks) * 100;
              const gradeColor = percentage >= 90 ? 'text-green-600' :
                               percentage >= 80 ? 'text-blue-600' :
                               percentage >= 70 ? 'text-yellow-600' : 'text-red-600';
              
              return (
                <div key={grade.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{grade.subject}</h4>
                    <p className="text-sm text-gray-600">{grade.examType}</p>
                    <p className="text-xs text-gray-500">{grade.date} • {grade.semester}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${gradeColor}`}>
                      {grade.marks}/{grade.totalMarks}
                    </p>
                    <p className={`text-sm font-semibold ${gradeColor}`}>
                      {percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Performance Insights</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="text-green-600" size={16} />
                <span className="font-semibold text-green-800">Strongest Subject</span>
              </div>
              <p className="text-green-700 text-sm">Data Structures - 92% average</p>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Target className="text-yellow-600" size={16} />
                <span className="font-semibold text-yellow-800">Needs Improvement</span>
              </div>
              <p className="text-yellow-700 text-sm">Computer Networks - Focus on practical concepts</p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Award className="text-blue-600" size={16} />
                <span className="font-semibold text-blue-800">Goal Progress</span>
              </div>
              <p className="text-blue-700 text-sm">On track for 8.5+ GPA this semester</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeTrackerScreen;
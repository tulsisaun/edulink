import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';
import { Screen } from '../App';

interface MockTestScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}

interface TestResult {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  subject: string;
  date: string;
}

const MockTestScreen: React.FC<MockTestScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'tests' | 'practice' | 'results'>('tests');
  const [currentTest, setCurrentTest] = useState<Question[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      score: 85,
      totalQuestions: 20,
      timeTaken: 25,
      subject: 'Mathematics',
      date: '2024-01-20'
    },
    {
      score: 92,
      totalQuestions: 15,
      timeTaken: 18,
      subject: 'Physics',
      date: '2024-01-18'
    }
  ]);

  const mockQuestions: Question[] = [
    {
      id: '1',
      question: 'What is the derivative of x²?',
      options: ['2x', 'x', '2', 'x²'],
      correctAnswer: 0,
      explanation: 'The derivative of x² is 2x using the power rule.',
      subject: 'Mathematics'
    },
    {
      id: '2',
      question: 'Which data structure follows LIFO principle?',
      options: ['Queue', 'Stack', 'Array', 'LinkedList'],
      correctAnswer: 1,
      explanation: 'Stack follows Last In First Out (LIFO) principle.',
      subject: 'Computer Science'
    },
    {
      id: '3',
      question: 'What is the unit of force?',
      options: ['Joule', 'Newton', 'Watt', 'Pascal'],
      correctAnswer: 1,
      explanation: 'Newton is the SI unit of force.',
      subject: 'Physics'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (testStarted && timeLeft > 0 && !testCompleted) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && testStarted) {
      completeTest();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, testStarted, testCompleted]);

  const startTest = (subject: string, duration: number) => {
    setCurrentTest(mockQuestions.filter(q => q.subject === subject));
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(duration * 60);
    setTestStarted(true);
    setTestCompleted(false);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < (currentTest?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeTest();
    }
  };

  const completeTest = () => {
    if (!currentTest) return;
    
    const score = selectedAnswers.reduce((correct, answer, index) => {
      return answer === currentTest[index]?.correctAnswer ? correct + 1 : correct;
    }, 0);

    const result: TestResult = {
      score: Math.round((score / currentTest.length) * 100),
      totalQuestions: currentTest.length,
      timeTaken: Math.round((30 * 60 - timeLeft) / 60),
      subject: currentTest[0]?.subject || 'Mixed',
      date: new Date().toISOString().split('T')[0]
    };

    setTestResults(prev => [result, ...prev]);
    setTestCompleted(true);
    setTestStarted(false);
  };

  const resetTest = () => {
    setCurrentTest(null);
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (testStarted && currentTest) {
    const currentQuestion = currentTest[currentQuestionIndex];
    
    return (
      <div className="h-screen bg-gray-50 flex flex-col">
        {/* Test Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 pt-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button onClick={resetTest}>
                <ArrowLeft className="text-white" size={24} />
              </button>
              <h1 className="text-xl font-bold text-white">Mock Test</h1>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="text-white" size={16} />
                <span className="text-white font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80 text-sm">Progress</span>
              <span className="text-white font-semibold">
                {currentQuestionIndex + 1} / {currentTest.length}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / currentTest.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 p-4">
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Question {currentQuestionIndex + 1}
            </h2>
            <p className="text-gray-700 mb-6">{currentQuestion.question}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-purple-400 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-purple-400 bg-purple-400'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-700">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestionIndex] === undefined}
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === currentTest.length - 1 ? 'Complete Test' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  const renderTests = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { subject: 'Mathematics', questions: 20, duration: 30, difficulty: 'Medium' },
          { subject: 'Physics', questions: 15, duration: 25, difficulty: 'Hard' },
          { subject: 'Computer Science', questions: 25, duration: 40, difficulty: 'Medium' },
          { subject: 'Chemistry', questions: 18, duration: 30, difficulty: 'Easy' }
        ].map((test, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                <Target className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{test.subject}</h3>
                <p className="text-sm text-gray-600">{test.difficulty} Level</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Questions:</span>
                <span className="font-semibold">{test.questions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{test.duration} minutes</span>
              </div>
            </div>
            
            <button
              onClick={() => startTest(test.subject, test.duration)}
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
            >
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Test History</h3>
        <div className="space-y-3">
          {testResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  result.score >= 80 ? 'bg-green-100' : 
                  result.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <Trophy className={`${
                    result.score >= 80 ? 'text-green-600' : 
                    result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`} size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{result.subject}</h4>
                  <p className="text-sm text-gray-600">
                    {result.date} • {result.timeTaken} minutes
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xl font-bold ${
                  result.score >= 80 ? 'text-green-600' : 
                  result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {result.score}%
                </p>
                <p className="text-sm text-gray-600">
                  {Math.round(result.score * result.totalQuestions / 100)}/{result.totalQuestions}
                </p>
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
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('home')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <Target className="text-white" size={24} />
            <h1 className="text-xl font-bold text-white">Mock Tests</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'tests', label: 'Available Tests' },
            { key: 'practice', label: 'Practice Mode' },
            { key: 'results', label: 'My Results' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-purple-600'
                  : 'bg-white/20 text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {activeTab === 'tests' && renderTests()}
        {activeTab === 'practice' && renderTests()}
        {activeTab === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default MockTestScreen;
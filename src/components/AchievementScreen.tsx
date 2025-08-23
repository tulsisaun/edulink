import React, { useState } from 'react';
import { ArrowLeft, Trophy, Star, Target, Zap, Award, Crown, Medal, Gift } from 'lucide-react';
import { Screen } from '../App';

interface AchievementScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedDate?: string;
  points: number;
}

const AchievementScreen: React.FC<AchievementScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard' | 'challenges'>('achievements');
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first study session',
      icon: Target,
      color: 'bg-blue-500',
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      unlockedDate: '2024-01-15',
      points: 50
    },
    {
      id: '2',
      title: 'Study Streak',
      description: 'Study for 7 consecutive days',
      icon: Zap,
      color: 'bg-yellow-500',
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      unlockedDate: '2024-01-20',
      points: 200
    },
    {
      id: '3',
      title: 'Helping Hand',
      description: 'Help 10 fellow students',
      icon: Award,
      color: 'bg-green-500',
      progress: 8,
      maxProgress: 10,
      unlocked: false,
      points: 300
    },
    {
      id: '4',
      title: 'Math Master',
      description: 'Score 90+ in 5 math tests',
      icon: Crown,
      color: 'bg-purple-500',
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      points: 500
    },
    {
      id: '5',
      title: 'Social Butterfly',
      description: 'Join 5 study groups',
      icon: Medal,
      color: 'bg-pink-500',
      progress: 2,
      maxProgress: 5,
      unlocked: false,
      points: 250
    }
  ]);

  const [userPoints, setUserPoints] = useState(1250);
  const [userRank, setUserRank] = useState(15);

  const leaderboard = [
    { rank: 1, name: 'Arjun Kumar', points: 2850, college: 'IIT Delhi', avatar: 'AK' },
    { rank: 2, name: 'Priya Sharma', points: 2640, college: 'DTU', avatar: 'PS' },
    { rank: 3, name: 'Rohit Gupta', points: 2420, college: 'NSIT', avatar: 'RG' },
    { rank: 4, name: 'Kavya Nair', points: 2180, college: 'DU', avatar: 'KN' },
    { rank: 5, name: 'Vikram Singh', points: 1950, college: 'Jamia', avatar: 'VS' },
    { rank: 15, name: 'Janhavi Sharma', points: userPoints, college: 'DTU', avatar: 'JS' }
  ];

  const challenges = [
    {
      id: '1',
      title: 'Weekly Math Challenge',
      description: 'Solve 20 calculus problems this week',
      progress: 12,
      maxProgress: 20,
      timeLeft: '3 days',
      reward: '500 points',
      difficulty: 'Medium'
    },
    {
      id: '2',
      title: 'Study Group Leader',
      description: 'Create and lead a study group session',
      progress: 0,
      maxProgress: 1,
      timeLeft: '5 days',
      reward: '300 points',
      difficulty: 'Easy'
    },
    {
      id: '3',
      title: 'Knowledge Sharer',
      description: 'Upload 5 helpful study notes',
      progress: 2,
      maxProgress: 5,
      timeLeft: '1 week',
      reward: '400 points',
      difficulty: 'Medium'
    }
  ];

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* Points Summary */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-5 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm font-medium">Total Points</p>
            <p className="text-white text-3xl font-bold">{userPoints.toLocaleString()}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Trophy className="text-white" size={24} />
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-800">Your Achievements</h3>
        <div className="grid grid-cols-1 gap-4">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
            
            return (
              <div key={achievement.id} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${
                achievement.unlocked ? 'border-green-400' : 'border-gray-200'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center ${
                    !achievement.unlocked ? 'opacity-50' : ''
                  }`}>
                    <IconComponent className="text-white" size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={16} />
                        <span className="text-sm font-semibold text-gray-600">{achievement.points}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                    
                    {achievement.unlocked ? (
                      <div className="flex items-center space-x-2">
                        <Trophy className="text-green-500" size={16} />
                        <span className="text-green-600 font-semibold text-sm">
                          Unlocked on {achievement.unlockedDate}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-semibold text-gray-800">
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 rounded-full h-2 transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Top Performers</h3>
        <div className="space-y-3">
          {leaderboard.map((user) => (
            <div key={user.rank} className={`flex items-center space-x-4 p-3 rounded-lg ${
              user.name === 'Janhavi Sharma' ? 'bg-purple-50 border border-purple-200' : 'bg-gray-50'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                user.rank === 1 ? 'bg-yellow-400 text-white' :
                user.rank === 2 ? 'bg-gray-400 text-white' :
                user.rank === 3 ? 'bg-orange-400 text-white' :
                'bg-blue-400 text-white'
              }`}>
                {user.rank}
              </div>
              
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{user.avatar}</span>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.college}</p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-purple-600">{user.points.toLocaleString()}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Active Challenges</h3>
        <div className="space-y-4">
          {challenges.map((challenge) => {
            const progressPercentage = (challenge.progress / challenge.maxProgress) * 100;
            
            return (
              <div key={challenge.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{challenge.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ {challenge.timeLeft} left</span>
                      <span>🎁 {challenge.reward}</span>
                      <span className={`px-2 py-1 rounded-full font-semibold ${
                        challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-800">
                      {challenge.progress}/{challenge.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <button className="w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                  Continue Challenge
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 pt-12 sticky top-0 z-10">
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => onNavigate('home')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <Trophy className="text-white" size={24} />
            <h1 className="text-xl font-bold text-white">Achievements</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'achievements', label: 'Badges' },
            { key: 'leaderboard', label: 'Leaderboard' },
            { key: 'challenges', label: 'Challenges' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-orange-600'
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
        {activeTab === 'achievements' && renderAchievements()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'challenges' && renderChallenges()}
      </div>
    </div>
  );
};

export default AchievementScreen;
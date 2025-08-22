import React, { useState } from 'react';
import { ArrowLeft, Wallet, CreditCard, Smartphone, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Screen } from '../App';

interface PaymentScreenProps {
  onNavigate: (screen: Screen) => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'transactions'>('wallet');
  
  const balance = 1250;
  
  const transactions = [
    {
      type: 'received',
      amount: 200,
      description: 'Mathematics tutoring payment',
      from: 'Arjun K.',
      date: '2 hours ago',
      id: 'TXN001'
    },
    {
      type: 'sent',
      amount: 150,
      description: 'English essay help',
      to: 'Kavya N.',
      date: '1 day ago',
      id: 'TXN002'
    },
    {
      type: 'received',
      amount: 300,
      description: 'Python programming notes',
      from: 'Priya S.',
      date: '3 days ago',
      id: 'TXN003'
    },
    {
      type: 'sent',
      amount: 100,
      description: 'Chemistry lab report help',
      to: 'Rohit M.',
      date: '5 days ago',
      id: 'TXN004'
    }
  ];

  return (
    <div className="h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 pt-12">
        <div className="flex items-center space-x-3 mb-6">
          <button onClick={() => onNavigate('profile')}>
            <ArrowLeft className="text-white" size={24} />
          </button>
          <h1 className="text-xl font-bold text-white">EduWallet</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm font-medium">Available Balance</p>
              <h2 className="text-white text-4xl font-bold">₹{balance.toLocaleString()}</h2>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <Wallet className="text-white" size={24} />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-white text-green-600 py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
              <Plus size={16} />
              <span>Add Money</span>
            </button>
            <button className="flex-1 bg-white/20 text-white py-3 px-4 rounded-lg font-semibold hover:bg-white/30 transition-colors">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 pt-4">
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'wallet'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            UPI & Cards
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'transactions'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            History
          </button>
        </div>
      </div>

      <div className="px-4 pb-4">
        {activeTab === 'wallet' ? (
          /* Payment Methods */
          <div className="space-y-5">
            {/* UPI */}
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="text-orange-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">UPI Payment</h3>
                  <p className="text-sm text-gray-600 font-medium">tanisha@paytm</p>
                </div>
                <div className="text-green-500 text-sm font-bold">Connected</div>
              </div>
            </div>

            {/* Credit Card */}
            <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="text-blue-500" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">Debit Card</h3>
                  <p className="text-sm text-gray-600 font-medium">•••• •••• •••• 4567</p>
                </div>
                <div className="text-green-500 text-sm font-bold">Active</div>
              </div>
            </div>

            {/* Add Payment Method */}
            <button className="w-full bg-white p-5 rounded-xl shadow-sm border-2 border-dashed border-gray-200 flex items-center justify-center space-x-2 text-gray-500 hover:border-purple-300 hover:text-purple-500 transition-colors">
              <Plus size={20} />
              <span className="font-semibold">Add Payment Method</span>
            </button>

            {/* Quick Actions */}
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-blue-50 p-5 rounded-xl flex flex-col items-center space-y-3 hover:bg-blue-100 transition-colors">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-white" size={20} />
                  </div>
                  <span className="text-sm font-bold text-blue-700">Request Payment</span>
                </button>
                <button className="bg-purple-50 p-5 rounded-xl flex flex-col items-center space-y-3 hover:bg-purple-100 transition-colors">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <CreditCard className="text-white" size={20} />
                  </div>
                  <span className="text-sm font-bold text-purple-700">Pay Peer Tutor</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Transactions */
          <div className="space-y-5">
            {transactions.map((transaction, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.type === 'received' 
                      ? 'bg-green-100' 
                      : 'bg-red-100'
                  }`}>
                    {transaction.type === 'received' ? (
                      <TrendingDown className="text-green-500" size={20} />
                    ) : (
                      <TrendingUp className="text-red-500" size={20} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{transaction.description}</h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {transaction.type === 'received' 
                        ? `From ${transaction.from}` 
                        : `To ${transaction.to}`
                      } • {transaction.date}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      transaction.type === 'received' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'received' ? '+' : '-'}₹{transaction.amount}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">{transaction.id}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center py-4">
              <button className="text-blue-500 font-bold">View All Transactions</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
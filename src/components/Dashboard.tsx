import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, AlertTriangle, Download, RefreshCw, Settings } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import ThemeToggle from './ThemeToggle';
import DataVisualization from './DataVisualization';
import AIInsights from './AIInsights';
import StudentTable from './StudentTable';
import PDFExport from './PDFExport';
import APIKeyModal from './APIKeyModal';
import { analyzeData } from '../utils/dataAnalysis';

interface DashboardProps {
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onReset }) => {
  const { data, analysis, setAnalysis } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAPIModal, setShowAPIModal] = useState(false);

  useEffect(() => {
    if (data.length > 0 && !analysis) {
      const analysisResult = analyzeData(data);
      setAnalysis(analysisResult);
    }
  }, [data, analysis, setAnalysis]);

  const getStatsCards = () => {
    if (!analysis) return [];

    return [
      {
        title: 'Total Students',
        value: analysis.totalStudents,
        icon: Users,
        color: 'blue',
        change: '+12%'
      },
      {
        title: 'Average Performance',
        value: `${analysis.averagePerformance}%`,
        icon: TrendingUp,
        color: 'green',
        change: '+5.2%'
      },
      {
        title: 'At Risk Students',
        value: analysis.atRiskStudents,
        icon: AlertTriangle,
        color: 'red',
        change: '-3%'
      },
      {
        title: 'Skill Coverage',
        value: `${analysis.skillCoverage}%`,
        icon: BarChart3,
        color: 'purple',
        change: '+8.1%'
      }
    ];
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'insights', label: 'AI Insights', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded"></div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                Student Data Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAPIModal(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>AI Settings</span>
              </button>
              <PDFExport />
              <button
                onClick={onReset}
                className="flex items-center space-x-2 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Data</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getStatsCards().map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && <DataVisualization />}
            {activeTab === 'students' && <StudentTable />}
            {activeTab === 'insights' && <AIInsights />}
          </div>
        </div>
      </div>

      {showAPIModal && (
        <APIKeyModal onClose={() => setShowAPIModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DataVisualization: React.FC = () => {
  const { data, analysis } = useData();
  const { isDark } = useTheme();

  if (!analysis || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#e2e8f0' : '#334155',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
        },
        grid: {
          color: isDark ? '#374151' : '#e2e8f0',
        },
      },
      y: {
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b',
        },
        grid: {
          color: isDark ? '#374151' : '#e2e8f0',
        },
      },
    },
  };

  const performanceData = {
    labels: analysis.performanceDistribution.labels,
    datasets: [
      {
        label: 'Number of Students',
        data: analysis.performanceDistribution.data,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const trendData = {
    labels: analysis.performanceTrend.labels,
    datasets: [
      {
        label: 'Average Score',
        data: analysis.performanceTrend.data,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const riskData = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [
      {
        data: analysis.riskDistribution,
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Distribution */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Performance Distribution
          </h3>
          <div className="h-64">
            <Bar data={performanceData} options={chartOptions} />
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Risk Assessment
          </h3>
          <div className="h-64">
            <Doughnut data={riskData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Performance Trend */}
      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          Performance Trend Analysis
        </h3>
        <div className="h-64">
          <Line data={trendData} options={chartOptions} />
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Top Performers</h4>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            {analysis.topPerformers}% of students are excelling above average
          </p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Needs Attention</h4>
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            {analysis.needsAttention}% require additional support
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Improvement Rate</h4>
          <p className="text-sm text-green-600 dark:text-green-400">
            {analysis.improvementRate}% showing positive trends
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
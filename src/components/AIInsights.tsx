import React, { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, BookOpen, Award, Target, Lightbulb, Volume2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const AIInsights: React.FC = () => {
  const { data, analysis, apiKeys } = useData();
  const [advancedInsights, setAdvancedInsights] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);

  const generateAdvancedInsights = async () => {
    if (!apiKeys.openai) {
      alert('Please configure your OpenAI API key in AI Settings');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call - replace with actual OpenAI integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAdvancedInsights({
        personalizedFeedback: [
          "Focus on improving mathematical reasoning skills through advanced problem-solving exercises",
          "Strengthen communication skills with presentation opportunities and peer collaboration",
          "Develop critical thinking through case study analysis and research projects"
        ],
        careerGuidance: {
          recommendedPaths: ["Data Science", "Software Engineering", "Digital Marketing"],
          certifications: ["Google Analytics", "AWS Cloud Practitioner", "Microsoft Azure Fundamentals"],
          skillGaps: ["Python Programming", "Statistical Analysis", "Project Management"]
        },
        learningPlan: {
          immediate: ["Complete Python basics course", "Practice SQL queries daily"],
          shortTerm: ["Build portfolio projects", "Join coding bootcamp"],
          longTerm: ["Pursue advanced degree in Computer Science", "Gain industry certifications"]
        }
      });
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const narateInsights = async () => {
    if (!apiKeys.cohere) {
      alert('Please configure your Cohere API key for voice narration');
      return;
    }

    setIsNarrating(true);
    try {
      // Simulate voice narration - replace with actual Cohere integration
      const insight = `Based on the analysis of ${analysis?.totalStudents || 0} students, here are the key insights: 
      The average performance is ${analysis?.averagePerformance || 0}%, with ${analysis?.atRiskStudents || 0} students requiring additional attention. 
      Most students show strong potential in core subjects but need improvement in critical thinking and practical application.`;
      
      // Use Web Speech API for demonstration
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(insight);
        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 1;
        speechSynthesis.speak(utterance);
      }
      
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Error with voice narration:', error);
    } finally {
      setIsNarrating(false);
    }
  };

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick AI Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">Performance Analysis</h3>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Based on the data patterns, {analysis.performanceInsight || "students show mixed performance levels with clear improvement opportunities in specific areas."}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-green-800 dark:text-green-300">Growth Prediction</h3>
          </div>
          <p className="text-sm text-green-700 dark:text-green-400">
            Students are projected to improve by 15-20% with targeted interventions in identified weak areas.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-purple-800 dark:text-purple-300">Skill Mapping</h3>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            Core competencies identified with specific recommendations for skill development pathways.
          </p>
        </div>
      </div>

      {/* Risk Assessment Detail */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Risk Assessment & Recommendations</h3>
          </div>
          <button
            onClick={narateInsights}
            disabled={isNarrating}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isNarrating ? 'Narrating...' : 'Voice Summary'}</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-red-600 dark:text-red-400 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              High Risk ({analysis.riskDistribution[2] || 0} students)
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Immediate tutoring support needed</li>
              <li>• One-on-one counseling sessions</li>
              <li>• Frequent progress monitoring</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-yellow-600 dark:text-yellow-400 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Medium Risk ({analysis.riskDistribution[1] || 0} students)
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Group study sessions</li>
              <li>• Additional practice materials</li>
              <li>• Peer mentoring programs</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-green-600 dark:text-green-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Low Risk ({analysis.riskDistribution[0] || 0} students)
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Advanced learning opportunities</li>
              <li>• Leadership roles in group projects</li>
              <li>• Mentoring other students</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced AI Insights */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Advanced AI Analysis</h3>
          </div>
          <button
            onClick={generateAdvancedInsights}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-colors"
          >
            <Brain className="w-4 h-4" />
            <span>{isLoading ? 'Analyzing...' : 'Generate Insights'}</span>
          </button>
        </div>

        {!advancedInsights && !isLoading && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              Unlock detailed AI-powered insights with your OpenAI API key
            </p>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Personalized learning recommendations</li>
              <li>• Career pathway suggestions</li>
              <li>• Skill gap analysis</li>
              <li>• Resume building tips</li>
            </ul>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mr-3"></div>
            <p className="text-slate-600 dark:text-slate-400">AI is analyzing your data...</p>
          </div>
        )}

        {advancedInsights && (
          <div className="space-y-6">
            {/* Career Guidance */}
            <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Award className="w-5 h-5 text-blue-500" />
                <h4 className="font-medium text-slate-800 dark:text-white">Career Guidance</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Recommended Paths</h5>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    {advancedInsights.careerGuidance.recommendedPaths.map((path: string, idx: number) => (
                      <li key={idx}>• {path}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Certifications</h5>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    {advancedInsights.careerGuidance.certifications.map((cert: string, idx: number) => (
                      <li key={idx}>• {cert}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Skill Gaps</h5>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    {advancedInsights.careerGuidance.skillGaps.map((skill: string, idx: number) => (
                      <li key={idx}>• {skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Learning Plan */}
            <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="w-5 h-5 text-green-500" />
                <h4 className="font-medium text-slate-800 dark:text-white">Personalized Learning Plan</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Immediate (1-2 weeks)</h5>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    {advancedInsights.learningPlan.immediate.map((item: string, idx: number) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Short Term (1-3 months)</h5>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    {advancedInsights.learningPlan.shortTerm.map((item: string, idx: number) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Long Term (6-12 months)</h5>
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                    {advancedInsights.learningPlan.longTerm.map((item: string, idx: number) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
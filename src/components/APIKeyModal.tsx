import React, { useState } from 'react';
import { X, Key, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface APIKeyModalProps {
  onClose: () => void;
}

const APIKeyModal: React.FC<APIKeyModalProps> = ({ onClose }) => {
  const { apiKeys, setApiKeys } = useData();
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showCohere, setShowCohere] = useState(false);
  const [tempKeys, setTempKeys] = useState(apiKeys);

  const handleSave = () => {
    setApiKeys(tempKeys);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <Key className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">AI Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* OpenAI API Key */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showOpenAI ? 'text' : 'password'}
                value={tempKeys.openai}
                onChange={(e) => setTempKeys({ ...tempKeys, openai: e.target.value })}
                placeholder="sk-..."
                className="w-full px-3 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowOpenAI(!showOpenAI)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showOpenAI ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Required for advanced AI analysis and personalized recommendations
            </p>
          </div>

          {/* Cohere API Key */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Cohere API Key
            </label>
            <div className="relative">
              <input
                type={showCohere ? 'text' : 'password'}
                value={tempKeys.cohere}
                onChange={(e) => setTempKeys({ ...tempKeys, cohere: e.target.value })}
                placeholder="Enter Cohere API key..."
                className="w-full px-3 py-2 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCohere(!showCohere)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCohere ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Required for AI voice narration and advanced language processing
            </p>
          </div>

          {/* Security Notice */}
          <div className="flex items-start space-x-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-800 dark:text-amber-300 font-medium mb-1">Security Notice</p>
              <p className="text-amber-700 dark:text-amber-400">
                API keys are stored locally in your browser and never sent to our servers. You can remove them at any time.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Keys
          </button>
        </div>
      </div>
    </div>
  );
};

export default APIKeyModal;
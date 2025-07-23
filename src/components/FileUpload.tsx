import React, { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Papa from 'papaparse';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface FileUploadProps {
  onDataLoaded: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { setData } = useData();
  const { isDark } = useTheme();

  const processFile = useCallback((file: File) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setError('Error parsing CSV file. Please check the format.');
          } else {
            setData(results.data as any[]);
            setSuccess(true);
            setTimeout(() => {
              onDataLoaded();
            }, 1500);
          }
          setIsLoading(false);
        },
        error: () => {
          setError('Failed to parse CSV file');
          setIsLoading(false);
        }
      });
    } else {
      setError('Please upload a CSV file. PDF support coming soon!');
      setIsLoading(false);
    }
  }, [setData, onDataLoaded]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            AI Student Data Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Upload your student data and get powerful AI-driven insights
          </p>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
          } ${isLoading ? 'pointer-events-none opacity-70' : 'hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />

          <div className="space-y-4">
            {isLoading ? (
              <div className="animate-spin mx-auto w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            ) : success ? (
              <CheckCircle className="mx-auto w-16 h-16 text-green-500" />
            ) : (
              <Upload className="mx-auto w-16 h-16 text-slate-400" />
            )}

            <div>
              {isLoading ? (
                <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                  Processing your data...
                </p>
              ) : success ? (
                <p className="text-lg font-medium text-green-600 dark:text-green-400">
                  Data uploaded successfully! Redirecting...
                </p>
              ) : (
                <>
                  <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Drop your CSV file here or click to browse
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Supports attendance, marks, skills, and any student data format
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <FileText className="w-8 h-8 text-blue-500 mb-3" />
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Flexible Format</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Upload any CSV format - our AI adapts to your data structure
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded mb-3"></div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">AI Analysis</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Get intelligent insights, risk assessment, and recommendations
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded mb-3"></div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Export Reports</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Generate professional PDF reports with visualizations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
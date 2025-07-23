import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import { ThemeProvider } from './contexts/ThemeContext';
import { DataProvider } from './contexts/DataContext';
import './App.css';

function App() {
  const [hasData, setHasData] = useState(false);

  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors">
          {!hasData ? (
            <FileUpload onDataLoaded={() => setHasData(true)} />
          ) : (
            <Dashboard onReset={() => setHasData(false)} />
          )}
        </div>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
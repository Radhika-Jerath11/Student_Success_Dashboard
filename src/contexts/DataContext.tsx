import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface StudentData {
  [key: string]: any;
}

interface DataContextType {
  data: StudentData[];
  setData: (data: StudentData[]) => void;
  analysis: any;
  setAnalysis: (analysis: any) => void;
  apiKeys: {
    openai: string;
    cohere: string;
  };
  setApiKeys: (keys: { openai: string; cohere: string }) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StudentData[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [apiKeys, setApiKeys] = useState({ openai: '', cohere: '' });

  return (
    <DataContext.Provider value={{
      data,
      setData,
      analysis,
      setAnalysis,
      apiKeys,
      setApiKeys
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
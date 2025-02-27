
import React, { createContext, useState, useContext, useEffect } from 'react';

export type AddictionType = 'smoking' | 'drinking' | 'both' | null;

interface AddictionContextType {
  addiction: AddictionType;
  startDate: Date | null;
  setAddiction: (type: AddictionType) => void;
  resetProgress: () => void;
  daysSince: number;
  percentComplete: number;
  goalDays: number;
  setGoalDays: (days: number) => void;
}

const AddictionContext = createContext<AddictionContextType | undefined>(undefined);

export const AddictionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addiction, setAddiction] = useState<AddictionType>(() => {
    const saved = localStorage.getItem('addiction');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const saved = localStorage.getItem('startDate');
    return saved ? new Date(JSON.parse(saved)) : null;
  });
  
  const [goalDays, setGoalDays] = useState<number>(() => {
    const saved = localStorage.getItem('goalDays');
    return saved ? JSON.parse(saved) : 30;
  });

  useEffect(() => {
    if (addiction) {
      localStorage.setItem('addiction', JSON.stringify(addiction));
    } else {
      localStorage.removeItem('addiction');
    }
  }, [addiction]);

  useEffect(() => {
    if (startDate) {
      localStorage.setItem('startDate', JSON.stringify(startDate.toISOString()));
    } else {
      localStorage.removeItem('startDate');
    }
  }, [startDate]);
  
  useEffect(() => {
    localStorage.setItem('goalDays', JSON.stringify(goalDays));
  }, [goalDays]);

  const handleSetAddiction = (type: AddictionType) => {
    setAddiction(type);
    if (!startDate) {
      setStartDate(new Date());
    }
  };

  const resetProgress = () => {
    setStartDate(new Date());
  };

  // Calculate days since quitting
  const daysSince = startDate 
    ? Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;
    
  const percentComplete = startDate 
    ? Math.min(100, Math.round((daysSince / goalDays) * 100)) 
    : 0;

  return (
    <AddictionContext.Provider 
      value={{ 
        addiction, 
        startDate, 
        setAddiction: handleSetAddiction, 
        resetProgress,
        daysSince,
        percentComplete,
        goalDays,
        setGoalDays
      }}>
      {children}
    </AddictionContext.Provider>
  );
};

export const useAddiction = () => {
  const context = useContext(AddictionContext);
  if (context === undefined) {
    throw new Error('useAddiction must be used within an AddictionProvider');
  }
  return context;
};

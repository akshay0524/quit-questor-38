
import React, { createContext, useState, useContext, useEffect } from 'react';

export type AddictionType = 'smoking' | 'drinking' | 'both' | null;

interface AddictionContextType {
  addiction: AddictionType;
  startDate: Date | null;
  setAddiction: (type: AddictionType) => void;
  resetProgress: () => void;
  daysSince: number;
  percentComplete: number;
  checkAddictionToday: (occurred: boolean) => void;
  hasAddictionToday: boolean;
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
  
  const [hasAddictionToday, setHasAddictionToday] = useState<boolean>(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`addiction_${today}`);
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Update the addiction status for today when the component mounts
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`addiction_${today}`);
    setHasAddictionToday(saved ? JSON.parse(saved) : false);
    
    // Check at midnight for a new day
    const checkNewDay = () => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const saved = localStorage.getItem(`addiction_${today}`);
      setHasAddictionToday(saved ? JSON.parse(saved) : false);
    };
    
    // Set up an interval to check for a new day
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - new Date().getTime();
    
    const timerId = setTimeout(() => {
      checkNewDay();
      // Then set it to check every 24 hours
      setInterval(checkNewDay, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
    
    return () => {
      clearTimeout(timerId);
    };
  }, []);

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

  const handleSetAddiction = (type: AddictionType) => {
    setAddiction(type);
    if (!startDate) {
      setStartDate(new Date());
    }
  };

  const resetProgress = () => {
    setStartDate(new Date());
  };

  const checkAddictionToday = (occurred: boolean) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`addiction_${today}`, JSON.stringify(occurred));
    setHasAddictionToday(occurred);
    
    if (occurred) {
      // Reset the streak since addiction occurred today
      resetProgress();
    }
  };

  // Calculate days since quitting (streak)
  const daysSince = startDate 
    ? Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) 
    : 0;
    
  // Calculate percent for visual purposes (100% = 30 days, just for visualization)
  const percentComplete = startDate 
    ? Math.min(100, Math.round((daysSince / 30) * 100)) 
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
        checkAddictionToday,
        hasAddictionToday
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

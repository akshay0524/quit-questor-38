
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
  checkedToday: boolean;
  markNonAddictionForToday: () => void;
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

  const [checkedToday, setCheckedToday] = useState<boolean>(() => {
    const today = new Date().toISOString().split('T')[0];
    return !!localStorage.getItem(`checked_${today}`);
  });

  useEffect(() => {
    // Update addiction status and check status for today on component mount
    const today = new Date().toISOString().split('T')[0];
    const savedAddiction = localStorage.getItem(`addiction_${today}`);
    const savedChecked = localStorage.getItem(`checked_${today}`);
    
    setHasAddictionToday(savedAddiction ? JSON.parse(savedAddiction) : false);
    setCheckedToday(!!savedChecked);
    
    // Check at midnight for a new day
    const checkNewDay = () => {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const savedAddiction = localStorage.getItem(`addiction_${today}`);
      const savedChecked = localStorage.getItem(`checked_${today}`);
      
      setHasAddictionToday(savedAddiction ? JSON.parse(savedAddiction) : false);
      setCheckedToday(!!savedChecked);
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
    if (checkedToday) return; // Can only check once per day
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`addiction_${today}`, JSON.stringify(occurred));
    localStorage.setItem(`checked_${today}`, 'true');
    
    setHasAddictionToday(occurred);
    setCheckedToday(true);
    
    if (occurred) {
      // Reset the streak since addiction occurred today
      resetProgress();
    }
  };

  const markNonAddictionForToday = () => {
    if (checkedToday) return; // Can only check once per day
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`addiction_${today}`, JSON.stringify(false));
    localStorage.setItem(`checked_${today}`, 'true');
    
    setHasAddictionToday(false);
    setCheckedToday(true);
    
    // If they haven't started a streak yet, start one now
    if (!startDate) {
      setStartDate(new Date());
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
        hasAddictionToday,
        checkedToday,
        markNonAddictionForToday
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

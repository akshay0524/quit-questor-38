
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAddiction } from '@/context/AddictionContext';

interface ProgressBarProps {
  label?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  label, 
  showPercentage = true
}) => {
  const { percentComplete, addiction, daysSince } = useAddiction();
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  // Get the color based on addiction type
  const getProgressColor = () => {
    switch(addiction) {
      case 'smoking':
        return 'bg-progress-smoking';
      case 'drinking':
        return 'bg-progress-drinking';
      case 'both':
        return 'bg-progress-both';
      default:
        return 'bg-primary';
    }
  };

  // Calculate minimum width to ensure visibility even for day 1
  const getProgressWidth = () => {
    // Show at least 3% progress even on day 1
    const minWidth = 3;
    if (daysSince === 0) return 0;
    // Maximum width is 100%
    return Math.min(100, Math.max(minWidth, percentComplete));
  };

  useEffect(() => {
    setIsVisible(true);
    
    controls.start({
      width: `${getProgressWidth()}%`,
      transition: { 
        duration: 1.5, 
        ease: [0.34, 1.56, 0.64, 1] 
      }
    });
  }, [percentComplete, daysSince, controls]);

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">{label}</span>
          {showPercentage ? (
            <span className="text-sm font-medium">{percentComplete}%</span>
          ) : (
            <span className="text-sm font-medium">{daysSince} days</span>
          )}
        </div>
      )}
      
      <div className="progress-container bg-gray-100 dark:bg-gray-800">
        <motion.div
          className={`${getProgressColor()} h-full relative`}
          initial={{ width: "0%" }}
          animate={controls}
        >
          {/* Shine effect overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          transform -skew-x-20 animate-[shine_2s_infinite]" />
          </div>
          
          {/* Progress reflection */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 opacity-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;

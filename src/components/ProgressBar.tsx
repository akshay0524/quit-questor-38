
import React, { useEffect, useState, useMemo } from 'react';
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
  const controls = useAnimation();

  // Get the color based on addiction type - memoized to prevent recalculation
  const progressColor = useMemo(() => {
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
  }, [addiction]);

  // Calculate minimum width to ensure visibility even for day 1
  const progressWidth = useMemo(() => {
    // Show at least 3% progress even on day 1
    const minWidth = 3;
    if (daysSince === 0) return 0;
    // Maximum width is 100%
    return Math.min(100, Math.max(minWidth, percentComplete));
  }, [daysSince, percentComplete]);

  useEffect(() => {
    // Faster animation duration (1s instead of 1.5s)
    controls.start({
      width: `${progressWidth}%`,
      transition: { 
        duration: 1, 
        ease: [0.34, 1.56, 0.64, 1] 
      }
    });
  }, [progressWidth, controls]);

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
          className={`${progressColor} h-full relative`}
          initial={{ width: "0%" }}
          animate={controls}
        >
          {/* Simplified shine effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          transform -skew-x-20 animate-[shine_2s_infinite]" />
          </div>
          
          <div className="absolute inset-x-0 top-0 h-1/2 bg-white/20 opacity-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProgressBar from '@/components/ProgressBar';
import ProgressCard from '@/components/ProgressCard';
import MotivationalQuote from '@/components/MotivationalQuote';
import { useAddiction } from '@/context/AddictionContext';
import { ArrowLeft } from "lucide-react";

const Progress = () => {
  const { addiction, daysSince } = useAddiction();
  const navigate = useNavigate();
  
  // Redirect to home if no addiction selected
  useEffect(() => {
    if (!addiction) {
      navigate('/');
    }
  }, [addiction, navigate]);

  // Get title based on addiction type
  const getTitle = () => {
    switch(addiction) {
      case 'smoking':
        return 'Quit Smoking';
      case 'drinking':
        return 'Quit Drinking';
      case 'both':
        return 'Quit Smoking & Drinking';
      default:
        return 'Recovery';
    }
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to selection</span>
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold tracking-tight mb-2">{getTitle()}</h1>
          <p className="text-muted-foreground">
            Your daily streak tracker
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <ProgressBar 
            label="Current streak" 
            showPercentage={false} 
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ProgressCard />
          </div>
          <div className="md:col-span-1">
            <MotivationalQuote />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 bg-muted/50 p-6 rounded-lg"
        >
          <h2 className="text-xl font-medium mb-4">Health Benefits</h2>
          <div className="space-y-2">
            {(addiction === 'smoking' || addiction === 'both') && (
              <>
                <p className={`${daysSince >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <span className="font-medium">After 1 day:</span> Your blood pressure begins to drop
                </p>
                <p className={`${daysSince >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <span className="font-medium">After 2 days:</span> Your sense of taste and smell improves
                </p>
                <p className={`${daysSince >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <span className="font-medium">After 3 days:</span> Breathing becomes easier as bronchial tubes relax
                </p>
              </>
            )}
            
            {(addiction === 'drinking' || addiction === 'both') && (
              <>
                <p className={`${daysSince >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <span className="font-medium">After 1 day:</span> Your body begins to detoxify
                </p>
                <p className={`${daysSince >= 5 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <span className="font-medium">After 5 days:</span> Improved hydration and sleep quality
                </p>
                <p className={`${daysSince >= 7 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <span className="font-medium">After 1 week:</span> Better mental clarity and focus
                </p>
              </>
            )}
            
            <p className={`${daysSince >= 14 ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span className="font-medium">After 2 weeks:</span> Energy levels increase
            </p>
            <p className={`${daysSince >= 30 ? 'text-foreground' : 'text-muted-foreground'}`}>
              <span className="font-medium">After 1 month:</span> Significant improvement in overall health
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;

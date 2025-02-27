
import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import AddictionSelector from '@/components/AddictionSelector';
import { useAddiction } from '@/context/AddictionContext';

const Index = () => {
  const { addiction } = useAddiction();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // If addiction is already set, redirect to progress page
    if (addiction) {
      navigate('/progress');
    }
  }, [addiction, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-2">Recovery Tracker</h1>
        <p className="text-xl text-muted-foreground">Track your journey to freedom</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full"
      >
        <AddictionSelector />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <p className="text-muted-foreground mb-4">Already tracking your progress?</p>
        <Button 
          variant="outline" 
          onClick={() => addiction ? navigate('/progress') : null}
          disabled={!addiction}
        >
          View My Progress
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;

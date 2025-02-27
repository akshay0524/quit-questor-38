
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cigarette, Beer } from "lucide-react";
import { useAddiction, AddictionType } from '@/context/AddictionContext';
import { motion } from "framer-motion";

const AddictionSelector = () => {
  const { setAddiction } = useAddiction();

  const handleSelect = (type: AddictionType) => {
    setAddiction(type);
  };

  return (
    <div className="space-y-8 w-full max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-medium tracking-tight">What are you quitting?</h2>
        <p className="text-muted-foreground">Select the addiction you want to track your progress for</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.03 }}
          className="col-span-1"
        >
          <Card 
            className="addiction-card h-full cursor-pointer overflow-hidden" 
            onClick={() => handleSelect('smoking')}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <Cigarette size={64} className="mb-4 text-progress-smoking" />
              <h3 className="text-xl font-medium">Smoking</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">Track your journey to quit smoking</p>
              <Button 
                className="mt-4 bg-progress-smoking hover:bg-progress-smoking/90 shine-effect relative overflow-hidden" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('smoking');
                }}
              >
                Select
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.03 }}
          className="col-span-1"
        >
          <Card 
            className="addiction-card h-full cursor-pointer overflow-hidden" 
            onClick={() => handleSelect('drinking')}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <Beer size={64} className="mb-4 text-progress-drinking" />
              <h3 className="text-xl font-medium">Drinking</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">Track your journey to quit alcohol</p>
              <Button 
                className="mt-4 bg-progress-drinking hover:bg-progress-drinking/90 shine-effect relative overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('drinking');
                }}
              >
                Select
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          className="col-span-1"
        >
          <Card 
            className="addiction-card h-full cursor-pointer overflow-hidden" 
            onClick={() => handleSelect('both')}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center h-full">
              <div className="flex mb-4">
                <Cigarette size={50} className="text-progress-smoking mr-2" />
                <Beer size={50} className="text-progress-drinking" />
              </div>
              <h3 className="text-xl font-medium">Both</h3>
              <p className="text-sm text-muted-foreground text-center mt-2">Track your journey to quit both addictions</p>
              <Button 
                className="mt-4 bg-progress-both hover:bg-progress-both/90 shine-effect relative overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect('both');
                }}
              >
                Select
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddictionSelector;

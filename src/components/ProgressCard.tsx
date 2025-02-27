
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Gauge } from "lucide-react";
import { useAddiction } from '@/context/AddictionContext';
import { motion } from "framer-motion";

const ProgressCard = () => {
  const { daysSince, goalDays, resetProgress, addiction } = useAddiction();

  // Display text based on addiction type
  const getAddictionText = () => {
    switch(addiction) {
      case 'smoking':
        return 'smoking';
      case 'drinking':
        return 'drinking';
      case 'both':
        return 'smoking and drinking';
      default:
        return 'your addiction';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Calendar className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Days without {getAddictionText()}</p>
              <h2 className="text-3xl font-bold">{daysSince}</h2>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Gauge className="text-primary h-6 w-6" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Goal progress</p>
              <h2 className="text-3xl font-bold">{Math.min(daysSince, goalDays)}/{goalDays} days</h2>
            </div>
          </div>

          <div className="pt-2">
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {daysSince === 0 ? (
                "You're just starting your journey. Stay strong!"
              ) : daysSince < 3 ? (
                "The first few days are the hardest. You're doing great!"
              ) : daysSince < 7 ? (
                "Almost a week! Your body is already thanking you."
              ) : daysSince < 14 ? (
                "Over a week clean! Your determination is inspiring."
              ) : daysSince < 30 ? (
                "You're making amazing progress. Keep going!"
              ) : (
                "Incredible achievement! You should be very proud."
              )}
            </motion.p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={resetProgress}
            className="w-full opacity-80 hover:opacity-100"
          >
            Reset Progress
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProgressCard;

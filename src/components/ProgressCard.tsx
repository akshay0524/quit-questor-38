
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Gauge, Check, X } from "lucide-react";
import { useAddiction } from '@/context/AddictionContext';
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

const ProgressCard = () => {
  const { 
    daysSince, 
    resetProgress, 
    addiction, 
    checkAddictionToday, 
    hasAddictionToday,
    checkedToday,
    markNonAddictionForToday
  } = useAddiction();

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

  const handleCheckboxChange = (checked: boolean) => {
    if (!checkedToday) {
      checkAddictionToday(checked);
    }
  };

  const handleNonAddictionClick = () => {
    if (!checkedToday) {
      markNonAddictionForToday();
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
          <CardTitle className="text-2xl font-bold">Your Streak</CardTitle>
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
              <p className="text-muted-foreground text-sm">Current streak</p>
              <h2 className="text-3xl font-bold">{daysSince} days</h2>
            </div>
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <p className="font-medium">How did you do today?</p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="addiction-today" 
                  checked={hasAddictionToday}
                  onCheckedChange={handleCheckboxChange}
                  disabled={checkedToday}
                />
                <label 
                  htmlFor="addiction-today"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${checkedToday && !hasAddictionToday ? 'opacity-50' : ''}`}
                >
                  Yes, I engaged in {getAddictionText()} today
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="no-addiction-today" 
                  checked={checkedToday && !hasAddictionToday}
                  onCheckedChange={() => handleNonAddictionClick()}
                  disabled={checkedToday}
                />
                <label 
                  htmlFor="no-addiction-today"
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${checkedToday && hasAddictionToday ? 'opacity-50' : ''}`}
                >
                  No, I maintained my streak today
                </label>
              </div>
            </div>
            
            <div className="text-sm mt-2">
              {!checkedToday ? (
                <div className="text-muted-foreground">
                  Record your progress for today
                </div>
              ) : hasAddictionToday ? (
                <div className="flex items-center text-destructive">
                  <X className="h-4 w-4 mr-1" />
                  Your streak has been reset. Start fresh tomorrow!
                </div>
              ) : (
                <div className="flex items-center text-primary">
                  <Check className="h-4 w-4 mr-1" />
                  Great job! Your streak continues.
                </div>
              )}
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
            Reset Streak
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProgressCard;

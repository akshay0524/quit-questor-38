
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// Array of motivational quotes
const quotes = [
  "Every day is a new opportunity to improve yourself. Take it and make the most of it.",
  "The struggle you're in today is developing the strength you need for tomorrow.",
  "Recovery is hard. Regret is harder.",
  "You didn't come this far to only come this far.",
  "Progress is progress, no matter how small.",
  "The only person you should try to be better than is the person you were yesterday.",
  "Fall seven times, stand up eight.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Your addiction is not your identity. It's just something you can overcome.",
  "Believe you can and you're halfway there.",
  "The harder the struggle, the more glorious the triumph.",
  "Recovery is not for people who need it. It's for people who want it.",
  "One day at a time. One step at a time. One moment at a time.",
  "Your future is created by what you do today, not tomorrow.",
  "Small steps lead to big changes."
];

const MotivationalQuote = () => {
  const [quote, setQuote] = useState("");
  
  useEffect(() => {
    // Select a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card className="glass-card">
        <CardContent className="p-6">
          <p className="text-lg font-medium italic text-center">"{quote}"</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MotivationalQuote;

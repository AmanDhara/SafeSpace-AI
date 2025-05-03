import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLanguage } from '@/hooks/use-language';
import MoodProgressRing, { MoodType } from './MoodProgressRing';

interface MoodTrackerProps {
  className?: string;
}

// Initial mood data with sample values
const initialMoods = {
  happy: Math.floor(Math.random() * 30) + 40, // 40-70
  calm: Math.floor(Math.random() * 30) + 30, // 30-60
  neutral: Math.floor(Math.random() * 30) + 40, // 40-70
  anxious: Math.floor(Math.random() * 30) + 10, // 10-40
  sad: Math.floor(Math.random() * 20) + 10, // 10-30
};

export default function MoodTracker({ className }: MoodTrackerProps) {
  const { t } = useLanguage();
  
  // State for tracking mood progress
  const [moods, setMoods] = useState<Record<MoodType, number>>(initialMoods);
  
  // State for animation control
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Selected mood for tracking
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  
  // Function to update a mood value
  const updateMood = (mood: MoodType, increment: boolean) => {
    setMoods(prev => {
      const newValue = increment 
        ? Math.min(prev[mood] + 5, 100) 
        : Math.max(prev[mood] - 5, 0);
      
      return { ...prev, [mood]: newValue };
    });
    
    // Set the selected mood for visual feedback
    setSelectedMood(mood);
    
    // Animate the change
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 1000);
  };
  
  // Get all mood types as an array
  const moodTypes: MoodType[] = ['happy', 'calm', 'neutral', 'anxious', 'sad'];
  
  // Calculate overall mood score (weighted average)
  const calculateOverallMoodScore = () => {
    const weights = { happy: 1, calm: 0.8, neutral: 0.5, anxious: -0.3, sad: -0.7 };
    let weightedSum = 0;
    let totalWeight = 0;
    
    Object.entries(moods).forEach(([mood, value]) => {
      const typedMood = mood as MoodType;
      weightedSum += value * weights[typedMood];
      totalWeight += Math.abs(weights[typedMood]) * 100; // Normalize for percentage
    });
    
    // Return score between 0-100
    return Math.max(0, Math.min(100, (weightedSum + totalWeight / 2) / (totalWeight / 100)));
  };
  
  const overallScore = calculateOverallMoodScore();
  
  // Determine overall mood based on score
  const getOverallMood = (): MoodType => {
    if (overallScore >= 80) return 'happy';
    if (overallScore >= 60) return 'calm';
    if (overallScore >= 40) return 'neutral';
    if (overallScore >= 20) return 'anxious';
    return 'sad';
  };
  
  // Save mood data to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('moodData', JSON.stringify(moods));
    } catch (error) {
      console.error('Failed to save mood data to localStorage', error);
    }
  }, [moods]);
  
  // Load mood data from localStorage on component mount
  useEffect(() => {
    try {
      const savedMoods = localStorage.getItem('moodData');
      if (savedMoods) {
        setMoods(JSON.parse(savedMoods));
      }
    } catch (error) {
      console.error('Failed to load mood data from localStorage', error);
    }
  }, []);
  
  // Helper function for mood translation
  const getMoodTranslation = (mood: MoodType): string => {
    const moodKeys: Record<MoodType, string> = {
      happy: "moodHappy",
      calm: "moodCalm", 
      neutral: "moodNeutral",
      anxious: "moodAnxious",
      sad: "moodSad"
    };
    
    return t(moodKeys[mood] as any);
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("moodTracker" as any)}</CardTitle>
        <CardDescription>{t("moodTrackerDescription" as any)}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col">
          {/* Overall mood indicator */}
          <div className="flex justify-center mb-6">
            <MoodProgressRing 
              mood={getOverallMood()} 
              progress={overallScore} 
              size="lg"
              animated={true}
              showLabel={true}
            />
          </div>
          
          {/* Individual mood rings */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {moodTypes.map(mood => (
              <motion.div 
                key={mood}
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  scale: selectedMood === mood && isUpdating ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <MoodProgressRing 
                  mood={mood} 
                  progress={moods[mood]} 
                  size="sm"
                  animated={true}
                  showLabel={true}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Mood adjustment buttons */}
          <div className="flex flex-col space-y-4 mt-4">
            {moodTypes.map(mood => (
              <div key={mood} className="flex items-center justify-between">
                <span className="font-medium">{getMoodTranslation(mood)}</span>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateMood(mood, false)}
                    disabled={moods[mood] <= 0}
                    title={t("decreaseMood" as any)}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{moods[mood]}%</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => updateMood(mood, true)}
                    disabled={moods[mood] >= 100}
                    title={t("increaseMood" as any)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
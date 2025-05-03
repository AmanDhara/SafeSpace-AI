import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';

export type MoodType = 'happy' | 'calm' | 'neutral' | 'anxious' | 'sad';

interface MoodProgressRingProps {
  mood: MoodType;
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  animated?: boolean;
}

interface MoodConfig {
  color: string;
  gradient: string;
  labelKey: string;
  emoji: string;
}

// Configuration for different moods with colors and gradients
const moodConfigs: Record<MoodType, MoodConfig> = {
  happy: {
    color: '#FFC107',
    gradient: 'from-yellow-300 to-yellow-500',
    labelKey: 'moodHappy',
    emoji: '😊'
  },
  calm: {
    color: '#4CAF50',
    gradient: 'from-green-300 to-green-500',
    labelKey: 'moodCalm',
    emoji: '😌'
  },
  neutral: {
    color: '#2196F3',
    gradient: 'from-blue-300 to-blue-500',
    labelKey: 'moodNeutral',
    emoji: '😐'
  },
  anxious: {
    color: '#FF9800',
    gradient: 'from-orange-300 to-orange-500',
    labelKey: 'moodAnxious',
    emoji: '😰'
  },
  sad: {
    color: '#9C27B0',
    gradient: 'from-purple-300 to-purple-500',
    labelKey: 'moodSad',
    emoji: '😢'
  }
};

export default function MoodProgressRing({
  mood,
  progress,
  size = 'md',
  showLabel = true,
  className,
  animated = true
}: MoodProgressRingProps) {
  const { t } = useLanguage();
  const [currentProgress, setCurrentProgress] = useState(0);
  const config = moodConfigs[mood];
  
  // Calculate dimensions based on size
  const sizeMap = {
    sm: { size: 80, strokeWidth: 6, fontSize: 'text-xs' },
    md: { size: 120, strokeWidth: 8, fontSize: 'text-sm' },
    lg: { size: 160, strokeWidth: 10, fontSize: 'text-base' }
  };
  
  const { size: ringSize, strokeWidth, fontSize } = sizeMap[size];
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentProgress / 100) * circumference;
  
  // Animate progress when value changes
  useEffect(() => {
    if (animated) {
      // Start from current value and animate to new value
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setCurrentProgress(progress);
    }
  }, [progress, animated]);
  
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative" style={{ width: ringSize, height: ringSize }}>
        {/* Background circle */}
        <svg width={ringSize} height={ringSize} className="rotate-[-90deg]">
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
          />
          
          {/* Animated progress circle with subtle color transitions */}
          <motion.circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animated ? strokeDashoffset : circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            initial={{ 
              strokeDashoffset: circumference,
              filter: 'brightness(0.9) saturate(0.8)'
            }}
            animate={{ 
              strokeDashoffset,
              filter: [
                'brightness(0.9) saturate(0.8)',
                'brightness(1.1) saturate(1.2)',
                'brightness(1.0) saturate(1.0)'
              ]
            }}
            transition={{ 
              strokeDashoffset: { duration: 1, ease: "easeInOut" },
              filter: { 
                duration: 2, 
                ease: "easeInOut",
                repeat: animated ? Infinity : 0,
                repeatType: "reverse",
                repeatDelay: 2 
              }
            }}
            className={`stroke-current ${config.gradient ? 'bg-gradient-to-r ' + config.gradient : ''}`}
            style={{ stroke: config.color }}
          />
        </svg>
        
        {/* Animated center emoji */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-2xl"
          style={{ fontSize: size === 'lg' ? '2rem' : size === 'md' ? '1.5rem' : '1.25rem' }}
          animate={animated ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0],
          } : {}}
          transition={animated ? {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1.5
          } : {}}
        >
          {config.emoji}
        </motion.div>
      </div>
      
      {/* Label below progress ring */}
      {showLabel && (
        <div className={`mt-2 text-center font-medium ${fontSize}`}>
          <span>{t(config.labelKey as any)}</span>
          <span className="ml-2 text-gray-500">{Math.round(currentProgress)}%</span>
        </div>
      )}
    </div>
  );
}
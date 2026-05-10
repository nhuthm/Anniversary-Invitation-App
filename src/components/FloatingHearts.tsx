import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from 'lucide-react';
export function FloatingHearts() {
  // Generate a fixed number of hearts with random initial positions and durations
  const hearts = Array.from({
    length: 15
  }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 14 + 10,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * -30,
    opacity: Math.random() * 0.15 + 0.05 // 0.05 to 0.2
  }));
  return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => <motion.div key={heart.id} className="absolute bottom-[-50px] text-rose" style={{
      left: heart.left
    }} animate={{
      y: ['0vh', '-120vh'],
      x: ['0px', `${Math.random() * 100 - 50}px`, `${Math.random() * 100 - 50}px`],
      rotate: [0, Math.random() * 360]
    }} transition={{
      duration: heart.duration,
      repeat: Infinity,
      ease: 'linear',
      delay: heart.delay
    }}>
        
          <HeartIcon size={heart.size} fill="currentColor" style={{
        opacity: heart.opacity
      }} />
        
        </motion.div>)}
    </div>;
}
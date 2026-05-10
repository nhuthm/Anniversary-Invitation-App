import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, HeartIcon } from 'lucide-react';
export function SentStep() {
  return <motion.div initial={{
    opacity: 0,
    scale: 0.9
  }} animate={{
    opacity: 1,
    scale: 1
  }} className="flex flex-col items-center justify-center text-center space-y-8 p-6 max-w-md mx-auto w-full h-full">
      
      <motion.div initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      type: 'spring',
      damping: 12,
      delay: 0.2
    }} className="relative">
        
        <div className="w-24 h-24 bg-rose rounded-full flex items-center justify-center shadow-soft relative z-10">
          <CheckIcon size={48} className="text-white" />
        </div>

        {/* Burst animation */}
        {[...Array(6)].map((_, i) => <motion.div key={i} className="absolute top-1/2 left-1/2 text-rose" initial={{
        x: '-50%',
        y: '-50%',
        scale: 0,
        opacity: 1
      }} animate={{
        x: `calc(-50% + ${Math.cos(i * 60 * Math.PI / 180) * 80}px)`,
        y: `calc(-50% + ${Math.sin(i * 60 * Math.PI / 180) * 80}px)`,
        scale: 1,
        opacity: 0
      }} transition={{
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut'
      }}>
          
            <HeartIcon size={24} fill="currentColor" />
          </motion.div>)}
      </motion.div>

      <motion.div initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.6,
      duration: 0.8
    }}>
        
        <h1 className="font-script text-6xl text-rose mb-4">Sent!</h1>
        <p className="text-2xl text-brown/80 font-medium">
          Can't wait for our date 💖
        </p>
      </motion.div>
    </motion.div>;
}
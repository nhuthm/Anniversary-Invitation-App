import React from 'react';
import { motion } from 'framer-motion';
// Wait, EnvelopeIcon doesn't exist in lucide-react, it's MailIcon
// Let's use MailIcon and HeartIcon
import { MailIcon, HeartIcon } from 'lucide-react';
interface CoverStepProps {
  onNext: () => void;
  senderName: string;
}
export function CoverStep({ onNext, senderName }: CoverStepProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      exit={{
        opacity: 0,
        y: -20
      }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="flex flex-col items-center justify-center text-center space-y-8 p-6 max-w-md mx-auto w-full">
      
      <motion.div
        initial={{
          y: 20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.3,
          duration: 0.8
        }}
        className="relative">
        
        <div className="absolute -top-6 -right-6 text-rose/40 animate-pulse">
          <HeartIcon size={32} fill="currentColor" />
        </div>
        <h1 className="font-script text-5xl md:text-6xl text-rose leading-tight">
          A little something
          <br />
          for you, {senderName} 💌
        </h1>
      </motion.div>

      <motion.p
        initial={{
          y: 20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.6,
          duration: 0.8
        }}
        className="text-xl md:text-2xl text-brown/80 font-medium">
        
        Our 3-month anniversary is coming up...
      </motion.p>

      <motion.div
        initial={{
          y: 20,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          delay: 0.9,
          duration: 0.8
        }}
        className="pt-8">
        
        <button
          onClick={onNext}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-rose text-white rounded-full font-serif text-xl overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-soft">
          
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <MailIcon size={24} className="relative z-10" />
          <span className="relative z-10 font-medium tracking-wide">
            Open invitation
          </span>
        </button>
      </motion.div>
    </motion.div>);

}
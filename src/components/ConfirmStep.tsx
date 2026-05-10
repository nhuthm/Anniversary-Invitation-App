import React from 'react';
import { motion } from 'framer-motion';
import { SelectionState } from '../types';
import { HeartIcon, UtensilsIcon, SparklesIcon } from 'lucide-react';
interface ConfirmStepProps {
  state: SelectionState;
  onEdit: () => void;
  onConfirm: () => void;
  sending?: boolean;
  error?: string | null;
}
export function ConfirmStep({
  state,
  onEdit,
  onConfirm,
  sending = false,
  error = null
}: ConfirmStepProps) {
  return <motion.div initial={{
    opacity: 0,
    scale: 0.95
  }} animate={{
    opacity: 1,
    scale: 1
  }} exit={{
    opacity: 0,
    y: -20
  }} className="w-full max-w-md mx-auto p-6 flex flex-col h-full justify-center">
      
      <div className="text-center mb-8">
        <h2 className="font-script text-5xl text-rose mb-2">Perfect! 💖</h2>
        <p className="text-xl text-brown/70">Here's our plan</p>
      </div>

      <motion.div initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.2
    }} className="glass-card rounded-3xl p-8 relative overflow-hidden bg-white/90 shadow-soft mb-8">
        
        {/* Decorative corner element */}
        <div className="absolute -top-4 -right-4 text-rose/10 rotate-12">
          <HeartIcon size={100} fill="currentColor" />
        </div>

        <div className="space-y-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-rose/5 text-rose flex-shrink-0">
              <UtensilsIcon size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-rose uppercase tracking-widest mb-1">
                Dinner
              </p>
              <p className="font-script text-3xl text-brown leading-tight">
                {state.dinnerChoice}
              </p>
            </div>
          </div>

          <div className="border-t border-rose/10" />

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-amber-50 text-amber-500 flex-shrink-0">
              <SparklesIcon size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-rose uppercase tracking-widest mb-1">
                Then
              </p>
              <p className="font-script text-3xl text-brown leading-tight">
                {state.activityChoice}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.4
    }} className="space-y-4">

        {error && <p role="alert" className="text-center text-rose font-medium bg-rose/10 border border-rose/20 rounded-2xl px-4 py-3">
          {error}
        </p>}

        <button onClick={onConfirm} disabled={sending} className={`w-full py-4 rounded-full font-serif text-xl font-bold shadow-soft transition-all duration-300 flex items-center justify-center gap-2 ${sending ? 'bg-rose/60 text-white cursor-wait' : 'bg-rose text-white hover:scale-[1.02] active:scale-[0.98]'}`}>

          {sending ? 'Sending…' : 'Send it 💕'}
        </button>
        <button onClick={onEdit} disabled={sending} className={`w-full py-4 rounded-full font-serif text-xl transition-all duration-300 ${sending ? 'text-brown/30 cursor-not-allowed' : 'text-brown/60 hover:text-brown hover:bg-white/50'}`}>

          Wait, let me change something
        </button>
      </motion.div>
    </motion.div>;
}
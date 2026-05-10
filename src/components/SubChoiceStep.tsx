import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, UtensilsIcon, SparklesIcon } from 'lucide-react';
import { Category } from '../types';
interface SubChoiceStepProps {
  category: Category;
  initialChoice: string;
  stepNumber: 1 | 2;
  onBack?: () => void;
  onNext: (choice: string) => void;
  ctaLabel?: string;
}
const OPTIONS: Record<Category, string[]> = {
  dinner: ['Italian', 'Sushi', 'Steakhouse', 'Cozy bistro', 'Brunch', 'Surprise me'],
  activity: ['Mini golf', 'Museum', 'Bowling', 'Hiking', 'Arcade', 'Live music']
};
const TITLES: Record<Category, string> = {
  dinner: 'Where should we eat?',
  activity: 'And after dinner?'
};
const SUBTITLES: Record<Category, string> = {
  dinner: 'Pick a place for our meal',
  activity: 'Pick something fun to do'
};
const ICONS: Record<Category, typeof UtensilsIcon> = {
  dinner: UtensilsIcon,
  activity: SparklesIcon
};
export function SubChoiceStep({
  category,
  initialChoice,
  stepNumber,
  onBack,
  onNext,
  ctaLabel = 'Continue'
}: SubChoiceStepProps) {
  const [selected, setSelected] = useState<string>(initialChoice);
  const options = OPTIONS[category];
  const title = TITLES[category];
  const subtitle = SUBTITLES[category];
  const Icon = ICONS[category];
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} className="w-full max-w-md mx-auto p-6 flex flex-col h-full">
      
      <div className="flex items-center justify-between mb-6">
        {onBack ? <button onClick={onBack} className="p-2 -ml-2 text-brown/60 hover:text-rose transition-colors flex items-center gap-2">
          
            <ArrowLeftIcon size={20} />
            <span className="text-lg">Back</span>
          </button> : <div />}

        <div className="text-sm font-bold text-rose/70 uppercase tracking-widest">
          Step {stepNumber} of 2
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3 text-rose">
          <Icon size={28} />
          <span className="font-serif text-xl font-bold capitalize">
            {category}
          </span>
        </div>
        <h2 className="font-script text-5xl text-rose mb-2">{title}</h2>
        <p className="text-xl text-brown/70">{subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="flex flex-col gap-3">
          {options.map((opt, i) => {
          const isSelected = selected === opt;
          return <motion.button key={opt} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: i * 0.05
          }} onClick={() => setSelected(opt)} className={`p-4 rounded-xl text-left text-xl transition-all duration-200 border-2 ${isSelected ? 'border-rose bg-rose/10 text-rose font-bold shadow-sm' : 'border-transparent glass-card text-brown hover:border-rose/30'}`}>
                
                {opt}
              </motion.button>;
        })}
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <button onClick={() => onNext(selected)} disabled={!selected} className={`w-full py-4 rounded-full font-serif text-xl font-medium transition-all duration-300 ${selected ? 'bg-rose text-white shadow-soft hover:scale-[1.02] active:scale-[0.98]' : 'bg-brown/10 text-brown/40 cursor-not-allowed'}`}>
          
          {ctaLabel}
        </button>
      </div>
    </motion.div>;
}
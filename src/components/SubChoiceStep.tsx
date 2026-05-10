import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  UtensilsIcon,
  SparklesIcon,
  XIcon,
  MapPinIcon,
  CheckIcon,
  ChevronRightIcon } from
'lucide-react';
import { Category } from '../types';
interface SubChoiceStepProps {
  category: Category;
  initialChoice: string;
  stepNumber: 1 | 2;
  onBack?: () => void;
  onNext: (choice: string) => void;
  ctaLabel?: string;
}
interface OptionLocation {
  name: string;
  area: string;
}
interface OptionDef {
  label: string;
  emoji: string;
  locations: OptionLocation[];
}
const DINNER_OPTIONS: OptionDef[] = [
{
  label: 'Italian',
  emoji: '🍝',
  locations: [
  {
    name: 'Pizza 4Ps',
    area: 'District 1'
  },
  {
    name: 'Cocotte',
    area: 'Thao Dien'
  },
  {
    name: 'La Hostaria',
    area: 'District 1'
  },
  {
    name: 'Pendolasco',
    area: 'Thao Dien'
  }]

},
{
  label: 'Sushi',
  emoji: '🍣',
  locations: [
  {
    name: 'Sushi Hokkaido Sachi',
    area: 'District 1'
  },
  {
    name: 'Kazu Sushi',
    area: 'District 1'
  },
  {
    name: 'Sushi Tei',
    area: 'District 7'
  },
  {
    name: 'Hashida',
    area: 'Thao Dien'
  }]

},
{
  label: 'Steakhouse',
  emoji: '🥩',
  locations: [
  {
    name: 'El Gaucho',
    area: 'District 1'
  },
  {
    name: 'Au Lac do Brazil',
    area: 'District 3'
  },
  {
    name: 'The Steakhouse',
    area: 'District 1'
  }]

},
{
  label: 'Cozy bistro',
  emoji: '🥖',
  locations: [
  {
    name: 'Quince Saigon',
    area: 'District 1'
  },
  {
    name: 'Anan Saigon',
    area: 'District 1'
  },
  {
    name: 'Stoker',
    area: 'District 1'
  }]

},
{
  label: 'Brunch',
  emoji: '🥞',
  locations: [
  {
    name: 'Le Corto',
    area: 'District 1'
  },
  {
    name: 'Snap Café',
    area: 'Thao Dien'
  },
  {
    name: 'The Workshop',
    area: 'District 1'
  }]

},
{
  label: 'Surprise me',
  emoji: '✨',
  locations: [
  {
    name: 'Let me pick a place',
    area: 'It’s a secret 💕'
  }]

}];

const ACTIVITY_OPTIONS: OptionDef[] = [
{
  label: 'Mini golf',
  emoji: '⛳',
  locations: [
  {
    name: 'Putt Putt Saigon',
    area: 'District 1'
  },
  {
    name: 'Vincom Mini Golf',
    area: 'District 1'
  }]

},
{
  label: 'Museum',
  emoji: '🏛️',
  locations: [
  {
    name: 'Fine Arts Museum',
    area: 'District 1'
  },
  {
    name: 'War Remnants Museum',
    area: 'District 3'
  },
  {
    name: 'Áo Dài Museum',
    area: 'District 9'
  }]

},
{
  label: 'Bowling',
  emoji: '🎳',
  locations: [
  {
    name: 'Saigon Superbowl',
    area: 'Tan Binh'
  },
  {
    name: 'Diamond Bowling',
    area: 'District 1'
  }]

},
{
  label: 'Hiking',
  emoji: '🥾',
  locations: [
  {
    name: 'Núi Dinh',
    area: 'Vung Tau'
  },
  {
    name: 'Bửu Long',
    area: 'Bien Hoa'
  }]

},
{
  label: 'Arcade',
  emoji: '🕹️',
  locations: [
  {
    name: 'Tini World',
    area: 'District 1'
  },
  {
    name: 'Funtasy',
    area: 'District 7'
  },
  {
    name: 'Timezone',
    area: 'District 1'
  }]

},
{
  label: 'Live music',
  emoji: '🎶',
  locations: [
  {
    name: 'Acoustic Bar',
    area: 'District 3'
  },
  {
    name: 'Yoko Café',
    area: 'District 3'
  },
  {
    name: 'Soul Live Project',
    area: 'District 1'
  }]

}];

const OPTIONS: Record<Category, OptionDef[]> = {
  dinner: DINNER_OPTIONS,
  activity: ACTIVITY_OPTIONS
};
const TITLES: Record<Category, string> = {
  dinner: 'Where should we eat?',
  activity: 'And after dinner?'
};
const SUBTITLES: Record<Category, string> = {
  dinner: 'Pick a vibe, then pick the spot',
  activity: 'Pick a vibe, then pick the spot'
};
const ICONS: Record<Category, typeof UtensilsIcon> = {
  dinner: UtensilsIcon,
  activity: SparklesIcon
};
const SEPARATOR = ' · ';
function parseChoice(choice: string): {
  label: string;
  place: string;
} {
  if (!choice)
  return {
    label: '',
    place: ''
  };
  const idx = choice.indexOf(SEPARATOR);
  if (idx === -1)
  return {
    label: choice,
    place: ''
  };
  return {
    label: choice.slice(0, idx),
    place: choice.slice(idx + SEPARATOR.length)
  };
}
export function SubChoiceStep({
  category,
  initialChoice,
  stepNumber,
  onBack,
  onNext,
  ctaLabel = 'Continue'
}: SubChoiceStepProps) {
  const initial = parseChoice(initialChoice);
  const [selectedLabel, setSelectedLabel] = useState<string>(initial.label);
  const [selectedPlace, setSelectedPlace] = useState<string>(initial.place);
  const [sheetFor, setSheetFor] = useState<string | null>(null);
  const options = OPTIONS[category];
  const title = TITLES[category];
  const subtitle = SUBTITLES[category];
  const Icon = ICONS[category];
  const activeOption = sheetFor ?
  options.find((o) => o.label === sheetFor) ?? null :
  null;
  // Lock body scroll when sheet open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (sheetFor) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [sheetFor]);
  // Close sheet on Escape
  useEffect(() => {
    if (!sheetFor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSheetFor(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sheetFor]);
  const canContinue = Boolean(selectedLabel && selectedPlace);
  const handleConfirm = () => {
    if (!canContinue) return;
    onNext(`${selectedLabel}${SEPARATOR}${selectedPlace}`);
  };
  const handlePickPlace = (label: string, placeName: string) => {
    setSelectedLabel(label);
    setSelectedPlace(placeName);
    setSheetFor(null);
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{
        opacity: 0,
        x: -20
      }}
      className="w-full max-w-md mx-auto p-6 flex flex-col h-full">
      
      <div className="flex items-center justify-between mb-6">
        {onBack ?
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-brown/60 hover:text-rose transition-colors flex items-center gap-2">
          
            <ArrowLeftIcon size={20} />
            <span className="text-lg">Back</span>
          </button> :

        <div />
        }

        <div className="text-sm font-bold text-rose/70 uppercase tracking-widest">
          Step {stepNumber} of 2
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3 text-rose">
          <Icon size={28} />
          <span className="font-serif text-xl font-bold capitalize">
            {category}
          </span>
        </div>
        <h2 className="font-script text-5xl text-rose mb-2">{title}</h2>
        <p className="text-xl text-brown/70">{subtitle}</p>
      </div>

      <div className="flex-1 overflow-y-auto pb-6 -mx-1 px-1">
        <div className="grid grid-cols-2 gap-3">
          {options.map((opt, i) => {
            const isSelected = selectedLabel === opt.label;
            return (
              <motion.button
                key={opt.label}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: i * 0.04
                }}
                onClick={() => setSheetFor(opt.label)}
                className={`relative p-4 rounded-2xl text-left transition-all duration-200 border-2 flex flex-col gap-2 min-h-[110px] ${isSelected ? 'border-rose bg-rose/10 shadow-sm' : 'border-transparent glass-card hover:border-rose/30'}`}>
                
                <span className="text-3xl leading-none">{opt.emoji}</span>
                <span
                  className={`font-serif text-lg leading-tight ${isSelected ? 'text-rose font-bold' : 'text-brown'}`}>
                  
                  {opt.label}
                </span>

                {isSelected && selectedPlace ?
                <span className="flex items-center gap-1 text-xs text-rose/80 font-medium">
                    <MapPinIcon size={12} />
                    <span className="truncate">{selectedPlace}</span>
                  </span> :

                <span className="flex items-center gap-1 text-xs text-brown/50">
                    <span className="truncate">
                      {opt.locations.length} place
                      {opt.locations.length === 1 ? '' : 's'}
                    </span>
                    <ChevronRightIcon size={12} />
                  </span>
                }

                {isSelected &&
                <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose text-white flex items-center justify-center">
                    <CheckIcon size={12} />
                  </span>
                }
              </motion.button>);

          })}
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <button
          onClick={handleConfirm}
          disabled={!canContinue}
          className={`w-full py-4 rounded-full font-serif text-xl font-medium transition-all duration-300 ${canContinue ? 'bg-rose text-white shadow-soft hover:scale-[1.02] active:scale-[0.98]' : 'bg-brown/10 text-brown/40 cursor-not-allowed'}`}>
          
          {canContinue ?
          ctaLabel :
          selectedLabel ?
          'Pick a place' :
          'Pick an option'}
        </button>
      </div>

      {/* Bottom sheet for picking a specific place */}
      <AnimatePresence>
        {activeOption &&
        <>
            <motion.div
            key="backdrop"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.2
            }}
            className="fixed inset-0 z-40 bg-brown/40 backdrop-blur-sm"
            onClick={() => setSheetFor(null)}
            aria-hidden="true" />
          

            <motion.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={`Pick a place for ${activeOption.label}`}
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 320
            }}
            drag="y"
            dragConstraints={{
              top: 0,
              bottom: 0
            }}
            dragElastic={{
              top: 0,
              bottom: 0.4
            }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) {
                setSheetFor(null);
              }
            }}
            className="fixed inset-x-0 bottom-0 z-50 bg-cream rounded-t-3xl shadow-soft max-h-[85vh] flex flex-col">
            
              {/* Drag handle */}
              <div className="pt-3 pb-2 flex justify-center">
                <div className="w-10 h-1.5 rounded-full bg-brown/20" />
              </div>

              <div className="px-6 pb-2 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-rose mb-1">
                    <span className="text-2xl">{activeOption.emoji}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-rose/70">
                      {activeOption.label}
                    </span>
                  </div>
                  <h3 className="font-script text-4xl text-rose leading-tight">
                    Pick a place
                  </h3>
                </div>
                <button
                onClick={() => setSheetFor(null)}
                aria-label="Close"
                className="p-2 -mr-2 text-brown/60 hover:text-rose transition-colors">
                
                  <XIcon size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
                <div className="flex flex-col gap-3">
                  {activeOption.locations.map((loc, i) => {
                  const isSelected =
                  selectedLabel === activeOption.label &&
                  selectedPlace === loc.name;
                  return (
                    <motion.button
                      key={loc.name}
                      initial={{
                        opacity: 0,
                        y: 8
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      transition={{
                        delay: i * 0.04
                      }}
                      onClick={() =>
                      handlePickPlace(activeOption.label, loc.name)
                      }
                      className={`text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${isSelected ? 'border-rose bg-rose/10' : 'border-transparent glass-card hover:border-rose/30'}`}>
                      
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="p-2 rounded-full bg-rose/10 text-rose flex-shrink-0">
                            <MapPinIcon size={16} />
                          </div>
                          <div className="min-w-0">
                            <p
                            className={`font-serif text-lg leading-tight truncate ${isSelected ? 'text-rose font-bold' : 'text-brown'}`}>
                            
                              {loc.name}
                            </p>
                            <p className="text-sm text-brown/60 truncate">
                              {loc.area}
                            </p>
                          </div>
                        </div>
                        {isSelected &&
                      <span className="w-6 h-6 rounded-full bg-rose text-white flex items-center justify-center flex-shrink-0">
                            <CheckIcon size={14} />
                          </span>
                      }
                      </motion.button>);

                })}
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </motion.div>);

}
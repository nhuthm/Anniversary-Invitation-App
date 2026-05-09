import React, { useState, Component } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FloatingHearts } from './components/FloatingHearts';
import { CoverStep } from './components/CoverStep';
import { SubChoiceStep } from './components/SubChoiceStep';
import { ConfirmStep } from './components/ConfirmStep';
import { SentStep } from './components/SentStep';
import { Step, SelectionState } from './types';
// ==========================================
// CONFIGURATION - REPLACE THESE VALUES
// ==========================================
const TO_EMAIL = 'your-email@example.com'; // Replace with your email address
const SENDER_NAME = 'Babe'; // Replace with her name or a pet name
// ==========================================
export function App() {
  const [step, setStep] = useState<Step>('cover');
  const [selection, setSelection] = useState<SelectionState>({
    dinnerChoice: '',
    activityChoice: ''
  });
  const handleSend = () => {
    const subject = encodeURIComponent(`Our 3-Month Anniversary Date! 💖`);
    const body = encodeURIComponent(
      `Hey!\n\nHere's what I picked for our date:\n\n` +
      `🍽️  Dinner: ${selection.dinnerChoice}\n` +
      `✨  Then: ${selection.activityChoice}\n\n` +
      `Can't wait! 💕`
    );
    window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
    setStep('sent');
  };
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-cream flex flex-col">
      <FloatingHearts />

      <main className="relative z-10 flex-1 flex flex-col w-full h-full">
        <AnimatePresence mode="wait">
          {step === 'cover' &&
          <CoverStep
            key="cover"
            senderName={SENDER_NAME}
            onNext={() => setStep('dinner')} />

          }

          {step === 'dinner' &&
          <SubChoiceStep
            key="dinner"
            category="dinner"
            stepNumber={1}
            initialChoice={selection.dinnerChoice}
            onNext={(choice) => {
              setSelection((prev) => ({
                ...prev,
                dinnerChoice: choice
              }));
              setStep('activity');
            }} />

          }

          {step === 'activity' &&
          <SubChoiceStep
            key="activity"
            category="activity"
            stepNumber={2}
            initialChoice={selection.activityChoice}
            onBack={() => setStep('dinner')}
            onNext={(choice) => {
              setSelection((prev) => ({
                ...prev,
                activityChoice: choice
              }));
              setStep('confirm');
            }} />

          }

          {step === 'confirm' &&
          <ConfirmStep
            key="confirm"
            state={selection}
            onEdit={() => setStep('dinner')}
            onConfirm={handleSend} />

          }

          {step === 'sent' && <SentStep key="sent" />}
        </AnimatePresence>
      </main>
    </div>);

}
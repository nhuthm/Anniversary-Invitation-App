import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FloatingHearts } from './components/FloatingHearts';
import { CoverStep } from './components/CoverStep';
import { SubChoiceStep } from './components/SubChoiceStep';
import { ConfirmStep } from './components/ConfirmStep';
import { SentStep } from './components/SentStep';
import { Step, SelectionState } from './types';
const TO_EMAILS = ['huynhminhnhut@gmail.com'];
const SENDER_NAME = 'Bé Yến';
const STORAGE_KEY = 'anniversary-invitation:selection';
const EMPTY_SELECTION: SelectionState = {
  dinnerChoice: '',
  activityChoice: ''
};
function loadSelection(): SelectionState {
  if (typeof window === 'undefined') return EMPTY_SELECTION;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_SELECTION;
    const parsed = JSON.parse(raw) as Partial<SelectionState>;
    return {
      dinnerChoice: typeof parsed.dinnerChoice === 'string' ? parsed.dinnerChoice : '',
      activityChoice: typeof parsed.activityChoice === 'string' ? parsed.activityChoice : ''
    };
  } catch {
    return EMPTY_SELECTION;
  }
}
export function App() {
  const [step, setStep] = useState<Step>('cover');
  const [selection, setSelection] = useState<SelectionState>(loadSelection);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {

      // localStorage unavailable (private mode, quota, etc.) — fail silently
    }}, [selection]);
  const handleSend = async () => {
    if (sending) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch('/api/send-invitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: TO_EMAILS,
          senderName: SENDER_NAME,
          dinnerChoice: selection.dinnerChoice,
          activityChoice: selection.activityChoice
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}) as {
          error?: string;
        });
        throw new Error(data.error || `Failed to send (${res.status})`);
      }
      setStep('sent');
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSending(false);
    }
  };
  return <div className="relative w-full min-h-screen overflow-hidden bg-cream flex flex-col">
      <FloatingHearts />

      <main className="relative z-10 flex-1 flex flex-col w-full h-full">
        <AnimatePresence mode="wait">
          {step === 'cover' && <CoverStep key="cover" senderName={SENDER_NAME} onNext={() => setStep('dinner')} />}

          {step === 'dinner' && <SubChoiceStep key="dinner" category="dinner" stepNumber={1} initialChoice={selection.dinnerChoice} onNext={(choice) => {
          setSelection((prev) => ({
            ...prev,
            dinnerChoice: choice
          }));
          setStep('activity');
        }} />}

          {step === 'activity' && <SubChoiceStep key="activity" category="activity" stepNumber={2} initialChoice={selection.activityChoice} onBack={() => setStep('dinner')} onNext={(choice) => {
          setSelection((prev) => ({
            ...prev,
            activityChoice: choice
          }));
          setStep('confirm');
        }} />}

          {step === 'confirm' && <ConfirmStep key="confirm" state={selection} sending={sending} error={sendError} onEdit={() => setStep('dinner')} onConfirm={handleSend} />}

          {step === 'sent' && <SentStep key="sent" />}
        </AnimatePresence>
      </main>
    </div>;
}
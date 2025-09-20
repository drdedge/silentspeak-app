'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { TabButtons } from '@/components/TabButtons';
import { ParticipantTab } from '@/components/ParticipantTab';
import { FacilitatorTab } from '@/components/FacilitatorTab';
import { ToastTray } from '@/components/ToastTray';
import { OnboardingOverlay } from '@/components/OnboardingOverlay';
import { Message, OnboardingStep, ProfileSelection, Room, Toast } from '@/types';
import { assessRisk, generateAnonymousName } from '@/lib/utils';
import { buildDemoMessages, roomSchedule } from '@/lib/demo-data';

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'participant' | 'facilitator'>('participant');
  const [userCount, setUserCount] = useState(11);
  const [facilitatorCount] = useState(3);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('signIn');
  const [profileSelection, setProfileSelection] = useState<ProfileSelection | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [anonymousPreview, setAnonymousPreview] = useState(generateAnonymousName());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const messageIdRef = useRef(1);

  useEffect(() => {
    const seeds = buildDemoMessages();
    messageIdRef.current = seeds.length + 1;
    setMessages(seeds);

    // Randomize counts after hydration to avoid mismatch
    setUserCount(Math.floor(Math.random() * 10) + 5);
  }, []);

  useEffect(() => {
    if (onboardingStep === 'profile') {
      setAnonymousPreview(generateAnonymousName());
    }
  }, [onboardingStep]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setUserCount((prev) => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    if (onboardingStep !== 'complete') {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [onboardingStep]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info', duration = 3200) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const roomGroups = useMemo(() => {
    return roomSchedule.map((group) => ({
      label: group.label,
      rooms: group.rooms.map((room) => ({ ...room, dateLabel: group.label })),
    }));
  }, []);

  const handleSendMessage = useCallback(
    ({ text, urgent, requestFacilitator }: { text: string; urgent: boolean; requestFacilitator: boolean }) => {
      const risk = assessRisk(text);
      const message: Message = {
        id: messageIdRef.current++,
        text,
        author: profileSelection === 'custom' ? 'Guided Support Coach' : generateAnonymousName(),
        timestamp: new Date(),
        topic: selectedTopic ?? 'general',
        risk,
        urgent,
        queued: urgent || requestFacilitator || risk === 'high',
        reviewed: false,
        approved: risk === 'low',
      };

      setMessages((prev) => [message, ...prev]);
      addToast('Your message has been sent anonymously', 'success');

      if (message.queued) {
        addToast('A facilitator has been notified and will respond soon', 'info', 4000);
      }
    },
    [addToast, profileSelection, selectedTopic],
  );

  const handleApprove = useCallback(
    (messageId: number) => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? { ...message, approved: true, queued: false, reviewed: true }
            : message,
        ),
      );
      addToast('Message approved for the participant feed', 'success');
    },
    [addToast],
  );

  const handleMarkReviewed = useCallback(
    (messageId: number) => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? { ...message, reviewed: true, queued: false }
            : message,
        ),
      );
      addToast('Message marked as reviewed', 'info');
    },
    [addToast],
  );

  const handleRemoveFromQueue = useCallback(
    (messageId: number) => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === messageId
            ? { ...message, queued: false }
            : message,
        ),
      );
      addToast('Message removed from queue', 'info');
    },
    [addToast],
  );

  const handleSubmitCredentials = useCallback(
    (action: 'login' | 'signup') => {
      if (!username.trim() || !password.trim()) {
        addToast('Enter both a username and password to continue', 'error');
        return;
      }

      addToast(`${action === 'login' ? 'Logged in' : 'Signed up'} as ${username}`, 'success');
      setOnboardingStep('terms');
    },
    [addToast, password, username],
  );

  const handleAcceptTerms = useCallback(() => {
    setOnboardingStep('profile');
    addToast('Thanks for accepting our community guidelines', 'success');
  }, [addToast]);

  const handleRejectTerms = useCallback(() => {
    setOnboardingStep('signIn');
    addToast('You can return when you are ready to agree to the guidelines.', 'info');
  }, [addToast]);

  const handleSelectProfile = useCallback(
    (profile: ProfileSelection) => {
      setProfileSelection(profile);
      addToast(`${profile === 'custom' ? 'Guided Support Coach' : 'Anonymous Ally'} profile selected`, 'info');
    },
    [addToast],
  );

  const handleContinueProfile = useCallback(() => {
    if (!profileSelection) {
      addToast('Select a profile option to continue', 'error');
      return;
    }
    setOnboardingStep('rooms');
  }, [addToast, profileSelection]);

  const handleSelectRoom = useCallback(
    (room: Room) => {
      setCurrentRoom(room);
      setOnboardingStep('complete');
      addToast(`You joined ${room.name}`, 'success');
    },
    [addToast],
  );

  const handleDismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-rose-50 to-amber-50 pb-20">
      <Header userCount={userCount} facilitatorCount={facilitatorCount} currentRoom={currentRoom} />

      <main className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 pb-24 pt-10">
        <TabButtons activeTab={currentTab} onChange={setCurrentTab} />

        {currentTab === 'participant' ? (
          <ParticipantTab
            messages={messages.filter((message) => message.approved)}
            selectedTopic={selectedTopic}
            onSelectTopic={setSelectedTopic}
            onSendMessage={handleSendMessage}
            room={currentRoom}
          />
        ) : (
          <FacilitatorTab
            messages={messages}
            onApprove={handleApprove}
            onMarkReviewed={handleMarkReviewed}
            onRemoveFromQueue={handleRemoveFromQueue}
          />
        )}
      </main>

      <OnboardingOverlay
        step={onboardingStep}
        username={username}
        password={password}
        profile={profileSelection}
        anonymousPreview={anonymousPreview}
        roomGroups={roomGroups}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmitCredentials={handleSubmitCredentials}
        onAcceptTerms={handleAcceptTerms}
        onRejectTerms={handleRejectTerms}
        onSelectProfile={handleSelectProfile}
        onBackTo={(step) => setOnboardingStep(step)}
        onContinueProfile={handleContinueProfile}
        onSelectRoom={handleSelectRoom}
      />

      <ToastTray toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

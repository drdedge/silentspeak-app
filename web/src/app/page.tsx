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
import appConfig from '@/config/app-config.json';

const { ui, strings } = appConfig;

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<'participant' | 'facilitator'>('participant');
  const [userCount, setUserCount] = useState(ui.systemStatus.defaultUserCount);
  const [facilitatorCount] = useState(ui.systemStatus.defaultFacilitatorCount);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('signIn');
  const [profileSelection, setProfileSelection] = useState<ProfileSelection | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [anonymousPreview, setAnonymousPreview] = useState(generateAnonymousName());
  const [toasts, setToasts] = useState<Toast[]>([]);

  const messageIdRef = useRef(1);

  // Initialize demo messages
  useEffect(() => {
    const seeds = buildDemoMessages();
    messageIdRef.current = seeds.length + 1;
    setMessages(seeds);

    // Randomize counts after hydration to avoid mismatch
    setUserCount(Math.floor(Math.random() * 10) + 5);
  }, []);

  // Regenerate anonymous preview when on profile step
  useEffect(() => {
    if (onboardingStep === 'profile') {
      setAnonymousPreview(generateAnonymousName());
    }
  }, [onboardingStep]);

  // Simulate user count fluctuation
  useEffect(() => {
    const interval = window.setInterval(() => {
      setUserCount((prev) => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, ui.systemStatus.userCountFluctuationInterval);

    return () => window.clearInterval(interval);
  }, []);

  // Handle body overflow for modals
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

  const addToast = useCallback((message: string, type: Toast['type'] = 'info', duration?: number) => {
    const id = crypto.randomUUID();
    const toastDuration = duration ?? ui.toastDurations[type];
    setToasts((prev) => [...prev, { id, message, type }]);

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, toastDuration);
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
      addToast(strings.toasts.messageSent, 'success');

      if (message.queued) {
        addToast(strings.toasts.facilitatorNotified, 'info', ui.toastDurations.info);
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
      addToast(strings.toasts.messageApproved, 'success');
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
      addToast(strings.toasts.messageReviewed, 'info');
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
      addToast(strings.toasts.messageRemoved, 'info');
    },
    [addToast],
  );

  const handleSubmitCredentials = useCallback(
    (action: 'login' | 'signup') => {
      if (!username.trim() || !password.trim()) {
        addToast(strings.toasts.credentialsError, 'error');
        return;
      }

      const successMessage = strings.toasts[action === 'login' ? 'loginSuccess' : 'signupSuccess'].replace('{username}', username);
      addToast(successMessage, 'success');
      setOnboardingStep('terms');
    },
    [addToast, password, username],
  );

  const handleAcceptTerms = useCallback(() => {
    setOnboardingStep('profile');
    addToast(strings.toasts.termsAccepted, 'success');
  }, [addToast]);

  const handleRejectTerms = useCallback(() => {
    setOnboardingStep('signIn');
    addToast(strings.toasts.termsRejected, 'info');
  }, [addToast]);

  const handleSelectProfile = useCallback(
    (profile: ProfileSelection) => {
      setProfileSelection(profile);
      const profileName = profile === 'custom' ? 'Guided Support Coach' : 'Anonymous Ally';
      addToast(strings.toasts.profileSelected.replace('{profile}', profileName), 'info');
    },
    [addToast],
  );

  const handleContinueProfile = useCallback(() => {
    if (!profileSelection) {
      addToast(strings.toasts.profileRequired, 'error');
      return;
    }
    setOnboardingStep('rooms');
  }, [addToast, profileSelection]);

  const handleSelectRoom = useCallback(
    (room: Room) => {
      setCurrentRoom(room);
      setOnboardingStep('complete');
      addToast(strings.toasts.roomJoined.replace('{roomName}', room.name), 'success');
    },
    [addToast],
  );

  const handleDismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background pb-20">
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
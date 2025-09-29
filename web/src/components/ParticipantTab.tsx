'use client';

import { useMemo, useState } from 'react';
import { Message, Room, AdlerianPromptDisplay } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { RiskBadge } from '@/components/ui/RiskBadge';
import { Button } from '@/components/ui/Button';
import { ReflectionPromptCard } from '@/components/ReflectionPromptCard';
import { getAdlerianPrompts } from '@/lib/adlerian-prompts';
import appConfig from '@/config/app-config.json';

interface ParticipantTabProps {
  messages: Message[];
  selectedTopic: string | null;
  onSelectTopic: (topic: string | null) => void;
  onSendMessage: (payload: { text: string; urgent: boolean; requestFacilitator: boolean }) => void;
  room: Room | null;
}

const { topics, resources, ui, strings } = appConfig;

export function ParticipantTab({ messages, selectedTopic, onSelectTopic, onSendMessage, room }: ParticipantTabProps) {
  const [message, setMessage] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [requestFacilitator, setRequestFacilitator] = useState(false);
  const [showReflectionPrompts, setShowReflectionPrompts] = useState(true);

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    [messages],
  );

  const characterLimit = ui.messageCharacterLimit;
  const isNearLimit = message.length > characterLimit * 0.9;

  // Get Adlerian reflection prompts based on selected topic
  const reflectionPrompts = useMemo<AdlerianPromptDisplay[]>(() => {
    if (!selectedTopic || !showReflectionPrompts) {
      return [];
    }

    const prompts = getAdlerianPrompts(selectedTopic, 2, 'encouragement');
    return prompts.map(p => ({
      id: p.id,
      question: p.question,
      category: p.category,
      lifeTask: p.lifeTask,
    }));
  }, [selectedTopic, showReflectionPrompts]);

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }

    onSendMessage({
      text: trimmed,
      urgent,
      requestFacilitator,
    });

    setMessage('');
    setUrgent(false);
    setRequestFacilitator(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-6 flex w-full max-w-6xl flex-col gap-6" role="region" aria-label="Participant view" id="participant-panel">
      <section className="rounded-3xl bg-card/90 p-6 shadow-xl shadow-primary/10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-foreground">{strings.participant.welcomeTitle}</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary border border-primary/20">
              <span className="text-xs uppercase tracking-wide text-primary/70">Current room</span>
              {room ? room.name : 'Not joined yet'}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {strings.participant.welcomeDescription}
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-card/90 p-6 shadow-xl shadow-primary/10">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{strings.participant.messagePromptTitle}</h3>
            <p className="text-sm text-muted-foreground">{strings.participant.messagePromptDescription}</p>
          </div>
          <button
            type="button"
            className="text-sm font-semibold text-primary transition hover:text-primary-light"
            onClick={() => onSelectTopic(null)}
            aria-label="Clear topic selection"
          >
            Clear selection
          </button>
        </header>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {topics.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                aria-pressed={isSelected}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary'
                }`}
                onClick={() => onSelectTopic(isSelected ? null : topic.id)}
              >
                <span className="text-xl" aria-hidden="true">{topic.icon}</span>
                <span className="text-sm font-semibold">{topic.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {reflectionPrompts.length > 0 && (
        <ReflectionPromptCard
          prompts={reflectionPrompts}
          title="Before you share, take a moment to reflect"
          description="These questions can help you explore your thoughts more deeply."
          onDismiss={() => setShowReflectionPrompts(false)}
          dismissible={true}
        />
      )}

      <section className="rounded-3xl bg-card/90 p-6 shadow-xl shadow-primary/10">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-foreground">Share your message</h3>
          <span className={`text-xs font-semibold uppercase tracking-[0.3em] ${isNearLimit ? 'text-accent' : 'text-muted-foreground'}`}>
            {message.length} / {characterLimit}
          </span>
        </header>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value.slice(0, characterLimit))}
          onKeyDown={handleKeyDown}
          placeholder={strings.participant.messagePlaceholder}
          className="mt-4 w-full rounded-2xl border border-input bg-card p-4 text-sm leading-relaxed text-foreground shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          rows={4}
          aria-label="Message textarea"
        />
        <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={urgent}
                onChange={(event) => setUrgent(event.target.checked)}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
              />
              {strings.participant.urgentLabel}
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={requestFacilitator}
                onChange={(event) => setRequestFacilitator(event.target.checked)}
                className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
              />
              {strings.participant.requestFacilitatorLabel}
            </label>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!message.trim()}
            aria-label="Send message anonymously"
          >
            {strings.participant.sendButton}
          </Button>
        </div>
      </section>

      <section className="rounded-3xl bg-card/90 p-6 shadow-xl shadow-primary/10">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{strings.participant.communityMessagesTitle}</h3>
            <p className="text-sm text-muted-foreground">{strings.participant.communityMessagesDescription}</p>
          </div>
        </header>
        <div className="mt-5 flex flex-col gap-4">
          {sortedMessages.map((item) => (
            <article key={item.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{item.author}</span>
                <span aria-hidden="true">•</span>
                <span>{formatRelativeTime(item.timestamp)}</span>
                <span aria-hidden="true">•</span>
                <span className="capitalize">{item.topic}</span>
                <RiskBadge risk={item.risk} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-card/90 p-6 shadow-xl shadow-primary/10">
        <h3 className="text-lg font-semibold text-foreground">{strings.participant.resourcesTitle}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <div key={resource.id} className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
              <span className="text-2xl" aria-hidden="true">{resource.icon}</span>
              <p className="mt-3 text-sm font-semibold text-primary">{resource.title}</p>
              <p className="mt-1 text-xs text-primary/80">{resource.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
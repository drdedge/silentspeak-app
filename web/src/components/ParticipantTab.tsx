'use client';

import { useMemo, useState } from 'react';
import { Message, Room } from '@/types';
import { formatRelativeTime } from '@/lib/utils';

interface ParticipantTabProps {
  messages: Message[];
  selectedTopic: string | null;
  onSelectTopic: (topic: string | null) => void;
  onSendMessage: (payload: { text: string; urgent: boolean; requestFacilitator: boolean }) => void;
  room: Room | null;
}

const topics = [
  { id: 'anxiety', label: 'Anxiety', icon: '??' },
  { id: 'school', label: 'School', icon: '??' },
  { id: 'family', label: 'Family', icon: '??' },
  { id: 'friends', label: 'Friends', icon: '??' },
  { id: 'mood', label: 'Mood', icon: '???' },
  { id: 'stress', label: 'Stress', icon: '??' },
  { id: 'lonely', label: 'Loneliness', icon: '??' },
  { id: 'gratitude', label: 'Gratitude', icon: '?' },
  { id: 'other', label: 'Other', icon: '??' },
];

const resources = [
  {
    id: 'crisis',
    title: 'Crisis Helpline',
    description: '24/7 confidential support',
    icon: '??',
  },
  {
    id: 'breathing',
    title: 'Breathing Exercise',
    description: 'Quick calming technique',
    icon: '???',
  },
  {
    id: 'grounding',
    title: 'Grounding Techniques',
    description: 'Stay present and centered',
    icon: '??',
  },
  {
    id: 'chat',
    title: 'Live Chat Support',
    description: 'Connect with a facilitator',
    icon: '??',
  },
];

export function ParticipantTab({ messages, selectedTopic, onSelectTopic, onSendMessage, room }: ParticipantTabProps) {
  const [message, setMessage] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [requestFacilitator, setRequestFacilitator] = useState(false);

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    [messages],
  );

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

  return (
    <div className="mt-6 flex w-full max-w-6xl flex-col gap-6">
      <section className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-violet-100">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-slate-900">Welcome to your safe space</h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-1 text-sm font-semibold text-violet-700">
              <span className="text-xs uppercase tracking-wide text-violet-500">Current room</span>
              {room ? room.name : 'Not joined yet'}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Share what is on your mind anonymously. Facilitators keep an eye on things to make sure everyone stays safe and
            supported.
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-violet-100">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">What is on your mind today?</h3>
            <p className="text-sm text-slate-500">Select a topic to help facilitators triage quicker (optional).</p>
          </div>
          <button
            type="button"
            className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
            onClick={() => onSelectTopic(null)}
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
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                  isSelected
                    ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-lg shadow-violet-200'
                    : 'border-slate-200 text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600'
                }`}
                onClick={() => onSelectTopic(isSelected ? null : topic.id)}
              >
                <span className="text-xl">{topic.icon}</span>
                <span className="text-sm font-semibold">{topic.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-violet-100">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Share your message</h3>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {message.length} / 500
          </span>
        </header>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value.slice(0, 500))}
          placeholder="Type your message here... Remember, you're not alone in this."
          className="mt-4 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-inner focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100"
          rows={4}
        />
        <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={urgent}
                onChange={(event) => setUrgent(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              I need urgent support
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={requestFacilitator}
                onChange={(event) => setRequestFacilitator(event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              Request facilitator attention
            </label>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700"
          >
            <span>Send anonymously</span>
          </button>
        </div>
      </section>

      <section className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-violet-100">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Community messages</h3>
            <p className="text-sm text-slate-500">You are not alone—others are sharing too.</p>
          </div>
        </header>
        <div className="mt-5 flex flex-col gap-4">
          {sortedMessages.map((item) => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{item.author}</span>
                <span>•</span>
                <span>{formatRelativeTime(item.timestamp)}</span>
                <span>•</span>
                <span className="capitalize">{item.topic}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    item.risk === 'high'
                      ? 'bg-rose-50 text-rose-600'
                      : item.risk === 'medium'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {item.risk} risk
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white/90 p-6 shadow-xl shadow-violet-100">
        <h3 className="text-lg font-semibold text-slate-900">Supportive resources</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => (
            <div key={resource.id} className="rounded-2xl border border-violet-100 bg-violet-50 p-4 shadow-sm">
              <span className="text-2xl">{resource.icon}</span>
              <p className="mt-3 text-sm font-semibold text-violet-700">{resource.title}</p>
              <p className="mt-1 text-xs text-violet-600">{resource.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

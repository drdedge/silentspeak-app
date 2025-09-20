import { Message, RiskLevel } from '@/types';

const adjectives = [
  'Gentle',
  'Brave',
  'Thoughtful',
  'Caring',
  'Strong',
  'Wise',
  'Kind',
  'Peaceful',
  'Hopeful',
  'Resilient',
];

const nouns = [
  'Butterfly',
  'Phoenix',
  'Mountain',
  'Ocean',
  'Star',
  'Garden',
  'Rainbow',
  'Sunrise',
  'Moonlight',
  'River',
];

export function generateAnonymousName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 999) + 1;
  return `${adj} ${noun} #${num}`;
}

export function assessRisk(text: string): RiskLevel {
  const loweredText = text.toLowerCase();
  const highRiskTerms = [
    'suicide',
    'kill myself',
    'end it',
    'die',
    'overdose',
    'self-harm',
    'cutting',
    'not safe',
    'hurt myself',
  ];

  const mediumRiskTerms = [
    'panic',
    'anxious',
    'scared',
    'depressed',
    "can't cope",
    'hate myself',
    'worthless',
    'crying',
    'alone',
  ];

  if (highRiskTerms.some((term) => loweredText.includes(term))) {
    return 'high';
  }

  if (mediumRiskTerms.some((term) => loweredText.includes(term))) {
    return 'medium';
  }

  return 'low';
}

export function formatRelativeTime(date: Date) {
  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diffSeconds < 60) {
    return 'just now';
  }

  if (diffSeconds < 3600) {
    return `${Math.floor(diffSeconds / 60)}m ago`;
  }

  if (diffSeconds < 86400) {
    return `${Math.floor(diffSeconds / 3600)}h ago`;
  }

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

export function createDemoMessage(id: number, text: string, overrides: Partial<Message> = {}): Message {
  const timestamp = overrides.timestamp ?? new Date();
  const risk = overrides.risk ?? assessRisk(text);

  return {
    id,
    text,
    author: overrides.author ?? generateAnonymousName(),
    timestamp,
    topic: overrides.topic ?? 'general',
    risk,
    urgent: overrides.urgent ?? false,
    queued: overrides.queued ?? risk === 'high',
    reviewed: overrides.reviewed ?? risk === 'low',
    approved: overrides.approved ?? true,
  };
}

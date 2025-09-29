import { Message, RiskLevel } from '@/types';
import appConfig from '@/config/app-config.json';

const { anonymousNames, riskAssessment } = appConfig;

export function generateAnonymousName(): string {
  const adj = anonymousNames.adjectives[Math.floor(Math.random() * anonymousNames.adjectives.length)];
  const noun = anonymousNames.nouns[Math.floor(Math.random() * anonymousNames.nouns.length)];
  const num = Math.floor(Math.random() * 999) + 1;
  return `${adj} ${noun} #${num}`;
}

export function assessRisk(text: string): RiskLevel {
  if (!text || typeof text !== 'string') {
    return 'low';
  }

  const loweredText = text.toLowerCase();

  if (riskAssessment.highRiskTerms.some((term) => loweredText.includes(term))) {
    return 'high';
  }

  if (riskAssessment.mediumRiskTerms.some((term) => loweredText.includes(term))) {
    return 'medium';
  }

  return 'low';
}

export function formatRelativeTime(date: Date): string {
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
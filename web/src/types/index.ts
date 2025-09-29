export type RiskLevel = 'low' | 'medium' | 'high';

export interface Message {
  id: number;
  text: string;
  author: string;
  timestamp: Date;
  topic: string;
  risk: RiskLevel;
  urgent: boolean;
  queued: boolean;
  reviewed: boolean;
  approved: boolean;
  reflectionContext?: string; // Optional Adlerian life task context
}

export interface AdlerianPromptDisplay {
  id: string;
  question: string;
  category: string;
  lifeTask: string;
}

export interface FacilitatorInsight {
  theme: string;
  focus: string;
  suggestedApproach: string[];
  encouragementTemplate: string;
}

export interface Room {
  id: string;
  name: string;
  time: string;
  focus: string;
  availability: string;
  dateLabel: string;
}

export interface RoomGroup {
  label: string;
  rooms: Array<Omit<Room, 'dateLabel'>>;
}

export type OnboardingStep = 'signIn' | 'terms' | 'profile' | 'rooms' | 'complete';

export type ProfileSelection = 'anonymous' | 'custom';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

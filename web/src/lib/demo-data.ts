import { Message, RoomGroup } from '@/types';
import { assessRisk, createDemoMessage } from './utils';

export const demoMessagesSeed: Array<Omit<Message, 'id'>> = [
  {
    text: "I'm feeling really anxious about my exams coming up.",
    author: 'Quiet Willow #17',
    timestamp: new Date(Date.now() - 1000 * 60 * 32),
    topic: 'school',
    risk: assessRisk("I'm feeling really anxious about my exams coming up."),
    urgent: false,
    queued: false,
    reviewed: true,
    approved: true,
  },
  {
    text: 'Today was actually a good day. I went for a walk and felt peaceful.',
    author: 'Bright River #744',
    timestamp: new Date(Date.now() - 1000 * 60 * 58),
    topic: 'mood',
    risk: 'low',
    urgent: false,
    queued: false,
    reviewed: true,
    approved: true,
  },
  {
    text: "Sometimes I feel like nobody understands what I'm going through.",
    author: 'Caring Star #203',
    timestamp: new Date(Date.now() - 1000 * 60 * 85),
    topic: 'lonely',
    risk: 'medium',
    urgent: false,
    queued: true,
    reviewed: false,
    approved: false,
  },
  {
    text: 'Thank you to whoever posted about breathing exercises. It really helped!',
    author: 'Gentle Garden #521',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    topic: 'gratitude',
    risk: 'low',
    urgent: false,
    queued: false,
    reviewed: true,
    approved: true,
  },
  {
    text: "My family doesn't get why I need space sometimes.",
    author: 'Hopeful Sunrise #89',
    timestamp: new Date(Date.now() - 1000 * 60 * 160),
    topic: 'family',
    risk: 'medium',
    urgent: false,
    queued: true,
    reviewed: false,
    approved: false,
  },
];

export function buildDemoMessages(): Message[] {
  return demoMessagesSeed.map((message, index) =>
    createDemoMessage(index + 1, message.text, message),
  );
}

export const roomSchedule: RoomGroup[] = [
  {
    label: 'Today',
    rooms: [
      {
        id: 'today-grounding',
        name: 'Grounding Circle',
        time: '2:00 PM',
        focus: 'Breathing and mindfulness',
        availability: '3 spots left',
      },
      {
        id: 'today-reflection',
        name: 'Evening Reflections',
        time: '7:00 PM',
        focus: 'Gratitude check-in',
        availability: 'Open seating',
      },
    ],
  },
  {
    label: 'Tomorrow',
    rooms: [
      {
        id: 'tomorrow-resilience',
        name: 'Resilience Builder',
        time: '10:00 AM',
        focus: 'Coping skills lab',
        availability: '2 facilitators on call',
      },
      {
        id: 'tomorrow-story-share',
        name: 'Story Share',
        time: '4:00 PM',
        focus: 'Wins and challenges',
        availability: 'Limited to 12 participants',
      },
    ],
  },
  {
    label: 'Later This Week',
    rooms: [
      {
        id: 'weekend-grounding',
        name: 'Weekend Grounding',
        time: 'Saturday 11:00 AM',
        focus: 'Mindful breathing sequence',
        availability: '5 spots left',
      },
      {
        id: 'weekend-reset',
        name: 'Sunday Reset',
        time: 'Sunday 5:00 PM',
        focus: 'Intention setting for the week',
        availability: 'Waitlist available',
      },
    ],
  },
];

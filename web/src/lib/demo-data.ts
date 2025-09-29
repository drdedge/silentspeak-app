import { Message, RoomGroup } from '@/types';
import { assessRisk, createDemoMessage } from './utils';
import appConfig from '@/config/app-config.json';

export function buildDemoMessages(): Message[] {
  return appConfig.demoMessages.map((message, index) => {
    const timestamp = new Date(Date.now() - message.minutesAgo * 60 * 1000);
    return createDemoMessage(index + 1, message.text, {
      author: message.author,
      timestamp,
      topic: message.topic,
      risk: assessRisk(message.text),
      urgent: message.urgent,
      queued: message.queued,
      reviewed: message.reviewed,
      approved: message.approved,
    });
  });
}

export const roomSchedule: RoomGroup[] = appConfig.roomSchedule as RoomGroup[];
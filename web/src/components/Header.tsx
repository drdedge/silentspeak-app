'use client';

import { Room } from '@/types';

interface HeaderProps {
  userCount: number;
  facilitatorCount: number;
  currentRoom: Room | null;
}

export function Header({ userCount, facilitatorCount, currentRoom }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-violet-400 text-2xl font-semibold text-white">
            SS
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">SilentSpeak</h1>
            <p className="text-sm text-slate-500">Safe, anonymous peer support with facilitator oversight</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            System active
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{userCount}</span>
            Active users
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{facilitatorCount}</span>
            Facilitators online
          </div>
          <div className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-violet-700">
            <span className="text-xs uppercase tracking-wide text-violet-500">Room</span>
            <span className="font-semibold text-violet-700">
              {currentRoom ? currentRoom.name : 'Select a room'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

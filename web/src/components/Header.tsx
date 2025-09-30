'use client';

import { Room } from '@/types';

interface HeaderProps {
  userCount: number;
  facilitatorCount: number;
  currentRoom: Room | null;
}

export function Header({ userCount, facilitatorCount, currentRoom }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light">
            <span className="text-primary-foreground font-bold text-2xl">🔉</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">SilentSpeak</h1>
            <p className="text-sm text-muted-foreground">Safe, anonymous peer support with facilitator oversight</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            System active
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{userCount}</span>
            Active users
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{facilitatorCount}</span>
            Facilitators online
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary border border-primary/20">
            <span className="text-xs uppercase tracking-wide text-primary/70">Room</span>
            <span className="font-semibold">
              {currentRoom ? currentRoom.name : 'Select a room'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
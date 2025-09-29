'use client';

interface TabButtonsProps {
  activeTab: 'participant' | 'facilitator';
  onChange: (tab: 'participant' | 'facilitator') => void;
}

export function TabButtons({ activeTab, onChange }: TabButtonsProps) {
  return (
    <div className="flex w-full max-w-6xl rounded-3xl bg-card/80 p-1 shadow-lg shadow-primary/10" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'participant'}
        aria-controls="participant-panel"
        className={`flex-1 rounded-3xl px-6 py-3 text-sm font-semibold transition ${
          activeTab === 'participant'
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
            : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
        }`}
        onClick={() => onChange('participant')}
      >
        Share your thoughts
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'facilitator'}
        aria-controls="facilitator-panel"
        className={`flex-1 rounded-3xl px-6 py-3 text-sm font-semibold transition ${
          activeTab === 'facilitator'
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/40'
            : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
        }`}
        onClick={() => onChange('facilitator')}
      >
        Facilitator dashboard
      </button>
    </div>
  );
}
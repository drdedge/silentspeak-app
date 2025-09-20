'use client';

interface TabButtonsProps {
  activeTab: 'participant' | 'facilitator';
  onChange: (tab: 'participant' | 'facilitator') => void;
}

export function TabButtons({ activeTab, onChange }: TabButtonsProps) {
  return (
    <div className="flex w-full max-w-6xl rounded-3xl bg-white/80 p-1 shadow-lg shadow-violet-200/50">
      <button
        type="button"
        className={`flex-1 rounded-3xl px-6 py-3 text-sm font-semibold transition ${
          activeTab === 'participant'
            ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40'
            : 'text-slate-500 hover:bg-violet-50 hover:text-violet-600'
        }`}
        onClick={() => onChange('participant')}
      >
        Share your thoughts
      </button>
      <button
        type="button"
        className={`flex-1 rounded-3xl px-6 py-3 text-sm font-semibold transition ${
          activeTab === 'facilitator'
            ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40'
            : 'text-slate-500 hover:bg-violet-50 hover:text-violet-600'
        }`}
        onClick={() => onChange('facilitator')}
      >
        Facilitator dashboard
      </button>
    </div>
  );
}

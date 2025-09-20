"use client";

import { useMemo, useState } from "react";
import { Message } from "@/types";
import { formatRelativeTime } from "@/lib/utils";

interface FacilitatorTabProps {
  messages: Message[];
  onApprove: (messageId: number) => void;
  onMarkReviewed: (messageId: number) => void;
  onRemoveFromQueue: (messageId: number) => void;
}

export function FacilitatorTab({ messages, onApprove, onMarkReviewed, onRemoveFromQueue }: FacilitatorTabProps) {
  const [riskFilter, setRiskFilter] = useState<"all" | "high" | "medium" | "low">("all");

  const queue = useMemo(() => messages.filter((message) => message.queued), [messages]);

  const stats = useMemo(() => {
    const totalMessages = messages.length;
    const queuedCount = queue.length;
    const highRiskCount = messages.filter((message) => message.risk === "high").length;
    const reviewedCount = messages.filter((message) => message.reviewed).length;

    return {
      totalMessages,
      queuedCount,
      highRiskCount,
      reviewedCount,
      avgResponse: queuedCount ? `${Math.max(1, Math.round(queuedCount * 2.3))}m` : "2m",
    };
  }, [messages, queue.length]);

  const filteredMessages = useMemo(() => {
    if (riskFilter === "all") {
      return messages;
    }
    return messages.filter((message) => message.risk === riskFilter);
  }, [messages, riskFilter]);

  return (
    <div className="mt-6 flex w-full max-w-6xl flex-col gap-6">
      <section className="rounded-3xl bg-white/95 p-6 shadow-xl shadow-violet-100">
        <h2 className="text-lg font-semibold text-slate-900">Triage snapshot</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total messages" value={stats.totalMessages.toString()} accent="bg-violet-100 text-violet-700" />
          <StatCard label="In queue" value={stats.queuedCount.toString()} accent="bg-amber-100 text-amber-700" />
          <StatCard label="High priority" value={stats.highRiskCount.toString()} accent="bg-rose-100 text-rose-700" />
          <StatCard label="Reviewed today" value={stats.reviewedCount.toString()} accent="bg-emerald-100 text-emerald-700" />
        </div>
      </section>

      <section className="rounded-3xl bg-white/95 p-6 shadow-xl shadow-violet-100">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Priority queue</h3>
            <p className="text-sm text-slate-500">High-risk or facilitator flagged messages waiting for review.</p>
          </div>
          <div className="text-sm text-slate-500">Avg response: {stats.avgResponse}</div>
        </header>
        <div className="mt-4 space-y-3">
          {queue.length === 0 && (
            <p className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
              The queue is clear. Great job staying on top of things!
            </p>
          )}
          {queue.map((message) => (
            <article key={message.id} className="rounded-2xl border border-amber-100 bg-white p-5 shadow-md">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-700">{message.risk} risk</span>
                <span className="text-slate-400">{formatRelativeTime(message.timestamp)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{message.text}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-emerald-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 transition hover:bg-emerald-200"
                  onClick={() => onApprove(message.id)}
                >
                  Approve for feed
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:bg-slate-100"
                  onClick={() => onMarkReviewed(message.id)}
                >
                  Mark as reviewed
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-rose-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-rose-700 transition hover:bg-rose-200"
                  onClick={() => onRemoveFromQueue(message.id)}
                >
                  Remove from queue
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white/95 p-6 shadow-xl shadow-violet-100">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Live message feed</h3>
            <p className="text-sm text-slate-500">Filter by risk level to focus your review.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 text-xs font-semibold text-slate-600">
            {["all", "high", "medium", "low"].map((filter) => (
              <button
                key={filter}
                type="button"
                className={`rounded-full px-4 py-1 capitalize transition ${
                  riskFilter === filter ? "bg-violet-600 text-white shadow-md shadow-violet-600/30" : "hover:bg-white"
                }`}
                onClick={() => setRiskFilter(filter as typeof riskFilter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>
        <div className="mt-4 space-y-3">
          {filteredMessages.map((message) => (
            <article key={message.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                <span className="font-semibold text-slate-600">{message.author}</span>
                <span>-</span>
                <span>{formatRelativeTime(message.timestamp)}</span>
                <span>-</span>
                <span className="capitalize">{message.topic}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    message.risk === "high"
                      ? "bg-rose-50 text-rose-600"
                      : message.risk === "medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {message.risk} risk
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{message.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  accent: string;
}

function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`inline-flex rounded-xl px-3 py-1 text-xs font-semibold uppercase tracking-wide ${accent}`}>
        {label}
      </div>
      <div className="mt-4 text-3xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

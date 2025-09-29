"use client";

import { useMemo, useState, memo } from "react";
import { Message, RiskLevel } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { Button } from "@/components/ui/Button";
import { getFacilitatorGuidance } from "@/lib/adlerian-prompts";
import appConfig from "@/config/app-config.json";

interface FacilitatorTabProps {
  messages: Message[];
  onApprove: (messageId: number) => void;
  onMarkReviewed: (messageId: number) => void;
  onRemoveFromQueue: (messageId: number) => void;
}

const { strings } = appConfig;

export function FacilitatorTab({ messages, onApprove, onMarkReviewed, onRemoveFromQueue }: FacilitatorTabProps) {
  const [riskFilter, setRiskFilter] = useState<"all" | RiskLevel>("all");
  const [expandedGuidance, setExpandedGuidance] = useState<number | null>(null);

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
    <div className="mt-6 flex w-full max-w-6xl flex-col gap-6" role="region" aria-label="Facilitator view" id="facilitator-panel">
      <section className="rounded-3xl bg-card/95 p-6 shadow-xl shadow-primary/10">
        <h2 className="text-lg font-semibold text-foreground">{strings.facilitator.statsTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label={strings.facilitator.statLabels.totalMessages}
            value={stats.totalMessages.toString()}
            accent="bg-primary/10 text-primary border-primary/20"
          />
          <StatCard
            label={strings.facilitator.statLabels.inQueue}
            value={stats.queuedCount.toString()}
            accent="bg-accent/10 text-accent border-accent/20"
          />
          <StatCard
            label={strings.facilitator.statLabels.highPriority}
            value={stats.highRiskCount.toString()}
            accent="bg-destructive/10 text-destructive border-destructive/20"
          />
          <StatCard
            label={strings.facilitator.statLabels.reviewedToday}
            value={stats.reviewedCount.toString()}
            accent="bg-secondary/10 text-secondary border-secondary/20"
          />
        </div>
      </section>

      <section className="rounded-3xl bg-card/95 p-6 shadow-xl shadow-primary/10">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{strings.facilitator.queueTitle}</h3>
            <p className="text-sm text-muted-foreground">{strings.facilitator.queueDescription}</p>
          </div>
          <div className="text-sm text-muted-foreground">Avg response: {stats.avgResponse}</div>
        </header>
        <div className="mt-4 space-y-3">
          {queue.length === 0 && (
            <p className="rounded-2xl border border-border bg-muted p-6 text-sm text-muted-foreground">
              {strings.facilitator.queueEmptyMessage}
            </p>
          )}
          {queue.map((message) => {
            const guidance = getFacilitatorGuidance(message.text, message.topic, message.risk);
            const isExpanded = expandedGuidance === message.id;

            return (
              <article key={message.id} className="rounded-2xl border border-accent/30 bg-card p-5 shadow-md">
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]">
                  <RiskBadge risk={message.risk} />
                  <span className="text-muted-foreground">{formatRelativeTime(message.timestamp)}</span>
                  <span className="text-muted-foreground capitalize">• {message.topic}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{message.text}</p>

                {/* Adlerian Guidance Section */}
                <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <button
                    type="button"
                    onClick={() => setExpandedGuidance(isExpanded ? null : message.id)}
                    className="flex w-full items-center justify-between text-left"
                    aria-expanded={isExpanded}
                    aria-controls={`guidance-${message.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base" aria-hidden="true">💡</span>
                      <span className="text-sm font-semibold text-primary">Adlerian Response Guidance</span>
                    </div>
                    <svg
                      className={`h-5 w-5 text-primary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div id={`guidance-${message.id}`} className="mt-4 space-y-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">Theme Identified</p>
                        <p className="mt-1 text-sm text-primary">{guidance.theme}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">Therapeutic Focus</p>
                        <p className="mt-1 text-sm text-primary">{guidance.focus}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">Suggested Approach</p>
                        <ul className="mt-2 space-y-1">
                          {guidance.suggestedApproach.map((approach, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-primary">
                              <span className="text-primary/60">•</span>
                              <span className="flex-1">{approach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">Encouragement Template</p>
                        <p className="mt-1 rounded-lg bg-primary/10 p-3 text-sm italic text-primary">
                          &ldquo;{guidance.encouragementTemplate}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onApprove(message.id)}
                    aria-label={`Approve message ${message.id} for feed`}
                  >
                    {strings.facilitator.approveButton}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMarkReviewed(message.id)}
                    aria-label={`Mark message ${message.id} as reviewed`}
                  >
                    {strings.facilitator.markReviewedButton}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onRemoveFromQueue(message.id)}
                    aria-label={`Remove message ${message.id} from queue`}
                  >
                    {strings.facilitator.removeFromQueueButton}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl bg-card/95 p-6 shadow-xl shadow-primary/10">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{strings.facilitator.feedTitle}</h3>
            <p className="text-sm text-muted-foreground">{strings.facilitator.feedDescription}</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-muted p-1 text-xs font-semibold text-muted-foreground" role="group" aria-label="Risk filter">
            {(["all", "high", "medium", "low"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={riskFilter === filter}
                className={`rounded-full px-4 py-1 capitalize transition ${
                  riskFilter === filter ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "hover:bg-card"
                }`}
                onClick={() => setRiskFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>
        <div className="mt-4 space-y-3">
          {filteredMessages.map((message) => (
            <article key={message.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span className="font-semibold text-foreground">{message.author}</span>
                <span aria-hidden="true">-</span>
                <span>{formatRelativeTime(message.timestamp)}</span>
                <span aria-hidden="true">-</span>
                <span className="capitalize">{message.topic}</span>
                <RiskBadge risk={message.risk} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{message.text}</p>
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

const StatCard = memo(function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className={`inline-flex rounded-xl border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${accent}`}>
        {label}
      </div>
      <div className="mt-4 text-3xl font-semibold text-foreground">{value}</div>
    </div>
  );
});
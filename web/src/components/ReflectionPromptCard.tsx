'use client';

import { useState } from 'react';
import { AdlerianPromptDisplay } from '@/types';

interface ReflectionPromptCardProps {
  prompts: AdlerianPromptDisplay[];
  title?: string;
  description?: string;
  onDismiss?: () => void;
  dismissible?: boolean;
  className?: string;
}

/**
 * Reflection Prompt Card Component
 *
 * Displays Adlerian therapeutic prompts in an accessible, non-intrusive manner.
 * Used throughout the application to encourage healthy self-reflection based on
 * evidence-based Adlerian group therapy principles.
 *
 * Key Features:
 * - Optional dismissal for user control
 * - Accessible (ARIA labels, keyboard navigation)
 * - Matches existing SilentSpeak design system
 * - Encouragement-focused (not judgmental)
 *
 * See: docs/adlerian-prompts-group-therapy.md
 */
export function ReflectionPromptCard({
  prompts,
  title = 'Take a moment to reflect',
  description,
  onDismiss,
  dismissible = true,
  className = '',
}: ReflectionPromptCardProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || prompts.length === 0) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div
      className={`rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-sm ${className}`}
      role="complementary"
      aria-label="Reflection prompts"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">
              💭
            </span>
            <h3 className="text-base font-semibold text-primary">{title}</h3>
          </div>
          {description && (
            <p className="mt-1 text-sm text-primary/80">{description}</p>
          )}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-lg p-1 text-primary/60 transition hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Dismiss reflection prompts"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      <ul className="mt-4 space-y-3">
        {prompts.map((prompt) => (
          <li key={prompt.id} className="flex items-start gap-2">
            <span className="mt-0.5 text-primary/60" aria-hidden="true">
              •
            </span>
            <span className="flex-1 text-sm leading-relaxed text-primary">
              {prompt.question}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-xs text-primary/60">
        These questions are designed to help you explore your thoughts. There are no right or wrong answers.
      </div>
    </div>
  );
}

/**
 * Compact Reflection Prompt Variant
 *
 * Displays a single prompt in a more compact format, suitable for inline use.
 */
interface CompactReflectionPromptProps {
  prompt: AdlerianPromptDisplay;
  onDismiss?: () => void;
  className?: string;
}

export function CompactReflectionPrompt({
  prompt,
  onDismiss,
  className = '',
}: CompactReflectionPromptProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-primary/15 bg-primary/5 p-3 ${className}`}
      role="complementary"
      aria-label="Reflection prompt"
    >
      <span className="text-base" aria-hidden="true">
        💭
      </span>
      <p className="flex-1 text-sm leading-relaxed text-primary">{prompt.question}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded p-1 text-primary/50 transition hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          aria-label="Dismiss prompt"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
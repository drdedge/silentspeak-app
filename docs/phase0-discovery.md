# SilentSpeak Phase 0 – Discovery & Architecture

## 1. Product Vision & Success Criteria
- Deliver a polished demo web app that showcases anonymous peer support with facilitator oversight and crisis escalation hooks.
- Demonstrate end-to-end flow: lightweight credential capture, consent to guidelines, profile selection, room entry, posting messages, and seeing facilitator feedback.
- Maintain a "safety-first" narrative: clearly communicate moderation boundaries, privacy promises, and escalation procedures.
- Success metrics for demo: fast happy-path walkthrough (<10 minutes), zero PII leakage in logs, visibly responsive real-time updates, and accessible interactions (WCAG AA focus states, screen-reader labels).

## 2. Personas & Key Journeys
### Participant (anonymous or custom alias)
- Needs: quick access to share feelings anonymously, receive support resources, react to messages, feel safe.
- Critical journey (Phase 0 prototype): open overlay sign-in ? enter demo username/password (no backend validation) ? review and accept guidelines ? pick predefined profile or anonymous entry ? select available room ? post/read messages.

### Facilitator (moderator / counselor)
- Needs: triage queue with risk indicators, ability to approve/flag/escalate messages, respond with resources, log notes.
- Critical journey: sign in (email magic link) ? review new messages ? respond or escalate ? log notes for session.

### Clinical Supervisor (oversight / quality assurance)
- Needs: visibility into facilitator activity, ability to audit escalations and ensure compliance.
- Critical journey: sign in ? review audit log & metrics ? spot-check facilitator notes ? export summary.

### Platform Admin (technical / operations)
- Needs: manage system configuration, monitor health, coordinate releases, manage feature flags.
- Critical journey: authenticate ? inspect observability dashboard ? update resources/content ? verify deployment status.

## 3. Proposed Architecture & Stack
- **Frontend:** Next.js 14 (App Router) with TypeScript, leveraging either Tailwind CSS or CSS Modules + tokens extracted from current demo.
- **State/Data:** Supabase JavaScript client (auth, Postgres, Realtime) with Zod-based validation and React Query/Server Actions for data fetching.
- **Backend logic:** Next.js Route Handlers or Edge Functions for secure server-side operations; Supabase Edge Functions for facilitator alerts/crisis protocols.
- **Database:** Supabase Postgres with structured tables (`profiles`, `sessions`, `messages`, `message_reactions`, `alerts`, `resources`, `facilitator_notes`, `audit_logs`).
- **Auth:** Supabase Auth (anonymous sessions for participants, magic link for staff) with role-based access enforced through Row Level Security.
- **Infrastructure:** Vercel for hosting (preview + production); Supabase project aligned to same region for minimal latency; GitHub (or GitLab) repo for source control & CI.
- **Tooling:** ESLint + Prettier + TypeScript strict mode, Husky/lint-staged, Vitest + Testing Library, Playwright for E2E, Storybook for component exploration.
- **Observability:** Sentry (errors), Logflare/Supabase for structured logs, Vercel analytics; optional PostHog for product analytics with PII scrubbing.

## 4. Non-Functional Requirements (Initial Pass)
- **Accessibility:** WCAG 2.1 AA compliance, semantic HTML, keyboard-only support, color contrast = 4.5:1, screen-reader cues for risk indicators.
- **Security & Privacy:** Enforce HTTPS, secure cookies, CSP and CORP headers, RLS on all tables, audit logging, rate limiting on submissions, scoped Supabase keys.
- **Performance:** Initial load < 2s on mid-tier devices, real-time updates under 400ms latency, core web vitals (LCP < 2.5s, CLS < 0.1).
- **Reliability:** Graceful degradation when Supabase realtime unavailable, persisted client state, crisis workflows retriable.
- **Compliance posture:** Align with HIPAA-adjacent best practices (even if not formally required): data minimization, encryption at rest (Supabase default), documented escalation SOP.
- **Observability:** Centralized logging for facilitator actions, metrics dashboards (queue length, response times), synthetic health check.

## 5. Phase 0 Prototype Deliverable
- Modal-style overlays for sign-in and T&Cs centered on the viewport, leaving background context visible.
- Dummy credential capture (username/password with login & signup buttons) that transitions to guideline acceptance without server validation.
- Scrollable terms & community guidelines card with Accept / Reject CTA; rejection returns to sign-in overlay.
- Profile selection card providing a predefined custom profile preview and an anonymous option (anonymous is default assumption for future phases).
- Session/room picker grouped by date with available rooms; selection takes user into the participant experience.
- Implementation now lives in `web/` (Next.js + TypeScript + Tailwind) with modular onboarding, participant, and facilitator components ready for Vercel.

## 6. Assumptions & Open Questions
- Authentication: confirm whether facilitators require institution-issued emails or single-use demo logins.
- Crisis protocol: define actual downstream integrations (Twilio SMS, email) vs. simulated notifications for demo.
- Data residency/compliance: identify regional constraints (US vs. EU) for Supabase project.
- Content guidelines: finalize copy for community standards and onboarding consent flow.
- Analytics: clarify acceptable tracking level for demo (can we use third-party tools?).
- Future roadmap: determine priority of AI-assisted triage or mobile companion app for subsequent phases.

> **Action:** review and annotate this document with confirmations/changes so Phase 1 setup tasks can proceed with fewer unknowns.

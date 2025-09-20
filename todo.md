# SilentSpeak Web App TODO

Planning board for evolving the current static demo (`silentspeak_demo.html`) into a production-quality, Vercel-hosted application backed by Supabase.

## Phase 0 - Discovery & Architecture
- [x] Document demo flows/personas/non-functional requirements in `docs/phase0-discovery.md`.
- [x] Build in-page overlays for sign-in -> guidelines -> profile -> room selection using static data to validate UX.
- [ ] Collect feedback on prototype overlays and adjust copy/interactions before Supabase wiring in Phase 5.

## Phase 1 - Repository & Project Setup
- [ ] Create new git repo (if not already) and import existing `silentspeak_demo.html` under `legacy/` for reference.
- [x] Scaffold Next.js app (`npx create-next-app@latest`) with TypeScript, ESLint, Prettier, and testing harness (Vitest/Testing Library or Jest).
- [ ] Configure absolute imports/aliases, lint-staged + Husky pre-commit hooks, commit message style (Conventional Commits).
- [ ] Establish shared UI tokens/theme (colors, typography) extracted from the current demo; document in `design/tokens.json`.

## Phase 2 - Environment & Config
- [ ] Provision Supabase project (matching Vercel region) and capture project URL, Anon Key, Service Role key.
- [ ] Add `.env.local.example` covering Supabase keys, Vercel analytics token, feature flags; wire to Vercel environment variables.
- [ ] Decide secrets management strategy (Vercel env + Supabase Vault as needed); document rotation cadence.
- [ ] Set up Vercel project, connect to repo, configure production & preview branches.

## Phase 3 - Data Modeling & Supabase
- [ ] Design ERD covering: `profiles`, `sessions`, `messages`, `message_reactions`, `alerts`, `resources`, `facilitator_notes`, `audit_logs`.
- [ ] Implement Supabase SQL migrations using `supabase db push` or `drizzle-kit`; store under `supabase/migrations`.
- [ ] Implement Row Level Security policies aligning with personas (participants only see anonymized data, facilitators see assigned queues, supervisors have elevated access).
- [ ] Seed fixture data for demo environments (non-identifiable dummy content).
- [ ] Create Supabase edge functions (if needed) for escalation workflows and scheduled digests.

## Phase 4 - Core Web App Shell
- [ ] Build application layout (header, tab system, responsive grid) translating the static HTML into Next.js shared components.
- [ ] Establish global styling with CSS variables/Tailwind config, ensure WCAG AA color contrast and keyboard focus states.
- [ ] Implement app routing (App Router) with protected routes for facilitator/admin views.
- [ ] Add error boundaries, loading states, and skeletons for key panels.

## Phase 5 - Participant Experience
- [ ] Implement anonymous onboarding flow (nickname generator, agreement to community guidelines) persisted in Supabase anonymous auth session.
- [ ] Build message compose panel with real-time validation, topic tagging, risk assessment stub (server evaluated later).
- [ ] Render live participant feed sourced from Supabase `messages` table, replacing in-memory demo data.
- [ ] Add reaction buttons, gratitude prompts, and supportive resource cards; ensure writes propagate via Supabase Realtime subscriptions.
- [ ] Provide resource library modal with curated links, breathing exercises, grounding techniques (content managed in Supabase `resources`).

## Phase 6 - Facilitator & Oversight Tools
- [ ] Create facilitator dashboard with triage queue, message detail drawer, and escalation controls tied to Supabase data.
- [ ] Implement filters for risk level, topic, and status using Supabase full-text search/indices.
- [ ] Replace mocked metrics (active users, sessions) with Supabase SQL views or edge functions.
- [ ] Build session summary timeline and note-taking capabilities, persisting to `facilitator_notes`.
- [ ] Add crisis protocol trigger that calls Supabase edge function (SMS/email via Twilio/SendGrid placeholders for demo).

## Phase 7 - Integrations & Services
- [ ] Configure Supabase Auth (email magic links for facilitators, anonymous sessions for participants) and build role assignment automation.
- [ ] Hook Supabase Realtime for message queue updates and facilitator alerts; validate optimistic UI fallbacks.
- [ ] Implement serverless actions (Next.js Route Handlers or Edge Functions) for message ingestion, risk classification stubs, and analytics logging.
- [ ] Integrate monitoring/logging (e.g., Sentry, PostHog) with data scrubbing to avoid PII leakage.

## Phase 8 - Security, Privacy & Compliance
- [ ] Enforce strict RLS, JWT verification in Next.js API routes, and rate-limiting on message submission endpoints.
- [ ] Add audit logging for facilitator actions (approvals, escalations) with tamper-proof storage.
- [ ] Review CORS, CSP, and cookie settings; enable Supabase auth helpers w/ secure cookies in production.
- [ ] Draft privacy policy & terms placeholders for demo; collect minimal telemetry.

## Phase 9 - QA, Tooling & Observability
- [ ] Set up unit tests for UI helpers (message formatting, risk badges) and Supabase client utilities.
- [ ] Implement integration tests (Playwright/Cypress) covering participant submit flow and facilitator triage path.
- [ ] Add Storybook (or similar) for critical components to aid design review.
- [ ] Create synthetic monitoring script hitting health check endpoint post-deploy.

## Phase 10 - Deployment & DevOps
- [ ] Configure Vercel preview builds on PRs with Supabase branch DB or seeded schema.
- [ ] Add CI pipeline (GitHub Actions) running lint, test, type-check, and Supabase migration diff.
- [ ] Set up production deploy workflow with manual promotion after facilitator sign-off.
- [ ] Document rollback plan (previous Vercel deployment + Supabase point-in-time recovery).

## Phase 11 - Documentation & Demo Prep
- [ ] Update `README.md` with project overview, architecture diagram, Supabase migration commands, and run instructions.
- [ ] Provide facilitator demo script, including sample scenarios and expected talking points.
- [ ] Record short loom or gather screenshots for async demos; store assets in `docs/`.
- [ ] Collect open questions and parking lot items in `docs/risks.md` for follow-up sprints.

## Known Gaps & Follow-Ups
- [ ] Replace all inline script logic from `silentspeak_demo.html` with modularized React/TypeScript components.
- [ ] Recreate anonymized name generator, toast system, and state store with hooks/context; remove `window` global dependencies.
- [ ] Validate placeholder copy (notably broken encoding in demo text) and align with brand voice.
- [ ] Plan content moderation workflow (manual vs automated) and tooling for future integration.
- [ ] Evaluate future roadmap items (AI-assisted triage, analytics dashboards, mobile app parity) and capture separately.


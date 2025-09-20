# Technical Debt

Tracking shortcuts made while standing up the Phase 0 onboarding demo.

## Onboarding Prototype
- [ ] Replace mock sign-in with real authentication (Supabase anon auth for participants, magic link for facilitators) and remove plain-text password storage.
- [ ] Swap static guidelines copy for content sourced from CMS or markdown file so comms/legal can update without code changes.
- [ ] Add accessibility polish to overlays (focus trap, aria-live for toasts, keyboard shortcuts, reduce repeated toast spam on profile clicks).
- [ ] Persist profile choice and selected room per session so refreshes keep state and future Supabase integration can reuse the values.
- [ ] Replace hard-coded room schedule with data from Supabase tables and support pagination/availability updates.
- [ ] Harden error handling (invalid inputs, API failures) once networking is hooked up; today everything assumes happy path.

## Legacy Demo
- [ ] Clean up legacy special-character artifacts (e.g., `dY` glyphs) before porting components into the Next.js build.
- [ ] Extract inline CSS/JS into modules during Phase 4 rewrite to avoid monolithic single-file maintenance.
## Project Setup
- [ ] Add automated testing harness (Vitest/Testing Library) and CI scripts to cover key participant/facilitator flows.
- [ ] Wire up lint-staged + Husky pre-commit hooks once repo moves under git source control.

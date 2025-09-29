# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SilentSpeak is a mental health support platform that provides anonymous messaging capabilities with facilitator oversight. It's built with Next.js (App Router) and deployed to GitHub Pages.

## Architecture

The application is a **Next.js 15** static export with:
- **Framework**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useCallback, useMemo) in client component
- **Deployment**: Static export to GitHub Pages via GitHub Actions
- **Base Path**: Configured for `/silentspeak-app` subdirectory deployment

### Directory Structure

```
web/                          # Main Next.js application
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with global styles
│   │   └── page.tsx         # Main page - central state management
│   ├── components/          # React components
│   │   ├── Header.tsx       # User counts and room info display
│   │   ├── TabButtons.tsx   # Participant/Facilitator tab switcher
│   │   ├── ParticipantTab.tsx    # Anonymous messaging interface
│   │   ├── FacilitatorTab.tsx    # Moderation queue interface
│   │   ├── OnboardingOverlay.tsx # Multi-step onboarding flow
│   │   └── ToastTray.tsx    # Toast notification system
│   ├── lib/
│   │   ├── utils.ts         # Risk assessment, name generation, formatters
│   │   └── demo-data.ts     # Seed messages and room schedule
│   └── types/
│       └── index.ts         # TypeScript interfaces
├── next.config.ts           # Next.js config with static export settings
├── tsconfig.json
└── package.json

legacy/                       # Original standalone HTML prototype
├── silentspeak_demo.html
```

## Key Concepts

### State Management ([page.tsx](web/src/app/page.tsx))
All application state lives in the main `page.tsx` component:
- Message array with risk levels, queue status, approval states
- User/facilitator counts with simulated fluctuation
- Onboarding flow state (sign-in → terms → profile → rooms)
- Toast notifications

### Risk Assessment System ([utils.ts:36-71](web/src/lib/utils.ts#L36))
Automated message classification based on keyword detection:
- **High risk**: suicide, self-harm, immediate danger terms → auto-queued for facilitators
- **Medium risk**: anxiety, depression, distress terms → queued on request
- **Low risk**: general messages → auto-approved

### Anonymous Name Generator ([utils.ts:29-34](web/src/lib/utils.ts#L29))
Privacy-preserving usernames: `[Adjective] [Noun] #[Number]` (e.g., "Gentle Butterfly #423")

### Dual Interface
- **Participant Tab**: Anonymous message submission with topic selection and urgent flagging
- **Facilitator Tab**: Message queue with approve/review/remove actions and risk filtering

### Onboarding Flow ([OnboardingOverlay.tsx](web/src/components/OnboardingOverlay.tsx))
Multi-step modal: Sign In → Terms → Profile Selection → Room Selection

## Development Commands

```bash
# Install dependencies
cd web
npm install --legacy-peer-deps

# Run development server (http://localhost:3000)
npm run dev

# Build static export
npm run build
# Output goes to web/out/

# Lint
npm run lint
```

## Deployment

GitHub Actions automatically builds and deploys on push to `main`:
1. Builds Next.js static export in `web/out/`
2. Deploys to GitHub Pages
3. Available at: https://drdedge.github.io/silentspeak-app/

See [.github/workflows/deploy.yml](.github/workflows/deploy.yml) for CI/CD configuration.

## Important Design Principles

- **Privacy-First**: All user messages are anonymized with generated names
- **Risk-Aware**: High-risk keywords trigger immediate facilitator alerts
- **Dual Interface**: Separate views for participants (anonymous sharing) and facilitators (moderation/support)
- **Client-Side Only**: Demo/prototype - all data is ephemeral and browser-local
- **Progressive Onboarding**: Multi-step flow builds trust before message submission
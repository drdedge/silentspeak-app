"use client";

import { OnboardingStep, ProfileSelection, Room } from "@/types";

interface RoomGroupDisplay {
  label: string;
  rooms: Room[];
}

interface OnboardingOverlayProps {
  step: OnboardingStep;
  username: string;
  password: string;
  profile: ProfileSelection | null;
  anonymousPreview: string;
  roomGroups: RoomGroupDisplay[];
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmitCredentials: (action: "login" | "signup") => void;
  onAcceptTerms: () => void;
  onRejectTerms: () => void;
  onSelectProfile: (profile: ProfileSelection) => void;
  onBackTo: (step: Exclude<OnboardingStep, "complete">) => void;
  onContinueProfile: () => void;
  onSelectRoom: (room: Room) => void;
}

const CARD_CLASSES = "w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl shadow-violet-200/70 flex flex-col gap-6 max-h-[82vh] overflow-hidden";

export function OnboardingOverlay(props: OnboardingOverlayProps) {
  if (props.step === "complete") {
    return null;
  }

  const {
    step,
    username,
    password,
    profile,
    anonymousPreview,
    roomGroups,
    onUsernameChange,
    onPasswordChange,
    onSubmitCredentials,
    onAcceptTerms,
    onRejectTerms,
    onSelectProfile,
    onBackTo,
    onContinueProfile,
    onSelectRoom,
  } = props;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
      {step === "signIn" && (
        <div className={CARD_CLASSES} role="dialog" aria-modal="true" aria-labelledby="sign-in-title">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500">Step 1</p>
            <h2 id="sign-in-title" className="mt-2 text-2xl font-bold text-slate-900">
              Sign in to explore SilentSpeak
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Use any username and password to continue. Nothing is stored outside your browser in this demo.
            </p>
          </header>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-600" htmlFor="demo-username">
                Username
              </label>
              <input
                id="demo-username"
                value={username}
                onChange={(event) => onUsernameChange(event.target.value)}
                placeholder="e.g. facilitator.demo"
                autoComplete="off"
                className="rounded-xl border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-600" htmlFor="demo-password">
                Password
              </label>
              <input
                id="demo-password"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="Enter any password"
                className="rounded-xl border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              className="flex-1 rounded-xl border border-violet-200 px-4 py-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
              onClick={() => onSubmitCredentials("signup")}
            >
              Sign up
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700"
              onClick={() => onSubmitCredentials("login")}
            >
              Log in
            </button>
          </div>
        </div>
      )}

      {step === "terms" && (
        <div className={CARD_CLASSES} role="dialog" aria-modal="true" aria-labelledby="terms-title">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500">Step 2</p>
            <h2 id="terms-title" className="mt-2 text-2xl font-bold text-slate-900">
              Community Guidelines
            </h2>
            <p className="mt-3 text-sm text-slate-500">A few commitments help everyone feel safe.</p>
          </header>
          <div className="flex-1 overflow-y-auto rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 shadow-inner">
            <p>By continuing, you agree to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Keep conversations respectful, supportive, and anonymous.</li>
              <li>Flag posts that suggest immediate harm so facilitators can act quickly.</li>
              <li>Understand facilitators may review posts to keep the space safe.</li>
              <li>Use SilentSpeak for peer support, not urgent crisis intervention.</li>
              <li>Acknowledge crisis protocols could notify emergency contacts if risk is detected.</li>
            </ul>
            <p className="mt-4 text-sm text-slate-500">
              SilentSpeak is not a replacement for emergency services. If you are in crisis, contact your local emergency number
              or dial 988 (US) immediately.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              onClick={onRejectTerms}
            >
              Reject
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700"
              onClick={onAcceptTerms}
            >
              I accept
            </button>
          </div>
        </div>
      )}

      {step === "profile" && (
        <div className={CARD_CLASSES} role="dialog" aria-modal="true" aria-labelledby="profile-title">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500">Step 3</p>
              <h2 id="profile-title" className="mt-2 text-2xl font-bold text-slate-900">
                Choose how you show up
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                Facilitators often use the custom profile during live demos. Participants usually remain anonymous.
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
              onClick={() => onBackTo("terms")}
            >
              Back
            </button>
          </header>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => onSelectProfile("custom")}
              className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                profile === "custom"
                  ? "border-violet-400 bg-violet-50 shadow-lg"
                  : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50"
              }`}
            >
              <h3 className="text-base font-semibold text-slate-900">Guided Support Coach</h3>
              <p className="mt-1 text-sm text-slate-600">
                Predefined facilitator voice for walkthroughs featuring grounded, empathetic responses.
              </p>
              <p className="mt-2 text-sm text-slate-500">Bio: &quot;Here to model supportive responses for the group.&quot;</p>
            </button>

            <button
              type="button"
              onClick={() => onSelectProfile("anonymous")}
              className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                profile === "anonymous"
                  ? "border-violet-400 bg-violet-50 shadow-lg"
                  : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50"
              }`}
            >
              <h3 className="text-base font-semibold text-slate-900">Anonymous Ally</h3>
              <p className="mt-1 text-sm text-slate-600">
                SilentSpeak generates a fresh alias every session so you can share freely without revealing identity.
              </p>
              <p className="mt-2 text-sm text-slate-500">Alias preview: {anonymousPreview}</p>
            </button>
          </div>

          <button
            type="button"
            disabled={!profile}
            onClick={onContinueProfile}
            className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-700 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
          >
            Continue
          </button>
        </div>
      )}

      {step === "rooms" && (
        <div className={CARD_CLASSES} role="dialog" aria-modal="true" aria-labelledby="rooms-title">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-500">Step 4</p>
              <h2 id="rooms-title" className="mt-2 text-2xl font-bold text-slate-900">
                Pick a session room
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                Rooms are grouped by date so you can join the right conversation during the walkthrough.
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-violet-600 transition hover:text-violet-700"
              onClick={() => onBackTo("profile")}
            >
              Back
            </button>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto pr-1">
            {roomGroups.map((group) => (
              <div key={group.label} className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{group.label}</h3>
                <div className="space-y-3">
                  {group.rooms.map((room) => (
                    <div key={room.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-base font-semibold text-slate-900">{room.name}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {room.time} • {room.focus} • {room.availability}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-violet-600/20 transition hover:bg-violet-700"
                          onClick={() => onSelectRoom(room)}
                        >
                          Join room
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

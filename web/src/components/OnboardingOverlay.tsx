"use client";

import { OnboardingStep, ProfileSelection, Room } from "@/types";
import { Button } from "@/components/ui/Button";

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

const CARD_CLASSES = "w-full max-w-lg rounded-3xl bg-card p-8 shadow-2xl shadow-primary/20 flex flex-col gap-6 max-h-[82vh] overflow-hidden";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-6">
      {step === "signIn" && (
        <div className={CARD_CLASSES} role="dialog" aria-modal="true" aria-labelledby="sign-in-title">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Step 1</p>
            <h2 id="sign-in-title" className="mt-2 text-2xl font-bold text-foreground">
              Sign in to explore SilentSpeak
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Use any username and password to continue. Nothing is stored outside your browser in this demo.
            </p>
          </header>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground" htmlFor="demo-username">
                Username
              </label>
              <input
                id="demo-username"
                value={username}
                onChange={(event) => onUsernameChange(event.target.value)}
                placeholder="e.g. facilitator.demo"
                autoComplete="off"
                className="rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground" htmlFor="demo-password">
                Password
              </label>
              <input
                id="demo-password"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="Enter any password"
                className="rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => onSubmitCredentials("signup")}
            >
              Sign up
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => onSubmitCredentials("login")}
            >
              Log in
            </Button>
          </div>
        </div>
      )}

      {step === "terms" && (
        <div className={CARD_CLASSES} role="dialog" aria-modal="true" aria-labelledby="terms-title">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Step 2</p>
            <h2 id="terms-title" className="mt-2 text-2xl font-bold text-foreground">
              Community Guidelines
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">A few commitments help everyone feel safe.</p>
          </header>
          <div className="flex-1 overflow-y-auto rounded-2xl bg-muted p-5 text-sm text-muted-foreground shadow-inner">
            <p>By continuing, you agree to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Keep conversations respectful, supportive, and anonymous.</li>
              <li>Flag posts that suggest immediate harm so facilitators can act quickly.</li>
              <li>Understand facilitators may review posts to keep the space safe.</li>
              <li>Use SilentSpeak for peer support, not urgent crisis intervention.</li>
              <li>Acknowledge crisis protocols could notify emergency contacts if risk is detected.</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              SilentSpeak is not a replacement for emergency services. If you are in crisis, contact your local emergency number
              or dial 988 (US) immediately.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button
              variant="ghost"
              size="lg"
              className="flex-1"
              onClick={onRejectTerms}
            >
              Reject
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={onAcceptTerms}
            >
              I accept
            </Button>
          </div>
        </div>
      )}

      {step === "profile" && (
        <div className={CARD_CLASSES} role="dialog" aria-modal="true" aria-labelledby="profile-title">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Step 3</p>
              <h2 id="profile-title" className="mt-2 text-2xl font-bold text-foreground">
                Choose how you show up
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Facilitators often use the custom profile during live demos. Participants usually remain anonymous.
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-primary transition hover:text-primary-light"
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
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <h3 className="text-base font-semibold text-foreground">Guided Support Coach</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Predefined facilitator voice for walkthroughs featuring grounded, empathetic responses.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Bio: &quot;Here to model supportive responses for the group.&quot;</p>
            </button>

            <button
              type="button"
              onClick={() => onSelectProfile("anonymous")}
              className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                profile === "anonymous"
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <h3 className="text-base font-semibold text-foreground">Anonymous Ally</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your anonymous identity allows you to share authentically while contributing to our community. By participating, you're not just receiving support—you're offering it to others through shared experience.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Alias preview: {anonymousPreview}</p>
            </button>
          </div>

          <Button
            variant="primary"
            size="lg"
            disabled={!profile}
            onClick={onContinueProfile}
          >
            Continue
          </Button>
        </div>
      )}

      {step === "rooms" && (
        <div className={CARD_CLASSES} role="dialog" aria-modal="true" aria-labelledby="rooms-title">
          <header className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Step 4</p>
              <h2 id="rooms-title" className="mt-2 text-2xl font-bold text-foreground">
                Pick a session room
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Rooms are grouped by date so you can join the right conversation during the walkthrough.
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-primary transition hover:text-primary-light"
              onClick={() => onBackTo("profile")}
            >
              Back
            </button>
          </header>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">💭</span>
              <p className="text-sm font-semibold text-primary">Reflect before you join</p>
            </div>
            <div className="mt-3 space-y-2 text-sm text-primary/90">
              <p>• What do you hope to gain from this community?</p>
              <p>• How might sharing your experience help others who are struggling?</p>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto pr-1">
            {roomGroups.map((group) => (
              <div key={group.label} className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{group.label}</h3>
                <div className="space-y-3">
                  {group.rooms.map((room) => (
                    <div key={room.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-base font-semibold text-foreground">{room.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {room.time} • {room.focus} • {room.availability}
                          </p>
                        </div>
                        <Button
                          variant="primary"
                          size="md"
                          onClick={() => onSelectRoom(room)}
                        >
                          Join room
                        </Button>
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
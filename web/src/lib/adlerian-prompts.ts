/**
 * Adlerian Prompts Library
 *
 * Evidence-based therapeutic prompts organized by:
 * - Five Life Tasks (work, friendship, love, self, spirituality)
 * - Therapeutic goals (encouragement, insight, reorientation)
 * - Risk levels (high, medium, low)
 *
 * Based on research from 2024-2025 demonstrating effectiveness of
 * Adlerian group counseling for mental health and social connection.
 *
 * See: docs/adlerian-prompts-group-therapy.md
 */

import { RiskLevel } from '@/types';

export type LifeTask = 'work' | 'friendship' | 'love' | 'self' | 'spirituality' | 'general';

export type PromptCategory = 'exploration' | 'encouragement' | 'reframing' | 'social-interest' | 'goal-setting' | 'safety';

export interface AdlerianPrompt {
  id: string;
  lifeTask: LifeTask;
  category: PromptCategory;
  question: string;
  description?: string;
  riskLevel?: RiskLevel; // If specific to a risk level
}

export interface FacilitatorGuidance {
  theme: string;
  focus: string;
  suggestedApproach: string[];
  encouragementTemplate: string;
}

// ============================================================================
// LIFE TASK MAPPING
// ============================================================================

export const TOPIC_TO_LIFE_TASK: Record<string, LifeTask> = {
  'relationships': 'friendship',
  'work-school': 'work',
  'self-care': 'self',
  'loss-grief': 'spirituality',
  'anxiety-stress': 'general',
  'general': 'general',
};

// ============================================================================
// ADLERIAN PROMPTS LIBRARY
// ============================================================================

export const ADLERIAN_PROMPTS: AdlerianPrompt[] = [
  // WORK TASK PROMPTS
  {
    id: 'work-exploration-1',
    lifeTask: 'work',
    category: 'exploration',
    question: 'How satisfied are you with your current work or sense of purpose?',
    description: 'Explores fulfillment in work/occupation life task',
  },
  {
    id: 'work-exploration-2',
    lifeTask: 'work',
    category: 'exploration',
    question: 'What would make your work feel more meaningful?',
    description: 'Investigates alignment between work and values',
  },
  {
    id: 'work-encouragement-1',
    lifeTask: 'work',
    category: 'encouragement',
    question: 'What skills and qualities do you bring to your work?',
    description: 'Identifies existing strengths in work domain',
  },
  {
    id: 'work-encouragement-2',
    lifeTask: 'work',
    category: 'encouragement',
    question: 'When have you successfully navigated work challenges before?',
    description: 'Recalls past resilience and coping',
  },
  {
    id: 'work-reframing-1',
    lifeTask: 'work',
    category: 'reframing',
    question: 'How might this challenge help you grow professionally?',
    description: 'Reframes difficulty as opportunity',
  },
  {
    id: 'work-reframing-2',
    lifeTask: 'work',
    category: 'reframing',
    question: 'What would you tell a colleague facing this situation?',
    description: 'Encourages self-compassion through perspective-taking',
  },

  // FRIENDSHIP TASK PROMPTS
  {
    id: 'friendship-exploration-1',
    lifeTask: 'friendship',
    category: 'exploration',
    question: 'How would you describe the quality of your friendships?',
    description: 'Assesses satisfaction with social connections',
  },
  {
    id: 'friendship-exploration-2',
    lifeTask: 'friendship',
    category: 'exploration',
    question: 'What prevents you from deepening your social connections?',
    description: 'Identifies barriers to social interest development',
  },
  {
    id: 'friendship-encouragement-1',
    lifeTask: 'friendship',
    category: 'encouragement',
    question: 'What qualities make you a good friend?',
    description: 'Recognizes relational strengths',
  },
  {
    id: 'friendship-encouragement-2',
    lifeTask: 'friendship',
    category: 'encouragement',
    question: 'Who in your life values your presence?',
    description: 'Acknowledges existing connections and belonging',
  },
  {
    id: 'friendship-reframing-1',
    lifeTask: 'friendship',
    category: 'reframing',
    question: 'What small gesture could strengthen a relationship this week?',
    description: 'Focuses on achievable action',
  },
  {
    id: 'friendship-social-interest-1',
    lifeTask: 'friendship',
    category: 'social-interest',
    question: 'How might reaching out benefit both you and someone else?',
    description: 'Develops mutual benefit perspective',
  },

  // LOVE TASK PROMPTS
  {
    id: 'love-exploration-1',
    lifeTask: 'love',
    category: 'exploration',
    question: 'Are you open to giving and receiving love?',
    description: 'Explores intimacy readiness',
  },
  {
    id: 'love-exploration-2',
    lifeTask: 'love',
    category: 'exploration',
    question: 'What patterns do you notice in your intimate relationships?',
    description: 'Identifies relationship lifestyle patterns',
  },
  {
    id: 'love-encouragement-1',
    lifeTask: 'love',
    category: 'encouragement',
    question: 'What do you value most in intimate relationships?',
    description: 'Clarifies personal values',
  },
  {
    id: 'love-reframing-1',
    lifeTask: 'love',
    category: 'reframing',
    question: 'How might past experiences be influencing your current relationships?',
    description: 'Connects early experiences to present patterns',
  },
  {
    id: 'love-reframing-2',
    lifeTask: 'love',
    category: 'reframing',
    question: "What's one way you can honor your needs while staying open to connection?",
    description: 'Balances self-care with relational openness',
  },

  // SELF TASK PROMPTS
  {
    id: 'self-exploration-1',
    lifeTask: 'self',
    category: 'exploration',
    question: 'How do you speak to yourself when you make a mistake?',
    description: 'Assesses self-talk patterns',
  },
  {
    id: 'self-exploration-2',
    lifeTask: 'self',
    category: 'exploration',
    question: 'What does self-care look like for you?',
    description: 'Explores self-relationship and needs',
  },
  {
    id: 'self-encouragement-1',
    lifeTask: 'self',
    category: 'encouragement',
    question: 'What are three things you appreciate about yourself?',
    description: 'Builds self-acceptance',
  },
  {
    id: 'self-encouragement-2',
    lifeTask: 'self',
    category: 'encouragement',
    question: 'What strengths have gotten you through difficult times?',
    description: 'Identifies resilience resources',
  },
  {
    id: 'self-reframing-1',
    lifeTask: 'self',
    category: 'reframing',
    question: 'What would you tell a friend who spoke to themselves the way you do?',
    description: 'Classic Adlerian self-compassion reframe',
  },
  {
    id: 'self-reframing-2',
    lifeTask: 'self',
    category: 'reframing',
    question: "What's one way you can practice self-compassion today?",
    description: 'Actionable self-care step',
  },

  // SPIRITUALITY TASK PROMPTS
  {
    id: 'spirituality-exploration-1',
    lifeTask: 'spirituality',
    category: 'exploration',
    question: 'What gives your life meaning and purpose?',
    description: 'Explores existential life task',
  },
  {
    id: 'spirituality-exploration-2',
    lifeTask: 'spirituality',
    category: 'exploration',
    question: 'How do you find peace or connection to something larger than yourself?',
    description: 'Investigates sources of meaning',
  },
  {
    id: 'spirituality-encouragement-1',
    lifeTask: 'spirituality',
    category: 'encouragement',
    question: 'What moments make you feel most alive?',
    description: 'Identifies meaning-rich experiences',
  },
  {
    id: 'spirituality-reframing-1',
    lifeTask: 'spirituality',
    category: 'reframing',
    question: 'How might this challenge be an opportunity for growth?',
    description: 'Reframes suffering as potential catalyst',
  },
  {
    id: 'spirituality-reframing-2',
    lifeTask: 'spirituality',
    category: 'reframing',
    question: 'How can you align your daily actions with your deepest values?',
    description: 'Connects values to behavior',
  },

  // GENERAL/UNIVERSAL PROMPTS
  {
    id: 'general-encouragement-1',
    lifeTask: 'general',
    category: 'encouragement',
    question: 'What strengths have helped you cope so far?',
    description: 'Universal strengths-based prompt',
  },
  {
    id: 'general-encouragement-2',
    lifeTask: 'general',
    category: 'encouragement',
    question: 'What resources do you already have that you might be overlooking?',
    description: 'Identifies overlooked assets',
  },
  {
    id: 'general-encouragement-3',
    lifeTask: 'general',
    category: 'encouragement',
    question: 'When have you successfully overcome difficulty before?',
    description: 'Recalls past mastery experiences',
  },
  {
    id: 'general-goal-1',
    lifeTask: 'general',
    category: 'goal-setting',
    question: 'How would you like things to be different in 6 months?',
    description: 'Classic Adlerian goal-setting question',
  },
  {
    id: 'general-goal-2',
    lifeTask: 'general',
    category: 'goal-setting',
    question: "What's one small step you could take today?",
    description: 'Focuses on achievable action',
  },
  {
    id: 'general-goal-3',
    lifeTask: 'general',
    category: 'goal-setting',
    question: 'What needs to happen for you to feel you\'re moving forward?',
    description: 'Clarifies progress indicators',
  },
  {
    id: 'general-social-interest-1',
    lifeTask: 'general',
    category: 'social-interest',
    question: 'How might sharing your experience help others?',
    description: 'Develops social interest through contribution',
  },
  {
    id: 'general-social-interest-2',
    lifeTask: 'general',
    category: 'social-interest',
    question: 'Who in your life could benefit from your support?',
    description: 'Shifts from recipient to contributor mindset',
  },
  {
    id: 'general-reframing-1',
    lifeTask: 'general',
    category: 'reframing',
    question: 'What would you tell a friend in this situation?',
    description: 'Universal self-compassion reframe',
  },
  {
    id: 'general-reframing-2',
    lifeTask: 'general',
    category: 'reframing',
    question: 'How might you treat yourself with more kindness?',
    description: 'Invites self-compassion',
  },

  // HIGH-RISK/SAFETY PROMPTS (use carefully, always with crisis resources)
  {
    id: 'safety-1',
    lifeTask: 'general',
    category: 'safety',
    question: 'What keeps you going during the most difficult moments?',
    description: 'Identifies protective factors',
    riskLevel: 'high',
  },
  {
    id: 'safety-2',
    lifeTask: 'general',
    category: 'safety',
    question: 'Who can you reach out to when you\'re struggling?',
    description: 'Assesses social support',
    riskLevel: 'high',
  },
  {
    id: 'safety-3',
    lifeTask: 'general',
    category: 'safety',
    question: "What's one small thing that might help you feel safer right now?",
    description: 'Focuses on immediate coping',
    riskLevel: 'high',
  },
  {
    id: 'safety-4',
    lifeTask: 'general',
    category: 'safety',
    question: 'What has helped you get through hard times before, even briefly?',
    description: 'Recalls coping strategies',
    riskLevel: 'medium',
  },
  {
    id: 'safety-5',
    lifeTask: 'general',
    category: 'safety',
    question: 'What part of this situation is within your control?',
    description: 'Focuses on agency',
    riskLevel: 'medium',
  },
];

// ============================================================================
// FACILITATOR GUIDANCE LIBRARY
// ============================================================================

export const FACILITATOR_GUIDANCE: Record<string, FacilitatorGuidance> = {
  'inferiority-work': {
    theme: 'Feelings of inadequacy in work/achievement domain',
    focus: 'Normalize inferiority feelings, identify strengths, reframe challenge as growth opportunity',
    suggestedApproach: [
      'Acknowledge feelings without judgment',
      'Many people feel overwhelmed when facing challenges at work',
      'What skills have helped you navigate difficulties before?',
      'What small step could help you feel more capable?',
    ],
    encouragementTemplate: 'It sounds like you\'re feeling [emotion] about [situation]. Many people experience this when [context]. What strengths have helped you cope so far?',
  },
  'isolation-friendship': {
    theme: 'Social disconnection and loneliness',
    focus: 'Build social interest, normalize isolation feelings, identify small connection opportunities',
    suggestedApproach: [
      'Feeling disconnected is difficult and very common',
      'Connection often starts with small, brave steps',
      'What qualities do you bring to friendships?',
      'Who might benefit from hearing from you?',
    ],
    encouragementTemplate: 'Feeling alone can be really hard. Many people struggle with connection, especially during [context]. What small gesture could you make toward someone this week?',
  },
  'self-criticism': {
    theme: 'Harsh self-judgment and low self-worth',
    focus: 'Challenge basic mistakes, build self-compassion, reframe through friend perspective',
    suggestedApproach: [
      'Notice how hard you\'re being on yourself',
      'What would you tell a friend who felt this way?',
      'Your worth isn\'t determined by [achievement/approval/etc.]',
      'What\'s one way you can treat yourself with kindness today?',
    ],
    encouragementTemplate: 'I hear you being very hard on yourself. If a friend spoke to themselves this way, what would you tell them?',
  },
  'meaning-crisis': {
    theme: 'Loss of purpose or existential distress',
    focus: 'Explore spirituality life task, identify values, connect to larger meaning',
    suggestedApproach: [
      'Questions about meaning are important and deeply human',
      'What has given you a sense of purpose in the past?',
      'What values feel most important to you?',
      'How might you take one small action aligned with those values?',
    ],
    encouragementTemplate: 'Grappling with purpose and meaning takes courage. What matters most to you, even in small moments?',
  },
  'relationship-strain': {
    theme: 'Conflict or difficulty in intimate relationships',
    focus: 'Explore love life task, identify patterns, balance needs with connection',
    suggestedApproach: [
      'Relationships can be challenging and rewarding',
      'What patterns do you notice in your relationships?',
      'How might past experiences be influencing the present?',
      'What do you need to feel both safe and connected?',
    ],
    encouragementTemplate: 'Navigating relationships takes self-awareness and courage. What do you hope for in this relationship?',
  },
  'overwhelm-general': {
    theme: 'General stress and feeling overwhelmed',
    focus: 'Break down into manageable steps, identify coping strengths, focus on agency',
    suggestedApproach: [
      'Feeling overwhelmed is a sign you\'re carrying a lot right now',
      'What has helped you cope during stressful times before?',
      'What\'s one small thing within your control?',
      'How can you be gentle with yourself today?',
    ],
    encouragementTemplate: 'It makes sense that you\'re feeling overwhelmed. What\'s one tiny step that feels possible right now?',
  },
  'high-risk': {
    theme: 'High-risk content indicating potential crisis',
    focus: 'Immediate safety, social support assessment, connection to resources',
    suggestedApproach: [
      'Thank you for sharing something so difficult',
      'You don\'t have to go through this alone',
      'Who can you reach out to for support right now?',
      'Crisis resources: 988 Suicide & Crisis Lifeline (US)',
    ],
    encouragementTemplate: 'I\'m concerned about your safety. Please reach out to 988 or your local crisis line. You deserve support right now.',
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get Adlerian prompt based on topic and optional category
 */
export function getAdlerianPrompt(
  topic: string,
  category?: PromptCategory,
  riskLevel?: RiskLevel
): AdlerianPrompt | null {
  const lifeTask = TOPIC_TO_LIFE_TASK[topic] || 'general';

  // Filter prompts by life task
  let candidates = ADLERIAN_PROMPTS.filter((p) =>
    p.lifeTask === lifeTask || p.lifeTask === 'general'
  );

  // Further filter by category if specified
  if (category) {
    candidates = candidates.filter((p) => p.category === category);
  }

  // Filter by risk level if specified
  if (riskLevel) {
    candidates = candidates.filter((p) => !p.riskLevel || p.riskLevel === riskLevel);
  }

  // Return random prompt from candidates
  if (candidates.length === 0) {
    return null;
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * Get multiple prompts for a given context (for variety)
 */
export function getAdlerianPrompts(
  topic: string,
  count: number = 2,
  category?: PromptCategory
): AdlerianPrompt[] {
  const lifeTask = TOPIC_TO_LIFE_TASK[topic] || 'general';

  let candidates = ADLERIAN_PROMPTS.filter((p) =>
    p.lifeTask === lifeTask || p.lifeTask === 'general'
  );

  if (category) {
    candidates = candidates.filter((p) => p.category === category);
  }

  // Shuffle and take first 'count' items
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Identify life task from topic
 */
export function identifyLifeTask(topic: string): LifeTask {
  return TOPIC_TO_LIFE_TASK[topic] || 'general';
}

/**
 * Generate encouragement phrase based on risk level
 */
export function generateEncouragement(riskLevel: RiskLevel): string {
  const encouragementPhrases = {
    low: [
      'Thank you for sharing your thoughts with the community.',
      'Your willingness to reflect shows strength.',
      'We appreciate your contribution to this space.',
    ],
    medium: [
      'It takes courage to share what you\'re going through.',
      'You\'re not alone in experiencing these feelings.',
      'Thank you for trusting this community with your experience.',
    ],
    high: [
      'Thank you for reaching out. Your safety and well-being matter.',
      'You\'re showing courage by sharing something difficult.',
      'Please know that support is available, and you don\'t have to face this alone.',
    ],
  };

  const phrases = encouragementPhrases[riskLevel];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

/**
 * Get facilitator guidance based on message analysis
 * (simplified heuristic-based approach)
 */
export function getFacilitatorGuidance(
  messageText: string,
  topic: string,
  riskLevel: RiskLevel
): FacilitatorGuidance {
  const lowerText = messageText.toLowerCase();

  // High-risk override
  if (riskLevel === 'high') {
    return FACILITATOR_GUIDANCE['high-risk'];
  }

  // Keyword-based theme identification
  if (lowerText.includes('fail') || lowerText.includes('inadequate') || lowerText.includes('not good enough')) {
    if (topic === 'work-school') {
      return FACILITATOR_GUIDANCE['inferiority-work'];
    }
    return FACILITATOR_GUIDANCE['self-criticism'];
  }

  if (lowerText.includes('alone') || lowerText.includes('lonely') || lowerText.includes('isolated')) {
    return FACILITATOR_GUIDANCE['isolation-friendship'];
  }

  if (lowerText.includes('meaning') || lowerText.includes('purpose') || lowerText.includes('why')) {
    return FACILITATOR_GUIDANCE['meaning-crisis'];
  }

  if (topic === 'relationships' || lowerText.includes('relationship') || lowerText.includes('partner')) {
    return FACILITATOR_GUIDANCE['relationship-strain'];
  }

  // Default to general overwhelm
  return FACILITATOR_GUIDANCE['overwhelm-general'];
}

/**
 * Get appropriate prompts for post-message reflection
 * (shown after user submits message to community)
 */
export function getReflectionPromptsForMessage(topic: string, urgent: boolean): AdlerianPrompt[] {
  if (urgent) {
    // For urgent messages, focus on safety and coping
    return getAdlerianPrompts('general', 2, 'safety');
  }

  // Otherwise, encourage reflection on strengths and goals
  const encouragementPrompt = getAdlerianPrompt(topic, 'encouragement');
  const goalPrompt = getAdlerianPrompt(topic, 'goal-setting');

  return [encouragementPrompt, goalPrompt].filter(Boolean) as AdlerianPrompt[];
}
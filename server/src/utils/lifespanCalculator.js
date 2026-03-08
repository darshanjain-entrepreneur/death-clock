import { HABIT_TOGGLES, QUESTION_BANK, getScaleMeaning } from './questionBank.js';

const MIN_LIFESPAN = 1;
const MAX_LIFESPAN = 90;
const ENTERTAINMENT_FACTOR = 0.48;
const MS_IN_YEAR = 1000 * 60 * 60 * 24 * 365.2425;

const REMAINING_EXPECTANCY_TABLE = [
  { age: 0, remaining: 79.1 },
  { age: 10, remaining: 69.4 },
  { age: 20, remaining: 59.7 },
  { age: 30, remaining: 50.1 },
  { age: 40, remaining: 40.7 },
  { age: 50, remaining: 31.6 },
  { age: 60, remaining: 23.2 },
  { age: 70, remaining: 15.8 },
  { age: 80, remaining: 10.0 },
  { age: 90, remaining: 5.8 },
  { age: 100, remaining: 3.1 }
];

const SCIENCE_WEIGHTS = {
  diet: 0.08,
  exercise: 0.11,
  sleep: 0.08,
  stress: 0.09,
  smoking: 0.2,
  alcohol: 0.06,
  familyHistory: 0.09,
  mentalHealth: 0.08,
  socialConnections: 0.06,
  riskyBehaviours: 0.12
};

const SIGNATURES = {
  diet: { risk: 'Ashen Appetite', strength: 'Clean Furnace' },
  exercise: { risk: 'Stillframe Body', strength: 'Steel Pulse' },
  sleep: { risk: 'Fractured Night', strength: 'Deep Repair' },
  stress: { risk: 'Burning Wire', strength: 'Quiet Nerves' },
  smoking: { risk: 'Smokebound', strength: 'Clear Lungs' },
  alcohol: { risk: 'Nightdrift', strength: 'Controlled Nights' },
  familyHistory: { risk: 'Inherited Shadow', strength: 'Long Blood' },
  mentalHealth: { risk: 'Glass Mind', strength: 'Steady Thought' },
  socialConnections: { risk: 'Lone Echo', strength: 'Human Anchor' },
  riskyBehaviours: { risk: 'Edgewalker', strength: 'Measured Steps' }
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function round(value) {
  return Number(value.toFixed(2));
}

function getCurrentAge(birthDate) {
  return (Date.now() - new Date(birthDate).getTime()) / MS_IN_YEAR;
}

function addYears(date, years) {
  return new Date(new Date(date).getTime() + years * MS_IN_YEAR);
}

function interpolateRemainingExpectancy(age) {
  if (age <= REMAINING_EXPECTANCY_TABLE[0].age) {
    return REMAINING_EXPECTANCY_TABLE[0].remaining;
  }

  for (let index = 0; index < REMAINING_EXPECTANCY_TABLE.length - 1; index += 1) {
    const current = REMAINING_EXPECTANCY_TABLE[index];
    const next = REMAINING_EXPECTANCY_TABLE[index + 1];

    if (age >= current.age && age <= next.age) {
      const progress = (age - current.age) / (next.age - current.age);
      return current.remaining + progress * (next.remaining - current.remaining);
    }
  }

  return REMAINING_EXPECTANCY_TABLE[REMAINING_EXPECTANCY_TABLE.length - 1].remaining;
}

function normalizeScore(score) {
  return clamp(Number(score) || 5, 1, 10);
}

function centeredScore(score) {
  return (normalizeScore(score) - 5.5) / 4.5;
}

function scoreGap(score) {
  return clamp((10 - normalizeScore(score)) / 9, 0, 1);
}

function calculateQuestionImpact(question, score) {
  const centered = centeredScore(score);
  const curved = Math.sign(centered) * Math.pow(Math.abs(centered), 1.28);
  return curved * question.weight;
}

function buildHealthMultiplier(responses) {
  const logRisk = Object.entries(SCIENCE_WEIGHTS).reduce((sum, [key, weight]) => {
    return sum + centeredScore(responses[key]) * weight;
  }, 0);

  // Highly aggressive exponent for entertainment shock value
  // Range: 0.005 (devastatingly bad) → 1.0 (merely mortal)
  return clamp(Math.exp(logRisk * 4.5), 0.005, 1.0);
}

function buildEvidenceScore(responses) {
  const totalWeight = Object.values(SCIENCE_WEIGHTS).reduce((sum, value) => sum + value, 0);
  const normalized = Object.entries(SCIENCE_WEIGHTS).reduce((sum, [key, weight]) => {
    const score = (normalizeScore(responses[key]) - 1) / 9;
    return sum + score * weight;
  }, 0);

  return clamp(Math.round((normalized / totalWeight) * 100), 0, 100);
}

function buildFactorBreakdown(responses) {
  return QUESTION_BANK.map((question) => {
    const score = normalizeScore(responses[question.key]);
    const impact = calculateQuestionImpact(question, score);

    return {
      key: question.key,
      label: question.label,
      score,
      selectedLabel: getScaleMeaning(question.key, score),
      tone: impact <= -1.5 ? 'fragile' : impact >= 1.5 ? 'protective' : 'balanced',
      impact: round(impact),
      description: score <= 4 ? 'This area is currently shortening the runway more than it should.' : score >= 7 ? 'This area is quietly protecting the runway.' : 'This area is neither saving nor sinking you yet.'
    };
  });
}

function buildInteractionEffects(responses) {
  const effects = [];

  if (responses.sleep <= 3 && responses.stress <= 4) {
    effects.push({ label: 'Burnout spiral', impact: -8.5, description: 'Poor sleep plus sustained stress compounds wear faster than either alone. Your body is eating itself.' });
  }

  if (responses.exercise <= 4 && responses.diet <= 4) {
    effects.push({ label: 'Metabolic drag', impact: -6.2, description: 'Low movement combined with weak nutrition compounds long-term metabolic strain.' });
  }

  if (responses.smoking <= 3 && responses.riskyBehaviours <= 4) {
    effects.push({ label: 'High exposure pattern', impact: -13.5, description: 'Daily exposure plus dangerous decisions. The algorithm is not exaggerating.' });
  }

  if (responses.socialConnections <= 3 && responses.mentalHealth <= 4) {
    effects.push({ label: 'Isolation burden', impact: -7.2, description: 'Loneliness is clinically deadlier than obesity. This pattern shows.' });
  }

  if (responses.alcohol <= 3 && responses.sleep <= 4) {
    effects.push({ label: 'Nightly erosion', impact: -5.8, description: 'Alcohol disrupts the only window where deep repair happens. The debt compounds nightly.' });
  }

  if (responses.stress <= 3 && responses.mentalHealth <= 3) {
    effects.push({ label: 'Cortisol overload', impact: -9.1, description: 'Chronic stress plus fractured mental health accelerates cellular aging at measurable rates.' });
  }

  if (responses.sleep >= 8 && responses.exercise >= 8 && responses.diet >= 7) {
    effects.push({ label: 'Recovery engine', impact: 0.9, description: 'Sleep, movement, and nutrition are working together. You get... slightly more time.' });
  }

  if (responses.socialConnections >= 8 && responses.mentalHealth >= 7) {
    effects.push({ label: 'Protective belonging', impact: 0.6, description: 'Strong connection improves resilience. Small comfort.' });
  }

  if (responses.smoking >= 8 && responses.alcohol >= 7 && responses.riskyBehaviours >= 7) {
    effects.push({ label: 'Low-chaos lifestyle', impact: 0.5, description: 'Avoiding self-destruction keeps some runway intact. A little.' });
  }

  return effects;
}

function resolveHabitBoosts(responses, habitAdjustments) {
  const adjustments = { ...habitAdjustments };
  const boosts = [];

  if (adjustments.smokeFreeFuture) {
    boosts.push({ key: 'smokeFreeFuture', label: 'Erase nicotine from the story', impact: round(scoreGap(responses.smoking) * 4.8), description: 'The farther nicotine is from daily life, the more runway returns.' });
  }

  if (adjustments.recoverySleep) {
    boosts.push({ key: 'recoverySleep', label: 'Protect the night', impact: round(scoreGap(responses.sleep) * 2.2), description: 'Better sleep repairs more than energy. It changes long-term strain.' });
  }

  if (adjustments.movementStreak) {
    boosts.push({ key: 'movementStreak', label: 'Train like survival matters', impact: round(scoreGap(responses.exercise) * 2.8), description: 'Regular movement is one of the fastest ways to improve the curve.' });
  }

  if (adjustments.cutBackAlcohol) {
    boosts.push({ key: 'cutBackAlcohol', label: 'Take the night back', impact: round(scoreGap(responses.alcohol) * 2), description: 'Reducing alcohol often improves sleep, recovery, and judgment at once.' });
  }

  if (adjustments.stressReset) {
    boosts.push({ key: 'stressReset', label: 'Teach the body to stand down', impact: round(scoreGap(responses.stress) * 2.4), description: 'Stress recovery matters most when the body has forgotten how to switch off.' });
  }

  if (adjustments.connectionBoost) {
    boosts.push({ key: 'connectionBoost', label: 'Strengthen the human net', impact: round(scoreGap(responses.socialConnections) * 1.8), description: 'Connection is a real protective factor, not just an emotional luxury.' });
  }

  return boosts.filter((boost) => boost.impact > 0.15);
}

function buildConfidenceSpread(currentAge, responses) {
  const uncertaintyDrivers = [responses.familyHistory, responses.mentalHealth, responses.socialConnections, responses.riskyBehaviours]
    .map((score) => Math.abs(centeredScore(score)))
    .reduce((sum, value) => sum + value, 0);
  const ageComponent = currentAge < 35 ? 2.2 : currentAge < 55 ? 1.9 : currentAge < 75 ? 1.6 : 1.2;

  return round(ageComponent + uncertaintyDrivers * 0.7);
}

function getRemainingYearsBounds(currentAge, baselineRemainingYears) {
  // Entertainment mode: allow the model to go all the way to a few days
  // Upside is capped so even the healthiest person can't exceed baseline + 4y
  return {
    min: 0.005,   // ~1.8 days — the floor for dramatic effect
    max: baselineRemainingYears + 4
  };
}

function buildSignature(lifeScore, strongestProtective, strongestRisk) {
  const protectiveName = SIGNATURES[strongestProtective?.key || 'sleep']?.strength || 'Deep Repair';
  const riskName = SIGNATURES[strongestRisk?.key || 'stress']?.risk || 'Burning Wire';

  if (lifeScore >= 82) {
    return protectiveName;
  }

  if (lifeScore >= 62) {
    return `${protectiveName} under ${riskName}`;
  }

  return riskName;
}

function buildShadowProfile({ strongestProtective, strongestRisk, lifeScore, remainingYears }) {
  if (remainingYears <= 0.05) {
    return 'The algorithm has essentially zero’d out your timeline. Every controllable habit is now a matter of days, not decades.';
  }

  if (remainingYears <= 1) {
    return `The reading is in crisis range. Your pattern has dragged the estimate down to under a year. The dominant drag is ${strongestRisk?.label?.toLowerCase() ?? 'your lifestyle'}, and it is overwhelming everything else.`;
  }

  if (lifeScore >= 80) {
    return `Relatively resilient for this model. Your strongest protective signal is ${strongestProtective?.label?.toLowerCase() ?? 'unknown'}, which is doing the heavy lifting. Don’t stop.`;
  }

  if (lifeScore >= 55) {
    return `Mixed signals. ${strongestProtective?.label?.toLowerCase() ?? 'One factor'} is keeping the estimate from collapsing, but ${strongestRisk?.label?.toLowerCase() ?? 'another'} is dragging it down consistently.`;
  }

  return `The reading is carrying heavy avoidable drag. ${strongestRisk?.label?.toLowerCase() ?? 'Lifestyle factors'} is shaping the forecast more than anything else right now — and it is not kind.`;
}

function buildNarrative({ estimatedLifespan, remainingYears, lifeScore, strongestRisk, confidenceLow, confidenceHigh }) {
  if (remainingYears <= 0.05) {
    return 'The model has essentially stopped the clock. The estimate is in days. That is the algorithm’s loudest possible warning.';
  }

  if (remainingYears <= 0.5) {
    return `The reading collapsed. You are tracking toward a lifespan of around ${round(remainingYears * 12)} months from now. That is not a typo.`;
  }

  if (remainingYears <= 3) {
    return `The evidence-adjusted reading centers at ${round(remainingYears)} years remaining. That is not a rounding error — your lifestyle is doing serious structural damage.`;
  }

  if (lifeScore >= 75) {
    return `The model sees a longer runway than most. The reading centers near ${round(estimatedLifespan)} years, with a plausible band between ${round(confidenceLow)} and ${round(confidenceHigh)}. Still not forever.`;
  }

  if (lifeScore >= 55) {
    return `You are in volatile middle ground. The age-adjusted reading centers near ${round(estimatedLifespan)} years. Fix two things and you might gain a few years. Fix nothing and you might not.`;
  }

  return `Right now the estimate is sinking. The model is reading ${round(remainingYears)} years remaining — mostly because ${strongestRisk.label.toLowerCase()} is pulling the forecast down hard.`;
}

function buildReadings(factors, effects, boosts) {
  const negative = [...factors, ...effects].filter((entry) => (entry.impact || 0) < 0).sort((a, b) => a.impact - b.impact)[0];
  const positive = [...factors, ...effects].filter((entry) => (entry.impact || 0) > 0).sort((a, b) => b.impact - a.impact)[0];
  const bestBoost = [...boosts].sort((a, b) => b.impact - a.impact)[0];

  return [
    {
      key: 'shadow',
      label: negative?.label || 'Hidden drag',
      tone: 'fragile',
      selectedLabel: negative?.selectedLabel || negative?.description || 'No dominant shadow detected.',
      description: 'This is the part of your profile currently casting the longest shadow over the estimate.'
    },
    {
      key: 'shield',
      label: positive?.label || 'Protective edge',
      tone: 'protective',
      selectedLabel: positive?.selectedLabel || positive?.description || 'No dominant protective signal detected.',
      description: 'This is the strongest thing already working in your favor.'
    },
    {
      key: 'lever',
      label: bestBoost?.label || 'Most responsive lever',
      tone: bestBoost ? 'protective' : 'balanced',
      selectedLabel: bestBoost?.description || 'The fastest gains appear after you answer the questionnaire and enable habit experiments.',
      description: 'This is the habit shift most likely to move the reading quickly.'
    }
  ];
}

export function calculateLifespan({ birthDate, responses, habitAdjustments = {} }) {
  const normalizedResponses = Object.fromEntries(Object.entries(responses).map(([key, value]) => [key, normalizeScore(value)]));
  const currentAge = getCurrentAge(birthDate);
  // Entertainment factor compresses baseline so even average health gives alarming results
  const baselineRemainingYears = interpolateRemainingExpectancy(currentAge) * ENTERTAINMENT_FACTOR;
  const factorBreakdown = buildFactorBreakdown(normalizedResponses);
  const effects = buildInteractionEffects(normalizedResponses);
  const habitBoosts = resolveHabitBoosts(normalizedResponses, habitAdjustments);
  const scienceMultiplier = buildHealthMultiplier(normalizedResponses);
  const evidenceScore = buildEvidenceScore(normalizedResponses);
  const interactionYears = effects.reduce((sum, effect) => sum + effect.impact, 0);
  const habitImpact = habitBoosts.reduce((sum, boost) => sum + boost.impact, 0);
  const remainingYearBounds = getRemainingYearsBounds(currentAge, baselineRemainingYears);
  const modeledRemainingYears = clamp(
    baselineRemainingYears * scienceMultiplier + interactionYears + habitImpact,
    remainingYearBounds.min,
    Math.min(remainingYearBounds.max, MAX_LIFESPAN - currentAge)
  );
  const quizImpact = modeledRemainingYears - baselineRemainingYears - habitImpact;
  const remainingYears = round(Math.max(modeledRemainingYears, 0));
  const estimatedLifespan = clamp(currentAge + remainingYears, MIN_LIFESPAN, MAX_LIFESPAN);
  const deathDate = addYears(birthDate, estimatedLifespan);
  const confidenceSpread = buildConfidenceSpread(currentAge, normalizedResponses);
  const confidenceLow = clamp(estimatedLifespan - confidenceSpread, MIN_LIFESPAN, MAX_LIFESPAN);
  const confidenceHigh = clamp(estimatedLifespan + confidenceSpread, MIN_LIFESPAN, MAX_LIFESPAN);
  const lifeScore = clamp(Math.round((evidenceScore * 0.72) + (((estimatedLifespan - MIN_LIFESPAN) / (MAX_LIFESPAN - MIN_LIFESPAN)) * 28)), 0, 100);
  const strongestRisk = [...factorBreakdown, ...effects].filter((entry) => (entry.impact || 0) < 0).sort((a, b) => a.impact - b.impact)[0] || factorBreakdown[0];
  const strongestProtective = [...factorBreakdown, ...effects].filter((entry) => (entry.impact || 0) > 0).sort((a, b) => b.impact - a.impact)[0] || factorBreakdown[0];
  const signatureLabel = buildSignature(lifeScore, strongestProtective, strongestRisk);
  const shadowProfileSummary = buildShadowProfile({ strongestProtective, strongestRisk, lifeScore, remainingYears });
  const narrative = buildNarrative({ estimatedLifespan, remainingYears, lifeScore, strongestRisk, confidenceLow, confidenceHigh });
  const shareSummary = `My Death Clock reading is ${signatureLabel}, with about ${round(remainingYears)} years remaining and an evidence-based lifespan range of ${round(confidenceLow)} to ${round(confidenceHigh)} years.`;

  return {
    baselineLifeExpectancy: round(currentAge + baselineRemainingYears),
    quizImpact: round(quizImpact),
    habitImpact: round(habitImpact),
    estimatedLifespan: round(estimatedLifespan),
    currentAge: round(currentAge),
    remainingYears,
    confidenceLow: round(confidenceLow),
    confidenceHigh: round(confidenceHigh),
    deathDate,
    lifeScore,
    factorBreakdown: buildReadings(factorBreakdown, effects, habitBoosts),
    shareSummary,
    signatureLabel,
    shadowProfileSummary,
    narrative,
    availableHabitToggles: HABIT_TOGGLES
  };
}

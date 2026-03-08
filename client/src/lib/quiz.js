export const quizQuestions = [
  {
    key: 'diet',
    eyebrow: '01',
    label: 'Slow poison audit',
    prompt: 'Be honest. What is your body actually running on right now?',
    context: 'Ultra-processed food, sugar spikes, and seed oils accelerate cellular aging. Rate what is actually going into your body, not what you intend to eat.',
    leftLabel: 'Junk, daily',
    rightLabel: 'Real food, always',
    scale: ['Fast food, delivery, or packaged junk is your daily default. Your cells are visibly inflamed.','You eat processed food most of the time. Vegetables are rare and occasional.','You know what you should eat but most days you do not do it. Guilt is a familiar feeling.','Your diet is patchy. Some decent meals, surrounded by bad ones.','Mix of real and processed food. Not great, not devastating — just mediocre and slow.','You eat reasonably well most days. A few weak spots but not bad.','Real food most of the time. You think about what you put in your body.','Your diet is consistently clean and intentional. You feel it.','You eat to optimize, not just to survive. Nutrition is a real discipline.','Your body is a clean machine. Nothing goes in without a reason.']
  },
  {
    key: 'exercise',
    eyebrow: '02',
    label: 'Atrophy clock',
    prompt: 'Your body starts dying the moment you stop using it. How much is yours actually moving?',
    context: 'Muscle loss, cardiovascular decay, and metabolic slowdown begin within days of inactivity. Sitting 8+ hours a day is as deadly as smoking a pack. Rate your actual movement — not your intentions.',
    leftLabel: 'Couch-locked',
    rightLabel: 'Physically formidable',
    scale: ['You barely move. Your muscles are quietly atrophying right now.','A few steps, some stairs. Your cardiovascular system is decaying faster than your age says it should.','Occasional bursts of movement surrounded by wide stretches of nothing.','You move sometimes, but not in a way that builds anything real.','Average movement for an average person with an average lifespan. Nothing more.','You exercise but it is inconsistent enough that the gains keep resetting.','Regular movement with some real effort. Your body knows you are using it.','You train intentionally. Strength and cardiovascular health are active priorities.','Exercise is a non-negotiable ritual. Your body is noticeably ahead of your age.','You are in rare physical condition. Your body is your most protected asset.']
  },
  {
    key: 'sleep',
    eyebrow: '03',
    label: 'Death rehearsal',
    prompt: 'Scientists call severe sleep deprivation a state indistinguishable from acute illness. What happens when you close your eyes?',
    context: 'Every night below 6 hours degrades your immune system, inflames your arteries, and accelerates brain aging. Sleep is the only time your body actually repairs. Rate the truth of your nights.',
    leftLabel: 'Broken, under 5 hrs',
    rightLabel: 'Deep, 8+ hrs nightly',
    scale: ['Under 5 hours most nights. Your brain is running on damage. Long-term, this is catastrophic.','Chronic sleep debt. You function but your organs are paying a compounding bill.','Inconsistent and often interrupted. Your body never fully repairs.','You sleep enough to survive but not enough to recover. There is a real difference.','Average sleep, average repair. The damage is slow and invisible until it is not.','Mostly okay with occasional crashes. Not quite restorative but close.','Solid sleep most nights. Your body gets real time to fix itself.','Consistent deep sleep. You wake up actually recovered.','Sleep is sacred and protected. Your recovery metrics would make a doctor smile.','Optimal sleep architecture. Your brain cellular repair is running at full capacity.']
  },
  {
    key: 'stress',
    eyebrow: '04',
    label: 'Cortisol erosion',
    prompt: 'Chronic stress does not just feel bad — it physically dissolves your organs. How flooded are you right now?',
    context: 'Sustained cortisol shrinks the hippocampus, accelerates arterial inflammation, and suppresses immune function. Your body treats psychological stress the same as a physical wound. Rate your real baseline, not your best day.',
    leftLabel: 'Constant emergency mode',
    rightLabel: 'Genuinely at peace',
    scale: ['You are in constant fight-or-flight. Your body is physically breaking down from it.','Chronic stress is the background noise of your entire day. Recovery is rare.','Tension lives in your body. Jaw, shoulders, sleep, digestion — all are taking damage.','Regularly overwhelmed. You cope but not without a real physical cost.','Stressed more days than not. The cumulative damage is invisible but accumulating.','Manageable most of the time, but high-pressure periods still leave real marks.','You have good regulation. Stress hits but does not stick.','Calm is a default, not a reward. Your nervous system resets quickly.','You move through pressure without absorbing it. Rare and valuable.','Exceptionally regulated. Your cortisol levels would test as a clinical outlier.']
  },
  {
    key: 'smoking',
    eyebrow: '05',
    label: 'Cigarette debt',
    prompt: 'Every cigarette costs you 11 minutes of your life. Count the ones you are still smoking.',
    context: 'Smoking damages DNA in 15 minutes. There is no safe level. Vaping causes the same arterial stiffening. Even occasional social smoking cuts years. This is the single highest-weight variable in the model. Be honest.',
    leftLabel: 'Daily smoker',
    rightLabel: 'Never touched it',
    scale: ['You are a daily heavy smoker. This variable alone is collapsing your projection.','You smoke regularly. The damage to your lungs, arteries, and DNA is not theoretical.','You smoke often enough that quitting feels impossible most days.','You smoke but you are trying to cut back. Still, the exposure is significant.','Irregular smoker or heavy vaper. The harm is real even when it feels controlled.','Occasional cigarettes or consistent vaping. Damage is lower but not zero.','Rarely smoke — a few social occasions per year. Mostly clean.','You quit and have maintained real distance. Your lungs are recovering.','You are completely free of nicotine. Your cardiovascular system is repairing.','Never smoked. Never will. The clean baseline adds years in every direction.']
  },
  {
    key: 'alcohol',
    eyebrow: '06',
    label: 'Nightly erosion',
    prompt: 'Alcohol is the only drug you get socially punished for not using. How much damage is it doing to you?',
    context: 'Alcohol directly damages liver cells, inflames the gut lining, dissolves grey matter, and disrupts deep sleep — even at moderate levels. The safe amount is zero. Rate your real intake, not the version you tell your doctor.',
    leftLabel: 'Drinking daily or heavily',
    rightLabel: 'Completely sober',
    scale: ['Drinking daily or near-daily. Your liver, brain, and sleep are all under sustained attack.','Heavy regular drinking. Multiple nights a week with real quantity. Organ damage is real.','You drink too much most weekends and sometimes during the week.','Regular drinker with occasional excess. The cumulative toll is higher than you think.','Moderate drinker. Not dangerous but not harmless either.','Drink occasionally with reasonable limits. Low-medium risk.','Infrequent drinker who stays in safe zones when it happens.','Barely drink. An occasional glass, nothing more.','Almost fully sober. Rare exceptions with genuine moderation.','Completely alcohol-free. This single variable adds meaningful years to the model.']
  },
  {
    key: 'familyHistory',
    eyebrow: '07',
    label: 'Bloodline verdict',
    prompt: 'Your DNA is a loaded gun. How often has someone in your family pulled the trigger early?',
    context: 'Heart disease, cancer, diabetes, stroke, and mental illness before age 65 in close relatives are direct genetic risk signals. You inherited the same machine. Rate how damaged the family blueprint actually is.',
    leftLabel: 'Multiple early deaths',
    rightLabel: 'Long-lived bloodline',
    scale: ['Multiple close relatives died before 60 from serious disease. You share that blueprint.','Strong family history of heart disease, cancer, or stroke. The pattern is hard to ignore.','Several relatives with serious chronic illness. Your inherited risk is clearly elevated.','Some concerning patterns in your family. Not overwhelming, but real.','Mixed family health. Some good, some concerning. The picture is blurry.','Moderate family history. A few issues but no dominant early-death pattern.','Generally healthy relatives. Some lived long. A few problems but manageable.','Your family skews toward healthy aging. Long lives are more common than not.','Strong longevity pattern. Most relatives lived well past 80.','Exceptional family health history. Long-lived, low-disease bloodline on both sides.']
  },
  {
    key: 'mentalHealth',
    eyebrow: '08',
    label: 'Mind rot index',
    prompt: 'Depression kills faster than most diseases. Anxiety shrinks your brain. How is your head actually doing?',
    context: 'Untreated depression increases all-cause mortality by 30%. Rumination and unaddressed trauma impose measurable physical damage on organs. Most people underreport. Rate your real baseline, not the face you show other people.',
    leftLabel: 'Barely holding it together',
    rightLabel: 'Genuinely stable',
    scale: ['You are genuinely struggling. Darkness is the dominant frequency inside your head right now.','Persistent low mood, anxiety, or emotional numbness that you mostly hide.','You function but carry significant psychological weight that rarely fully lifts.','More bad mental days than good. You manage but it costs you every time.','Average mental health. Some hard periods, some okay ones. No real stability.','Mostly okay with real dips. You have tools but they are not always enough.','Fairly stable. You process things and usually come back to baseline.','Good mental health with solid coping mechanisms and support.','Genuinely well. Resilient, self-aware, and rarely destabilized.','Exceptional psychological health. You are one of the rare ones who actually has this handled.']
  },
  {
    key: 'socialConnections',
    eyebrow: '09',
    label: 'Loneliness kill score',
    prompt: 'Loneliness is clinically deadlier than smoking 15 cigarettes a day. How alone are you really?',
    context: 'Social isolation raises cortisol, inflames arteries, suppresses immunity, and accelerates cognitive decline. Having 150 Instagram followers is not connection. Rate the depth of your real human bonds — the people who would notice if you disappeared.',
    leftLabel: 'Profoundly isolated',
    rightLabel: 'Deeply anchored to others',
    scale: ['You are genuinely isolated. Almost no one would notice immediately if something happened to you.','Thin connections that might not hold under pressure. Mostly surface-level.','You have acquaintances but very few real relationships. Loneliness is a regular companion.','Some meaningful people, but the network is fragile and inconsistent.','Mid-level connection. A few decent friendships, nothing deep enough to fully anchor you.','Adequate social life. Some real bonds, not fully isolated.','Good network of real relationships. You feel genuinely held by people.','Strong, authentic connections. People who would fight for you exist in your life.','Deeply embedded in real community and close relationships. You are rarely truly alone.','Exceptionally connected. Your social health is a measurable physical advantage.']
  },
  {
    key: 'riskyBehaviours',
    eyebrow: '10',
    label: 'Death wish proximity',
    prompt: 'Some people do not get old diseases. They get one spectacular accident. How close are you to that edge?',
    context: 'Reckless driving, substance combinations, extreme sports without training, impulsive decisions in dangerous environments — these are the top cause of death in people under 44. Rate your actual risk tolerance and what you have been doing with it.',
    leftLabel: 'Reckless, often',
    rightLabel: 'Deliberately careful',
    scale: ['Your behavior regularly places you in situations where one bad outcome ends everything.','You take serious risks with alarming frequency. The odds are genuinely not in your favor.','Impulse and poor judgment create real danger regularly in your life.','Riskier than most people around you. You have had close calls.','Average risk profile with occasional genuinely stupid moments.','Mostly sensible with some exposure to avoidable risk.','Deliberate about consequences. You think before you act most of the time.','Low risk tolerance backed by real self-awareness. You protect your future.','Highly cautious and intentional. You do not hand your fate to chance.','You live like your life has real value. Every decision reflects that.']
  }
];

export const habitToggles = [
  {
    key: 'smokeFreeFuture',
    label: 'Erase nicotine from the story',
    caption: 'Model the upside of making nicotine completely absent from the next version of you.'
  },
  {
    key: 'recoverySleep',
    label: 'Protect the night',
    caption: 'Treat sleep as repair, not the first thing sacrificed.'
  },
  {
    key: 'movementStreak',
    label: 'Train like survival matters',
    caption: 'Make movement frequent enough to change the trajectory, not just the mood.'
  },
  {
    key: 'cutBackAlcohol',
    label: 'Take the night back',
    caption: 'Reduce the version of alcohol that steals recovery and judgment.'
  },
  {
    key: 'stressReset',
    label: 'Teach the body to stand down',
    caption: 'Build a real recovery system for a nervous system that has been overexposed.'
  },
  {
    key: 'connectionBoost',
    label: 'Strengthen the human net',
    caption: 'Model the upside of deeper friendship, community, and support.'
  }
];

export const emptyHabitState = habitToggles.reduce((accumulator, toggle) => {
  accumulator[toggle.key] = false;
  return accumulator;
}, {});

export function allResponsesComplete(responses) {
  return quizQuestions.every((question) => Number.isInteger(responses?.[question.key]) && responses[question.key] >= 1 && responses[question.key] <= 10);
}

export function getSliderMeaning(question, value) {
  return question.scale[Math.max(0, Math.min(9, Number(value || 5) - 1))];
}

export function normalizeResponses(responses) {
  return quizQuestions.reduce((accumulator, question) => {
    const value = Number(responses?.[question.key]);

    if (Number.isInteger(value) && value >= 1 && value <= 10) {
      accumulator[question.key] = value;
    }

    return accumulator;
  }, {});
}

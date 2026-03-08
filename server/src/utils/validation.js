import { z } from 'zod';

const birthDateSchema = z
  .string()
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Birth date must be a valid date.')
  .refine((value) => new Date(value) < new Date(), 'Birth date must be in the past.');

const nameSchema = z.string().trim().min(2).max(60);
const passwordSchema = z.string().min(8, 'Password must be at least 8 characters long.').max(72);

const sliderSchema = z.number().int().min(1).max(10);

const responseSchema = z.object({
  diet: sliderSchema,
  exercise: sliderSchema,
  sleep: sliderSchema,
  stress: sliderSchema,
  smoking: sliderSchema,
  alcohol: sliderSchema,
  familyHistory: sliderSchema,
  mentalHealth: sliderSchema,
  socialConnections: sliderSchema,
  riskyBehaviours: sliderSchema
}).strict();

const habitAdjustmentSchema = z
  .object({
    smokeFreeFuture: z.boolean().optional(),
    recoverySleep: z.boolean().optional(),
    movementStreak: z.boolean().optional(),
    cutBackAlcohol: z.boolean().optional(),
    stressReset: z.boolean().optional(),
    connectionBoost: z.boolean().optional()
  })
  .strict()
  .default({});

export const registerSchema = z.object({
  name: nameSchema,
  email: z.string().trim().toLowerCase().email(),
  password: passwordSchema,
  birthDate: birthDateSchema
}).strict();

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(72)
}).strict();

export const calculationSchema = z.object({
  responses: responseSchema,
  habitAdjustments: habitAdjustmentSchema
}).strict();

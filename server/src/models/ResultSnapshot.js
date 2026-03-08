import mongoose from 'mongoose';

const resultSnapshotSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    responses: {
      type: Object,
      required: true
    },
    habitAdjustments: {
      type: Object,
      default: {}
    },
    baselineLifeExpectancy: {
      type: Number,
      required: true
    },
    quizImpact: {
      type: Number,
      required: true
    },
    habitImpact: {
      type: Number,
      required: true
    },
    estimatedLifespan: {
      type: Number,
      required: true
    },
    currentAge: {
      type: Number,
      required: true
    },
    remainingYears: {
      type: Number,
      required: true
    },
    confidenceLow: {
      type: Number,
      required: true
    },
    confidenceHigh: {
      type: Number,
      required: true
    },
    lifeScore: {
      type: Number,
      required: true
    },
    deathDate: {
      type: Date,
      required: true
    },
    factorBreakdown: {
      type: Array,
      default: []
    },
    shareSummary: {
      type: String,
      required: true
    },
    signatureLabel: {
      type: String,
      required: true
    },
    shadowProfileSummary: {
      type: String,
      required: true
    },
    narrative: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

resultSnapshotSchema.index({ user: 1, createdAt: -1 });

export const ResultSnapshot = mongoose.model('ResultSnapshot', resultSnapshotSchema);

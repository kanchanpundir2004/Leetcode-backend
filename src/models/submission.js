const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define Submission Schema
const submissionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user", // must match your actual user model name
      required: true,
    },
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "problem", // must match your actual problem model name
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: ["javascript", "c++", "java"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "wrong", "error"],
      default: "pending",
    },
    runtime: {
      type: Number, // milliseconds
      default: 0,
    },
    memory: {
      type: Number, // kilobytes
      default: 0,
    },
    errorMessage: {
      type: String,
      default: "",
    },
    testCasesPassed: {
      type: Number,
      default: 0,
    },
    testCasesTotal: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// ✅ Compound index — prevents duplicates only if you want one submission per problem
// If you want to allow multiple submissions, remove { unique: true }
submissionSchema.index({ userId: 1, problemId: 1 }, { unique: false });

// Create model
const Submission = mongoose.model("submission", submissionSchema);

module.exports = Submission;

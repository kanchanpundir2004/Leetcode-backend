// const {
//   getLanguageById,
//   submitBatch,
//   submitToken,
// } = require("../utils/problemUtility");
// const Problem = require("../models/problem");
// const User = require("../models/user");
// const Submission = require("../models/submission");
// const SolutionVideo = require("../models/solutionVideo");

// const createProblem = async (req, res) => {
//   // API request to authenticate user:
//   const {
//     title,
//     description,
//     difficulty,
//     tags,
//     visibleTestCases,
//     hiddenTestCases,
//     startCode,
//     referenceSolution,
//     problemCreator,
//   } = req.body;

//   try {
//     for (const { language, completeCode } of referenceSolution) {
//       // source_code:
//       // language_id:
//       // stdin:
//       // expectedOutput:

//       const languageId = getLanguageById(language);

//       // I am creating Batch submission
//       const submissions = visibleTestCases.map((testcase) => ({
//         source_code: completeCode,
//         language_id: languageId,
//         stdin: testcase.input,
//         expected_output: testcase.output,
//       }));

//       const submitResult = await submitBatch(submissions);
//       // console.log(submitResult);

//       const resultToken = submitResult.map((value) => value.token);

//       // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

//       const testResult = await submitToken(resultToken);

//       console.log(testResult);

//       for (const test of testResult) {
//         if (test.status_id != 3) {
//           return res.status(400).send("Error Occured");
//         }
//       }
//     }

//     // We can store it in our DB

//     const userProblem = await Problem.create({
//       ...req.body,
//       problemCreator: req.result._id,
//     });

//     res.status(201).send("Problem Saved Successfully");
//   } catch (err) {
//     res.status(400).send("Error: " + err);
//   }
// };

// const updateProblem = async (req, res) => {
//   const { id } = req.params;
//   const {
//     title,
//     description,
//     difficulty,
//     tags,
//     visibleTestCases,
//     hiddenTestCases,
//     startCode,
//     referenceSolution,
//     problemCreator,
//   } = req.body;

//   try {
//     if (!id) {
//       return res.status(400).send("Missing ID Field");
//     }

//     const DsaProblem = await Problem.findById(id);
//     if (!DsaProblem) {
//       return res.status(404).send("ID is not persent in server");
//     }

//     for (const { language, completeCode } of referenceSolution) {
//       // source_code:
//       // language_id:
//       // stdin:
//       // expectedOutput:

//       const languageId = getLanguageById(language);

//       // I am creating Batch submission
//       const submissions = visibleTestCases.map((testcase) => ({
//         source_code: completeCode,
//         language_id: languageId,
//         stdin: testcase.input,
//         expected_output: testcase.output,
//       }));

//       const submitResult = await submitBatch(submissions);
//       // console.log(submitResult);

//       const resultToken = submitResult.map((value) => value.token);

//       // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

//       const testResult = await submitToken(resultToken);

//       //  console.log(testResult);

//       for (const test of testResult) {
//         if (test.status_id != 3) {
//           return res.status(400).send("Error Occured");
//         }
//       }
//     }

//     const newProblem = await Problem.findByIdAndUpdate(
//       id,
//       { ...req.body },
//       { runValidators: true, new: true }
//     );

//     res.status(200).send(newProblem);
//   } catch (err) {
//     res.status(500).send("Error: " + err);
//   }
// };

// const deleteProblem = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!id) return res.status(400).send("ID is Missing");

//     const deletedProblem = await Problem.findByIdAndDelete(id);

//     if (!deletedProblem) return res.status(404).send("Problem is Missing");

//     res.status(200).send("Successfully Deleted");
//   } catch (err) {
//     res.status(500).send("Error: " + err);
//   }
// };

// const getProblemById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!id) return res.status(400).send("ID is Missing");

//     const getProblem = await Problem.findById(id).select(
//       "_id title description difficulty tags visibleTestCases startCode referenceSolution "
//     );

//     // video ka jo bhi url wagera le aao

//     if (!getProblem) return res.status(404).send("Problem is Missing");

//     const videos = await SolutionVideo.findOne({ problemId: id });

//     if (videos) {
//       const responseData = {
//         ...getProblem.toObject(),
//         secureUrl: videos.secureUrl,
//         thumbnailUrl: videos.thumbnailUrl,
//         duration: videos.duration,
//       };

//       return res.status(200).send(responseData);
//     }

//     res.status(200).send(getProblem);
//   } catch (err) {
//     res.status(500).send("Error: " + err);
//   }
// };

// const getAllProblem = async (req, res) => {
//   try {
//     const getProblem = await Problem.find({}).select(
//       "_id title difficulty tags"
//     );

//     if (getProblem.length == 0)
//       return res.status(404).send("Problem is Missing");

//     res.status(200).send(getProblem);
//   } catch (err) {
//     res.status(500).send("Error: " + err);
//   }
// };

// const solvedAllProblembyUser = async (req, res) => {
//   try {
//     const userId = req.result._id;

//     const user = await User.findById(userId).populate({
//       path: "problemSolved",
//       select: "_id title difficulty tags",
//     });

//     res.status(200).send(user.problemSolved);
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// };

// const submittedProblem = async (req, res) => {
//   try {
//     const userId = req.result._id;
//     const problemId = req.params.pid;

//     const ans = await Submission.find({ userId, problemId });

//     if (ans.length == 0) res.status(200).send("No Submission is persent");

//     res.status(200).send(ans);
//   } catch (err) {
//     res.status(500).send("Internal Server Error");
//   }
// };

// module.exports = {
//   createProblem,
//   updateProblem,
//   deleteProblem,
//   getProblemById,
//   getAllProblem,
//   solvedAllProblembyUser,
//   submittedProblem,
// };

// controllers/problemController.js

const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemUtility");
const Problem = require("../models/problem");
const User = require("../models/user");
const Submission = require("../models/submission");
const SolutionVideo = require("../models/solutionVideo");

const debug = (...args) => {
  // Replace with a proper logger if you have one
  console.debug(new Date().toISOString(), ...args);
};

/**
 * Validate incoming body for Problem create/update
 * - requireAll: when true insists top-level fields exist
 */
function validateProblemInput(body = {}, { requireAll = true } = {}) {
  const requiredTop = ["title", "description", "difficulty", "tags"];
  if (requireAll) {
    for (const k of requiredTop) {
      if (!body[k]) throw new Error(`Missing field: ${k}`);
    }
  }

  // Ensure array typed fields are arrays if provided
  const arrayFields = [
    "visibleTestCases",
    "hiddenTestCases",
    "startCode",
    "referenceSolution",
  ];
  for (const f of arrayFields) {
    if (body[f] !== undefined && !Array.isArray(body[f])) {
      throw new Error(`Field '${f}' must be an array`);
    }
  }

  // Per-item validations
  if (Array.isArray(body.visibleTestCases)) {
    body.visibleTestCases.forEach((t, i) => {
      if (!t?.input || !t?.output || !t?.explanation) {
        throw new Error(
          `visibleTestCases[${i}] must have input, output, explanation`
        );
      }
    });
  }
  if (Array.isArray(body.hiddenTestCases)) {
    body.hiddenTestCases.forEach((t, i) => {
      if (!t?.input || !t?.output) {
        throw new Error(`hiddenTestCases[${i}] must have input, output`);
      }
    });
  }
  if (Array.isArray(body.startCode)) {
    body.startCode.forEach((s, i) => {
      if (!s?.language || s?.initialCode === undefined) {
        throw new Error(`startCode[${i}] must have language and initialCode`);
      }
    });
  }
  if (Array.isArray(body.referenceSolution)) {
    body.referenceSolution.forEach((s, i) => {
      if (!s?.language || s?.completeCode === undefined) {
        throw new Error(
          `referenceSolution[${i}] must have language and completeCode`
        );
      }
    });
  }

  // Enum checks (mongoose will also validate)
  if (
    body.difficulty &&
    !["easy", "medium", "hard"].includes(body.difficulty)
  ) {
    throw new Error("difficulty must be one of: easy | medium | hard");
  }

  // If tags should be one of fixed list — adjust as per your app
  if (body.tags && typeof body.tags === "string") {
    const allowedTags = ["array", "linkedList", "graph", "dp"];
    if (!allowedTags.includes(body.tags)) {
      throw new Error(`tags must be one of: ${allowedTags.join(" | ")}`);
    }
  }
}

/**
 * Run reference solutions against visible testcases (Judge0)
 * Throws when a reference solution fails.
 */
async function runReferenceChecks(
  visibleTestCases = [],
  referenceSolution = []
) {
  if (!Array.isArray(referenceSolution) || referenceSolution.length === 0)
    return true;
  if (!Array.isArray(visibleTestCases) || visibleTestCases.length === 0)
    return true;

  for (const { language, completeCode } of referenceSolution) {
    const languageId = getLanguageById(language);
    if (!languageId) throw new Error(`Unknown language: ${language}`);

    const submissions = visibleTestCases.map((tc) => ({
      source_code: completeCode,
      language_id: languageId,
      stdin: tc.input,
      expected_output: tc.output,
    }));

    let submitResult;
    try {
      submitResult = await submitBatch(submissions); // array of { token }
    } catch (err) {
      throw new Error(
        "Failed to submit reference solutions to judge: " + err.message
      );
    }

    const tokens = (submitResult || []).map((x) => x?.token).filter(Boolean);
    if (!tokens.length) throw new Error("Failed to receive tokens from judge");

    let results;
    try {
      results = await submitToken(tokens);
    } catch (err) {
      throw new Error("Failed to fetch judge results: " + err.message);
    }

    // results can be { status: { id } } or { status_id }
    for (const r of results) {
      const statusId = r?.status?.id ?? r?.status_id;
      if (statusId !== 3) {
        const stderr = r?.stderr;
        const compileOut = r?.compile_output;
        const runtimeErr = r?.message;
        throw new Error(
          `Reference solution failed a test (status=${statusId}). ` +
            `${compileOut ? "Compile: " + compileOut + ". " : ""}` +
            `${stderr ? "Stderr: " + stderr + ". " : ""}` +
            `${runtimeErr ? "Runtime: " + runtimeErr + ". " : ""}`
        );
      }
    }
  }
  return true;
}

/**
 * Create new problem (admin only)
 */
const createProblem = async (req, res) => {
  try {
    if (!req.result?._id) {
      return res.status(401).send("Unauthorized");
    }

    const body = req.body || {};
    validateProblemInput(body, { requireAll: true });

    const { visibleTestCases = [], referenceSolution = [] } = body;

    // Run reference solution checks (will throw on failure)
    await runReferenceChecks(visibleTestCases, referenceSolution);

    // Persist problem; override problemCreator with authenticated user
    const payload = {
      ...body,
      problemCreator: req.result._id,
    };

    const userProblem = await Problem.create(payload);
    return res.status(201).json({
      message: "Problem Saved Successfully",
      problemId: userProblem._id,
    });
  } catch (err) {
    debug("CREATE PROBLEM ERROR:", err.message);
    return res.status(400).send("Error: " + err.message);
  }
};

/**
 * Update problem by id
 */
const updateProblem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).send("Missing ID Field");

    const existing = await Problem.findById(id);
    if (!existing) return res.status(404).send("ID is not present in server");

    // Validate incoming fields but do not require all
    validateProblemInput(req.body || {}, { requireAll: false });

    const {
      visibleTestCases = existing.visibleTestCases || [],
      referenceSolution = existing.referenceSolution || [],
    } = req.body || {};

    // If caller updated arrays, validate against judge; else reuse existing
    if (
      Array.isArray(req.body?.referenceSolution) ||
      Array.isArray(req.body?.visibleTestCases)
    ) {
      await runReferenceChecks(
        Array.isArray(req.body.visibleTestCases)
          ? req.body.visibleTestCases
          : visibleTestCases,
        Array.isArray(req.body.referenceSolution)
          ? req.body.referenceSolution
          : referenceSolution
      );
    }

    // Prevent spoofing problemCreator
    if ("problemCreator" in req.body) {
      delete req.body.problemCreator;
    }

    const updated = await Problem.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true }
    );

    return res.status(200).json(updated);
  } catch (err) {
    debug("UPDATE PROBLEM ERROR:", err.message);
    return res.status(500).send("Error: " + err.message);
  }
};

/**
 * Delete problem by id
 */
const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(400).send("ID is Missing");

    const deletedProblem = await Problem.findByIdAndDelete(id);
    if (!deletedProblem) return res.status(404).send("Problem is Missing");

    return res.status(200).send("Successfully Deleted");
  } catch (err) {
    debug("DELETE PROBLEM ERROR:", err.message);
    return res.status(500).send("Error: " + err.message);
  }
};

/**
 * Get problem by id (includes startCode, referenceSolution, and optional video metadata)
 */
const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.status(400).send("ID is Missing");

    const problem = await Problem.findById(id).lean();
    if (!problem) return res.status(404).send("Problem is Missing");

    // Ensure arrays always exist
    problem.visibleTestCases = problem.visibleTestCases || [];
    problem.hiddenTestCases = problem.hiddenTestCases || [];
    problem.startCode = problem.startCode || [];
    problem.referenceSolution = problem.referenceSolution || [];

    // Attach editorial video if exists
    const video = await SolutionVideo.findOne({ problemId: id }).lean();

    return res.status(200).json({
      ...problem,
      secureUrl: video?.secureUrl || null,
      thumbnailUrl: video?.thumbnailUrl || null,
      duration: video?.duration || 0,
    });
  } catch (err) {
    return res.status(500).send("Error: " + err.message);
  }
};

/**
 * Get all problems (list)
 */
const getAllProblem = async (req, res) => {
  try {
    const list = await Problem.find({}).select("_id title difficulty tags");
    // return empty array instead of 404 so frontend doesn't break
    return res.status(200).json(list || []);
  } catch (err) {
    debug("GET ALL PROBLEM ERROR:", err.message);
    return res.status(500).send("Error: " + err.message);
  }
};

/**
 * Get all solved problems for authenticated user
 */
const solvedAllProblembyUser = async (req, res) => {
  try {
    if (!req.result?._id) return res.status(401).send("Unauthorized");
    const userId = req.result._id;
    const user = await User.findById(userId).populate({
      path: "problemSolved",
      select: "_id title difficulty tags",
    });
    return res.status(200).json(user?.problemSolved || []);
  } catch (err) {
    debug("SOLVED PROBLEMS ERROR:", err.message);
    return res.status(500).send("Server Error");
  }
};

/**
 * Get submissions for a user for a specific problem
 */
const submittedProblem = async (req, res) => {
  try {
    if (!req.result?._id) return res.status(401).send("Unauthorized");
    const userId = req.result._id;
    const problemId = req.params.pid || req.params.id; // accept either :pid or :id

    if (!problemId) return res.status(400).send("Missing problem id");

    const ans = await Submission.find({ userId, problemId });
    if (!ans || ans.length === 0) return res.status(200).json([]);

    return res.status(200).json(ans);
  } catch (err) {
    debug("SUBMITTED PROBLEM ERROR:", err.message);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
  solvedAllProblembyUser,
  submittedProblem,
};

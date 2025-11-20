// const axios = require("axios");

// const getLanguageById = (lang) => {
//   const language = {
//     "c++": 54,
//     java: 62,
//     javascript: 63,
//   };

//   return language[lang.toLowerCase()];
// };

// const submitBatch = async (submissions) => {
//   const options = {
//     method: "POST",
//     url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
//     params: {
//       base64_encoded: "false",
//     },
//     headers: {
//       "x-rapidapi-key": process.env.JUDGE0_KEY,
//       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//       "Content-Type": "application/json",
//     },
//     data: {
//       submissions,
//     },
//   };

//   async function fetchData() {
//     try {
//       const response = await axios.request(options);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return await fetchData();
// };

// const waiting = async (timer) => {
//   setTimeout(() => {
//     return 1;
//   }, timer);
// };

// // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

// const submitToken = async (resultToken) => {
//   const options = {
//     method: "GET",
//     url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
//     params: {
//       tokens: resultToken.join(","),
//       base64_encoded: "false",
//       fields: "*",
//     },
//     headers: {
//       "x-rapidapi-key": process.env.JUDGE0_KEY,
//       "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
//     },
//   };

//   async function fetchData() {
//     try {
//       const response = await axios.request(options);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   while (true) {
//     const result = await fetchData();

//     const IsResultObtained = result.submissions.every((r) => r.status_id > 2);

//     if (IsResultObtained) return result.submissions;

//     await waiting(1000);
//   }
// };

// module.exports = { getLanguageById, submitBatch, submitToken };

// //
const axios = require("axios");

// 🧩 Map human-readable language name to Judge0 ID
const getLanguageById = (lang) => {
  const language = {
    "c++": 54,
    java: 62,
    javascript: 63,
    python: 71,
  };
  return language[lang.toLowerCase()];
};

// ⏳ Helper function to wait for a given time
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 📨 Submit batch of test cases to Judge0
const submitBatch = async (submissions) => {
  try {
    const response = await axios.request({
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: { base64_encoded: false, fields: "*" },
      headers: {
        "x-rapidapi-key": process.env.JUDGE0_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },

      data: { submissions },
    });

    return response.data; // should contain array of tokens
  } catch (error) {
    console.error("❌ Error in submitBatch:", error.message);
    throw error;
  }
};

// 🎯 Poll Judge0 until results are ready
const submitToken = async (resultToken) => {
  try {
    while (true) {
      const response = await axios.request({
        method: "GET",
        url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
        params: {
          tokens: resultToken.join(","),
          base64_encoded: false,
          fields: "*",
        },
        headers: {
          "x-rapidapi-key": process.env.JUDGE0_KEY,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        },
      });

      const result = response.data;

      if (!result || !result.submissions) {
        await wait(1000);
        continue;
      }

      // ✅ Check if all results are ready
      const allDone = result.submissions.every((r) => r.status_id > 2);

      if (allDone) return result.submissions;

      // Wait for 1 second before polling again
      await wait(1000);
    }
  } catch (error) {
    console.error("❌ Error in submitToken:", error.message);
    throw error;
  }
};

module.exports = { getLanguageById, submitBatch, submitToken };

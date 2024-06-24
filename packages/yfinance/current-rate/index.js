const axios = require("axios");

async function main(args) {
  const RAPID_API_KEY = process.env["RAPID_API_KEY"];

  try {
    const result = await axios.get(
      encodeURI(
        `https://yh-finance.p.rapidapi.com/market/v2/get-quotes?symbols=^TNX&region=US`
      ),
      {
        headers: {
          "x-rapidapi-key": RAPID_API_KEY,
          "x-rapidapi-host": "yh-finance.p.rapidapi.com",
        },
      }
    );

    return {
      statusCode: result.status,
      body: result.data,
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: { error: err?.message || err } };
  }
}

exports.main = main;

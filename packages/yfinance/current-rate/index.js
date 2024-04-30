const yahooFinance = require("yahoo-finance2").default;

async function main(args) {
  try {
    const path_value = decodeURI(args?.__ow_path);

    if (!path_value) {
      return {
        statusCode: 400,
        body: { error: "Symbol is required", path_value },
      };
    }

    const symbol = path_value ? path_value.split("/")[1] : null;

    const results = await yahooFinance.quote(symbol);
    const regularMarketPrice = results?.regularMarketPrice;

    if (!regularMarketPrice) {
      throw new Error("Could not get the current rate");
    }

    console.log("Current rate is: ", regularMarketPrice);

    return {
      statusCode: 200,
      body: { symbol, current_rate: regularMarketPrice },
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: { error: err?.message || err } };
  }
}

exports.main = main;

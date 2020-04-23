const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Stocks = new Schema(
  {
    symbol: { type: String, required: true },
    open: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    volume: { type: Number, required: true },
    close: { type: Number, required: true },
    date: { type: Date, required: true },
    NOTE: { type: String, required: false }
  },
  { timestamps: true },
  { collection: "stockMonthlyHistory" }
);

module.exports = mongoose.model("stocks", Stocks, "stockMonthlyHistory");

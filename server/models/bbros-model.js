const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BBros = new Schema(
  {
    PORTFOLIO: { type: String, required: true },
    STOCK_NAME: { type: String, required: true },
    PURCHASE_DATE: { type: Date, required: true },
    SYMBOL: { type: String, required: true },
    NO_OF_SHARES: { type: Number, required: true },
    UNIT_COST: { type: Number, required: true },
    TOTAL_AMOUNT: { type: Number, required: false },
    PRICE: { type: Number, required: false },
    VALUE: { type: Number, required: false },
    GAIN_LOSS: { type: Number, required: false },
    PERCENT_RETURN: { type: Number, required: false },
    REPORT_DATE: { type: Date, required: true },
    BROKER: { type: String, required: false },
    COMMENT1: { type: String, required: false },
    COMMENT2: { type: String, required: false },
    COMMENT3: { type: String, required: false }
  },
  { timestamps: true },
  { collection: "portfolios" }
);

module.exports = mongoose.model("bbros", BBros, "portfolios");

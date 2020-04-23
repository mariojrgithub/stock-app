const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickTransactions = new Schema(
  {
    STK: { type: String, required: true },
    PORT: { type: String, required: true },
    SYM: { type: String, required: true },
    DATE: { type: Date, required: true },
    SHARES: { type: Number, required: true },
    TOT_COST: { type: Number, required: false },
    COST_PER_SHARE: { type: Number, required: false },
    PRICE: { type: Number, required: false },
    VALUE: { type: Number, required: false },
    TYPE: { type: String, required: true },
    REALIZED_GAIN_LOSS: { type: Number, required: false },
    NET_PROCEEDS: { type: Number, required: false },
    BROKER: { type: String, required: false },
    COMMENT1: { type: String, required: false },
    COMMENT2: { type: String, required: false },
    COMMENT3: { type: String, required: false }
  },
  { timestamps: true },
  { collection: "pickTransactions" }
);

module.exports = mongoose.model(
  "picktransactions",
  PickTransactions,
  "pickTransactions"
);

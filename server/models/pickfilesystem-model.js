const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PickFile = new Schema(
  {
    CAB_DRWR: { type: String, required: true },
    TYPE: { type: String, required: true },
    ENTITY: { type: String, required: true },
    DESCRIPTION: { type: String, required: true },
    ID_NUMB: { type: String, required: true },
    DATE: { type: Date, required: false },
    COMMENT1: { type: String, required: false },
    COMMENT2: { type: String, required: false },
    COMMENT3: { type: String, required: false }
  },
  { timestamps: true },
  { collection: "pickFileSystem" }
);

module.exports = mongoose.model("pickfile", PickFile, "pickFileSystem");

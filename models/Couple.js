const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coupleSchema = new mongoose.Schema({
  soldier: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  gomsin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  events: {
    visit: [{
      type: Date,
    }],
    vacation: [{
      type: Date,
    }],
    anniversary: [{
      type: Date,
    }],
    discharge: {
      type: Date,
    },
  },
  stage: {
    type: Number,
  },
  flower_collection: [{
    type: String,
  }],
});

module.exports = mongoose.model("Couple", coupleSchema);

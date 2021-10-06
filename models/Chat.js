const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  messages: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    time: {
      type: Date,
      required: true,
    }
  }],
});

module.exports = mongoose.model("Message", messageSchema);

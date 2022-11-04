const mongoose = require("mongoose");
const tweetSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("tweet", tweetSchema);
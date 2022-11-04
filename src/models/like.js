const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
 
    tweet_id: {
      type: String,
      required: true,
    },
  },
 
);
 

module.exports = mongoose.model("Like", likeSchema);
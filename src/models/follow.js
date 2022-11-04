const mongoose = require("mongoose");
const followSchema = new mongoose.Schema(
  {
    seguidor_id: {
      type: String,
      required: true,
    },
 
    siguiendo_id: {
      type: String,
      required: true,
    },
  },
 
);
 

module.exports = mongoose.model("Follow", followSchema);
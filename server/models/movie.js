const mongoose = require("mongoose");
MovieSchema = new mongoose.Schema({
  title: {type: String, required: [true, "You must provide a title"]},
  plot: { type: String, required: [true, "You must provide a plot for your movie"]},
  tag_line: { type: String},
  round: {type: Number},
  selected: {type:Boolean, default: false},
  player: {type:String},
});
mongoose.model("Movie",MovieSchema)
const mongoose = require("mongoose")
const GameSchema = require("./game.js");
PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "You must provide a username"],
    minlength: [3, "Your name must be more than 3 characters"],
    unique: true
  },
  games: [GameSchema]
});
mongoose.model("Player", PlayerSchema);
    


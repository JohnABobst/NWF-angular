const mongoose = require("mongoose");
const MovieSchema = require("./movie.js")
FieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide a name for the field"]
  }
});

ScoreSchema = new mongoose.Schema({
  score: { type: Number },
  player: { type: String },
  
});
    
SubmissionSchema = new mongoose.Schema({
  submission: {},
  player: { type: String },
  selected: { type: Boolean, default: false }
});

GameSchema = new mongoose.Schema({
    rounds: {type:Number, required:[true, "You must provide a number of rounds"] },
    players: {type:Number, required:[true, "You must provide a number of players"]},
    round: {type:Number, default:1},
    judge: {type:Number, default:0},
    scores: [ScoreSchema],
    category: {type:String},
    fields: [FieldSchema],
    completed: {type:Boolean, default: false},
    submissions: [MovieSchema],
    title: {type:String}      
});
mongoose.model("Score", ScoreSchema);
mongoose.model("Field", FieldSchema);
mongoose.model("Submission", SubmissionSchema);
mongoose.model("Game", GameSchema)

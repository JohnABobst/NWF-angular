const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
server.listen(8000);
const mongoose = require("./server/config/mongoose.js");
const models = require("mongoose");
const io = require("socket.io")(server);
const Movie = models.model("Movie")
const Score = models.model("Score");
const Player = models.model("Player");
const Submission = models.model("Submission");
const Game = models.model("Game");
const title = require("./server/controllers/words/title");


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(__dirname + "/public/dist/public"))

require("./server/config/routes.js")(app)

io.on('connection', (socket)=> {
    
    console.log('new connection made.');
    socket.on("join", (data)=>{
        console.log("The data from angular is ", data)
        Score.create({player:data.user.username, score:0})
            .then(score => {
                Game.findOneAndUpdate(
                    {_id:data.game._id},
                    {$push: {scores:score}},
                    {new:true},
                    function(error,data){
                        if(data){
                            socket.join(data._id);
                            console.log("The data in socket.join is,", data);
                            io.to(data._id).emit("update", {game:data,message:"Player joined game"});                            
                        }
                        if(error){
                            return response.json(error)
                        }
                    }
                )
            })
            .catch(error=> response.json(error))        
    })
    socket.on("enterGame", game => {
        socket.join(game)
    })
    socket.on("select", data => {
        console.log("The data from angular is", data)
        Game.findOneAndUpdate(
            {_id:data._id},
            data,
            { new:true}
            )
            .then(data=> {
                console.log("The data after update is",data)
                io.to(data._id).emit(data);
            })
            .catch(error =>  console.log(error))
            
            
    })
    socket.on("generateTitle", id=>{
        console.log("Generating title in server")
        Game.findOneAndUpdate(
          { _id: id },
          { title: title.title() },
          { new: true }
        )
          .then(game => {
              console.log(game)
            io.to(game._id).emit("generated",game)
          })
          .catch(error => {            
            response.json(error);
          });
    })
    socket.on("submitMovie", (data)=> {
        Movie.create(data.movie)
            .then(movie => {
                console.log(data)
                Game.findOneAndUpdate(
                    {_id:data.id},
                    {$push: {submissions:movie}},
                    {new:true},
                    function(error,data){
                        if(error){
                            io.to(data._id).emit("submitError", error)
                        }
                        else{                            
                            console.log("The data in submitMovie is", data._id)
                            io.to(data._id).emit("submitted", data)
                        }
                    }
                )
            })        
    })
})


const mongoose = require("mongoose")
const fs = require('fs')
const title = require("./words/title")
const Score = mongoose.model("Score")
const Player = mongoose.model("Player")
const Submission = mongoose.model("Submission")
const Game = mongoose.model("Game")



module.exports = {
    games: function(request,response){
        Game.find({completed: false})
            .then(data => response.json(data))
            .catch(error => response.json(error))
    },
    game: function(request,response){
        console.log(request.params.id)
        Game.findOne({_id:request.params.id})
            .then(data=> response.json(data))
            .catch(error => response.json(error))
    },
    generateTitle: function(request,response){
        Game.findOneAndUpdate(
            {_id:request.params.id},
            {title: title.title()},
            {new:true}
        )
        .then(game=> {
            console.log("The game is ", game)
            response.json(game);
        })
        .catch(error => {
            console.log("The error is ", error)
            response.json(error);
        })

    },
    create: function(request,response){
        Game.create(request.body)
            .then(data=> response.json(data))
            .catch(error => response.json(error))
    },
    join: function(request,response){
        Player.findOne({ _id: request.params.id })
            .then(data => {
                Game.findOneAndUpdate(
                    {_id: request.body.gameId},
                    {$push: {players:data}},
                    {new:true},
                    function(error,data){
                        if(error){
                            return response.json(error)
                        }
                        else{
                            return response.json(data)
                        }
                    }               
                )        
            })
            .catch(error => response.json(error))
    },
    submit: function(request,response){
        Submission.create(request.body)
            .then(data=> 
                {Game.findOneAndUpdate(
                {_id:request.params.gameId},
                {$push: {submissions:data}},
                {new:true},
                function(error,data){
                    if(error){
                        return response.json(error)
                    }
                    else{
                        return response.json(data)
                    }
                })
            })
            .catch(error => response.json(error))                
    },
    deleteGame: function(request,response){
        Game.deleteOne({_id:request.params.id})
            .then(Game.find({completed:false})
                .then(games => {
                    console.log("The list of agmes after delete is",games)
                    return response.json(games)
                }))
                .catch(error=> {
                    return response.json(error)
                })
            .catch(error => {
                return response.json(error)
            })   
    },
    select: function(request,response){
        let opts = { runValidators: true }
        Submission.findOne({_id:request.body.id})
            .then(data => {
                data.selected=true
                data.save()
                return response.json(data)
            })
            .then(error => response.json(error))
    },
    save: function(request,response){
        let opts = { runValidators:true }
        Game.findByIdAndUpdate(
            request.params.id,
            request.body,
            opts, function(error){
                return response.json(error)
            },
            {new:true}
        )
        
    },
    deleteScore: function(request,response){
        console.log(request.params.gameId);
        Game.findOne({_id: request.params.gameId})
            .then(game => {
             
                game.scores.id(request.params.scoreId).remove();
                
                return response.json(game);
            })          
            .catch(error=> response.json(error))
           
    }

}

const mongoose = require("mongoose")
const Player = mongoose.model("Player")

module.exports = {
    login: function (request,response) {
        Player.findOne({ username: request.body.username })
          .then(data => response.json(data))
          .catch(error=> esponse.json(error))    
            
    },
    register: function(request,response) {
        Player.create(request.body)
              .then(data => {
                  console.log(data)
                response.json(data);
              })
              .catch(error => {
                response.json(error);
              })          
    },
    player: function(request,response){
        console.log("Request.body.id = ",request.body.id)
        Player.findOne({_id:request.params.id})
            .then(data=> {
                console.log(data);
                response.json(data);
            })
            .catch(error => response.json(error))
    }
}

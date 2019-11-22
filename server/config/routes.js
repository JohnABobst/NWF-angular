const games = require("../controllers/games");
const players = require("../controllers/players");
const path = require('path')

module.exports = function(app) {
  app.get("/api/games", (request, response) => {
    games.games(request, response);
  });
  app.delete("/api/games/:id", (request,response)=>{
    games.deleteGame(request,response)
  });
  app.post("/api/games", (request,response)=> {
    games.create(request,response)
  });
  app.get("/api/games/:id", (request, response) => {
    games.game(request, response);
  });
  app.post("/api/join/:id", (request, response) => {
    games.join(request, response);
  });  
  app.post("/api/game/submit", (request, response) => {
    games.submit(request, response);
  });
  app.post("/api/game/select", (request, response) => {
    games.select(request, response);
  });
  app.post("/api/game/save/:id", (request, response) => {
    games.save(request, response);
  });
  app.get("/api/user/:id", (request,response)=>{
    console.log("The request body in routes.js is, ",request.body)
    players.player(request,response)
  })
  app.post("/api/login", (request, response) => {
    players.login(request, response);
  });
  app.post("/api/users", (request,response) => {
    players.register(request,response)
  });
  app.delete("/api/scores/:gameId/:scoreId", (request,response)=> {
    games.deleteScore(request,response)
  });
  app.get("/api/games/:id/title", (request,response)=> {
    games.generateTitle(request,response)
  })
  app.all("*", (request, response, next) => {
    response.sendFile(path.resolve("./public/dist/public/index.html"));
  });
};

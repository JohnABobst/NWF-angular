import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  login(data){
    return this._http.post('/api/login', data)
  }
  createGame(data){
    return this._http.post('/api/games', data)
  }
  loadGame(id){
    return this._http.get('/api/games/'+id)
  }
  loadUser(id){
    console.log("Loading user with id ", id)
    return this._http.get('/api/user/'+id)
  }
  createUser(data){
    return this._http.post('/api/users',data)
  }
  loadGames(){
    return this._http.get('/api/games')
  }
  destroyScore(gameId,scoreId){
    return this._http.delete('/api/scores/'+gameId+"/"+scoreId)
  }
  destroyGame(id){
    return this._http.delete("/api/games/"+id)
  }
  generateTitle(id){
    return this._http.get("/api/games/"+id+"/title")
  }
}

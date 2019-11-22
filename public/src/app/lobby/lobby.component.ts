import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";
import { WebSocketService } from '../web-socket.service';
import { observable } from 'rxjs';


@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"]
})
export class LobbyComponent implements OnInit {
  user: any;
  game_id: any;
  games: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    
  ) {}

  ngOnInit(){
    this.user = {username: ""}
    
      this._route.params.subscribe((params: Params) => {
        console.log("The params are ",params)
        this.getUser(params['id'])
    });    
    this.getGames();  
    
  }
  deleteGame(id){
    let observable=this._httpService.destroyGame(id)
    observable.subscribe(data=> {
      console.log("The new games data is", data)
      this.games=data
    })
  }
  getGames(){
    let observable= this._httpService.loadGames()
    observable.subscribe(data=> {
      
      this.games=data
    })
  }
  getUser(id){    
      let observable = this._httpService.loadUser(id)
      observable.subscribe(data=> {
        console.log(data)
        this.user=data
      })
    }
}
  


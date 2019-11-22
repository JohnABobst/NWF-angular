import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
@Component({
  selector: "app-create-game",
  templateUrl: "./create-game.component.html",
  styleUrls: ["./create-game.component.css"]
})
export class CreateGameComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  game: any
  
  ngOnInit() {
    this.game = {players:3,rounds:3}
    
  }
  createGame(){
    let observable = this._httpService.createGame(this.game)
    observable.subscribe(data => {
      console.log("The data on create is", data)
      this._router.navigate(["/game", data['_id']])
    })
  }

  
}

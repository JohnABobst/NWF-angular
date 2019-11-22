import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from "../http.service";
import { WebSocketService } from "../web-socket.service";
import { DataService } from "../data.service";
@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"]
})
export class GameComponent implements OnInit {
  user: any;
  game: any;
  submissions: any[]=[];
  messages: any[]=[]
  players: any[]=[];
  movie: any={};
  judging: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    private _socket: WebSocketService,
    private _data: DataService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getGame(params["id"]);
    });    
    this._data.currentUser.subscribe(user => (this.user = user));
    if (this.user.username == "") {
      this._router.navigate(["/"]);
    }
    this._socket.joined().subscribe((data)=> {
      this.game=data['game'];
      this.messages.push(data['message'])
      this.players = this.game.scores.map(score => score.player);
      this.judging = this.players[this.game["judge"]];
    })
    this._socket.submitted().subscribe((data)=> {      
      this.game=data
    })
    this._socket.generated().subscribe((data)=> {
      console.log("The game after generate title", data)
      this.game=data
      console.log("After generating request.game.title is", this.game.title)
      this.movie.title = data.title
    })
    this.movie = {
      title: "",
      plot: "",
      tag_line: ""
    };
  }
  public ngAfterViewInit() {}
  
  join() {    
    this._socket.joinGame({ user: this.user, game: this.game });
    
    
  }
  getGame(id) {
    let observable = this._httpService.loadGame(id);
    observable.subscribe(data => {
      this.game = data;
      this.players = this.game.scores.map(score => score.player);
      this.judging = this.players[this.game["judge"]];
      this._socket.enter(this.game._id);
    });
  }
  getTitle(id) {
    
      this._socket.generateTitle(id)    
  }  
  lobby() {
    this._router.navigate(["/lobby/", this.user["_id"]]);
  }
  deleteScore(id) {
    let observable = this._httpService.destroyScore(this.game._id, id);
    observable.subscribe(() => {
      this.getGame(this.game._id);
    });
  }
  selectMovie(index) {
    this.game.submissions[index].selected = true
    this.game.round +=1
    if (this.game.judging % this.players.length == 0){
      this.game.judging=0
    }
    else{
      this.game.judging+=1
    }
    
   
    this._socket.select(this.game)
  }
  submit() {    
    this.movie.round = this.game.round
    this.movie.player = this.user.username;
    this._socket.submitMovie(      
      {      
        movie: this.movie,
        id: this.game._id
    })
    this.movie = {
      title: "",
      plot: "",
      tag_line: ""
    };
        
  }
}

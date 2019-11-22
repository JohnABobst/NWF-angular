import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from '../http.service';
import { DataService } from '../data.service'
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: any;
  register: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    private _data: DataService
  ) {}

  ngOnInit() {
    this.user = { username: "", games: [] };
    this.register = { username: "", games: [] };

  }
  loginUser() {
    let observable = this._httpService.login(this.user);
    observable.subscribe(data => {
      this._data.setUser(data)
      this._router.navigate(["/lobby",data['_id']]);
    });
  }
  registerUser(){
    
    let observable = this._httpService.createUser(this.register);
    observable.subscribe(data => {
      this._data.setUser(data);
      this._router.navigate(["/lobby",data['_id']]);

  })
}
}

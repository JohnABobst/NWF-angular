import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { Observable, BehaviorSubject, observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WebSocketService {

  constructor() {}

  private socket = io("http://localhost:8000");
  joined = ()=> {
    return Observable.create((observer)=>{
      this.socket.on("update", data=>{
        observer.next(data)
      })
    })
  }
  select(data){
    console.log("The data in angular emited by select is", data)
    this.socket.emit("select",data)
  }
  selected = ()=> {
    return Observable.create((observer)=> {
      this.socket.on("selected", data=> {
        observer.next(data)
      })
    })
  }
  submitted = ()=> {
    return Observable.create((observer)=> {
      this.socket.on("submitted", data=> {        
        observer.next(data)
      })
    })
  }
  joinGame(data) {
    this.socket.emit("join", data);
  }
  message(id) {
    this.socket.emit("message", id);
  } 
  submitMovie(data){    
    this.socket.emit("submitMovie", data); 
  }
  generateTitle(id){
    this.socket.emit("generateTitle", id)
  }
  generated(){
    return Observable.create((observer)=> {
      this.socket.on("generated", data=> {
        observer.next(data)
      })
    })
  }
  enter(game){    
    this.socket.emit("enterGame", game)
  }
}

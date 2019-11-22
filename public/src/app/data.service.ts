import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private userSource = new BehaviorSubject({ username: "" });
  currentUser = this.userSource.asObservable();
  constructor() {}
  setUser(data){
    this.userSource.next(data)
  }
}

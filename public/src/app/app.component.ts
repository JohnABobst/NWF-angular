import { Component } from '@angular/core';
import "hammerjs";
import { WebSocketService } from "./web-socket.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WebSocketService]
})
export class AppComponent {
  constructor(private _socket: WebSocketService){}
 
}

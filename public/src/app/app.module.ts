import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebSocketService } from "./web-socket.service";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule } from "@angular/material/input";
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { HttpService } from "./http.service";
import { HttpClientModule } from "@angular/common/http";
import { MatGridListModule } from "@angular/material/grid-list";
import { JudgingComponent } from './game/judging/judging.component';
import { SubmissionsComponent } from './game/submissions/submissions.component';
import { SubmitComponent } from './game/submit/submit.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CreateGameComponent,
    LobbyComponent,
    LoginComponent,
    JudgingComponent,
    SubmissionsComponent,
    SubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
   
    
  ],

  providers: [WebSocketService, HttpService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

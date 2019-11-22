import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from "./lobby/lobby.component"
import { CreateGameComponent } from "./create-game/create-game.component"
import { GameComponent }  from "./game/game.component"
import { LoginComponent } from "./login/login.component"
const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "lobby/:id", component: LobbyComponent},
  { path: "create_game", component: CreateGameComponent},
  { path: "game/:id", component: GameComponent },
  
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './components/detail/detail.component';
import { GameListComponent } from './components/game-list/game-list.component';

const routes: Routes = [
  {path: "", component: GameListComponent},
  {path: ":slug", component: DetailComponent },
  {path: "genre/:genre", component: GameListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

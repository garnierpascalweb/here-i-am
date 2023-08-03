import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkComponent } from './mark/mark.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path : 'show', component : ShowComponent },
  { path : 'mark', component : MarkComponent },
  // path vide, path par defaut
  { path : '', component : ShowComponent }
  
] ;;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

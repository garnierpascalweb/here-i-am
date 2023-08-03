import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkComponent } from './mark/mark.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [ 
  { path : 'show', component : ShowComponent },
  { path : 'mark', component : MarkComponent },
  { path : '', component : ShowComponent }
  
] ;;

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
// useHash:true sinon ca marche pas en prod - https://medium.com/code-divoire/angular-le-pi%C3%A8ge-du-hash-90212ab883aa
export class AppRoutingModule { }

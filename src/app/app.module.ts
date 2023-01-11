import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { ShowComponent } from './show/show.component';
import { MarkComponent } from './mark/mark.component';
import { RouterModule, Routes } from '@angular/router';
import { MarkService } from './services/mark.service';

const appRoutes : Routes = [
  { path : 'show', component : ShowComponent },
  { path : 'mark', component : MarkComponent }
] ;

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    MarkComponent
  ],
  imports: [
    BrowserModule,    
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    MarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

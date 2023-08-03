import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";


import { AppComponent } from './app.component';
import { ShowComponent } from './show/show.component';
import { MarkComponent } from './mark/mark.component';
import { RouterModule, Routes } from '@angular/router';
import { MarkService } from './services/mark.service';
import { ShowService } from './services/show.service';
import { MapComponent } from './map/map.component';
import { PointListComponent } from './point-list/point-list.component';

const appRoutes : Routes = [
  { path : 'show', component : ShowComponent },
  { path : 'mark', component : MarkComponent },
  // path vide, path par defaut
  { path : '', component : ShowComponent }
  
] ;

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    MarkComponent,
    MapComponent,
    PointListComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ShowService,
    MarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

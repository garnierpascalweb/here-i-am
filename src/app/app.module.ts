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
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    MarkComponent,
    MapComponent,
    PointListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,    
    HttpClientModule
  ],
  providers: [
    ShowService,
    MarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

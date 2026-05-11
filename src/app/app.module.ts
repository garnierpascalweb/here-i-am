import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { MapComponent } from './map/map.component';
import { MarkComponent } from './mark/mark.component';
import { PointListComponent } from './point-list/point-list.component';
import { MarkService } from './services/mark.service';
import { ShowService } from './services/show.service';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowComponent,
    MarkComponent,
    MapComponent,
    PointListComponent,
    ConfigComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,    
    HttpClientModule,    
    FormsModule
  ],
  providers: [
    ShowService,
    MarkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

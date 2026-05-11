import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FlagService } from '../services/flag.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss']
})

/**
 * @since 1.1.0
 * Sous composant de show
 * Permet d'afficher la liste des points sous forme de tableau
 */
export class PointListComponent implements OnInit, OnDestroy {
  @Input() points: any[];
  
  constructor(private flagService: FlagService, private weatherService : WeatherService) {
  
  }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    
  }

  getIcon(code: number): string {
  return this.weatherService.getWeatherIcon(code);
}
getTemperatureColor(temp: number) :  string {
  return this.weatherService.getTemperatureColor(temp);
}
getFlagIcon(code:string) : string {
return this.flagService.getFlagIcon(code);
}

getWeatherDescription(code: number){
  return this.weatherService.getWeatherDescription(code);
}
}

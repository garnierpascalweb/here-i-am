import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../model/weather/weather-data';
import { WeatherResponse } from '../model/weather/weather-response';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor() {}


  getWeatherIcon(code: number, isDay: number): string {
    if (code === 0) return isDay ? 'wi-day-sunny' : 'wi-night-clear';
    if ([1,2].includes(code)) return isDay ? 'wi-day-cloudy' : 'wi-night-alt-cloudy';
    if (code === 3) return 'wi-cloudy';

    if ([45,48].includes(code)) return 'wi-fog';

    if ([51,53,55].includes(code)) return 'wi-sprinkle';

    if ([61,63,65].includes(code)) return 'wi-rain';

    if ([71,73,75].includes(code)) return 'wi-snow';

    if ([80,81,82].includes(code)) return 'wi-showers';

    if ([95,96,99].includes(code)) return 'wi-thunderstorm';

    return 'wi-na';
  }

  getWeatherLabel(code: number): string {
    if (code === 0) return 'Ensoleillé';
    if ([1,2].includes(code)) return 'Partiellement nuageux';
    if (code === 3) return 'Nuageux';

    if ([45,48].includes(code)) return 'Brouillard';

    if ([51,53,55].includes(code)) return 'Bruine';

    if ([61,63,65].includes(code)) return 'Pluie';

    if ([71,73,75].includes(code)) return 'Neige';

    if ([80,81,82].includes(code)) return 'Averses';

    if ([95,96,99].includes(code)) return 'Orage';

    return 'Inconnu';
  }
}

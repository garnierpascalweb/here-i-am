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

 private basePath = 'assets/weather/';

  private iconMap: Record<number, string> = {
    0: 'clear-day.svg',

    1: 'mostly-clear-day.svg',
    2: 'partly-cloudy-day.svg',
    3: 'overcast.svg',

    45: 'fog.svg',
    48: 'fog.svg',

    51: 'drizzle.svg',
    52: 'drizzle.svg',
    53: 'drizzle.svg',
    54: 'drizzle.svg',
    55: 'drizzle.svg',

    56: 'sleet.svg',
    57: 'sleet.svg',

    61: 'rain.svg',
    62: 'rain.svg',
    63: 'overcast-rain.svg',
    64: 'overcast-rain.svg',
    65: 'overcast-rain.svg',

    66: 'rain.svg',
    67: 'overcast-rain.svg',

    71: 'snow.svg',
    72: 'snow.svg',
    73: 'snow.svg',
    74: 'snow.svg',
    75: 'snow.svg',
    76: 'snow.svg',
    77: 'snow.svg',
    78: 'snow.svg',
    79: 'snow.svg',

    80: 'partly-cloudy-day-rain.svg',
    81: 'overcast-rain.svg',
    82: 'extreme-rain.svg',
    84: 'extreme-rain.svg',

    95: 'thunderstorms.svg',
    96: 'thunderstorms-rain.svg',
    97: 'extreme-thunderstorms.svg',
    98: 'extreme-thunderstorms.svg',
    99: 'extreme-thunderstorms-rain.svg',
  };

  getWeatherIcon(code: number): string {
    const file = this.iconMap[code] ?? 'not-available.svg';
    return `${this.basePath}${file}`;
  }

  getTemperatureColor(temp: number): string {
  const min = -25;
  const max = 45;
  const pivot = 15;

  let ratio: number;

  if (temp <= pivot) {
    // bleu -> neutre
    ratio = (temp - min) / (pivot - min); // 0 → 1
    const hue = 210; // bleu
    const saturation = 90;
    const lightness = 55 + (ratio * 10); // un peu plus doux en montant
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  } else {
    // neutre -> rouge
    ratio = (temp - pivot) / (max - pivot); // 0 → 1
    const hue = 0; // rouge
    const saturation = 90;
    const lightness = 65 - (ratio * 15); // plus vif en montant
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}
}

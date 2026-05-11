import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  constructor() {}

  private readonly basePath = "assets/weather/";

  private readonly iconMap: Record<number, string> = {
    0: "clear-day.svg",

    1: "mostly-clear-day.svg",
    2: "partly-cloudy-day.svg",
    3: "overcast.svg",

    45: "fog.svg",
    48: "fog.svg",

    51: "drizzle.svg",
    52: "drizzle.svg",
    53: "drizzle.svg",
    54: "drizzle.svg",
    55: "drizzle.svg",

    56: "sleet.svg",
    57: "sleet.svg",

    61: "rain.svg",
    62: "rain.svg",
    63: "overcast-rain.svg",
    64: "overcast-rain.svg",
    65: "overcast-rain.svg",

    66: "rain.svg",
    67: "overcast-rain.svg",

    71: "snow.svg",
    72: "snow.svg",
    73: "snow.svg",
    74: "snow.svg",
    75: "snow.svg",
    76: "snow.svg",
    77: "snow.svg",
    78: "snow.svg",
    79: "snow.svg",

    80: "partly-cloudy-day-rain.svg",
    81: "overcast-rain.svg",
    82: "extreme-rain.svg",
    84: "extreme-rain.svg",
    85: "partly-cloudy-day-snow.svg", // neige légère / intermittente
    86: "extreme-snow.svg",

    95: "thunderstorms.svg",
    96: "thunderstorms-rain.svg",
    97: "extreme-thunderstorms.svg",
    98: "extreme-thunderstorms.svg",
    99: "extreme-thunderstorms-rain.svg",
  };

  getWeatherIcon(code: number): string {
    const file = this.iconMap[code] ?? "not-available.svg";
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
      const lightness = 55 + ratio * 10; // un peu plus doux en montant
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    } else {
      // neutre -> rouge
      ratio = (temp - pivot) / (max - pivot); // 0 → 1
      const hue = 0; // rouge
      const saturation = 90;
      const lightness = 65 - ratio * 15; // plus vif en montant
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
  }

  getWeatherDescription(code: number): string {
    const map: Record<number, string> = {
      0: "ciel limpide",
      1: "principalement ensoleillé",
      2: "partiellement nuageux",
      3: "couvert",

      45: "brouillard",
      48: "brouillard givrant",

      51: "bruine légère",
      52: "bruine modérée",
      53: "bruine dense",
      54: "bruine très dense",
      55: "bruine intense",

      56: "bruine verglaçante légère",
      57: "bruine verglaçante forte",

      61: "pluie faible",
      62: "pluie modérée",
      63: "pluie forte",
      64: "pluie très forte",
      65: "pluie intense",

      66: "pluie verglaçante légère",
      67: "pluie verglaçante forte",

      71: "neige faible",
      72: "neige modérée",
      73: "neige forte",
      74: "neige très forte",
      75: "neige extrême",
      76: "neige persistante",
      77: "grains de neige",

      80: "averses faibles",
      81: "averses modérées",
      82: "averses fortes",

      85: "averses de neige faibles",
      86: "averses de neige fortes",

      95: "ruscle",
      96: "ruscle",
      99: "ruscle",
    };

    return map[code] ?? "météo inconnue";
  }
}

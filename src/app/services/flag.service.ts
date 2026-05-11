import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FlagService {
  private readonly basePath = "assets/flags/";
  constructor() {}
  /**
   * Retourne l'URL de l'icône de drapeau selon le code pays
   * @param codeCountry ex: "fr", "us", "de"
   */
  getFlagIcon(codeCountry: string): string {
    if (!codeCountry) {
      return `${this.basePath}unknown.svg`;
    }

    const normalizedCode = codeCountry.toLowerCase();

    return `${this.basePath}${normalizedCode}.svg`;
  }
}

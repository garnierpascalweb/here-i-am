/**
 * Objet representant la reponse du service Mark
 */
export class MarkServiceResponse {
  marked: boolean;
  message: string = "";
  status: string = "";
  lat: number = 0;
  lng: number = 0;
  alt: number | null = 0;
  // 1.2.0
  accuracy: number = 0;
}

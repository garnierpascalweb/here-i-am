import { Point } from "../model/point";

/**
 * @since 1.1.0
 * Objet représentant le réponse du service Show
 */
export class ShowServiceResponse {
   points: Point[];
   message: string;
   datas: any[];

   constructor() {
                
   }
}
import { MyPoint } from "../model/point";

/**
 * @since 1.1.0
 * Objet représentant le réponse du service Show
 */
export class ShowServiceResponse {
   points: MyPoint[];
   message: string;
   datas: any[];

   constructor() {
                
   }
}
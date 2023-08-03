import { MyPoint } from "../model/mypoint.class";


/**
 * @since 1.1.0
 * Objet représentant le réponse du service Show
 */
export class ShowServiceResponse {
   // points: MyPoint[];
   message: string;
   datas: any[];
   status:string;

   constructor() {
                
   }
}
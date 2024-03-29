/**
 * Objet representant la reponse du service Mark
 */
export class MarkServiceResponse {
    marked:boolean;
    message:string;
    status:string;
    lat:number;
    lng:number;
    alt:number|null;
    // 1.2.0
    accuracy:number;

    constructor() {
        this.message = '';
        this.status = '';
        this.lat = 0;
        this.lng = 0;
        this.alt = 0;          
        this.accuracy = 0;
    }
}
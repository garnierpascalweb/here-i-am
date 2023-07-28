
/**
 * 
 */
export class MarkServiceResponse {
    marked:boolean;
    message:string;
    status:string;
    lat:number;
    lng:number;
    alt:number|null;

    constructor() {
        this.message = '';
        this.status = '';
        this.lat = 0;
        this.lng = 0;
        this.alt = 0;          
    }

    

}
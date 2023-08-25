import { IMyPoint } from "./mypoint.interface";

/**
 * @since 1.1.0
 * 
 */
export class MyPoint implements IMyPoint {
    lat: number;
    lng: number;
    alt: number;
    commune: string|null;
    codepostal:string|null;
    timepoint:number;

    constructor(myPoint: IMyPoint) {
        this.lat = myPoint.lat;
        this.lng = myPoint.lng;
        this.alt = myPoint.alt;
        this.commune = myPoint.commune;
        this.codepostal = myPoint.codepostal;
        this.timepoint = myPoint.timepoint;    
    }
}
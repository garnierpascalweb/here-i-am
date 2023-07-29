import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { API_URI } from "../config/app.config";
import { MarkServiceResponse } from "./mark.service.response";

/**
 * Service Mark
 * @since 2.0.0
 */
@Injectable()
export class MarkService {

    private response: MarkServiceResponse;  
    responseSubject = new Subject<MarkServiceResponse>();
    
    constructor(private httpClient : HttpClient){
        this.response = new MarkServiceResponse();
    }

    emitResponseSubject(){
        if(this.response)
            this.responseSubject.next(this.response);            
    }

    /**
     * Marque la position de l'utilisateur et envoi au backend
     * @since 2.0.0
     */
    markPosition(position: GeolocationPosition){
        console.log('markPosition appelle');        
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        //TODO altitude non interpretee
        let alt = position.coords.altitude;       
        let datas = lat + ";" + lng;
        // mettre un timeout en 3e argument de post

        this.httpClient.post(API_URI,datas)
        .subscribe({
            next: (response) => {                
                this.response.message = 'succes de lappel';  
                this.response.status = 'ok';  
                this.response.lat = lat;
                this.response.lng = lng;
                this.response.alt = alt;
                this.response.marked=true;                               
            },
            error: (response) => {                
                this.response.message = 'echec de lappel'
                this.response.status = 'error';  
                this.response.marked=false;               
            },
            complete: () => {                 
                this.emitResponseSubject();
                // apres 5 secondes, reinitialisation de lecran
                setTimeout(
                    () => {
                        this.response.message = ''
                        this.response.status = 'default';
                        this.response.lat = 0.0;
                        this.response.lng = 0.0;
                        this.response.alt = 0.0; 
                        this.response.marked=false;
                        this.emitResponseSubject();            
                    }, 5000
                )
            } 
        });
    }   
}
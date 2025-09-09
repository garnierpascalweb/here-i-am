import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';
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

    emitResponse(){
        if(this.response)
            this.responseSubject.next(this.response);            
    }

    /**
     * Marque la position de l'utilisateur et envoi au backend
     * @since 2.0.0
     */
    markPosition(position: GeolocationPosition){                  
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
          // 1.2.0 envoi de l'altitude  
        let alt = position.coords.altitude;       
        // 1.2.0 accuracy
        let accuracy = Math.round(position.coords.accuracy);
        // let datas = lat + ";" + lng;  
        let datas: string; 
        // alt peut etre null : verification prealable pour data     
        if (alt){
            // arrondi de laltitude a l'entier pres
            let altRounded = Math.round(alt);
            datas = lat + ";" + lng + ";" + altRounded;
        } else {
            datas = lat + ";" + lng + ";";
        }
                
        // mettre un timeout en 3e argument de post
        this.httpClient.post(environment.apiUrl,datas)
        .subscribe({
            next: (response) => {                
                this.response.message = 'Succes de lappel';  
                this.response.status = 'ok';  
                this.response.lat = lat;
                this.response.lng = lng;
                this.response.alt = alt;
                this.response.accuracy = accuracy;
                this.response.marked=true;                               
            },
            error: (response) => {                
                this.response.message = 'Echec de lappel'
                this.response.status = 'error';  
                this.response.marked=false;               
            },
            complete: () => {                 
                this.emitResponse();
                // apres 5 secondes, reinitialisation de lecran
                setTimeout(
                    () => {
                        this.response.message = ''
                        this.response.status = 'default';
                        this.response.lat = 0.0;
                        this.response.lng = 0.0;
                        this.response.alt = 0.0; 
                        this.response.marked=false;
                        this.emitResponse();            
                    }, 5000
                )
            } 
        });
    }   
}
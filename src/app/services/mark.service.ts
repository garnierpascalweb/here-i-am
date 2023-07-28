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

    response: MarkServiceResponse;  
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
        let alt = position.coords.altitude;
        console.log('lat ' + lat);
        console.log('lng ' + lng);
        console.log('alt ' + alt);
        let datas = lat + ";" + lng;
        let options = {

        }

        this.httpClient.post(API_URI,datas,options)
        .subscribe({
            next: (response) => {
                console.log("appel de next") ;   
                this.response.message = 'succes de lappel';  
                this.response.status = 'ok';  
                this.response.lat = lat;
                this.response.lng = lng;
                this.response.alt = alt;
                this.response.marked=true;                               
            },
            error: (response) => {
                console.log("appel de error") ;   
                this.response.message = 'echec de lappel'
                this.response.status = 'error';  
                this.response.marked=false;               
            },
            complete: () => { 
                console.log("appel de complete") ; 
                this.emitResponseSubject();  
                //setTimeout(this.clear(),5000);              
            } 
        });
    }

    /**
     * @since 2.0.0
     * Reinitialisation du Bean
     */
    clear(){
        console.log('clear sur objet ' + this.response);
        this.response.message = '';  
        this.response.status = 'default';  
        this.response.lat = 0.0;
        this.response.lng = 0.0;
        this.response.alt = 0.0;
        this.response.marked=false;
        this.emitResponseSubject();                         
    }
}
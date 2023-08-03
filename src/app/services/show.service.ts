import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { API_URI } from "../config/app.config";
import { ShowServiceResponse } from "./show.service.response";


/**
 * Service Show
 * @since 2.0.0
 */
@Injectable()
export class ShowService {
 
    private response: ShowServiceResponse;  
    responseSubject = new Subject<ShowServiceResponse>();
    
    constructor(private httpClient : HttpClient){
        this.response = new ShowServiceResponse();
    }

    emitResponseSubject(){
        if(this.response)
            this.responseSubject.next(this.response);            
    }

    /**
     * @since 1.1.0
     * Rend l'ensemble des points dans response.datas (tableau)
     * Rend aussi un message
     */
    showPositions(){
        this.httpClient.get<any[]>(API_URI)
        .subscribe({
            next: (response) => {                
                this.response.datas = response;
                let nbTraces = this.response.datas.length;
                let lastPoint = this.response.datas.reverse()[0];
                let lastDate = lastPoint.timepoint;
                this.response.message = nbTraces + " traces enregistrées - dernière en date le " + lastDate ;    
                this.emitResponseSubject();        
            },
            error: (response) => {                
                this.response.datas = response;
                this.response.message = "Echec du chargement des données";          
                this.emitResponseSubject();
            },
            complete: () => {                               
                this.emitResponseSubject();
            } 
        });
    }    
}
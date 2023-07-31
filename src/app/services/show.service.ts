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
     * Rend l'ensemble des points dans response.datas
     */
    showPositions(){
        this.httpClient.get(API_URI)
        .subscribe({
            next: (response) => {                
                this.response.datas = response;
                this.response.message = "Chargement des données OK";            
            },
            error: (response) => {                
                this.response.datas = response;
                this.response.message = "Echec du chargement des données";          
            },
            complete: () => {                               
                this.emitResponseSubject();
            } 
        });
    }    
}
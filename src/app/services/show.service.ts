import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { API_URI } from "../config/app.config";
import { CustomDatePipe } from "../pipe/customdatepipe";
import { ShowServiceResponse } from "./show.service.response";


/**
 * Service Show
 * @since 2.0.0
 */
@Injectable()
export class ShowService {
 
    private response: ShowServiceResponse;  
    responseSubject = new Subject<ShowServiceResponse>();
    datepipe: DatePipe; 
    
    constructor(private httpClient : HttpClient){
        this.response = new ShowServiceResponse();
        this.datepipe = new CustomDatePipe('en-US');
    }

    emitResponseSubject(){
        if(this.response){
            this.responseSubject.next(this.response);            
        }
    }

    /**
     * @since 1.1.0
     * Rend l'ensemble des points dans response.datas (tableau) en mode reverse (plus recent en premier)
     * Rend aussi un message avec le dernier point (ca ne concerne que show et ne devrait pas etre ici)
     * @todo a faire
     */
    showPositions(){
        this.httpClient.get<any[]>(API_URI)
        .subscribe({
            next: (response) => {  
                console.log("[show.service.ts] response est " + response +" de type  " + typeof response);
                this.response.datas = response.reverse();
                let nbTraces = this.response.datas.length;
                let lastPoint = this.response.datas[0];
                let lastDate = lastPoint.timepoint;
                let lastCodePostal = lastPoint.codepostal;
                let lastCommune = lastPoint.commune;
                this.response.message = nbTraces + " traces enregistrées - dernière en date le " + this.datepipe.transform(lastDate) + " a proximité de  " + lastCodePostal + "  " + lastCommune;    
                this.emitResponseSubject();        
            },
            error: (error) => {                
                this.response.datas = [];
                this.response.message = "Echec du chargement des données  " + error.message;                  
                this.emitResponseSubject();
            },
            complete: () => {                               
                this.emitResponseSubject();
            } 
        });
    }    
}
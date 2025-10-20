import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from 'src/environments/environment';
import { MyPoint } from "../model/mypoint.class";
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

    emitResponse(){
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
        this.httpClient.get<any[]>(environment.endpoints.hereiam)
        .subscribe({
            next: (response) => {                 
                this.response.datas = response.reverse();
                let nbTraces = this.response.datas.length;
                let lastPoint = this.response.datas[0];
                let lastDate = lastPoint.timepoint;
                let lastCodePostal = lastPoint.codepostal;
                let lastCommune = lastPoint.commune;
                this.response.message = nbTraces + ' traces enregistrées - dernière en date le ' + this.datepipe.transform(lastDate) + ' a proximité de  ' + lastCodePostal + ' ' + lastCommune;    
                this.response.status = 'ok';
                this.emitResponse();        
            },
            error: (error) => {                
                this.response.datas = [];
                this.response.message = 'Echec du chargement des données  ' + error.message;  
                this.response.status = 'error';                
                this.emitResponse();
            },
            complete: () => {                               
                this.emitResponse();
            } 
        });
    }

    /**
     * @since 1.1.0
     * @todo 1.1.0 partir sur cette approche
     * Inspiré de https://medium.com/egen/using-angular-httpclient-the-right-way-60c65146e5d9
     */
    getPoints(): Observable<MyPoint[] | null> {
        return this.httpClient.get<MyPoint[]>(environment.endpoints.tracking);
    }
}
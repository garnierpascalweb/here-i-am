import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

/**
 * Service Mark
 * @since 2.0.0
 */
@Injectable()
export class MarkService {

    private message : string;
    messageSubject = new Subject<string>();
    
    constructor(private httpClient : HttpClient){

    }

    emitMessageSubject(){
        if(this.message)
            this.messageSubject.next(this.message.slice());
    }

    /**
     * Marque la position de l'utilisateur et envoi au backend
     * @since 2.0.0
     */
    markPosition(position: GeolocationPosition){
        console.log('markPosition appelle');
        let uri = 'http://localhost:4200';
        let datas = '';
        let options = {

        }

        this.httpClient.post(uri,datas,options)
        .subscribe({
            next: (response) => {
                this.message = 'succes de lappel';  
                this.emitMessageSubject();                              
            },
            error: (response) => {
                this.message = 'echec de lappel'
                this.emitMessageSubject();
            },
            complete: () => { 
                this.emitMessageSubject();
            } 
        });
    }
}
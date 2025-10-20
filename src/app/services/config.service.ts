import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigServiceResponse } from './config.service.response';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private response: ConfigServiceResponse;
   responseSubject = new Subject<ConfigServiceResponse>();

  constructor(private http: HttpClient) {
this.response = new ConfigServiceResponse();
  }

  emitResponse(){
        if(this.response){
            this.responseSubject.next(this.response);   
            console.log("response rendue " + JSON.stringify(this.response));
        }
    }

  getConfig(){
    this.http.get<ConfigServiceResponse>(environment.apiUrlConfig)
        .subscribe({
            next: (response) => {                                
                this.response.message = 'Configuration chargée avec succès';    
                this.response.status = 'ok';
                this.response.geoloc = response.geoloc;
                this.emitResponse();        
            },
            error: (error) => {                               
                this.response.message = 'Probleme de chargement de la configuration';  
                this.response.status = 'error';                
                this.emitResponse();
            },
            complete: () => {                               
                this.emitResponse();
            } 
        });
    
  }
}

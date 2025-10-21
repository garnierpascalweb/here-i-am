import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Subject } from 'rxjs';
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

    emitResponse() {
        if (this.response) {
            this.responseSubject.next(this.response);
        }
    }

    /**
     * chargement de la configuration
     */
    getConfig() {
        this.http.get<ConfigServiceResponse>(environment.endpoints.config)
            .subscribe({
                next: (response) => {
                    this.response.message = '';
                    this.response.status = '';
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

    /**
     * modification de la configuration
     * @param impl nouvelle implementation a utiliser
     */
    changeConfig(impl: string) {
        let datas = {
                    configName: "geoloc",
                    current: impl
         };
        this.http.patch(environment.endpoints.config, datas)
            .pipe(
                finalize(() => {
                    // Code exécuté après next ou error, sûr pour les HTTP
                    this.emitResponse();
                    setTimeout(() => {
                        console.log("Execution après timeout");
                        this.response.message = '';
                        this.response.status = 'default';
                        this.getConfig();
                    }, 5000);
                })
            )
            .subscribe({
                next: (response) => {
                    this.response.message = 'Succes du changement de configuration pour GeoLoc : ' + impl;
                    this.response.status = 'ok';
                },
                error: (response) => {
                    this.response.message = 'Echec du changement de la configuration'
                    this.response.status = 'error';
                }
            });
    }
}

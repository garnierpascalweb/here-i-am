import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarkService } from '../services/mark.service';
import { MarkServiceResponse } from '../services/mark.service.response';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit, OnDestroy {

  response: MarkServiceResponse;  
  responseSubscription: Subscription;

  constructor(private markService: MarkService) {
    this.response = new MarkServiceResponse();   
    this.responseSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.responseSubscription = this.markService.responseSubject.subscribe(
      (response:MarkServiceResponse) => {
        this.response = response;
      }
    );
    this.markService.emitResponseSubject();
  }

  ngOnDestroy():void {
    this.responseSubscription.unsubscribe();
  }

  /**
   * Click sur le bouton
   * @since 2.0.0
   */
  onClickButton() {   
    this.response.message = 'Envoi de la position en cours';    
    this.response.status = 'warning';
    this.response.marked = false;
    let geoLocOptions = {
      enabledHighAccruracy: true,
      maximumAge:10000,
      timeout:3000
    };
    // calcul de la position
    if (navigator.geolocation) {     
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {         
        if (position) {         
          this.markService.markPosition(position);          
        } else {
          this.response.message = 'Impossible de calculer la position';          
          this.response.status = 'danger';
          //this.response.response = 'btn btn-danger';
        }
      },
        (error: GeolocationPositionError) => {          
          this.response.message = 'Erreur lors de la recuperation de la position';         
          this.response.status = 'danger';
        }, geoLocOptions
      );
    } else {           
      this.response.message = 'La geolocalisation nest pas supportee';      
      this.response.status = 'warning';     
    }      
  }
}

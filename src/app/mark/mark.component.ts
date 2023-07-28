import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarkService } from '../services/mark.service';
import { MarkServiceResponse } from '../services/mark.service.response';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {

  response: MarkServiceResponse;  
  messageSubscription: Subscription;

  constructor(private markService: MarkService) {
    this.response = new MarkServiceResponse();   
    this.messageSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.messageSubscription = this.markService.responseSubject.subscribe(
      (messageResponse:MarkServiceResponse) => {
        this.response = messageResponse;
      }
    );
    this.markService.emitResponseSubject();
  }

  ngOnDestroy():void {
    this.messageSubscription.unsubscribe();
  }

  /**
   * Click sur le bouton
   * @since 2.0.0
   */
  onClickButton() {
    //console.log('')
    this.response.message = 'Envoi de la position en cours';   
    let geoLocOptions = {
      enabledHighAccruracy: true,
      maximumAge:10000,
      timeout:3000
    };
    // calcul de la position
    if (navigator.geolocation) {     
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {  
        console.log('position vue');     
        if (position) {         
          this.markService.markPosition(position);          
        } else {
          this.response.message = 'Impossible de calculer la position';
          //this.response.response = 'btn btn-danger';
        }
      },
        (error: GeolocationPositionError) => { 
          console.log('erreur position');  
          this.response.message = 'Erreur lors de la recuperation de la position';
          //this.response.color = 'btn btn-danger';  
        }, geoLocOptions
      );
    } else {     
      console.log('geoloc pas ok sur ton browser');
      this.response.message = 'La geolocalisation nest pas supportee';
      //this.response.color = 'btn btn-danger';
    }      
  }

  /**
   * Methode privee permettant de calculer la position
   * @since 2.0.0
   */
  private getLocation() {
    
  }

}

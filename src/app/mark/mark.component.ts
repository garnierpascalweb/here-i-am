import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarkService } from '../services/mark.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {
  messageText: string;
  messageClass: string; 
  messageSubscription: Subscription;

  constructor(private markService: MarkService) {
    this.messageText = 'Ton pere';
    this.messageClass = 'btn btn-info';
    this.messageSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.messageSubscription = this.markService.messageSubject.subscribe(
      (message:string) => {
        this.messageText = message;
      }
    );
    this.markService.emitMessageSubject();
  }

  /**
   * Click sur le bouton
   * @since 2.0.0
   */
  onClickButton() {
    //console.log('')
    this.messageText = 'Envoi de la position en cours';
    this.messageClass = 'btn btn-warning';
    let geoLocOptions = {
      enabledHighAccruracy: true,
      maximumAge:10000,
      timeout:3000
    };
    // calcul de la position
    if (navigator.geolocation) {
      console.log('geoloc ok sur ton browser');
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition): void => {  
        console.log('position vue');     
        if (position) {         
          this.markService.markPosition(position);
        } else {
          this.messageText = 'Impossible de calculer la position';
          this.messageClass = 'btn btn-danger';
        }
      },
        (error: GeolocationPositionError) => { 
          console.log('erreur position');  
          this.messageText = 'Erreur lors de la recuperation de la position';
          this.messageClass = 'btn btn-danger';          
        }, geoLocOptions
      );
    } else {     
      console.log('geoloc pas ok sur ton browser');
      this.messageText = 'La geolocalisation nest pas supportee';
      this.messageClass = 'btn btn-danger';      
    }   
  }

  /**
   * Methode privee permettant de calculer la position
   * @since 2.0.0
   */
  private getLocation() {
    
  }

}

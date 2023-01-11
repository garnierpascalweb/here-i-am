import { Component } from '@angular/core';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent {
  messageText: string;
  messageClass: string;

  constructor(){
    this.messageText = 'Ton pere';
    this.messageClass = 'btn btn-info';
  }

  /**
   * Click sur le bouton
   * @since 2.0.0
   */
  onClickButton() {
    //console.log('')
    this.messageText = 'Envoi de la position en cours';
    this.messageClass = 'btn btn-warning';
  }

}

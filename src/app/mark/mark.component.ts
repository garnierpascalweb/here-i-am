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
    this.messageText = '';
    this.messageClass = '';
  }

}

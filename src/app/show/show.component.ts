import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MyPoint } from '../model/mypoint.class';
import { ShowService } from '../services/show.service';
import { ShowServiceResponse } from '../services/show.service.response';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  response: ShowServiceResponse;  
  responseSubscription: Subscription; 

  constructor(private showService: ShowService) {
    this.response = new ShowServiceResponse();   
    this.responseSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.responseSubscription = this.showService.responseSubject.subscribe(
      (response:ShowServiceResponse) => {
        this.response = response;
      }
    );
    this.showService.showPositions();
    this.showService.emitResponse();   
  }

  ngOnDestroy(): void {
    this.responseSubscription.unsubscribe();    
  }

}

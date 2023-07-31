import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowService } from '../services/show.service';
import { ShowServiceResponse } from '../services/show.service.response';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss']
})

/**
 * @since 1.1.0
 * Sous composant de show
 * Permet d'afficher la liste des points sous forme de tableau
 */
export class PointListComponent implements OnInit, OnDestroy {

  response: ShowServiceResponse;  
  responseSubscription: Subscription;

  constructor(private showService : ShowService) {
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
    this.showService.emitResponseSubject();
  }

  ngOnDestroy(): void {
    this.responseSubscription.unsubscribe();
  }

 


}

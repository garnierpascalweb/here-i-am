import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { MAPBOX_ACCESS_TOKEN } from '../config/app.config';
import { CustomDatePipe } from '../pipe/customdatepipe';

import { ShowService } from '../services/show.service';
import { ShowServiceResponse } from '../services/show.service.response';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

/**
 * Composant Map (la carte)
 * @since 1.1.0
 * @see https://docs.mapbox.com/mapbox-gl-js/api/
 * @see https://medium.com/@timo.baehr/using-mapbox-in-angular-application-bc3b2b38592
 */
export class MapComponent implements OnInit, OnDestroy {
  map: mapboxgl.Map;
  response: ShowServiceResponse;  
  responseSubscription: Subscription;
  datepipe: DatePipe; 


  constructor(private showService : ShowService) {
    // this.style = 'mapbox://styles/examples/cke97f49z5rlg19l310b7uu7j';
    this.datepipe = new CustomDatePipe('en-US');
  }

  /**
   * @since 1.1.0
   * @see https://docs.mapbox.com/mapbox-gl-js/example/simple-map/
   */
  ngOnInit(): void {
    (mapboxgl as any).accessToken = MAPBOX_ACCESS_TOKEN;
    
    this.responseSubscription = this.showService.responseSubject.subscribe(
      (response: ShowServiceResponse) => {
        this.response = response;
        // Add all markers
        if (this.response.datas) {
          let lastPoint = response.datas.reverse()[0];
          this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 9,
            center: [lastPoint.lng, lastPoint.lat]
          });
          this.map.addControl(new mapboxgl.NavigationControl());
          this.response.datas.forEach((point) => {
            let formattedDate = this.datepipe.transform(point.timepoint);
            const marker = new mapboxgl.Marker()
              .setLngLat([point.lng, point.lat])
              .setPopup(new mapboxgl.Popup().setHTML("Le " + formattedDate + " sur la commune de " + point.codepostal + " " + point.commune + " (" + point.lat + " " + point.lng + ")"))
              .addTo(this.map);
          });
          //this.response.message()
        }
      }
    );

    this.showService.showPositions();
    this.showService.emitResponseSubject();

    // why as any ? https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23467
   
    // Add map controls
   
  }

  ngOnDestroy(): void {
    this.responseSubscription.unsubscribe();
  }


}

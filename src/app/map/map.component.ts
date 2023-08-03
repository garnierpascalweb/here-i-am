import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '../config/app.config';
import { CustomDatePipe } from '../pipe/customdatepipe';



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
export class MapComponent implements OnInit, OnChanges {
  map: mapboxgl.Map;  
  datepipe: DatePipe; 
  @Input() points: any[];

  constructor() {  
    this.datepipe = new CustomDatePipe('en-US');
  }

  /**
   * @since 1.1.0
   * @see https://docs.mapbox.com/mapbox-gl-js/example/simple-map/
   * Simple initialisation de la map
   */
  ngOnInit() {
    // why as any ? https://github.com/DefinitelyTyped/DefinitelyTyped/issues/23467 
    (mapboxgl as any).accessToken = MAPBOX_ACCESS_TOKEN;          
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 9,
      center: [21.9270884, 64.1436456]
    });
    this.map.addControl(new mapboxgl.NavigationControl());         
  }

  /**
   * Methode permettant de detecter les changement des chanps @Input
   * @since 1.1.0
   * @param changes 
   */
  ngOnChanges(changes: any) {   
    if (this.points) {
      const lastPoint = this.points[0];
      let center = new mapboxgl.LngLat(lastPoint.lng, lastPoint.lat);
      if (this.map) {
        this.map.setCenter(center);
        this.points!.forEach((point) => {
          let formattedDate = this.datepipe.transform(point.timepoint);
          const marker = new mapboxgl.Marker()
            .setLngLat([point.lng, point.lat])
            .setPopup(new mapboxgl.Popup().setHTML("Le " + formattedDate + " sur la commune de " + point.codepostal + " " + point.commune + " (" + point.lat + " " + point.lng + ")"))
            .addTo(this.map);
        });
      }
    }
  }
}

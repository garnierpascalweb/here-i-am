import { Component, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from '../config/app.config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

/**
 * @since 1.1.0
 * @see https://medium.com/@timo.baehr/using-mapbox-in-angular-application-bc3b2b38592
 */
export class MapComponent implements OnInit, OnDestroy {
  map: mapboxgl.Map;
  

  constructor() {
    // this.style = 'mapbox://styles/examples/cke97f49z5rlg19l310b7uu7j';
  }

  /**
   * @since 1.1.0
   * @see https://docs.mapbox.com/mapbox-gl-js/example/simple-map/
   */
  ngOnInit(): void {
    (mapboxgl as any).accessToken = MAPBOX_ACCESS_TOKEN;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 9,
      center: [4.07, 46.03]
    });
    // Add map controls
    /*
    this.map.addControl(new mapboxgl.NavigationControl());
    const marker = new mapboxgl.Marker()
    .setLngLat([4.07, 46.03])
    .addTo(this.map);
    */
  }

  ngOnDestroy(): void {

  }


}

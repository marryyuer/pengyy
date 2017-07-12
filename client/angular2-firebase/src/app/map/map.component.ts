import { Component, OnInit } from '@angular/core';

import { NguiMapComponent } from '@ngui/map';
import { Place } from '../model/place';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  center: any;
  position: Place;
  map: any;
  constructor() { }

  ngOnInit() {
  }

  onMapReady(map: any) {
    this.map = map;
  }

  onMarkerInit(event: any) {
    if (this.position) {
      event.nguiMapComponent.openInfoWindow('iw', event);
    }
  }

  getCenter() {
    window.navigator.geolocation.getCurrentPosition((loc: any) => {
      this.center = loc.lat() + ',' + loc.lng();
    });
  }

  getMarkers() {
    return this.position ? [this.position] : [];
  }

  showInfoWindow(event: any) {
    event.nguiMapComponent.openInfoWindow('iw', event);
  }

  setMarker(event: any) {
    this.position = new Place();
    this.position.lat = event.latLng.lat();
    this.position.lng = event.latLng.lng();
    this.map.panTo(event.latLng);
  }
}

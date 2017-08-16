import { Component, Optional, Inject, OnInit } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
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
  constructor(
    @Optional() private dialogRef: MdDialogRef<MapComponent>,
    @Optional() @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.position = new Place();
    this.position.detail = data.location;
    this.getCenter();
   }

  ngOnInit() {
  }

  onMapReady(map: any) {
    this.map = map;
  }

  onMarkerInit(event: any) {
    if (this.position) {
      this.getAddressByLoc(() => {
        event.nguiMapComponent.openInfoWindow('iw', event); 
      });
    }
  }

  getAddressByLoc(callback: () => void) {
    let geoService = new google.maps.Geocoder();
    let request: google.maps.GeocoderRequest = {};
    request.location = new google.maps.LatLng(this.position.lat, this.position.lng);
    geoService.geocode(request, (results: google.maps.GeocoderResult[]) => {
      this.position.detail = results[0].formatted_address;
      callback();
    });
  }

  getCenter() {
    window.navigator.geolocation.getCurrentPosition((loc: any) => {
      this.center = loc;
    });
  }

  getMarkers() {
    return this.position ? [this.position] : [];
  }

  showInfoWindow({target: marker}) {
    this.getAddressByLoc(() => {
      marker.nguiMapComponent.openInfoWindow('iw', marker);
    });
  }

  setMarker(event: any) {
    this.position = new Place();
    this.position.lat = event.latLng.lat();
    this.position.lng = event.latLng.lng();
    this.map.panTo(event.latLng);
  }

  setToParent() {
    this.dialogRef.close(this.position);
  }
}

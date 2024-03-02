import { Component } from '@angular/core';
import { MouseEvent, AgmMap } from '@agm/core';
import {
  TravelMarker,
  TravelMarkerOptions,
  TravelData,
  TravelEvents,
  EventType,
} from 'travel-marker';
import { locationData } from './loc';

declare var google: any;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {
  zoom: number = 15;

  lat: number = 51.512802;
  lng: number = -0.091324;

  map: any;
  line: any;
  directionsService: any;
  marker: TravelMarker |any;
  onMapReady(map: any) {
    console.log(map);
    this.map = map;
    this.mockDirections();
  }
  calcRoute() {
    this.line = new google.maps.Polyline({
      strokeOpacity: 0.5,
      path: [],
      map: this.map,
    });

    const start = new google.maps.LatLng(51.513237, -0.099102);
    const end = new google.maps.LatLng(51.514786, -0.080799);
    const request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.BICYCLING,
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsService.route(request, (response: { routes: { legs: any; }[]; }, status: any) => {
      console.log(response);
      if (status == google.maps.DirectionsStatus.OK) {
        var legs = response.routes[0].legs;
        for (let i = 0; i < legs.length; i++) {
          var steps = legs[i].steps;
          for (let j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            for (let k = 0; k < nextSegment.length; k++) {
              this.line.getPath().push(nextSegment[k]);
            }
          }
        }
        this.initRoute();
      }
    });
  }

  mockDirections() {
    const locationArray = locationData.map(
      (l) => new google.maps.LatLng(l[0], l[1])
    );
    this.line = new google.maps.Polyline({
      strokeOpacity: 0.5,
      path: [],
      map: this.map,
    });
    locationArray.forEach((l) => this.line.getPath().push(l));

    const start = new google.maps.LatLng(51.513237, -0.099102);
    const end = new google.maps.LatLng(51.514786, -0.080799);

    const startMarker = new google.maps.Marker({
      position: start,
      map: this.map,
      label: 'A',
    });
    const endMarker = new google.maps.Marker({
      position: end,
      map: this.map,
      label: 'B',
    });
    this.initRoute();
  }

  initRoute() {
    const route = this.line.getPath().getArray();

    const options: TravelMarkerOptions = {
      map: this.map, 
      interval: 10, 
      markerOptions: {
        title: 'Travel Marker',
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'https://i.imgur.com/eTYW75M.png',
          
          animation: google.maps.Animation.DROP,
          scaledSize: new google.maps.Size(128, 128),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(53, 110),
        },
      },
    };

    this.marker = new TravelMarker(options);

    this.marker.addLocation(route);

    setTimeout(() => this.play(), 2000);
  }

  play() {
    this.marker.play();
  }

  pause() {
    this.marker.pause();
  }

  reset() {
    this.marker.reset();
  }
}

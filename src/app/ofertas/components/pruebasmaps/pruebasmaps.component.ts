import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pruebasmaps',
  templateUrl: './pruebasmaps.component.html',
  styleUrls: ['./pruebasmaps.component.css']
})
export class PruebasmapsComponent implements OnInit {

  //Mapa
  ValidaInsertSec: string = '1'
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  Coordenada: string = '';
  ValidaCompra: boolean = false;

  constructor() { }


  ngOnInit(): void {

    this.Centramapa({ address: '4.698601, -74.0305399' })
  }
  ngAfterViewInit() {

  }



  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("mapa") as HTMLElement,
        {
          center: results[0].geometry.location,
          zoom: 17,
        }

      );

      this.IconMarker();

      this.Coordenada = results[0].geometry.location.toString().replace('(', '').replace(')', '')
      this.map.setCenter(results[0].geometry.location);
      console.log(results)
      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }

  IconMarker() {
    const features = [
      {
        position: new google.maps.LatLng(4.768713138815317, -74.03601927098346),
        Estado: "1",
      },
      {
        position: new google.maps.LatLng(4.584144652651202, -74.09569000432022),
        Estado: "0",
      },
      {
        position: new google.maps.LatLng(4.664556918800509, -74.14546251058314),
        Estado: "1",
      }
    ];

    for (let i = 0; i < features.length; i++) {
      var icon;
      if (features[i].Estado == '1') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/iconcasaEntregada.png';
      }else{
        icon = '../../../../assets/ImagenesAgroApoya2Adm/iconcasaNoEntregada.png';
      }
      var marker = new google.maps.Marker({
        position: features[i].position,
        map: this.map,
        icon: icon
      });
      this.markers.push(marker);
    }
    const flightPlanCoordinates = [
      { lat: 4.768713138815317, lng: -74.03601927098346 },
      { lat: 4.584144652651202, lng: -74.09569000432022 },
      { lat: 4.664556918800509, lng: -74.14546251058314 },
    ];
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#31C231",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });
  
    flightPath.setMap(this.map);
  }
}
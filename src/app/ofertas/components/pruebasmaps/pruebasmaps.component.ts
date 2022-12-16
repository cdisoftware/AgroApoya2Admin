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
    //4.727656362242804, -74.12355298979543
    //this.Centramapa({ address: '4.727656362242804, -74.12355298979543' })
  }
  ngAfterViewInit() {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });

    this.Centramapa({ address: '4.727656362242804, -74.12355298979543' });
  }



  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      console.log(result)
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: results[0].geometry.location,
          zoom: 17,
        }

      );

      this.AgregarMarcador(results[0].geometry.location, this.map);

      //this.AgregarMarcador(this.ArrayCompra[0].CoordenadasLLegada , this.map);
      this.Coordenada = results[0].geometry.location.toString().replace('(', '').replace(')', '')
      this.map.setCenter(results[0].geometry.location);
      console.log(results)
      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }

  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    if (this.markers.length > 0) {
      this.markers[0].setMap(null)
    }
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    console.log(marker)
    this.markers = [];
    this.markers.push(marker);
  }

}

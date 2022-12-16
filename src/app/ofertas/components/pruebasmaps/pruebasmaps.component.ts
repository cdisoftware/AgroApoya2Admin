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

  SessionCiudad: any;

  constructor() { }


  ngOnInit(): void {
    this.SessionCiudad = '0';
  }
  ngAfterViewInit() {
    this.CreaMapa();
  }

  CreaMapa() {
    this.geocoder.geocode({ address: 'BOGOTA, D.C.' }).then((result) => {
      const { results } = result;
      var lati = results[0].geometry.location.lat();
      var longi = results[0].geometry.location.lng();
      console.log(lati + ',' + longi)
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 13,
          center: {
            lat: lati,
            lng: longi
          },
        }
        
      );
      console.log(document.getElementById("map") as HTMLElement)
      this.map.addListener("click", (e: any) => {
        this.AgregarMarcador(e.latLng, this.map);
        //this.Coor1 = e.latLng.toString()
        //this.Coor1 = this.Coor1.substring(1, 15)
        //this.Coor2 = e.latLng.toString()
        //this.Coor2 = this.Coor2.substring(this.Coor2.indexOf('-'), this.Coor2.length - 1)
      });
    })
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



  Polilineas(){
    const flightPlanCoordinates = [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ];
    const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
  
    flightPath.setMap(this.map);
  }

  IconosMapa(){
    const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons: Record<string, { icon: string }> = {
      parking: {
        icon: iconBase + "parking_lot_maps.png",
      },
      library: {
        icon: iconBase + "library_maps.png",
      },
      info: {
        icon: iconBase + "info-i_maps.png",
      },
    };

    const features = [
      {
        position: new google.maps.LatLng(-33.91721, 151.2263),
        type: "info",
      }
    ];

    for (let i = 0; i < features.length; i++) {
      const marker = new google.maps.Marker({
        position: features[i].position,
        icon: icons[features[i].type].icon,
        map: this.map
      });
    }
  }

}

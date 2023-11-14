import { Component, OnInit } from '@angular/core';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';

@Component({
  selector: 'app-mapacalor',
  templateUrl: './mapacalor.component.html',
  styleUrls: ['./mapacalor.component.css']
})
export class MapacalorComponent implements OnInit {

  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();
  markers: google.maps.Marker[] = [];

  constructor(public sevicesmilla: GrupoMillaServices) { }

  ngOnInit(): void {
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        { zoom: 15 }
      );
      this.map.setCenter(results[0].geometry.location);

      this.sevicesmilla.consAdUserMapCalor('1').subscribe(Resultado => {
        const features = [];

        for (let i = 0; i < Resultado.length; i++) {
          console.log(Resultado[i].CoordenadaPersona)
          var auxsplit = Resultado[i].CoordenadaPersona.split(',');
          var lat = parseFloat(auxsplit[0]);
          var long = parseFloat(auxsplit[1]);
          features.push({ position: new google.maps.LatLng(lat, long) });
        }

        for (let i = 0; i < features.length; i++) {
          this.AgregarMarcador(features[i].position, this.map);
        }
        alert(features.length)
      });

      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }

  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers.push(marker);
  }

}

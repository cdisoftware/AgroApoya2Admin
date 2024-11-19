import { Component, OnInit } from '@angular/core';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';

@Component({
  selector: 'app-mapa-calor3',
  templateUrl: './mapa-calor3.component.html',
  styleUrls: ['./mapa-calor3.component.css']
})
export class MapaCalor3Component implements OnInit {

  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();
  

  constructor(public sevicesmilla: GrupoMillaServices) { }

  ngOnInit(): void {
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        { zoom: 13 } 
      );
      this.map.setCenter(results[0].geometry.location);
      const heatmapData: google.maps.LatLng[] = [];
      // Crea la capa de mapa de calor
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: this.map,
        radius: 20 // Ajusta el radio
      });

    
      return results;
    })
    .catch((e) => {
      console.log("Geocode was not successful for the following reason: " + e);
    });
  }
}

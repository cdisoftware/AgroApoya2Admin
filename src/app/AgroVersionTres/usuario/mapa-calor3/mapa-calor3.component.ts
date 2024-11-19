import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';

@Component({
  selector: 'app-mapa-calor3',
  templateUrl: './mapa-calor3.component.html',
  styleUrls: ['./mapa-calor3.component.css']
})
export class MapaCalor3Component implements OnInit {

  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();

  //Variables para los filtros
  ArrayLocalidadesFiltro: any = [];

  constructor(public ServiciosGenerales: ServiciosService) { }

  ngOnInit(): void {
    this.CargaIncialListas();
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }

  CargaIncialListas() {
    /*
    en caso de que el servicio sea post, me va a solicitar un cuerpoo
    EJEMPLO
    const body = {
      FechaIncioCompra: "2023-05-02",
      FechaFinCompra: "2023-05-02",
      FechaRegistro: "2023-05-02"
      }
    */

    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayLocalidadesFiltro = Resultado;
    })
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

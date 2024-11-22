import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';
@Component({
  selector: 'app-mapa-calor3',
  templateUrl: './mapa-calor3.component.html',
  styleUrls: ['./mapa-calor3.component.css']
})
export class MapaCalor3Component implements OnInit {
  
BtnDescargarExcel() {
throw new Error('Method not implemented.');
}
  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();
  heatmap: google.maps.visualization.HeatmapLayer | undefined;


  // Variables para los filtros
  Comprasfiltros: any = [];
  ArrayLocalidadesFiltro: any = [];
  FiltroFechaIncioCompra: string = '';
  FiltroFechaFinCompra: string = '';
  FiltroFechaRegistro: string = '';
  FiltroLocalidad: string = '';
  FiltroNumeroCompras: string = '';


  // Datos para el mapa
  PinsMapa: any = [];
  markers: google.maps.Marker[] = [];
  AuxMostrarMapa: any;

  constructor(public ServiciosGenerales: ServiciosService) {}
  ngOnInit(): void {
    this.CargaIncialListas();
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }
  CargaIncialListas(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(Resultado => {
      this.ArrayLocalidadesFiltro = Resultado;
    });
    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe(Resultado => {
      this.Comprasfiltros = Resultado;
    });
  }
  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers.push(marker);
  }
  BtnBuscar(): void {
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }
  BtnLimpiar(): void {
    this.FiltroFechaIncioCompra = '';
    this.FiltroFechaFinCompra = '';
    this.FiltroFechaRegistro = '';
    this.FiltroLocalidad = '';
    this.FiltroNumeroCompras = '';
    if (this.heatmap) {
      this.heatmap.setMap(null);
    }
    alert('Filtros limpiados');
  }
  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      
      // Crea el mapa
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 13,
          center: results[0].geometry.location,
          mapTypeId: 'roadmap',
        }
      );

      // Cuerpo de datos para los filtros
      const body = {
        FechaIncioCompra: this.FiltroFechaIncioCompra || "2023-05-02",
        FechaFinCompra: "2023-05-02",
        FechaRegistro: "2023-05-02",
      };
      // Llamada al servicio para obtener las coordenadas
      this.ServiciosGenerales.consMapaCalor('1', '0', '0', body).subscribe((Rest) => {
        console.log(Rest);
        const features = [];
        for (let i = 0; i < Rest.length; i++) {
          console.log(Rest[i].Coordenadas)
          var auxsplit = Rest[i].Coordenadas.split(',');
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
    }).catch((e) => {
      console.log("Geocode was not successful for the following reason: " + e);
    });
  }
}

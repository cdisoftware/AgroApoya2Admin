import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';

@Component({
  selector: 'app-mapa-calor3',
  templateUrl: './mapa-calor3.component.html',
  styleUrls: ['./mapa-calor3.component.css']
})
export class MapaCalor3Component implements OnInit {

  // Variables para los filtros
  ArrayComprasfiltros: any = [];
  ArrayLocalidadesFiltro: any = [];
  FiltroLocalidad: string = '0';
  FiltroNumeroCompras: string = '0';
  FiltroFechaRegistro: string = '';
  FiltroFechaFinCompra: string = '';
  FiltroFechaIncioCompra: string = '';

  // Datos para el mapa
  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();
  ArrayMarkers: google.maps.Marker[] = [];
  AuxMostrarMapa: string = '0';

  constructor(public ServiciosGenerales: ServiciosService) { }

  ngOnInit(): void {
    this.CargaIncialListas();
  }

  //Metodos Generales para el funcionamiento general de la oferta
  CargaIncialListas(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(Resultado => {
      this.ArrayLocalidadesFiltro = Resultado;
    });

    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe(Resultado => {
      this.ArrayComprasfiltros = Resultado;
    });
  }

  // Metodos relacionados con los botones de acción de la vista HTML
  BtnBuscar(): void {
    this.AuxMostrarMapa = '1';
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }

  BtnLimpiar(): void {
    this.AuxMostrarMapa = '0';
    this.FiltroFechaIncioCompra = '';
    this.FiltroFechaFinCompra = '';
    this.FiltroFechaRegistro = '';
    this.FiltroLocalidad = '0';
    this.FiltroNumeroCompras = '0';
  }

  BtnDescargarExcel(): void {
    //TODO FALTA DESCARGAR LA INFORMACION DEL QUE MUESTRA EN EL MAPA EN UN EXCEL
    alert('Descargar excel')
  }
  
  // Metodos para el funcionamiento de mapa y pintar los pines en el 
  Centramapa(request: google.maps.GeocoderRequest): void {
    this.ArrayMarkers = [];
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

      //TODO VALIDAR LA INFORMACION DE LOS FILTROS PARA ENVIARLA AL MICROSERVICIO
      const body = {
        FechaIncioCompra: this.FiltroFechaIncioCompra || "2023-05-02",
        FechaFinCompra: "2023-05-02",
        FechaRegistro: "2023-05-02",
      };

      this.ServiciosGenerales.consMapaCalor('1', '0', '0', body).subscribe((Rest) => {
        const features = [];
        for (let i = 0; i < Rest.length; i++) {
          var auxsplit = Rest[i].Coordenadas.split(',');
          var lat = parseFloat(auxsplit[0]);
          var long = parseFloat(auxsplit[1]);
          features.push({ position: new google.maps.LatLng(lat, long) });
        }
        for (let i = 0; i < features.length; i++) {
          this.AgregarMarcador(features[i].position, this.map);
        }
      });
      return results;
    }).catch((e) => {
      console.log("Geocode was not successful for the following reason: " + e);
    });
  }

  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.ArrayMarkers.push(marker);
  }

}

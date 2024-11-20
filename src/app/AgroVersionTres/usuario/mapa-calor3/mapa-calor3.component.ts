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
  Comprasfiltros: any = []
  ArrayLocalidadesFiltro: any = [];
  FiltroFechaIncioCompra: string = '';


  //Variables para el mapa
  PinsMapa: any = []

  constructor(public ServiciosGenerales: ServiciosService) { }
  ngOnInit(): void {
    this.CargaIncialListas();
  }

  CargaIncialListas() {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayLocalidadesFiltro = Resultado;
    })
    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe(Resultado => {
      console.log(Resultado)
      this.Comprasfiltros = Resultado;
    })
  }


  BtnBuscar() {
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }

  BtnLimpiar() {
    //  ejemplo para validar el dato de la fecha
    alert(this.FiltroFechaIncioCompra)
  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        { zoom: 13 }
      );
      this.map.setCenter(results[0].geometry.location);
      // Crea la capa de mapa de calor

      const body = {
        FechaIncioCompra: "2023-05-02",
        FechaFinCompra: "2023-05-02",
        FechaRegistro: "2023-05-02"
      }

      this.ServiciosGenerales.consMapaCalor('1', '0', '0', body).subscribe(Rest => {
        console.log(Rest)
        this.PinsMapa = Rest;

        //TODO VALIDAR LAS CORDENADAS QUE TRAE EL MICRO, PARA PINTARLAS EN EL MAPA
      })

      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }


}

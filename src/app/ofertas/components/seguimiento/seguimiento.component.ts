import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  ArrayOferta: any = [];
  oferta = 'DescripcionProducto';
  IdOferta: string = '0';

  ArraySector: any = [];
  sector ='DSCRPCION_SCTOR';
  IdSector: string = '0';

  selecsector: string = '0'

  //Mapas
  //mapas
  markers: google.maps.Marker[] = [];
  Coor1: string = '';
  Coor2: string = '';
  ValidaInsertSec: string = '1';
  CoordenadasParcela: string = ''
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  objCiudad: any = '0';
  objDepartamento: any = '0';
  NomCiudad: string = '';
  NomDepa: string = 'Bogotá';

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService,
    private rutas: Router) { }

  ngOnInit(): void {
    this.ConsultaSectores();
    this.ConsultaOferta();
  }

  ConsultaOferta(){
    const datosbusqueda = {
      UsuCodig: 0,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: 0,
      VigenciaHasta: 0,
      IdEstado_Oferta: 0,
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    this.ServiciosValorar.BusquedaOferta('2', this.IdOferta, '0', '0', datosbusqueda).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      //console.log(Resultado)
    })
  }

  ConsultaSectores(){
    this.ServiciosValorar.ConsultaSectores('1', '0', '0', '0', '0').subscribe(Resultado => {
      this.ArraySector = Resultado;
      //console.log(Resultado)
    })
  }

  selectOferta(item: any) {
    this.selecsector == '1'
    this.IdOferta = item.cd_cnsctvo;
  }

  selectSector(item: any) {
    
    this.IdSector = item.SCTOR_OFRTA;
  }

  LimpiarCampos(campo: string) {
    if (campo == 'Of') {
      this.IdOferta = '0';
    }
    if(campo == 'Sec'){
      this.IdSector = '0';
    }
  }

  Buscar(){
    this.ServiciosValorar.ConsultaSeguimiento('1', this.IdOferta, this.IdSector).subscribe(Resultado => {
      console.log(Resultado)
      this.Centramapa({ address: this.NomDepa + ',' + this.NomCiudad })
    })
  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 14,
        }
      );
      this.map.addListener("click", (e: any) => {
        this.AgregarMarcador(e.latLng, this.map);
        this.Coor1 = e.latLng.toString()
        this.Coor1 = this.Coor1.substring(1, 15)
        this.Coor2 = e.latLng.toString()
        this.Coor2 = this.Coor2.substring(this.Coor2.indexOf('-'), this.Coor2.length - 1)
      });
      this.map.setCenter(results[0].geometry.location);
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
    this.markers = [];
    this.markers.push(marker);
  }
}

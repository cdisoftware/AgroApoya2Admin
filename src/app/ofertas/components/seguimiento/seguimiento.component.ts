import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

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
  sector = 'DSCRPCION_SCTOR';
  IdSector: string = '0';

  selecsector: string = '0'

  Respuesta: string = '';

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

  //Buscar
  ArrayConsultaSeg: any = [];

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService,
    private rutas: Router) { }

  ngOnInit(): void {
    this.ConsultaOferta();
  }

  ConsultaOferta() {
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
    })
  }

  ConsultaSectores(cd_cnctivo: string) {
    this.ServiciosValorar.ConsultaSectoresOferta('2', cd_cnctivo).subscribe(Resultado => {
      console.log(Resultado)
      this.ArraySector = Resultado;
    })
  }

  selectOferta(item: any) {
    this.selecsector = '1'
    this.ConsultaSectores(item.cd_cnsctvo);
    this.IdOferta = item.cd_cnsctvo;
  }

  selectSector(item: any) {
    this.IdSector = item.ID_SCTOR_OFRTA;
  }

  LimpiarCampos(campo: string) {
    if (campo == 'Of') {
      this.IdOferta = '0';
    }
    if (campo == 'Sec') {
      this.IdSector = '0';
    }
  }

  Buscar(templateRespuesta: any) {
    if (this.IdSector == '0' && this.IdOferta == '0' || this.IdSector != '0' && this.IdOferta == '0' || this.IdSector == '0' && this.IdOferta != '0') {
      this.Respuesta = 'Es necesario que selecciones una oferta y un sector.';
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' });
      this.ValidaInsertSec = '0';
    } else {
      this.ServiciosValorar.ConsultaSeguimiento('1', this.IdOferta, this.IdSector).subscribe(Resultado => {
        if (Resultado.length == 0) {
          this.Respuesta = 'No encontramos registros de compras para este sector.';
          this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' });
          this.ValidaInsertSec = '0';
        } else {
          this.ValidaInsertSec = '1';
          this.ArrayConsultaSeg = Resultado;
          console.log(Resultado)
          this.Centramapa({ address: this.NomDepa + ',' + this.NomCiudad })
        }
      })
    }
  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 10,
        }
      );
      this.AgregarSitios();
      this.map.setCenter(results[0].geometry.location);
      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }


  AgregarSitios() {
    const features = [];
    const Polylines = [];
    var lat: number;
    var long: number;

    for (var i = 0; i < this.ArrayConsultaSeg.length; i++) {
      var auxcoor = this.ArrayConsultaSeg[i].COORDENADAS_MAPA.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      console.log(this.ArrayConsultaSeg[i])
      features.push({ position: new google.maps.LatLng(lat,long), Estado: this.ArrayConsultaSeg[i].COD_ESTADO_ENTREGA, NomCli: this.ArrayConsultaSeg[i].NOMBRE_CLIENTE + ' ' + this.ArrayConsultaSeg[i].APELLIDOS_CLIENTE, IdCompra: this.ArrayConsultaSeg[i].ID_COMPRA});
      Polylines.push({lat: lat, lng: long });
    }

    for (let i = 0; i < features.length; i++) {
      var icon;
      if (features[i].Estado == '2') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/iconcasaEntregada.png';
      } else {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/iconcasaNoEntregada.png';
      }
      const respu = {
        nOMBRE: 'William Sneider',
        Apellido: 'Bernal Gil'
      }
        
      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.map,
        icon: icon,
        zIndex:features[i].IdCompra//Le envio El zindex El id compra
      });
      this.markers.push(marker);
    }
    
    const flightPath = new google.maps.Polyline({
      path: Polylines,
      geodesic: true,
      strokeColor: "#31C231",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });

    flightPath.setMap(this.map);



    //Eventoclick
    for(var i = 0; i < this.markers.length; i++){
      this.markers[i].addListener("click", () => {
        console.log(marker.getZIndex());
        //this.map.setZoom(18);
      });
    }
  }

}

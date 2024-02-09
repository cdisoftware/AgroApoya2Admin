import { Component, OnInit, ViewChild } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-coordenadasusuarios',
  templateUrl: './coordenadasusuarios.component.html',
  styleUrls: ['./coordenadasusuarios.component.css']
})
export class CoordenadasusuariosComponent implements OnInit {
  @ViewChild('ModalRespuesta', { static: false }) ModalRespuesta: any;

  ValidaMapSector: string = '0';

  // Variables filtros
  UsucodigFiltro: string = '';
  NombreFiltro: string = '';
  ArrayUsucodig: any = [];
  keywordConSec: string = 'usucodig';

  Usucodig: string = '0';
  DataUsuarios: any = [];
  VerOcultarCampos: string = '1';
  Respuesta: string = '';

  //Variables Datos usuario
  DatosUser: any = [];
  ValidaInsertSec: string = '1';

  constructor(private serviciosvaloracion: ValorarofertaService,
    private modalService: NgbModal,) { }

  ngOnInit(): void {
    this.ConsultaUsuarios();

  }

  ConsultaUsuarios() {
    const body = {
      nombres_persona: this.NombreFiltro
    }
    this.serviciosvaloracion.ConsultaListaPersonas('1', '2', '0', body).subscribe(Resultado => {
      this.ArrayUsucodig = Resultado;
    })
  }

  selectUsucodig(item: any) {
    this.Usucodig = item.usucodig;
    this.NombreFiltro = item.NombreCompleto
  }

  LimpiaUsucodig(Valor: string) {
    this.UsucodigFiltro = Valor;
    this.NombreFiltro = '';
    this.Usucodig = '0';
  }

  BuscarUsuarios() {
    const body = {
      nombres_persona: this.NombreFiltro
    }
    this.serviciosvaloracion.ConsultaListaPersonas('1', '2', this.Usucodig, body).subscribe(Resultado => {
      this.DataUsuarios = Resultado;
      this.VerOcultarCampos = '2';
    })
  }
  LimpiarFiltros() {
    this.LimpiaUsucodig('');
    this.NombreFiltro = '';
    this.Usucodig = '0';
    this.VerOcultarCampos = '1';
  }


  AccionMapaUsuario(idValor: any) {
    this.VerOcultarCampos = '3';
    const body = {
      nombres_persona: idValor.nombres_persona
    }
    this.serviciosvaloracion.ConsultaListaPersonas('1', '2', idValor.usucodig, body).subscribe(Resultado => {
      this.DatosUser = Resultado;
      this.Centramapa({ address: Resultado[0].DRCCION + ',' + 'Bogotá' })
    })
  }

  // REGION MAPA
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  Coor1: string = '';
  Coor2: string = '';
  Coordenada: string = '';
  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: results[0].geometry.location,
          zoom: 15,
        }
      );
      this.Coordenada = results[0].geometry.location.toString().replace('(', '').replace(')', '')
      const marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: this.map,
      });
      this.map.addListener("click", (e: any) => {
        this.AgregarMarcador(e.latLng, this.map);
        this.Coordenada = e.latLng.toString().replace('(', '').replace(')', '')
      });
      this.markers = [];
      this.markers.push(marker);
      this.Coordenada = results[0].geometry.location.toString().replace('(', '').replace(')', '')
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
    this.Coordenada = latLng.toString().replace('(', '').replace(')', '')  
  }

  // FIN REGION MAPA
  GuardarCoordenada(user: any) {    
    const body = {
      Usucodig: user.usucodig,
      Direccion: "",
      CompleDirecc: "",
      Coordenadas: this.Coordenada
    }
    this.serviciosvaloracion.ModAdDireccionUser('2', body).subscribe(Resultado => {
      this.Respuesta = Resultado;
      this.modalService.open(this.ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.AccionMapaUsuario(user);
    })
  }
}
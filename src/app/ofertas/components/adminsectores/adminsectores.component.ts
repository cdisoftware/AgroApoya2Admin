import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';

@Component({
  selector: 'app-adminsectores',
  templateUrl: './adminsectores.component.html',
  styleUrls: ['./adminsectores.component.css']
})
export class AdminsectoresComponent implements OnInit {
  //Variables generales
  SessionIdUsuario: string = "";
  TituloComponent: string = "Sectores";
  VerSectorComponent: string = "2";//Variable que define el sector a ver (1 Lista, 2 Crear)
  NombreSector: string = "";
  NumUserSector: string = "";
  NombreCiudad: string = "";
  Respuesta: string = "";

  constructor(private modalService: NgbModal, public sectoresservices: ValorarofertaService, public rutas: Router, private cookies: CookieService, private ServiciosGenerales: MetodosglobalesService) { }

  // #region Mapa
  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();
  markers: google.maps.Marker[] = [];
  AreaPolygon: google.maps.Polygon;
  DataCoor: any[] = [];

  //insert
  LatitudeCoordenadas: string = "";
  LongitudeCoordenadas: string = "";
  // #endregion Mapa


  // #region Región Lista
  //Listas
  DataZonas: any = [];
  keywordZonasAsignaSector: string = '';
  seleczona: string = '0';
  ZonaAsignaSector: string = '';

  DataTipoSector: any = [];
  keywordTipoSector: string = "Descripcion";
  TipoSector: string = "";

  //Grilla
  DataSectores: any = [];
  CoordenadasSector: string = "";
  // #endregion Lista


  // #region Región crear
  //General
  ValidaSelecZonaInsert: string = "1";
  IdSectorCreado: string = "";

  //Listas
  keywordZonasInsert: string = '';
  seleczonaInsert: string = '0';
  ZonaAsignaSectorInsert: string = '';
  IdDepaInsert: string = "";
  IdCiudadInsert: string = "";

  //RadioButoon
  SelectRadio: string = "Permanente";

  //Nombre Sector
  NombreSecInsert: string = "";
  // #endregion crear


  ngOnInit(): void {
    // #region general
    this.SessionIdUsuario = this.cookies.get('IDU');
    // #endregion

    // #region Región Lista
    //Listas
    this.ConsultaZonas();
    this.ConsultaTipoSector();

    //Grilla
    this.ConsultaSectores('0');
    // #endregion Lista
  }

  // #region General
  ConsultaUserSector(sector: any) {
    var selectSector = sector.SCTOR_OFRTA
    this.sectoresservices.ConsultaNumUsuariosSector('3', selectSector).subscribe(ResultadoCons => {
      this.NumUserSector = ResultadoCons.toString();
    })
  }
  ConsultaMapaSector() {
    this.geocoder.geocode({ address: this.NombreCiudad }).then((result) => {
      const { results } = result;
      var bounds = new google.maps.LatLngBounds;
      var coords = this.CoordenadasSector.split('|').map(function (data: string) {
        var info = data.split(','), // Separamos por coma
          coord = { // Creamos el obj de coordenada
            lat: parseFloat(info[0]),
            lng: parseFloat(info[1])
          };
        // Agregamos la coordenada al bounds
        bounds.extend(coord);
        return coord;
      });
      var area = new google.maps.Polygon({
        paths: coords,
        strokeColor: '#397c97',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#B1B0B0',
        fillOpacity: 0.35
      });
      this.map = new google.maps.Map(
        document.getElementById("mapSelectSector") as HTMLElement,
        {
          zoom: 15,
          center: bounds.getCenter(),
          mapTypeId: "terrain",
        }
      );
      area.setMap(this.map);
    })

  }
  // #endreion general

  // #region Región Lista
  //Lista Zona
  ConsultaZonas() {
    const descripcion = {
      "Descripcion": ""
    }
    this.sectoresservices.ConsZona('1', '0', '0', '0', descripcion).subscribe(ResultadoCons => {
      this.DataZonas = ResultadoCons;
      this.keywordZonasAsignaSector = 'Descripcion';
      this.keywordZonasInsert = 'Descripcion';

    })
  }
  selectZona(item: any) {
    this.ConsultaSectores(item.id);
    this.seleczona = item.id;
  }
  LimpiaZona(result: string) {
    this.ZonaAsignaSector = result;
    this.seleczona = '0';
    this.ConsultaSectores('0');
  }
  //Lista tipo sector
  ConsultaTipoSector() {
    this.DataTipoSector = [];
    this.DataTipoSector.push({ IdTs: "1", Descripcion: "Temporal" });
    this.DataTipoSector.push({ IdTs: "2", Descripcion: "Permanente" });
  }
  SelectTipoSect(item: any) {
    console.log(item)
  }
  LimpiaTipoSect(result: string) {
    this.TipoSector = result;
  }

  //Grilla
  ConsultaSectores(IdZona: string) {
    this.sectoresservices.ConsultaSectoresEtv('1', '0', IdZona, '0').subscribe(Result => {
      this.DataSectores = Result;
    })
  }
  SelecctItemGrilla(item: any, modalmapa: any) {
    this.modalService.open(modalmapa, { size: 'lg' });
    this.NombreSector = item.DSCRPCION_SCTOR;
    this.NombreCiudad = "Bogota DC";//Se debe cambiar por el campo que debe llegar en el servicio
    this.CoordenadasSector = item.coordenadas;
    this.ConsultaUserSector(item);
    this.ConsultaMapaSector();
  }
  //Botones
  LimpiarFiltros() {
    this.LimpiaZona('');
    this.LimpiaTipoSect('');
  }
  CrearSector() {
    this.VerSectorComponent = "2";//Para ver la region de crear
    this.TituloComponent = "Crear Sector";//Cambia el titulo general
    this.DataCoor = [];
  }
  // #endregion Lista


  // #region Región crear
  //Listas
  selectZonaInsert(item: any) {
    this.IdDepaInsert = item.cd_dpto;
    this.IdCiudadInsert = item.cd_mncpio;
    this.seleczonaInsert = item.id;
    this.NombreCiudad = item.Ciudad;
    this.ValidaSelecZonaInsert = "2";//Desbloquea los campos para insertar
  }
  LimpiaZonaInsert(result: string) {
    this.ValidaSelecZonaInsert = "1";//bloquea los campos para insertar
    this.ZonaAsignaSectorInsert = result;
    this.seleczonaInsert = '0';
    this.ConsultaSectores('0');
    this.NombreSecInsert = "";
  }
  //insertSector
  InsertSector(modalrespu: any) {
    if (this.seleczonaInsert != "0" && this.NombreSecInsert != "") {
      var auxtiposec: string = "";
      if (this.SelectRadio == "Permanente") {
        auxtiposec = '2';
      }
      if (this.SelectRadio == "Temporal") {
        auxtiposec = '1';
      }
      const BodyInsert = {
        USUCODIG: this.SessionIdUsuario,
        SCTOR_OFR: 0,
        DSCRPCION_SCTOR: this.NombreSecInsert,
        CD_RGION: this.IdDepaInsert,
        CD_MNCPIO: this.IdCiudadInsert,
        cd_cnsctvo: '0',
        TEMPORAL: auxtiposec,
        ID_ZONA: this.seleczonaInsert
      }
      this.sectoresservices.InsertarSector('3', BodyInsert).subscribe(ResultInsert => {
        const arrayRes = ResultInsert.split('|')
        this.IdSectorCreado = arrayRes[0];
        this.modalService.open(modalrespu, { ariaLabelledBy: 'modal-basic-title' })
        this.Respuesta = arrayRes[1];
        //this.ConsultaCiudadOferta();
        this.ValidaSelecZonaInsert = "3";//Bloque los campos ya insertados
        if (this.IdSectorCreado != undefined) {
          this.CreaMapa();
        }
        else {
          this.ValidaSelecZonaInsert = "2";
        }
      })
    } else {
      this.modalService.open(modalrespu, { size: 'sm' });
      this.Respuesta = "Por favor completa todos los campos para poder registrar el sector";
    }
  }


  //Mapa insert
  CreaMapa() {
    this.geocoder.geocode({ address: this.NombreCiudad }).then((result) => {
      const { results } = result;
      var lati = results[0].geometry.location.lat();
      var longi = results[0].geometry.location.lng();
      this.map = new google.maps.Map(
        document.getElementById("mapInsertSector") as HTMLElement,
        {
          zoom: 13,
          center: {
            lat: lati,
            lng: longi
          },
        }
      );
      this.map.addListener("click", (e: any) => {
        this.AgregarMarcador(e.latLng, this.map);
        this.LatitudeCoordenadas = e.latLng.toString()
        this.LatitudeCoordenadas = this.LatitudeCoordenadas.substring(1, 15)
        this.LongitudeCoordenadas = e.latLng.toString()
        this.LongitudeCoordenadas = this.LongitudeCoordenadas.substring(this.LongitudeCoordenadas.indexOf('-'), this.LongitudeCoordenadas.length - 1)
      });
    })
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
  AgregarCoordenada(templateRespuesta: any) {
    if (this.LatitudeCoordenadas != '' && this.LongitudeCoordenadas != '') {
      const BodyInsertCoo = {
        ID: 0,
        ID_SCTOR_OFRTA: Number(this.IdSectorCreado),
        LTTUD: this.LatitudeCoordenadas,
        LNGTUD: this.LongitudeCoordenadas
      }
      this.sectoresservices.InsertarCoordenadas('3', BodyInsertCoo).subscribe(Resultado => {
        const arrayRes = Resultado.split('|')
        this.Respuesta = arrayRes[1];
        this.LatitudeCoordenadas = '';
        this.LongitudeCoordenadas = '';
        this.ConsultaCoordenadas();
      })
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = "Los campos coordenadas son obligatorios, recuerda dar click en el mapa para recuperar las coordenadas.";
    }
  }
  ConsultaCoordenadas() {
    this.sectoresservices.ConsultaCoordenada('1', this.IdSectorCreado).subscribe(Result => {
      if (Result.length > 0) {
        if (this.AreaPolygon != undefined) {
          this.AreaPolygon.setMap(null)
        }
        this.DataCoor = Result;
        var coordenadas = '';
        for (var i = 0; i < this.DataCoor.length; i++) {
          coordenadas += this.DataCoor[i].Latitud.trim() + ',' + this.DataCoor[i].Longitud.trim() + '|';
        }
        var nuevaCoord = coordenadas.substring(0, coordenadas.length - 1)
        //var nuevaCoord = "4.711719820895,-74.11319514221|4.712746307730,-74.10924693054|4.709923465287,-74.10795947022|4.708554810281,-74.11036272949|4.711719820895,-74.11319514221";
        var bounds = new google.maps.LatLngBounds;
        var coords = nuevaCoord.split('|').map(function (data: string) {
          var info = data.split(','), // Separamos por coma
            coord = { // Creamos el obj de coordenada
              lat: parseFloat(info[0]),
              lng: parseFloat(info[1])
            };
          // Agregamos la coordenada al bounds
          bounds.extend(coord);
          return coord;
        });
        this.AreaPolygon = new google.maps.Polygon({
          paths: coords,
          strokeColor: '#397c97',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#B1B0B0',
          fillOpacity: 0.35,
        });
        this.AreaPolygon.setMap(this.map);
      }
      else {
        this.DataCoor = [];
      }
      this.ConsultaUsuariosSectr();
    })
  }
  ConsultaUsuariosSectr() {
    if (this.DataCoor.length < 3) {
      this.NumUserSector = '0'
    } else {
      this.ConsultaSectorPoligono(this.IdSectorCreado);
    }
  }
  ConsultaSectorPoligono(idsector: string) {

    this.sectoresservices.ModificaSectorPoligono('3', idsector).subscribe(ResultadoCons => {
      var aux = ResultadoCons.split('|');
      this.sectoresservices.ConsultaUsuarioSector('3', aux[0]).subscribe(ResultadoCons => {
        this.sectoresservices.ConsultaNumUsuariosSector('3', aux[0]).subscribe(ResultadoCons => {
          this.NumUserSector = ResultadoCons.toString();
        })
      })
    })
  }


  //Botones
  Volver() {
    this.LimpiaZonaInsert('');
    this.LimpiarFiltros();
    this.ValidaSelecZonaInsert = "1";
    this.VerSectorComponent = "1";//Para ver la region de crear
    this.TituloComponent = "Sectores";//Cambia el titulo general
    this.DataCoor = [];
    this.ConsultaSectores('0');
  }
  // #endregion crear
}

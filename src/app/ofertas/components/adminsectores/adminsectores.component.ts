import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { CrearofertaService } from 'src/app/core/crearoferta.service'
@Component({
  selector: 'app-adminsectores',
  templateUrl: './adminsectores.component.html',
  styleUrls: ['./adminsectores.component.css']
})
export class AdminsectoresComponent implements OnInit {
  //Variables generales
  SessionIdUsuario: string = "";
  TituloComponent: string = "Sectores";
  VerSectorComponent: string = "1";//Variable que define el sector a ver (1 Lista, 2 Crear, 3 editar)
  NombreSector: string = "";
  NumUserSector: string = "";
  NombreCiudad: string = "";
  Respuesta: string = "";
  keyword: string = 'DSCRPCION_SCTOR';

  DataBodegas: any = [];

  constructor(private modalService: NgbModal, public sectoresservices: ValorarofertaService, public rutas: Router, private cookies: CookieService, private ServiciosGenerales: MetodosglobalesService, private ServiciosOferta: CrearofertaService) { }
  public respuestaImagenEnviada: any;
  public resultadoCarga: any;
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

  //Modificar Imagen Mapa
  ImgMapaSec: string = './../../../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  file: FileList | undefined;
  RutaImagenes: string = this.ServiciosGenerales.RecuperaRutaImagenes();
  NomImagen1: string = '';
  SectModif: string = '';
  ValidaImgMapa: string ='0' ;
  RespuestaImgMapa: any;
  // #endregion crear

  // #region region editar
  NombreSectorEditar: string = "";
  IdSectorSelect: string = "";
  // #endregion region editar

//#region  William

  //#region InsertaBodega

  //#region Departamento
  ArrayDepa: any = [];
  keywordDepartamento: string = "";
  IdDepartamento: string = "0";
  Departamento: string = "";
  IndexDepartamentoInsert: number = 0;
  //#endregion Departamento
  //#region Ciudad
  ArrayCiud: any;
  keywordCiudad: string = '';
  IdCiudadBodega: string = "0";
  Ciudad: string;
  IndexCiudadInsert: number = 0;
  //#endregion Ciudad
  //#region Sector
  IdSectorBodega: string = "0";
  SectorBodega: string = "";
  //#endregion Sector
  //#region Coordenadas
  CoordenadasInsert: string = "";
  //#endregion Coordenadas
  //#region Nombre
  NombreBodegaInsert: string = "";
  //#endregion Nombre
  //#region Direccion
  DireccionBodegaInsert: string = "";
  //#endregion Direccion
  //#region Descripcion
  DescripcionBodega: string = "";
  //#endregion Descripcion
  //#region OptionAccionesBodega
  OpcionBodega: string = "1";
  //#endregion OptionAccionesBodega

  //#endregion InsertaBodega

  //#region EditarBodega

  //#region General
  NombreBodegaEdit: string = "";
  DireccionBodegaEdit: string = "";
  DepartamentoEdit: string = "";
  CiudadEditar: string = "";
  DescripcionEdit: string = "";
  //#endregion General

  //#region Bodega
  IdAsignaBodega: string = "0";
  //#endregion Bodega

  //#region Direccio
  CoordenadasEditar: string = "";
  //#endregion Direccion

  //#region Sector
  SectorAsignacion: string = "";
  IdSectorAsignacion: string = "";
  ArraySectoresAsociados: any = [];
  //#endregion Sector

  //#endregion EditarBodega

  //#endregion William
  

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
//#region Anterior

  // #region General
  ConsultaUserSector(sector: any) {
    var selectSector = sector.SCTOR_OFRTA
    this.sectoresservices.ConsultaNumUsuariosSector('3', selectSector).subscribe(ResultadoCons => {
      this.NumUserSector = ResultadoCons.toString();
    })
  }
  ConsultaMapaSector(IdMapa: string) {
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
        document.getElementById(IdMapa) as HTMLElement,
        {
          zoom: 15,
          center: bounds.getCenter(),
          mapTypeId: "terrain",
        }
      );
      area.setMap(this.map);
    })

  }
  ConsultaNumeroUserSector(sector: string) {
    this.sectoresservices.ConsultaNumUsuariosSector('3', sector).subscribe(ResultadoCons => {
      this.NumUserSector = ResultadoCons.toString();
    })
  }
  // #endregion general

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
    var arrGrid: any = [];
    arrGrid = this.DataSectores;
    this.DataSectores = [];
    for(var i = 0; i < arrGrid.length; i++){
      if(arrGrid[i].Temporal == item.IdTs){
        this.DataSectores.push(arrGrid[i]);
      }
    }
  }
  LimpiaTipoSect(result: string) {
    this.TipoSector = result;
    this.ConsultaSectores('0');
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
    this.NombreCiudad = item.Ciudad;//Se debe cambiar por el campo que debe llegar en el servicio
    this.CoordenadasSector = item.coordenadas;
    this.ConsultaUserSector(item);
    this.ConsultaMapaSector('mapSelectSector');
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
          this.CreaMapa('mapInsertSector');
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
  CreaMapa(IdMapa: string) {
    this.geocoder.geocode({ address: this.NombreCiudad }).then((result) => {
      const { results } = result;
      var lati = results[0].geometry.location.lat();
      var longi = results[0].geometry.location.lng();
      this.map = new google.maps.Map(
        document.getElementById(IdMapa) as HTMLElement,
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
          console.log(this.AreaPolygon)
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
        console.log(this.AreaPolygon)
      }
      else {
        this.DataCoor = [];
      }
      this.ConsultaUsuariosSectr(this.IdSectorCreado);
    })
  }
  ConsultaUsuariosSectr(IdSector: string) {
    if (this.DataCoor.length < 3) {
      this.NumUserSector = '0'
    } else {
      this.ConsultaSectorPoligono(IdSector);
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

  // #region Editar
  SelectSectorEditar(item: any) {
    console.log(item)
    this.markers = [];
    this.VerSectorComponent = "3";
    this.TituloComponent = "Editar sector";
    this.NombreCiudad = item.Ciudad//Se debe cambiar a lo que llega de el micro servicio
    this.CreaMapaEdit('mapEditSector');
    this.NombreSectorEditar = item.DSCRPCION_SCTOR;
    this.CoordenadasSector = "" + item.coordenadas;
    this.IdSectorSelect = item.SCTOR_OFRTA;
    this.ConsultaNumeroUserSector(item.SCTOR_OFRTA);
    this.ConsultaCoordenadasEdit();
  }


  CreaMapaEdit(IdMapa: string) {
    this.geocoder.geocode({ address: this.NombreCiudad }).then((result) => {
      const { results } = result;
      var bounds = new google.maps.LatLngBounds;
      var coords: any = [];
      var area = new google.maps.Polygon();
      console.log(this.CoordenadasSector != null && this.CoordenadasSector != undefined && this.CoordenadasSector != "null")
      console.log(this.CoordenadasSector)
      if(this.CoordenadasSector != null && this.CoordenadasSector != undefined && this.CoordenadasSector != "null"){
        coords = this.CoordenadasSector.split('|').map(function (data: string) {
          var info = data.split(','), // Separamos por coma
            coord = { // Creamos el obj de coordenada
              lat: parseFloat(info[0]),
              lng: parseFloat(info[1])
            };
          // Agregamos la coordenada al bounds
          bounds.extend(coord);
          return coord;
        });
        area = new google.maps.Polygon({
          paths: coords,
          strokeColor: '#397c97',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#B1B0B0',
          fillOpacity: 0.35
        });
      }

      var lati = results[0].geometry.location.lat();
      var longi = results[0].geometry.location.lng();

      this.map = new google.maps.Map(
        document.getElementById(IdMapa) as HTMLElement,
        {
          zoom: 12,
          center: {
            lat: lati,
            lng: longi
          },
          mapTypeId: "terrain"
        }
      );
      this.map.addListener("click", (e: any) => {
        this.AgregarMarcadoresEdit(e.latLng, this.map);
        this.LatitudeCoordenadas = e.latLng.toString()
        this.LatitudeCoordenadas = this.LatitudeCoordenadas.substring(1, 15)
        this.LongitudeCoordenadas = e.latLng.toString()
        this.LongitudeCoordenadas = this.LongitudeCoordenadas.substring(this.LongitudeCoordenadas.indexOf('-'), this.LongitudeCoordenadas.length - 1)
      });
      if(this.CoordenadasSector.length > 0){
        area.setMap(this.map);
      }
    })
  }

  AgregarCoordenadaEdit(templateRespuesta: any) {
    if (this.LatitudeCoordenadas != '' && this.LongitudeCoordenadas != '') {
      const BodyInsertCoo = {
        ID: 0,
        ID_SCTOR_OFRTA: Number(this.IdSectorSelect),
        LTTUD: this.LatitudeCoordenadas,
        LNGTUD: this.LongitudeCoordenadas
      }
      this.sectoresservices.InsertarCoordenadas('3', BodyInsertCoo).subscribe(Resultado => {
        const arrayRes = Resultado.split('|')
        this.Respuesta = arrayRes[1];
        this.LatitudeCoordenadas = '';
        this.LongitudeCoordenadas = '';
        this.ConsultaCoordenadasEdit();
      })
    }
    else {
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = "Los campos coordenadas son obligatorios, recuerda dar click en el mapa para recuperar las coordenadas.";
    }
  }
  AgregarMarcadoresEdit(latLng: google.maps.LatLng, map: google.maps.Map) {
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
  ConsultaCoordenadasEdit() {
    /*this.sectoresservices.ConsultaCoordenada('1', this.IdSectorSelect).subscribe(Result => {
      if (Result.length > 0) {
        if (this.AreaPolygon != undefined) {
          console.log('Entra a cuando esta vacio');
          //this.map.
          this.AreaPolygon.setMap(null);
          alert(this.AreaPolygon.setMap(null));
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
        console.log(this.AreaPolygon)
        this.AreaPolygon = new google.maps.Polygon({
          paths: coords,
          strokeColor: '#397c97',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#B1B0B0',
          fillOpacity: 0.35,
        });
        this.AreaPolygon.setMap(this.map);
        alert(this.AreaPolygon.setMap(this.map));
      }
      else {
        this.DataCoor = [];
      }
      this.ConsultaUsuariosSectr(this.IdSectorSelect);
    })*/

    this.sectoresservices.ConsultaCoordenada('1', this.IdSectorSelect).subscribe(Result => {
      if (Result.length > 0) {
        if (this.AreaPolygon != undefined) {
          this.AreaPolygon.setMap(null)
          console.log(this.AreaPolygon)
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
        console.log(this.AreaPolygon)
      }
      else {
        this.DataCoor = [];
      }
      this.ConsultaUsuariosSectr(this.IdSectorSelect);
    })
  }
  EliminaCoordenada(coordenada: any, NumHorden: number, ModalRespuesta: any) {

      var auxIdSecor: string = "";
      if (this.VerSectorComponent == "2") {
        auxIdSecor = this.IdSectorCreado;
      } else if (this.VerSectorComponent == "3") {
        auxIdSecor = this.IdSectorSelect;
      }

      const BodyInsertCoo = {
        ID: coordenada.consecutivo,
        ID_SCTOR_OFRTA: Number(auxIdSecor),
        LTTUD: coordenada.Latitud,
        LNGTUD: coordenada.Longitud
      }
      this.sectoresservices.InsertarCoordenadas('4', BodyInsertCoo).subscribe(Resultado => {
        console.log(Resultado)
        this.LatitudeCoordenadas = '';
        this.LongitudeCoordenadas = '';

        if (this.VerSectorComponent == "2") {
          this.ConsultaCoordenadas();
        } else if (this.VerSectorComponent == "3") {
          this.ConsultaCoordenadasEdit();
        }
        this.ConsultaUsuariosSectr(auxIdSecor);
        this.markers[0].setMap(null)
      })
  }
  // #endregion Editar

  // #region Eliminar


  //No se puede borrar el sector por que primero se tienen qque borrar las coordenas en la tabla AGRO_SECTOR_COORDENADAS

  EliminaSector(item: any, ModalRespuesta: any) {
    const BodyInsert = {
      USUCODIG: this.SessionIdUsuario,
      SCTOR_OFR: parseInt(item.SCTOR_OFRTA),//Es el unico campo necesario
      DSCRPCION_SCTOR: '0',
      CD_RGION: '0',
      CD_MNCPIO: '0',
      cd_cnsctvo: '0',
      TEMPORAL: '0',
      ID_ZONA: '0'
    }
    console.log(BodyInsert)
    this.sectoresservices.InsertarSector('4', BodyInsert).subscribe(ResultInsert => {
      console.log(ResultInsert)
      const arrayRes = ResultInsert.split('|')
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title' })
      this.Respuesta = arrayRes[1];
      this.ConsultaSectores('0');
    })
  }
  // #endregion Eliminar

  
  EditarImgMapa(sector: any, Modalmapa: any) {
    //this.ValidaMapSector = '1'
    this.ValidaImgMapa = '0'
    console.log(sector)
    this.SectModif = sector.ID_SCTOR_OFRTA
    if (sector.imagen_sctor != '' && sector.imagen_sctor != null && sector.imagen_sctor != undefined) {
      this.ImgMapaSec = this.RutaImagenes + sector.imagen_sctor;
    } else {
      this.ImgMapaSec = './../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
    }
    this.modalService.open(Modalmapa, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  SubirImgMapa(event: any, imagen: string) {
    this.file = event.target.files[0];
    console.log(event.target.files[0])
    this.ServiciosOferta.postFileImagen(event.target.files[0]).subscribe(
      response => {
        this.respuestaImagenEnviada = response;
        console.log(this.respuestaImagenEnviada);
        if (this.respuestaImagenEnviada <= 1) {
          console.log("Error en el servidor");
        } else {
          //console.log("Entra A Enviar");
          if (this.respuestaImagenEnviada == 'Archivo Subido Correctamente') {
            if (imagen == '1') {
              this.ImgMapaSec = this.RutaImagenes + event.target.files[0].name;
              this.NomImagen1 = event.target.files[0].name;
            }
          } else {
            this.resultadoCarga = 2;
            // console.log(this.resultadoCarga);
          }

        }
      },
      error => {

      }
    );
  }

  GuardarImgMapa() {
    if (!this.ImgMapaSec.includes('SubirImagen')) {
      const datos = {
        ID_SECTOR: this.SectModif,
        NOMBRE_IMG: this.NomImagen1
      }
      this.sectoresservices.ModificarImagenSector('3', datos).subscribe(Resultado => {
        console.log(Resultado)
        this.modalService.dismissAll();
      })
      this.ValidaImgMapa = '0';
    }else{
      this.ValidaImgMapa = '1';
      this.RespuestaImgMapa = 'Debe seleccionar una imagen para guardar';
    }

  }

//#endregion Anterior


//Metodos necesarios
ConsultaBodegas(bandera: string) {
  this.sectoresservices.ConsultaBodegas(bandera, '0','0', '0').subscribe(Resultado => {
    if (Resultado.length > 0) {
      this.DataBodegas = Resultado
    }
  })
}

    //#region William

  //#region InsertarBodega
  ConsultaListas(ModalBodega: any) {

    this.modalService.dismissAll();
    this.modalService.open(ModalBodega, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })

    //LimpiaVamposinsertbodega
    this.LimpiarCamposModalBodega();

    this.ConsultaDepartamentos();
    this.ConsultaBodegas('2');
  }
  //#region  Departamento
  ConsultaDepartamentos() {
    this.ArrayDepa = [];
    this.ServiciosOferta.ConsultaDepartamento('4').subscribe(Resultado => {
      this.ArrayDepa = Resultado;
      this.keywordDepartamento = "DSCRPCION";
    })
  }
  selectDepartamento(item: any) {
    this.IdDepartamento = item.CD_RGION;
    this.ConsultaCiudad();
  }
  LimpiaDepartamento(value: string) {
    this.IdDepartamento = "0";
    this.Departamento = value;
    this.LimpiaCiudad('');
  }
  //#endregion Departamento
  //#region Ciudad
  ConsultaCiudad() {
    this.ArrayCiud = [];
    this.ServiciosOferta.ConsultaCiudad(this.IdDepartamento).subscribe(Resultado => {
      this.ArrayCiud = Resultado;
      this.keywordCiudad = "DSCRPCION";
    })
  }
  SelectCiudad(item: any) {
    this.IdCiudadBodega = item.CD_MNCPIO;
  }
  LimpiaCiudad(value: string) {
    this.IdCiudadBodega = "0";
    this.Ciudad = value;
  }
  //#endregion Ciudad
  //#region Sector
  selectSectorBodega(item: any) {
    this.IdSectorBodega = item.SCTOR_OFRTA;
  }
  LimpiaSectorBodega(value: string) {
    this.IdSectorBodega = "0";
    this.SectorBodega = value;
  }
  //#endregion Sector
  //#region CambioVista
  CambioOpcionBodega(opcion: string) {
    this.OpcionBodega = opcion;
  }
  //#endregion CambioVista
  //#endregion InsertarBodega

  //#region EditarBodega
  AbreModalEditarBodega(ModalEditarBodega: any, item: any) {
    this.IdAsignaBodega = item.IdBodega;
    this.ConsultaSectoresBodega();
    this.NombreBodegaEdit = item.NombreBodega;
    this.DireccionBodegaEdit = item.Direccion;
    this.DepartamentoEdit = item.Depto;
    this.CiudadEditar = item.Ciudad;
    this.DescripcionEdit = item.Descripcion;
    this.CoordenadasEditar = item.Coordenadas
    this.modalService.dismissAll();
    this.modalService.open(ModalEditarBodega, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
  }
  ConsultaSectoresBodega() {
    this.ArraySectoresAsociados = [];
    this.sectoresservices.conSectorBodega('4', this.IdAsignaBodega).subscribe(Resultado => {
      this.ArraySectoresAsociados = Resultado;
    });
  }
  //#region Bodega
  selectAsignaBodega(item: any) {
    this.IdAsignaBodega = item.IdBodega;
  }
  LimpiaAsignaBodega() {
    this.IdAsignaBodega = "0";
    this.LimpiaSeleccionaSector('');
  }
  //#endregion Bodega
  //#region Sector
  selectSeleccionaSector(item: any) {
    this.IdSectorAsignacion = item.SCTOR_OFRTA;
  }
  LimpiaSeleccionaSector(value: string) {
    this.SectorAsignacion = value;
    this.IdSectorAsignacion = "0";;
  }
  //#endregion Sector
  //#endregion EditarBodega


  //#region ModBodega
  ModBodega(ModalRespuesta: any) {
    var auxbandera: string = "0";
    let body = {};
    if (this.IdDepartamento == "0" || this.IdCiudadBodega == "0" || this.NombreBodegaInsert == ""
      || this.DescripcionBodega == "" || this.DireccionBodegaInsert == "" || this.CoordenadasInsert == "") {
      this.Respuesta = "No es posible editar, válida, que todos los campos estén completados";
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {
      if (this.OpcionBodega == "1" && this.IdSectorBodega == "0") {
        auxbandera = "1";
        body = {
          IdBodega: 0,
          IdDepto: this.IdDepartamento,
          IdCiudad: this.IdCiudadBodega,
          NombreBodega: this.NombreBodegaInsert,
          Descripcion: this.DescripcionBodega,
          Direccion: this.DireccionBodegaInsert,
          Coordenadas: this.CoordenadasInsert,
          IdSector: 0
        }
      } else if (this.OpcionBodega == "1" && this.IdSectorBodega != "0") {
        auxbandera = "2";
        body = {
          IdBodega: 0,
          IdDepto: this.IdDepartamento,
          IdCiudad: this.IdCiudadBodega,
          NombreBodega: this.NombreBodegaInsert,
          Descripcion: this.DescripcionBodega,
          Direccion: this.DireccionBodegaInsert,
          Coordenadas: this.CoordenadasInsert,
          IdSector: this.IdSectorBodega
        }
      }
      this.sectoresservices.ModCBodega(auxbandera, body).subscribe(Resultado => {
        var auxrespu: string = Resultado.split("|");
        this.Respuesta = auxrespu[1];
        this.modalService.dismissAll();
        this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        this.ConsultaBodegas('2');
      });
    }
  }
  AsociarBodegaAsector(ModalRespuesta: any) {
    let body = {
      IdBodega: this.IdAsignaBodega,
      IdDepto: '0',
      IdCiudad: '0',
      NombreBodega: '0',
      Descripcion: '0',
      Direccion: '0',
      Coordenadas: '0',
      IdSector: this.IdSectorAsignacion
    };
    this.sectoresservices.ModCBodega('3', body).subscribe(Resultado => {
      var auxrespu: string = Resultado.split("|");
      this.Respuesta = auxrespu[1];
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.ConsultaBodegas('2');
      this.ConsultaSectoresBodega();
      this.LimpiaSeleccionaSector('');
    });
  }
  EliminaAsociacionAsector(ModalRespuesta: any, IdSector: string) {
    let body = {
      IdBodega: this.IdAsignaBodega,
      IdDepto: '0',
      IdCiudad: '0',
      NombreBodega: '0',
      Descripcion: '0',
      Direccion: '0',
      Coordenadas: '0',
      IdSector: IdSector
    };
    this.sectoresservices.ModCBodega('5', body).subscribe(Resultado => {
      var auxrespu: string = Resultado.split("|");
      this.Respuesta = auxrespu[1];
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.ConsultaBodegas('2');

      this.ConsultaSectoresBodega();
    });

  }
  EliminaBodega(ModalRespuesta: any, IdBodega: string) {
    let body = {
      IdBodega: IdBodega,
      IdDepto: '0',
      IdCiudad: '0',
      NombreBodega: '0',
      Descripcion: '0',
      Direccion: '0',
      Coordenadas: '0',
      IdSector: '0'
    };
    this.sectoresservices.ModCBodega('4', body).subscribe(Resultado => {
      var auxrespu: string = Resultado.split("|");
      this.Respuesta = auxrespu[1];
      this.modalService.dismissAll();
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.ConsultaBodegas('2');
    });
  }
  EditInfoBodega(ModalRespuesta: any) {
    if (this.NombreBodegaEdit == "" || this.DescripcionEdit == "" || this.DireccionBodegaEdit == "" || this.CoordenadasEditar == "") {
      this.Respuesta = "No es posible editar, válida, que todos los campos estén completados";
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {
      let body = {
        IdBodega: this.IdAsignaBodega,
        IdDepto: '0',
        IdCiudad: '0',
        NombreBodega: this.NombreBodegaEdit,
        Descripcion: this.DescripcionEdit,
        Direccion: this.DireccionBodegaEdit,
        Coordenadas: this.CoordenadasEditar,
        IdSector: '0'
      };
      this.sectoresservices.ModCBodega('6', body).subscribe(Resultado => {
        var auxrespu: string = Resultado.split("|");
        this.Respuesta = auxrespu[1];
        this.modalService.dismissAll();
        this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        this.ConsultaBodegas('2');
      });
    }
  }

  LimpiarCamposModalBodega() {
    this.LimpiaDepartamento('');
    this.LimpiaCiudad('');
    this.NombreBodegaInsert = "";
    this.DireccionBodegaInsert = "";
    this.LimpiaSectorBodega('');
    this.DescripcionBodega = "";
    this.CoordenadasInsert = "";
  }
  //#endregion ModBodega
  //#endregion William

  ActualizaNombre(){
    const BodyInsert = {
      USUCODIG: '0',
      SCTOR_OFR: this.IdSectorSelect,
      DSCRPCION_SCTOR: this.NombreSectorEditar,
      CD_RGION: '0',
      CD_MNCPIO: '0',
      cd_cnsctvo: '0',
      TEMPORAL: '0',
      ID_ZONA: '0'
    }
    //console.log(BodyInsert)
    this.sectoresservices.InsertarSector('2', BodyInsert).subscribe(ResultInsert => {
      console.log(ResultInsert)
    })
  }
}
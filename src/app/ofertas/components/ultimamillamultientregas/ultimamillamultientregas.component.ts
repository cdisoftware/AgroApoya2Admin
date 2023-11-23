import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ultimamillamultientregas',
  templateUrl: './ultimamillamultientregas.component.html',
  styleUrls: ['./ultimamillamultientregas.component.css']
})
export class UltimamillamultientregasComponent implements OnInit, AfterViewInit {
  constructor(private modalService: NgbModal, public sevicesmilla: GrupoMillaServices, public sectoresservices: ValorarofertaService) { }

  //#region General
  IdGrugo_: string = "0";

  StyleMap = [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      stylers: [{ visibility: 'off' }]
    }
  ];
  ItemEliminacion: any = null;
  //#endregion General

  //#region ModalMensaje
  @ViewChild('ModalMensaje', { static: false }) ModalMensaje: any;
  MesajeModal: string = "";
  //#endregion ModalMensaje

  //#region EstadoProceso
  //0 Botones nuevo transporte o editar transporte
  //1 Nuevo Transporte
  //2 Consulta Ofertas para asignar entregas
  IdEstadoProceso: string = "0";
  //#endregion EstadoProceso

  //#region  CreaTransporte
  //#region Variables
  ValorFlete: string = "";
  FechaEntrega: string = "";//2023/10/31
  UbicacionEntrega: string = "";
  //#endregion Variables
  //#region Bodega
  DataBodegas: any = [];
  NombreBodega: string = "";
  Bodega: string = "";
  //#endregion Bodega
  //#endregion CreaTransporte

  //#region ConsultaTransporte
  ArrayConsTransporte: any = [];
  ArrayEntregasDisponibles: any = [];
  //#endregion ConsultaTransporte

  //#region ConsultaTransportes
  ArrayConsTransportes: any = [];
  //#endregion ConsultaTransportes

  //#region Mapa
  //Mapa
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  MarkersEntregasDisponibles: google.maps.Marker[] = [];
  markerBodega: google.maps.Marker[] = [];
  infoWindow = new google.maps.InfoWindow();
  AreaPolygonMap: google.maps.Polygon | null = null;
  ArrayEntregas: any = [];
  ArrayPolygonos: any = [];
  SectorUltimaMilla: string = "";
  IdSectorUltimaMilla_: string = "0";

  //MapaRutaPolygon
  IdSectorMilla_: string = "";
  geocoderRutaPolygon = new google.maps.Geocoder();
  mapRutaPolygon: google.maps.Map;
  AreaPolygon: google.maps.Polygon | null = null;
  markersMapaRutaPolygon: google.maps.Marker[] = [];
  CoordenadasMapaRutaPlygon: string = "";
  NombrePolygonCrear: string = "";
  VerMapRutaPolygon: boolean = false;
  ArrayCoordenadas: any = [];

  //ApiDireccion
  directionsService = new google.maps.DirectionsService();
  directionsRenderers: google.maps.DirectionsRenderer[] = [];

  //#region MapaPinSTransportesGenerados
  geocoderPinRutaEntrega = new google.maps.Geocoder();
  mapPinRutaEntrega: google.maps.Map;
  MarkersPinRutaEntrega: google.maps.Marker[] = [];

  mapPinRutaEntregaPolylineas: google.maps.Map;
  MarkersPinRutaEntregaPolylineas: google.maps.Marker[] = [];

  PoliLynes: google.maps.Polyline[] = [];
  AreaPolygonMapApi: google.maps.Polygon | null = null;
  //#endregion MapaPinSTransportesGenerados
  //#endregion Mapa


  //#region MapaRutaGenerada
  ArrayPinsRutaGenerada: any = [];
  //#endregion MapaRutaGenerada

  //#region VariablesGrupoMilla
  NombreGrupo: string = "";
  ValorGrupo: string = "";
  IdGrupo_: string = "";
  ArrayGruposMilla: any = [];
  IdEntregaAgrega_: string = "";
  //#endregion VariablesGrupoMilla

  //#region CreaTransporteManual
  IdentificadorIdCarr_: string = "";
  IdEstadoProcesoCreaTransporteManual: string = "1";
  //#endregion CreaTransporteManual

  //#region VarialesEditarTransporte
  ArrayConductores: any;
  Conductor: any;
  IdConductorSelec_: string = "0";
  //#endregion VarialesEditarTransporte
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.ConsultaListas();
  }


  //#region CambioEstadoProceso
  CambioEstadoProceso() {
    if (this.IdEstadoProceso == '0') {
      this.IdEstadoProceso = '1';
      this.ConsultaTransporte();
    }
  }
  //#endregion CambioEstadoProceso

  //#region General
  ConsultaListas() {
    this.ConsultaBodegas();
    this.ConsultaTransporte();
  }

  ActualizarValorTransporte() {
    if (this.ValorGrupo != "" && this.ValorGrupo != "0") {
      const body = {
        IdGrupoMilla: this.IdGrugo_,
        ValorFlete: this.ValorGrupo,
        FechaEntrega: "0",
        UbicacionEntrega: "0",
        UbicacionRecoge: "0",
        Id_carrosManual: "0"
      }
      console.log(body)
      this.sevicesmilla.CreaTransporteEntrega('7', body).subscribe(Resultado => {
        var auxrespu = Resultado.split("|");
        console.log(Resultado);
        if (Number(auxrespu[0]) > 0) {
          this.MesajeModal = "Se actualizo el valor del transporte correctamente.";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        } else {
          this.MesajeModal = "No fue posible actualizar el valor del transporte, por favor comuníquese con soporte";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      });
    } else {
      this.MesajeModal = "No fue posible actualizar el valor del transporte, por favor comuníquese con soporte";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }
  //#endregion General



  //#region CreaTransporte

  CambiaEstadoProceso() {
    if (this.IdSectorUltimaMilla_ != "0") {
      this.IdEstadoProceso = "3";
    } else {
      this.MesajeModal = "Por favor selecciona un sector al cual quieras asignar las entregas, ten en cuenta que las entregas que quieres realizar deben estar dentro del sector seleccionado.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }

  //#region Bodega
  ConsultaBodegas() {
    this.sectoresservices.ConsultaBodegas("2", '401', '2161', '0').subscribe(Resultado => {
      if (Resultado.length > 0) {
        this.DataBodegas = Resultado;
      }
    })
  }
  selectBodega(item: any) {
    this.NombreBodega = item.NombreBodega;
    this.Bodega = item.NombreBodega;
  }
  LimpiaBodega(limpia: string) {
    this.NombreBodega = "";
    this.Bodega = "";
  }
  //#endregion Bodega

  //#region creaTransporteMtd
  CreaTransporte() {
    if (this.NombreBodega != "" && Number(this.ValorFlete) >= 0 && this.FechaEntrega != "" && this.UbicacionEntrega != "") {
      const body = {
        IdGrupoMilla: 0,
        ValorFlete: Number(this.ValorFlete),
        FechaEntrega: this.FechaEntrega,
        UbicacionEntrega: this.UbicacionEntrega,
        UbicacionRecoge: this.NombreBodega
      }
      this.sevicesmilla.CreaTransporteEntrega('4', body).subscribe(Resultado => {
        const result = Resultado.split("|");
        if (Number(result[0]) > 0) {
          this.IdGrugo_ = result[0];
          this.ValidaEntregasUltimaMilla(this.IdSectorUltimaMilla_);
        } else {
          this.MesajeModal = "No fue posible crear el transporte, por favor comuníquese con soporte";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      });


    } else {
      this.MesajeModal = "Por favor, verifique los datos ingresados e inténtente nuevamente.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }
  ValidaEntregasUltimaMilla(IdSector: string) {
    var cadenaOfertas = "";
    for (var i = 0; i < this.ArrayConsTransporte.length; i++) {
      if (this.ArrayConsTransporte[i].checked == true) {
        cadenaOfertas += this.ArrayConsTransporte[i].CD_CNSCTVO + "-" + this.ArrayConsTransporte[i].IdSector + "|"
      }
    }
    const body = {
      IdSector: IdSector,
      OfertaSector: cadenaOfertas
    }
    this.sevicesmilla.ValidaEntregasSector('1', body).subscribe(ResultadoValida => {
      this.sevicesmilla.ConsultaPolygonosGrupoMilla('1', IdSector).subscribe(RespuPins => {
        if (RespuPins.length > 0) {
          var IdCarr = "";
          for (var i = 0; i < RespuPins.length; i++) {
            IdCarr += RespuPins[i].IdCarro + "|";
          }
          const body = {
            IdGrupo: this.IdGrugo_,
            IdCarros: IdCarr
          }
          var aux = body
          this.sevicesmilla.AgregaCompras('3', body).subscribe(RespuInsert => {
            this.ConsultaEntregasGrupo(this.IdGrugo_);
            this.IniciaMapaRuta();

            this.ListaGruposMilla()
          });
        } else {
          this.MesajeModal = "Verifique que el sector seleccionado tenga mínimo una entrega dentro";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.IdEstadoProceso = "2";
        }
      });
    });
  }




  IniciaMapaRuta() {
    this.IdEstadoProceso = "4";
  }
  CentramapaRuta(request: google.maps.GeocoderRequest): void {
    this.geocoderPinRutaEntrega.geocode(request).then((result) => {
      const { results } = result;
      this.mapPinRutaEntrega = new google.maps.Map(
        document.getElementById("mapRuta") as HTMLElement,
        {
          center: { lat: 4.70281065790573, lng: -74.05637826500855 },
          zoom: 12,
        }
      );
      this.mapPinRutaEntrega.setOptions({ styles: this.StyleMap });



      return results;
    })
      .catch((e) => {
      });

    this.geocoderPinRutaEntrega.geocode(request).then((result) => {
      const { results } = result;
      this.mapPinRutaEntregaPolylineas = new google.maps.Map(
        document.getElementById("mapRutaPolilyneas") as HTMLElement,
        {
          center: { lat: 4.70281065790573, lng: -74.05637826500855 },
          zoom: 12,
        }
      );
      this.mapPinRutaEntregaPolylineas.setOptions({ styles: this.StyleMap });
      this.AgregarSitiosRutaEntregas();
      this.AgregaPolilineasRuta();
      return results;
    })
      .catch((e) => {
      });
  }
  AgregarSitiosRutaEntregas() {
    for (var i = 0; i < this.MarkersPinRutaEntrega.length; i++) {
      this.MarkersPinRutaEntrega[i].setMap(null);
    }
    this.MarkersPinRutaEntrega = [];
    for (var i = 0; i < this.MarkersPinRutaEntregaPolylineas.length; i++) {
      this.MarkersPinRutaEntregaPolylineas[i].setMap(null);
    }
    this.MarkersPinRutaEntregaPolylineas = [];


    const features = [];
    var lat: number;
    var long: number;

    for (var i = 0; i < this.ArrayPinsRutaGenerada.length; i++) {
      var auxcoor = this.ArrayPinsRutaGenerada[i].CoordenadasEntrega.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      features.push({ position: new google.maps.LatLng(lat, long), NomCli: this.ArrayPinsRutaGenerada[i].NombrePersona });
    }

    for (let i = 0; i < features.length; i++) {

      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.mapPinRutaEntrega,
        icon: '../../../../assets/ImagenesAgroApoya2Adm/Entregado.png',
        zIndex: i,
        label: ''
      });
      this.MarkersPinRutaEntrega.push(marker);


      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.mapPinRutaEntregaPolylineas,
        icon: '../../../../assets/ImagenesAgroApoya2Adm/Entregado.png',
        zIndex: i,
        label: ''
      });
      this.MarkersPinRutaEntregaPolylineas.push(marker);
    }
  }



  AgregaPolilineasRuta() {
    var lat: number;
    var long: number;
    const Polylines = [];
    this.PoliLynes = [];
    for (var j = 0; j < this.ArrayPinsRutaGenerada.length; j++) {
      var auxcoor = this.ArrayPinsRutaGenerada[j].CoordenadasEntrega.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      Polylines.push({ lat: lat, lng: long });
    }
    const flightPath = new google.maps.Polyline({
      path: Polylines,
      geodesic: true,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    this.PoliLynes.push(flightPath);
    flightPath.setMap(this.mapPinRutaEntrega);
    this.AgregaPolilyneasApiDireccion();
  }


  AgregaPolilyneasApiDireccion() {
    // Calcular y mostrar rutas entre ubicaciones
    for (let i = 0; i < this.ArrayPinsRutaGenerada.length - 1; i++) {
      const start = this.ArrayPinsRutaGenerada[i].CoordenadasEntrega;
      const end = this.ArrayPinsRutaGenerada[i + 1].CoordenadasEntrega;

      const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          const directionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true, // Esto quitará los marcadores "A" y "B"
            preserveViewport: true
          });
          directionsRenderer.setDirections(result);
          directionsRenderer.setMap(this.mapPinRutaEntregaPolylineas);
          this.directionsRenderers.push(directionsRenderer);


          // Personalizar el estilo de la polilínea
          const polylineOptions = {
            strokeColor: '#000000', // Color de la línea (rojo)
            strokeOpacity: 0.8,     // Opacidad de la línea (0.0 a 1.0)
            strokeWeight: 2      // Grosor de la línea
          };
          directionsRenderer.setOptions({ polylineOptions });
        }
      });
    }
  }

  LimpiaMapsEntregas() {
    for (const renderer of this.directionsRenderers) {
      renderer.setMap(null); // Esto elimina la polilínea del mapa
    }
    this.directionsRenderers = []; // Limpia el array


    for (var i = 0; i < this.MarkersPinRutaEntregaPolylineas.length; i++) {
      this.MarkersPinRutaEntregaPolylineas[i].setMap(null);
    }
    this.MarkersPinRutaEntregaPolylineas = [];

    for (var i = 0; i < this.MarkersPinRutaEntrega.length; i++) {
      this.MarkersPinRutaEntrega[i].setMap(null);
    }
    this.MarkersPinRutaEntrega = [];


    for (var i = 0; i < this.PoliLynes.length; i++) {
      this.PoliLynes[i].setMap(null);
    }
    this.PoliLynes = [];
  }
  //#endregion creaTransporteMtd


  //#endregion CreaTransporte

  //#region ConsultaTransporte
  ConsultaTransporte() {
    this.ArrayConsTransporte = [];
    this.sevicesmilla.ConsultaTransporte("1", /*this.IdGrugo_*/'0').subscribe(Respu => {
      for (var i = 0; i < Respu.length; i++) {
        this.ArrayConsTransporte.push({ CD_CNSCTVO: Respu[i].CD_CNSCTVO, IdSector: Respu[i].IdSector, DesSector: Respu[i].DesSector, NumeroDeCompras: Respu[i].NumeroDeCompras, checked: false })
      }
    });
  }
  SetStile(e: any, position: number) {
    this.ArrayConsTransporte[position].checked = e.target.checked;
  }
  MuestraEntregasDisponibles() {
    this.ArrayEntregasDisponibles = [];
    var cadenaOfertas = "";
    for (var i = 0; i < this.ArrayConsTransporte.length; i++) {
      if (this.ArrayConsTransporte[i].checked == true) {
        cadenaOfertas += this.ArrayConsTransporte[i].CD_CNSCTVO + "-" + this.ArrayConsTransporte[i].IdSector + "|"
      }
    }
    if (cadenaOfertas != "") {
      const body = {
        OfertaSector: cadenaOfertas
      }
      this.sevicesmilla.ConsultaEntregasDisponibles("1", body).subscribe(Respu => {
        if (Respu.length > 0) {
          this.ArrayEntregasDisponibles = Respu;
          this.ListaPolygonos();
          this.IniciaMapa();
        } else {
          this.MesajeModal = "Comunícate con soporte. No pudimos cargar información de las ofertas seleccionadas.";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      });
    } else {
      this.MesajeModal = "Por favor, seleccione las ofertas para asignar le transporte.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }
  ListaPolygonos() {
    this.sevicesmilla.ConsSectoresMilla("1", '0').subscribe(Respu => {
      if (Respu.length > 0) {
        this.ArrayPolygonos = Respu;
      }
    });
  }
  LimpiaSectorUtimaMilla(value: string) {
    this.SectorUltimaMilla = "";
    this.IdSectorUltimaMilla_ = value;
    this.LimpiaPolygonMap();
  }
  selectSectorUtimaMilla(item: any) {
    this.SectorUltimaMilla = item.NombreSector;
    this.IdSectorUltimaMilla_ = item.IdSectorMilla;
    this.SelectsectorUltimaMilla(this.IdSectorUltimaMilla_);
  }


  SelectsectorUltimaMilla(IdSectorMilla: string) {
    this.sevicesmilla.ConsCoordenadasSectorMilla("1", IdSectorMilla).subscribe(Respu => {
      if (Respu.length > 3) {
        var bounds = new google.maps.LatLngBounds;
        var coords = Respu.map(function (data: any) {
          var coord = { // Creamos el obj de coordenada
            lat: parseFloat(data.LTTUD),
            lng: parseFloat(data.LNGTUD)
          };
          // Agregamos la coordenada al bounds
          bounds.extend(coord);
          return coord;
        });
        this.AreaPolygonMap = new google.maps.Polygon({
          paths: coords,
          strokeColor: '#397c97',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#B1B0B0',
          fillOpacity: 0.35,
        });
        this.AreaPolygonMap.setMap(this.map);
      } else {
        this.LimpiaSectorUtimaMilla('0');
        this.LimpiaPolygonMap();
        this.MesajeModal = "Por favor, verifique que el sector cuente con más de 3 coordenadas para buscar el polígono.";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    });
  }
  LimpiaPolygonMap() {
    if (this.AreaPolygonMap != null || this.AreaPolygonMap != undefined) {
      this.AreaPolygonMap.setMap(null);
    }
    this.AreaPolygonMap = null;
  }
  //#endregion ConsultaTransporte



  //#region EditarTransporte
  SeleccionaTransporte(templateTransportes: any) {
    this.ConsultaTransportes();
    this.modalService.open(templateTransportes, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }
  //#region ConsultaTransportes
  ConsultaTransportes() {
    this.ArrayConsTransportes = [];
    this.sevicesmilla.ConsultaTransportesCreados("1", '0').subscribe(Respu => {
      this.ArrayConsTransportes = Respu;
    })
  }

  SelectTransporte(item: any) {
    this.modalService.dismissAll();
    if (item.IdGrupoMilla != null) {
      this.IdEstadoProceso = '6';
      this.IdGrugo_ = item.IdGrupoMilla;
      this.ConsultaEntregasGrupo(this.IdGrugo_);
    } else {
      this.MesajeModal = "No fue posible editar el transporte por favor comunícate con soporte.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }

  AbreModalAsignaTransportista(templateAasignaTransportista: any) {
    this.ConsultaConductores();
    this.modalService.open(templateAasignaTransportista, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  ConsultaConductores() {
    this.sevicesmilla.ConsultaConductores('1').subscribe(Resultado => {
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.ArrayConductores = Resultado
      }
    })
  }
  LimpiaConductoresUtimaMilla() {
    this.Conductor = "";
    this.IdConductorSelec_ = "0";
  }
  selectConductoresUltimaMilla(item: any) {
    this.Conductor = item.NMBRE_CNDCTOR;
    this.IdConductorSelec_ = item.ID_CNDCTOR;
  }

  AceptaEditar() {
    if (this.IdConductorSelec_ != '0') {
      const Datos = {
        IdGrupo: this.IdGrugo_,
        cd_cnsctivo: '0',
        idSector: '0',
        idConductor: this.IdConductorSelec_
      }
      this.sevicesmilla.ModificaConductor('2', Datos).subscribe(Resultado => {
        var auxrespu = Resultado.split("|");
        if (Number(auxrespu[0]) > 0) {
          this.MesajeModal = "Se asigno el transportista correctamente";
          this.LimpiaConductoresUtimaMilla();
        } else {
          this.MesajeModal = "No fue posible editar el transporte por favor comunícate con soporte.";
        }
      })

      this.modalService.dismissAll();
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    } else {
      this.MesajeModal = "Debes seleccionar un transportista para realizar la acción.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }


  }
  //#endregion ConsultaTransportes

  //#endregion EditarTransporte



  //#region Mapa
  IniciaMapa() {
    this.IdEstadoProceso = "2";
    this.Centramapa({ address: 'Bogotá' + ',' + 'Bogotá' });
  }
  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 4.70281065790573, lng: -74.05637826500855 },
          zoom: 12,
        }
      );
      this.map.setOptions({ styles: this.StyleMap });
      this.AgregarSitiosRuta();
      return results;
    })
      .catch((e) => {
      });
  }
  AgregarSitiosRuta() {
    this.MarkersEntregasDisponibles = [];


    const features = [];

    this.markerBodega = [];
    var lat: number;
    var long: number;





    for (var i = 0; i < this.ArrayEntregasDisponibles.length; i++) {
      var auxcoor = this.ArrayEntregasDisponibles[i].CoordenadasEntrega.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      features.push({ position: new google.maps.LatLng(lat, long), NomCli: this.ArrayEntregasDisponibles[i].NombresCliente });
    }

    for (let i = 0; i < features.length; i++) {

      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.map,
        icon: '../../../../assets/ImagenesAgroApoya2Adm/Devuelto.png',
        zIndex: i,
        label: ''
      });
      this.MarkersEntregasDisponibles.push(marker);
    }
  }
  //#endregion Mapa

  //#region Volver
  Volver() {
    this.IdEstadoProceso = '0';
    this.MesajeModal = "";
    this.IdGrugo_ = "0";

    this.ValorFlete = "";
    this.FechaEntrega = "";
    this.UbicacionEntrega = "";

    this.NombreBodega = "";
    this.Bodega = "";

    this.ArrayConsTransporte = [];
  }
  //#endregion Volver

  //#region MapaRutaPoligono
  IniciaMapRutaPoligon(templatePoligonRuta: any) {
    this.ArrayCoordenadas = [];
    this.NombrePolygonCrear = "";
    this.modalService.open(templatePoligonRuta, { ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static', keyboard: false });
  }

  CreaPolygon() {
    if (this.NombrePolygonCrear != "") {
      const body = {
        NombreSector: this.NombrePolygonCrear,
        cd_rgion: "401",
        cd_mncpio: "266"
      }
      this.sevicesmilla.CreaPolygono("3", body).subscribe(Respu => {
        var aux = Respu.split("|");
        if (aux.length > 0) {
          if (Number(aux[0]) > 0) {
            this.IdSectorMilla_ = aux[0];
            this.VerMapRutaPolygon = true;
            this.NombrePolygonCrear = "";
            this.CentramapRutaPoligon({ address: 'Bogotá' + ',' + 'Bogotá' });
          } else {
            this.MesajeModal = aux[1];
            this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          }
        } else {
          this.MesajeModal = aux[0];
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      });
    } else {
      this.MesajeModal = "Ingresa el nombre del polígono e intenta nuevamente.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }


  CentramapRutaPoligon(request: google.maps.GeocoderRequest): void {
    this.geocoderRutaPolygon.geocode(request).then((result) => {
      const { results } = result;
      this.mapRutaPolygon = new google.maps.Map(
        document.getElementById("CreamapPoligon") as HTMLElement,
        {
          center: { lat: 4.70281065790573, lng: -74.05637826500855 },
          zoom: 14,
        }
      );
      this.mapRutaPolygon.addListener("click", (e: any) => {
        this.LimpiaMappRutaPoligono();
        this.AgregarMarcador(e.latLng, this.mapRutaPolygon);
        this.CreaPoligono(e.latLng, this.mapRutaPolygon);
      });
      return results;
    })
      .catch((e) => {
      });
  }
  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    const latitud = latLng.lat();
    const longitud = latLng.lng();

    const body = {
      ID: 0,
      ID_SCTOR_MILLA: this.IdSectorMilla_,
      LTTUD: latitud,
      LNGTUD: longitud
    }
    this.sevicesmilla.InsertaCoordenada("3", body).subscribe(Respu => {
      var auxrespu = Respu.split("|");
      if (auxrespu.length > 0) {
        if (Number(auxrespu[0]) > 0) {
          const bod = {
            ID_SCTOR: auxrespu[0]
          }
          this.sevicesmilla.ModificaPoligoCordenada("3", bod).subscribe(Respu => {
            if (auxrespu.length > 0) {
              if (Number(auxrespu[0]) > 0) {

                const marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                });
                this.markersMapaRutaPolygon.push(marker);

                this.ArrayPolilyneas();
                this.StylosDivCoordenadas();
              } else {
                this.MesajeModal = "No fue posible modificar el sector, por favor comuníquese con soporte (2).";
                this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
              }
            } else {
              this.MesajeModal = "No fue posible modificar el sector, por favor comuníquese con soporte (1).";
              this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
            }
          });
        } else {
          this.MesajeModal = "No fue posible agregar las coordenadas, por favor comunícate con soporte. (2)";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      } else {
        this.MesajeModal = "No fue posible agregar las coordenadas, por favor comunícate con soporte. (1)";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    });
  }
  CreaPoligono(latLng: google.maps.LatLng, map: google.maps.Map) {
    const latitud = latLng.lat();
    const longitud = latLng.lng();

    this.CoordenadasMapaRutaPlygon += `${latitud},${longitud}` + '|';
    var nuevaCoord = this.CoordenadasMapaRutaPlygon.substring(0, this.CoordenadasMapaRutaPlygon.length - 1)


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
    this.AreaPolygon.setMap(this.mapRutaPolygon);
  }
  LimpiaMappRutaPoligono() {
    if (this.AreaPolygon != null || this.AreaPolygon != undefined) {
      this.AreaPolygon.setMap(null);
    }
    this.AreaPolygon = null;

    for (var i = 0; i < this.markersMapaRutaPolygon.length; i++) {
      this.markersMapaRutaPolygon[i].setMap(null);
    }
    this.markersMapaRutaPolygon = [];
  }


  ArrayPolilyneas() {

    let auxrespu: any = [];
    this.sevicesmilla.ConsCoordenadasSectorMilla("1", this.IdSectorMilla_).subscribe(Respu => {
      auxrespu = Respu;
      this.ArrayCoordenadas = [];
      this.ArrayCoordenadas = auxrespu;


      this.CoordenadasMapaRutaPlygon = "";

      for (var i = 0; i < auxrespu.length; i++) {
        this.CoordenadasMapaRutaPlygon += `${auxrespu[i].LTTUD},${auxrespu[i].LNGTUD}` + '|';
      }

    });
  }


  EliminarCoordenadasMap(item: any) {
    const body = {
      ID: item.id,
      ID_SCTOR_MILLA: this.IdSectorMilla_.trim(),
      LTTUD: item.LTTUD.trim(),
      LNGTUD: item.LNGTUD.trim()
    }
    this.sevicesmilla.InsertaCoordenada("4", body).subscribe(Respu => {
      var auxrespu = Respu.split("|");
      if (auxrespu.length > 0) {
        if (Number(auxrespu[0]) > 0) {
          const bod = {
            ID_SCTOR: auxrespu[0]
          }
          this.sevicesmilla.ModificaPoligoCordenada("3", bod).subscribe(Respu => {
            var auxResult = Respu.split("|");
            if (auxResult.length > 0) {
              if (Number(auxResult[0]) > 0) {
                this.LimpiaMappRutaPoligono();
                this.ArrayPolilyneas();
                this.CreaPoligonEliminaCoordenada(this.mapRutaPolygon);
              } else {
                this.MesajeModal = "No fue posible modificar el sector, por favor comuníquese con soporte (2 Eliminar).";
                this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
              }
            } else {
              this.MesajeModal = "No fue posible modificar el sector, por favor comuníquese con soporte (1 Eliminar).";
              this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
            }
          });
        } else {
          this.MesajeModal = "No fue posible agregar las coordenadas, por favor comunícate con soporte. (2 Eliminar)";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      } else {
        this.MesajeModal = "No fue posible agregar las coordenadas, por favor comunícate con soporte. (1 Eliminar)";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    });
  }
  CreaPoligonEliminaCoordenada(map: google.maps.Map) {
    var nuevaCoord = this.CoordenadasMapaRutaPlygon.substring(0, this.CoordenadasMapaRutaPlygon.length - 1)


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
    this.AreaPolygon.setMap(this.mapRutaPolygon);


    var coordenadasArray = this.CoordenadasMapaRutaPlygon.split('|');
    var position = coordenadasArray[coordenadasArray.length - 1];
    var coors = position.split(",");

    // Convertir las cadenas a números
    var latitud = parseFloat(coors[0].trim());
    var longitud = parseFloat(coors[1].trim());

    // Crear un objeto google.maps.LatLng
    var miLatLng = new google.maps.LatLng(latitud, longitud);


    const marker = new google.maps.Marker({
      position: miLatLng,
      map: map,
    });
    this.markersMapaRutaPolygon.push(marker);
  }


  CerrarModalMapaRutaPolygon() {
    if (this.VerMapRutaPolygon) {
      if (this.CoordenadasMapaRutaPlygon.split("|").length > 3) {
        this.ListaPolygonos();
        this.VerMapRutaPolygon = false;
        this.NombrePolygonCrear = "";
        this.modalService.dismissAll();
        this.LimpiaMappRutaPoligono();
        this.CoordenadasMapaRutaPlygon = "";
        this.IdSectorMilla_ = "0";
      } else {
        this.MesajeModal = "Debes ingresar por lo menos 3 coordenadas para que el sector se cree adecuadamente.";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    } else {
      this.ListaPolygonos();
      this.VerMapRutaPolygon = false;
      this.NombrePolygonCrear = "";
      this.modalService.dismissAll();
      this.LimpiaMappRutaPoligono();
      this.CoordenadasMapaRutaPlygon = "";
      this.IdSectorMilla_ = "0";
    }
  }


  StylosDivCoordenadas() {
    // Obtener el elemento div por su ID
    const miDiv: HTMLElement | null = document.getElementById('CreamapPoligon');
    let ancho: number = 0;
    let altura: number = 0;
    if (miDiv) {
      // Obtener el ancho y la altura
      ancho = miDiv.offsetWidth;
      altura = miDiv.offsetHeight;
    }


    // Obtener el elemento div por su ID
    const DivCoor: HTMLElement | null = document.getElementById('CoordenadasDiv');
    if (DivCoor) {
      DivCoor.style.height = altura + 'px';
      DivCoor.style.overflow = "auto";
    }
  }
  //#endregion MapaRutaPoligono



  //#region VariablesGrupoMilla
  ListaGruposMilla() {

    this.ArrayGruposMilla = [];

    this.sevicesmilla.ConsultaTransportesCreados('1', this.IdGrugo_).subscribe(Respu => {
      this.NombreGrupo = Respu[0].NombreGrupo;
      this.ValorGrupo = Respu[0].ValorFlete;
      this.IdGrupo_ = Respu[0].IdGrupoMilla;
      this.ListaEntregasTransporte();
    });
  }
  ListaEntregasTransporte() {
    this.sevicesmilla.ConsEntregasTransporte('1', this.IdGrugo_).subscribe(Respu => {
      this.ArrayGruposMilla = Respu;
    });
  }
  //ModOrden
  drop(event: CdkDragDrop<string[]>, ArrayEntregas: any) {
    moveItemInArray(ArrayEntregas, event.previousIndex, event.currentIndex);
    var cadenaOrden: string = "";
    for (var i = 0; i < ArrayEntregas.length; i++) {
      cadenaOrden += ArrayEntregas[i].IdCarro + "-" + (i + 1) + "|";
    }

    const orden = {
      CadenaOrden: cadenaOrden,
      IdGrupo: this.IdGrugo_
    }
    this.sevicesmilla.OrdenEntregas('1', orden).subscribe(Resultado => {
      var auxrespuorden = Resultado.split("|");
      if (auxrespuorden.length > 1) {
        if (Number(auxrespuorden[0]) > 0) {
          this.ArrayPinsRutaGenerada = [];

          this.sevicesmilla.ConsEntregasTransporte('1', this.IdGrugo_).subscribe(RespuPins => {
            this.ArrayPinsRutaGenerada = RespuPins;
            this.LimpiaMapsEntregas();
            this.ListaGruposMilla();
            this.AgregarSitiosRutaEntregas();
            this.AgregaPolilineasRuta();
          });
        } else {
          this.MesajeModal = "No fue posible realizar la acción, por favor válida el orden que estás ingresando e intenta nuevamente (Orden (2))";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      } else {
        this.MesajeModal = "No fue posible realizar la acción, por favor válida el orden que estás ingresando e intenta nuevamente (Orden (1))";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    });
  }

  AbreModalConfirmacionModEntrega(item: any, templateConfirmacionElimina: any) {
    console.log(item)
    this.ItemEliminacion = item;
    this.modalService.open(templateConfirmacionElimina, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  EliminaEntrega(item: any) {
    const body = {
      IdGrupo: item.IdGrupo,
      IdCarro: item.IdCarro
    }
    this.sevicesmilla.ModEntrega('4', body).subscribe(Respu => {
      var auxrespu = Respu.split("|");
      if (Number(auxrespu[0]) > 0) {
        this.MesajeModal = "La entrega de " + item.NombrePersona + " se elimino exitosamente";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });

        this.sevicesmilla.ConsEntregasTransporte('1', this.IdGrugo_).subscribe(RespuPins => {
          this.ArrayPinsRutaGenerada = RespuPins;
          this.LimpiaMapsEntregas();
          this.ListaGruposMilla();
          this.AgregarSitiosRutaEntregas();
          this.AgregaPolilineasRuta();
        });
      } else {
        this.MesajeModal = "No fue posible eliminar la entrega de " + item.NombrePersona + " comunicate con soporte";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    });
  }


  ItemVerInfo: any = null;
  AbreModalInfoCompra(item: any, templateDetalleEntrega: any) {
    this.ItemVerInfo = item;
    this.modalService.open(templateDetalleEntrega, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }



  AgregaCompraAGrupo(IdCarr: string) {
    if (IdCarr != null && IdCarr != undefined && IdCarr != '0') {
      const body = {
        IdGrupo: this.IdGrugo_,
        IdCarro: IdCarr
      }
      this.sevicesmilla.ModEntrega('3', body).subscribe(Respu => {
        var auxrespu = Respu.split("|");
        if (Number(auxrespu[0]) > 0) {
          this.IdEntregaAgrega_ = "";
          this.MesajeModal = "La entrega se agrego exitosamente";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });

          this.ArrayPinsRutaGenerada = [];

          this.sevicesmilla.ConsEntregasTransporte('1', this.IdGrugo_).subscribe(RespuPins => {
            this.ArrayPinsRutaGenerada = RespuPins;
            this.LimpiaMapsEntregas();
            this.ListaGruposMilla();
            this.AgregarSitiosRutaEntregas();
            this.AgregaPolilineasRuta();
          });
        } else {
          this.MesajeModal = auxrespu[1];
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      });
    } else {
      this.MesajeModal = "No fue posible agregar la entrega comunicate con soporte";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }
  //#endregion VariablesGrupoMilla



  //#region CreaTransporteManual
  CambiaEstadoProcesoManual() {
    this.IdEstadoProcesoCreaTransporteManual = "1";
    this.IdEstadoProceso = "5";
  }
  CancelarCreacionTransportemanual() {
    this.IdEstadoProceso = '0';
  }
  CreaTransporteManual() {

    if (this.NombreBodega != "" && Number(this.ValorFlete) >= 0 && this.FechaEntrega != "" && this.UbicacionEntrega != "" && this.IdentificadorIdCarr_ != "") {
      const body = {
        IdGrupoMilla: 0,
        ValorFlete: Number(this.ValorFlete),
        FechaEntrega: this.FechaEntrega,
        UbicacionEntrega: this.UbicacionEntrega,
        UbicacionRecoge: this.NombreBodega,
        Id_carrosManual: this.IdentificadorIdCarr_
      }
      this.sevicesmilla.CreaTransporteEntrega('6', body).subscribe(Resultado => {
        const result = Resultado.split("|");
        if (Number(result[0]) > 0) {
          this.IdGrugo_ = result[0];
          this.ConsultaEntregasGrupo(this.IdGrugo_);
        } else {
          this.MesajeModal = "No fue posible crear el transporte, por favor comuníquese con soporte";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      });
    } else {
      this.MesajeModal = "Por favor, verifique los datos ingresados e inténtente nuevamente.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }
  ConsultaEntregasGrupo(IdGrupo: string) {
    this.sevicesmilla.ConsEntregasTransporte('1', IdGrupo).subscribe(Respu => {
      if (Respu.length > 0) {
        this.ArrayPinsRutaGenerada = Respu;
        this.LimpiaMapsEntregas();
        this.CentramapaRuta({ address: 'Bogotá' + ',' + 'Bogotá' });
        this.IdEstadoProcesoCreaTransporteManual = "2";
        this.ListaGruposMilla();
      } else {
        this.IdEstadoProceso = "0";
        this.MesajeModal = "No tienes entregas disponibles valida tu información";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    });
  }

  AbreModalConfirmacionModEntregaManual(item: any, templateConfirmacionEliminaManual: any) {
    console.log(item)
    this.ItemEliminacion = item;
    this.modalService.open(templateConfirmacionEliminaManual, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  EliminaEntregaManual(item: any) {
    const body = {
      IdGrupo: item.IdGrupo,
      IdCarro: item.IdCarro
    }
    this.sevicesmilla.ModEntrega('4', body).subscribe(Respu => {
      var auxrespu = Respu.split("|");
      if (Number(auxrespu[0]) > 0) {
        this.MesajeModal = "La entrega de " + item.NombrePersona + " se elimino exitosamente";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        this.sevicesmilla.ConsEntregasTransporte('1', this.IdGrugo_).subscribe(RespuPins => {
          this.ArrayPinsRutaGenerada = RespuPins;
          this.LimpiaMapsEntregas();
          this.ListaGruposMilla();
          this.AgregarSitiosRutaEntregas();
          this.AgregaPolilineasRuta();
        });

      } else {
        this.MesajeModal = "No fue posible eliminar la entrega de " + item.NombrePersona + " comunicate con soporte";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    });
  }





  dropTransporteManual(event: CdkDragDrop<string[]>, ArrayEntregas: any) {
    moveItemInArray(ArrayEntregas, event.previousIndex, event.currentIndex);
    var cadenaOrden: string = "";
    for (var i = 0; i < ArrayEntregas.length; i++) {
      cadenaOrden += ArrayEntregas[i].IdCarro + "-" + (i + 1) + "|";
    }

    const orden = {
      CadenaOrden: cadenaOrden,
      IdGrupo: this.IdGrugo_
    }
    this.sevicesmilla.OrdenEntregas('1', orden).subscribe(Resultado => {
      var auxrespuorden = Resultado.split("|");
      if (auxrespuorden.length > 1) {
        if (Number(auxrespuorden[0]) > 0) {
          this.ArrayPinsRutaGenerada = [];
          this.sevicesmilla.ConsEntregasTransporte('1', this.IdGrugo_).subscribe(RespuPins => {
            this.ArrayPinsRutaGenerada = RespuPins;
            this.LimpiaMapsEntregas();
            this.ListaGruposMilla();
            this.AgregarSitiosRutaEntregas();
            this.AgregaPolilineasRuta();
          });
        } else {
          this.MesajeModal = "No fue posible realizar la acción, por favor válida el orden que estás ingresando e intenta nuevamente (Orden (2))";
          this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      } else {
        this.MesajeModal = "No fue posible realizar la acción, por favor válida el orden que estás ingresando e intenta nuevamente (Orden (1))";
        this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      }
    });
  }
  //#endregion CreaTransporteManual
}
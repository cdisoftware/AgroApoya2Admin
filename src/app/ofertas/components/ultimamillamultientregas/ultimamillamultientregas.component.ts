import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-ultimamillamultientregas',
  templateUrl: './ultimamillamultientregas.component.html',
  styleUrls: ['./ultimamillamultientregas.component.css']
})
export class UltimamillamultientregasComponent implements OnInit, AfterViewInit {
  constructor(private modalService: NgbModal, public sevicesmilla: GrupoMillaServices, public sectoresservices: ValorarofertaService) { }

  //#region General
  IdGrugo_: string = "0";
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
  PoliLynes: google.maps.Polyline[] = [];
  infoWindow = new google.maps.InfoWindow();
  ArrayEntregas: any = [];

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
  //#endregion Mapa


  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.ConsultaListas();
  }


  //#region CambioEstadoProceso
  CambioEstadoProceso() {
    if (this.IdEstadoProceso == '0') {
      this.IdEstadoProceso = '1';
    }
  }
  //#endregion CambioEstadoProceso

  //#region General
  ConsultaListas() {
    this.ConsultaBodegas();
    this.ConsultaTransporte();
  }
  //#endregion General



  //#region CreaTransporte

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
    this.NombreBodega = limpia;
    this.Bodega = "";
  }
  //#endregion Bodega

  //#region creaTransporte
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
        this.IdGrugo_ = result[0];
      })


    } else {
      this.MesajeModal = "Por favor, verifique los datos ingresados e inténtente nuevamente.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }
  //#endregion creaTransporte
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
    //Borrar
    this.IniciaMapa();
    this.modalService.dismissAll();
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

  //#region DireccionApi
  DireccionApi() {
    var arrayEntregas = [];
    var arrayDirections: any;

    arrayEntregas = [
      {
        coordenadas: "4.758772067158138, -74.06965737201203"
      },
      {
        coordenadas: "4.702658951909229, -74.04871468534449"
      },
      {
        coordenadas: "4.712581723589741, -74.13317207747914"
      },
      {
        coordenadas: "4.638328602588013, -74.12699226829857"
      }];


    // Calcular y mostrar rutas entre ubicaciones
    for (let i = 0; i < arrayEntregas.length - 1; i++) {
      const start = arrayEntregas[i].coordenadas;
      const end = arrayEntregas[i + 1].coordenadas;

      const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          const directionsRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true, // Esto quitará los marcadores "A" y "B"
          });
          directionsRenderer.setDirections(result);
          directionsRenderer.setMap(this.map);
          this.directionsRenderers.push(directionsRenderer);


          // Personalizar el estilo de la polilínea
          const polylineOptions = {
            strokeColor: '#FF0000', // Color de la línea (rojo)
            strokeOpacity: 0.8,     // Opacidad de la línea (0.0 a 1.0)
            strokeWeight: 4        // Grosor de la línea
          };
          directionsRenderer.setOptions({ polylineOptions });
        }
      });
    }
  }


  LimpiaPolilineas() {
    for (const renderer of this.directionsRenderers) {
      renderer.setMap(null); // Esto elimina la polilínea del mapa
    }
    this.directionsRenderers = []; // Limpia el array
  }
  //#endregion DireccionApi
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
            ID_SCTOR: this.IdSectorMilla_
          }
          this.sevicesmilla.ModificaPoligoCordenada("3", bod).subscribe(Respu => {
            if (auxrespu.length > 0) {
              if (Number(auxrespu[0]) > 0) {
                this.ArrayPolilyneas();
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
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markersMapaRutaPolygon.push(marker);
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
    this.ArrayCoordenadas = [];
    var auxResult = this.CoordenadasMapaRutaPlygon.split("|");
    for (var i = 0; i < auxResult.length - 1; i++) {
      var auxcoor = auxResult[i].split(",");
      this.ArrayCoordenadas.push({Id: i, Latitude: auxcoor[0], Longitude: auxcoor[1]});
    }
    console.log(this.ArrayCoordenadas)
  }

  CerrarModalMapaRutaPolygon() {
    this.VerMapRutaPolygon = false;
    this.NombrePolygonCrear = "";
    this.modalService.dismissAll();
    this.LimpiaMappRutaPoligono();
    this.CoordenadasMapaRutaPlygon = "";
  }
  //#endregion MapaRutaPoligono

}
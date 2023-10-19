import { Component, OnInit, ViewChild } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { ReporteService } from 'src/app/core/reporte.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-admin-ult-milla',
  templateUrl: './admin-ult-milla.component.html',
  styleUrls: ['./admin-ult-milla.component.css']
})
export class AdminUltMillaComponent implements OnInit {

  @ViewChild('ModalMensaje', { static: false }) ModalMensaje: any;

  UrlImagenes: string = '';
  MesajeModal: string = '';
  banderaModalConfirmacion: string = '0';//Bandera 1 actualiza precio de ruta, 2 elimina entrega de ruta, 3 elimina grupo

  //Filtros
  Oferta: string = '';
  DataOfertas: any = [];
  KeywordOferta: string = '';
  SelectOferta: string = '0';
  UsuCod: string = '';

  Sector: string = '';
  DataSectores: any = [];
  keywordSec: string = '';
  SectorSelec: string = '';
  DescripcionSector: string = '';

  //TargetaGeneral
  VerTargetaGeneral: boolean = false;
  ArrayTargeneral: any = [];

  //Mapa
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  markerBodega: google.maps.Marker[] = [];
  PoliLynes: google.maps.Polyline[] = [];

  infoWindow = new google.maps.InfoWindow();
  ArrayEntregas: any = [];


  //ArraySelectPin
  ArraySelectPin: any = [];
  NomreGrupoMilla: string = '';
  SelectPin: boolean = false;
  VerBtnAgregarGrupo: boolean = false;

  verGrupo: boolean;

  IdGrupoMilla: string = '';
  NombreCliente: string = '';
  CantidadCompraCliente: string = '';
  AdicionalesSelectPin: string = '';

  //ArrayGrupos
  ArrayGrupos: any = [];
  ArrayPartGrupos: any = [];


  //Array Entrega
  ArrayEntrega: any = [];
  AcumPeso: number = 0;

  //Eliminar entregas de ruta ultima milla
  ArrayElimina: any = [];

  //Agregar entrega a ruta
  ArrayAgregaEntrega: any = [];

  //ArrayDetalle
  ArrayDetalleEntrega: any = [];

  //Informacion uber
  ArrayInfoUber: any = [];

  //Polilineas
  latbodega: number;
  longbodega: number;
  ArrayColors: any = [];

  //#region CerrarViajeUltimaMilla
  //Ofertas
  ArrayOfertasPorCerrar: any = [];
  IdOfertaCerrarViaje: string = "0";
  OfertaCerrarViaje: string = "";

  //Secor
  ArraySectorCierraOferta: any = [];
  IdSecorCerrarOferta: string = "0";
  SectorCerrarOferta: string = "";
  //#endregion CerrarViajeUltimaMilla


  //#region VariablesGrupoMilla
  ArrayGruposMilla: any = [];
  //#endregion VariablesGrupoMilla

  //#region MapaRutaEspecifica
  geocoderRuta = new google.maps.Geocoder();
  mapRuta: google.maps.Map;
  markersRuta: google.maps.Marker[] = [];
  markerBodegaRuta: google.maps.Marker[] = [];
  PoliLynesRuta: google.maps.Polyline[] = [];

  ArrayRuta: any = [];
  //#endregion MapaRutaEspecifica

  //#region CambioFechEntrega
  //Ofertas
  ArrayCOfertaCambioFecha: any = [];
  IdOfertaCambioFecha: string = "0";
  OfertaCambioFecha: string = "";

  //Sector
  ArraySectorCambioFecha: any = [];
  IdSecorCambioFecha: string = '0';
  SectorCambioFecha: string = "";


  //Fechas
  ArrayFechas: any = [];
  //#endregion CambioFechEntrega

  constructor(private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService,
    private serviciosreportes: ReporteService,
    private metodosglobales: MetodosglobalesService,
    public cookies: CookieService,
    public rutas: Router,
    public sevicesmilla: GrupoMillaServices) { }

  ngOnInit(): void {
    this.UsuCod = this.cookies.get('IDU');
    this.UrlImagenes = this.metodosglobales.RecuperaRutaImagenes();
    this.ConsCdOfer();
    this.ListaOfertasPorCerrar();

    this.CargarListasCmbioFecha();
  }

  //#region Anterior



  //Metodos filtros
  ConsultaSectores() {
    this.ServiciosValorar.ConsultaSectoresOferta('1', this.SelectOferta).subscribe(ResultCons => {
      this.DataSectores = ResultCons
      this.keywordSec = 'DSCRPCION_SCTOR';
    })
  }
  selectSector(sector: any) {
    this.SectorSelec = sector.ID_SCTOR_OFRTA;
    this.ConsultaInfoOfer();
    this.ConsPins();
    //this.ReiniciaDataRuta();
    this.ListaGruposMilla();

  }
  LimpiaSector(Sector: String) {
    this.SectorSelec = "" + Sector;
    this.SelectPin = false;
    this.VerTargetaGeneral = false;
  }


  ConsCdOfer() {
    this.ServiciosValorar.ConsOferEst('1').subscribe(ResultCons => {
      this.DataOfertas = ResultCons;
      this.KeywordOferta = 'CD_CNSCTVO';
    });
  }
  selectOfer(ofer: any) {
    this.SelectOferta = ofer.CD_CNSCTVO;
    this.ConsultaSectores();
  }
  LimpiaOfert(ofer: String) {
    this.SelectOferta = "" + ofer;
    this.LimpiaSector('0');
    this.Sector = '';
    this.VerTargetaGeneral = false;
    this.SelectPin = false;
  }


  ConsultaInfoOfer() {
    this.ServiciosValorar.ConsInfoOfer('2', this.SelectOferta, this.SectorSelec).subscribe(Resultado => {
      this.ArrayTargeneral = Resultado;


      var coorbodega = this.ArrayTargeneral[0].CoordenadasBodega.split(",");
      this.latbodega = parseFloat(coorbodega[0]);
      this.longbodega = parseFloat(coorbodega[1]);

      this.VerTargetaGeneral = true;
      for (var i = 0; i < this.ArrayTargeneral.length; i++) {
        if (this.ArrayTargeneral[i].DescToppings != null) {
          this.ArrayTargeneral[i].DescToppings = this.ArrayTargeneral[i].DescToppings.replace("|", "<br>");
        }
      }
    })
  }



  //Mapa
  ConsPins() {
    this.verGrupo = true;
    const body = {
      cd_csctvo: this.SelectOferta,
      idSector: this.SectorSelec
    }
    this.ServiciosValorar.ModUltimMillaIni('1', body).subscribe(Resultado => {
      this.ServiciosValorar.ConsPinsUltMilla('1', this.SelectOferta, this.SectorSelec).subscribe(Resultado => {
        this.ArrayEntregas = Resultado;
        this.Centramapa({ address: 'Bogotá' + ',' + 'Bogotá' });
      })
    })
  }
  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: this.latbodega, lng: this.longbodega },
          zoom: 11,
        }
      );
      this.AgregarSitios();

      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }
  AgregarSitios() {
    this.markers = [];


    const features = [];

    this.markerBodega = [];
    var lat: number;
    var long: number;
    var auxEstado = '';


    var marker = new google.maps.Marker({
      title: "Bodega / Punto de partida",
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(this.latbodega, this.longbodega),
      map: this.map,
      icon: "../../../../assets/ImagenesAgroApoya2Adm/ic_bodega.png",
      label: ""
    });
    this.markerBodega.push(marker);
    for (var i = 0; i < this.ArrayEntregas.length; i++) {
      if (this.ArrayEntregas[i].CoordenadasEntrega != null && this.ArrayEntregas[i].CoordenadasEntrega != undefined && this.ArrayEntregas[i].CoordenadasEntrega != '') {
        var auxcoor = this.ArrayEntregas[i].CoordenadasEntrega.split(",");
        lat = parseFloat(auxcoor[0]);
        long = parseFloat(auxcoor[1]);
        if (this.ArrayEntregas[i].GrupoMilla != null) {
          auxEstado = '1';
        } else {
          auxEstado = '2';
        }
        features.push({ position: new google.maps.LatLng(lat, long), NomCli: this.ArrayEntregas[i].NombreCliente, IdGrupoMilla: this.ArrayEntregas[i].GrupoMilla, Estado: auxEstado });
      }
    }

    for (let i = 0; i < features.length; i++) {
      var icon;
      var LabelOption;
      if (features[i].Estado == '1') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/ic_AsignadoAruta.png';
      } else if (features[i].Estado == '2') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Devuelto.png';
      }

      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.map,
        icon: icon,
        zIndex: i,
        label: LabelOption
      });
      this.markers.push(marker);



      const infoWindow = new google.maps.InfoWindow();
      this.markers[i].addListener("click", () => {
        this.InfoWindow(this.markers[i].getZIndex());
      });
    }
    this.PolilimeasDinamicas();
  }
  PesoEntregaIndividual: string = "";
  InfoWindow(i: any) {
    this.infoWindow.close();

    this.NomreGrupoMilla = '' + this.ArrayEntregas[i].NombreGrupoMilla;
    this.IdGrupoMilla = '' + this.ArrayEntregas[i].GrupoMilla;
    this.NombreCliente = '' + this.ArrayEntregas[i].NombreCliente;
    this.CantidadCompraCliente = '' + this.ArrayEntregas[i].UndProd;
    if (this.ArrayEntregas[i].DescToppings != null) {
      this.AdicionalesSelectPin = '' + this.ArrayEntregas[i].DescToppings.replace("|", "<br>");
    } else {
      this.AdicionalesSelectPin = '' + this.ArrayEntregas[i].DescToppings;
    }
    if (this.ArrayEntregas[i].GrupoMilla != null) {
      this.VerBtnAgregarGrupo = false;

    } else {
      this.ArrayAgregaEntrega = this.ArrayEntregas[i];
      this.VerBtnAgregarGrupo = true;
    }

    this.SelectPin = true;

    var NomCliente: string = '' + this.ArrayEntregas[i].NombreCliente;
    var Direccion: string = '' + this.ArrayEntregas[i].DireccionEntrega;
    var Cantidad: string = '' + this.ArrayEntregas[i].UndProd;
    var Peso: string = '' + this.ArrayEntregas[i].PesoTotalCarga;
    this.PesoEntregaIndividual = this.ArrayEntregas[i].PesoTotalCarga;

    const Html =
      //DivSensillo
      '<div id="Ocultar" class="gm-style-iw-d" style="max-height: 287px; max-width: 630px;">' +
      '<div id="content">' +
      '<h1 id="firstHeading" class="firstHeading">' + NomCliente + '</h1>' +
      '<div id="bodyContent">' +
      '<p>' +
      '<b>Dirección: </b>' + Direccion + '' +
      '<br>' +
      '<b>Cantidad: </b>' + Cantidad + ' Unidad(es)' +
      '<br>' +
      '<b>Peso: </b>' + Peso + ' Kilogramos' +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>';



    for (var x = 0; x < this.markers.length; x++) {
      if (i == x) {
        this.infoWindow.close();
        this.infoWindow.setContent(Html);
        this.infoWindow.open(this.markers[i].getMap(), this.markers[i]);
      }
    }
  }



  //Agregar a entrega o transport
  ConsultaGrupos() {
    this.ArrayGrupos = [];
    this.ServiciosValorar.ConsGruposUltimaMilla('1', this.SelectOferta, this.SectorSelec).subscribe(Resultado => {
      for (var i = 0; i < Resultado.length; i++) {
        this.ArrayGrupos.push({
          ID_CNDCTOR: Resultado[i].ID_CNDCTOR,
          IdCiudad: Resultado[i].IdCiudad,
          IdDepa: Resultado[i].IdDepa,
          IdGrupo: Resultado[i].IdGrupo,
          IdRegistro: Resultado[i].IdRegistro,
          IdUltimaMilla: Resultado[i].IdUltimaMilla,
          NMBRE_CNDCTOR: Resultado[i].NMBRE_CNDCTOR,
          NombreGrupo: Resultado[i].NombreGrupo,
          PLCA: Resultado[i].PLCA,
          Regitro: Resultado[i].Regitro,
          ValorTransporte: Resultado[i].ValorTransporte,
          cd_cnctvo: Resultado[i].cd_cnctvo,
          estado: Resultado[i].estado,
          id_sector: Resultado[i].id_sector,
          PesoRuta: 0
        });
      }
      //this.ArrayGrupos = Resultado;
    })
  }









  OpcionModalConfirm(bandera: string) {
    //Bandera 1 actualiza precio de ruta, 2 elimina entrega de ruta, 3 eliminina grupo
    if (bandera == '1') {
      this.ActualizarValorTransporte()
    } else if (bandera == '2') {
      this.ConfirmEliminaGrupo();
    } else if (bandera == '3') {
      this.ElimnarRuta();
    }
  }

  AbreModalConfirmacion(templateQuitaCompra: any, item: any) {
    this.banderaModalConfirmacion = '1';
    this.MesajeModal = '¿Esta seguro de actualizar el precio de la ruta ' + item.NombreGrupo + ' ?';
    this.ArrayElimina = item;
    this.modalService.open(templateQuitaCompra, { ariaLabelledBy: 'modal-basic-title' });
  }
  ActualizarValorTransporte() {
    const body = {
      ValorTrans: this.ArrayElimina.ValorTransporte,
      cd_cnctvo: this.SelectOferta,
      idSector: this.SectorSelec,
      IdGrupo: this.ArrayElimina.IdGrupo
    }
    this.ServiciosValorar.ModValorUberUltMilla('3', body).subscribe(Resultado => {
      this.modalService.dismissAll();
      this.ReiniciaDataRuta();
    })
  }






  AbreModalEliminaDeGrupo(templateQuitaCompra: any, item: any) {
    this.banderaModalConfirmacion = '2';
    this.MesajeModal = '¿Esta seguro de quitar esta compra de la entrega ' + this.NomreGrupoMilla + ' ?';
    this.ArrayElimina = item;
    this.modalService.open(templateQuitaCompra, { ariaLabelledBy: 'modal-basic-title' });
  }
  ConfirmEliminaGrupo() {
    const elimina = {
      IdGrupo: this.ArrayElimina.GrupoMilla,
      IdCarro: this.ArrayElimina.ID_CARRO,
      cd_csctvo: this.SelectOferta,
      IdSector: this.SectorSelec
    }
    this.ServiciosValorar.ModPinMilla('4', elimina).subscribe(Resultado => {
      this.modalService.dismissAll();
      this.ConsPins();
      this.ReiniciaDataRuta();
      var auxrespu = Resultado.split("|");
      this.MesajeModal = auxrespu[1].toString();
      this.modalService.open(this.ModalMensaje, { size: 'sm', centered: true, backdrop: 'static', keyboard: false });
    })
  }



  DetalleCompra(ModalDetalleCompra: any, respu: any) {
    this.ArrayDetalleEntrega = respu;
    this.modalService.open(ModalDetalleCompra, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
  }

  AbreModalInfoUber(templateQuitaCompra: any) {
    this.ServiciosValorar.ConsInfoValUber('1', '261', '401').subscribe(Resultado => {
      this.ArrayInfoUber = Resultado;
      this.modalService.open(templateQuitaCompra, { ariaLabelledBy: 'modal-basic-title' });
    })
  }


  CrearRuta() {
    const body = {
      IdGrupo: 0,
      cd_csctvo: this.SelectOferta,
      IdSector: this.SectorSelec
    }
    this.ServiciosValorar.ModRutasaUltimMilla('3', body).subscribe(Resultado => {
      this.ReiniciaDataRuta();
      var auxrespu = Resultado.split("|");
      this.MesajeModal = auxrespu[1].toString();
      this.modalService.open(this.ModalMensaje, { size: 'sm', centered: true, backdrop: 'static', keyboard: false });
    })
  }

  ConfirmacionElimRuta(templateQuitaCompra: any, item: any) {
    this.banderaModalConfirmacion = '3';
    this.MesajeModal = '¿Esta seguro de eliminar el grupo ' + item.NombreGrupo + ' ?';
    this.ArrayElimina = item;
    this.modalService.open(templateQuitaCompra, { ariaLabelledBy: 'modal-basic-title' });
  }

  ElimnarRuta() {
    const body = {
      IdGrupo: this.ArrayElimina.IdGrupo,
      cd_csctvo: this.SelectOferta,
      IdSector: this.SectorSelec
    }
    this.ServiciosValorar.ModRutasaUltimMilla('4', body).subscribe(Resultado => {
      this.modalService.dismissAll();
      this.ReiniciaDataRuta();
      var auxrespu = Resultado.split("|");
      this.MesajeModal = auxrespu[1].toString();
      this.modalService.open(this.ModalMensaje, { size: 'sm', centered: true, backdrop: 'static', keyboard: false });
    })
  }


  PublicarRuta() {
    var coun: number = 0;
    for (var i = 0; i < this.ArrayEntregas.length; i++) {
      if (this.ArrayEntregas[i].GrupoMilla == null) {
        coun += 1;
        break;
      }
    }

    for (var i = 0; i < this.ArrayGruposMilla.length; i++) {

      if (this.ArrayGruposMilla[i].ValorTransporte != null && this.ArrayGruposMilla[i].ValorTransporte != undefined) {
        if (Number(this.ArrayGruposMilla[i].ValorTransporte) > 0) {

        } else {
          coun += 1;
        }
      } else {
        coun += 1;
      }

      if (this.ArrayEntregas[i].GrupoMilla == null) {
        coun = 1;
        break;
      }
    }


    if (coun == 0) {
      const body = {
        usucodig: this.UsuCod,
        cnctivoOferta: this.SelectOferta,
        descripcion: "Publicada desde la web",
        estado: 16
      }
      this.ServiciosValorar.PublicarOferta("3", body).subscribe(Respu => {
        var auxrespu = Respu.split("|");
        if (auxrespu[0] == '1') {
          this.rutas.navigateByUrl('home/transultimamilla/' + this.SelectOferta + '/' + this.SectorSelec);
        }
        this.MesajeModal = auxrespu[1];
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      })
    } else {
      this.MesajeModal = 'No puedes publicar las rutas debido a que tienes entrega(s) no asignadas a una ruta o el valor del transporte no es válido.';
      this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
    }
  }










  PolilimeasDinamicas() {
    const ArrayGeneralPoly = [];
    var lat: number;
    var long: number;
    for (var i = 0; i < this.ArrayPartGrupos.length; i++) {
      if (this.ArrayPartGrupos[i].GrupoMilla != null) {
        var auxcoor = this.ArrayPartGrupos[i].CoordenadasEntrega.split(",");
        lat = parseFloat(auxcoor[0]);
        long = parseFloat(auxcoor[1]);
        ArrayGeneralPoly.push({ GrupoMilla: this.ArrayPartGrupos[i].GrupoMilla, lat: lat, lng: long });
      }
    }
    let ArrayPoliFin: any[] = new Array(ArrayGeneralPoly.length); // Definir un array delas posiciones utilizables
    var numposition: number = 0;
    const IdRuta: string | any[] = [];
    for (var i = 0; i < ArrayGeneralPoly.length; i++) {
      if (IdRuta.includes(ArrayGeneralPoly[i].GrupoMilla) == true) {
        for (var f = 0; f < IdRuta.length; f++) {
          if (IdRuta[f] == ArrayGeneralPoly[i].GrupoMilla) {
            ArrayPoliFin[f].push(ArrayGeneralPoly[i]);
          }
        }
      } else {
        IdRuta.push(ArrayGeneralPoly[i].GrupoMilla)
        ArrayPoliFin[numposition] = new Array(ArrayGeneralPoly[i]);
        numposition += 1;
      }
    }
    for (var i = 0; i < numposition; i++) {
      var color = this.GenColor();
      console.log(color)
      const Polylines = [];
      this.PoliLynes = [];
      Polylines.push({ lat: this.latbodega, lng: this.longbodega });
      for (var j = 0; j < ArrayPoliFin[i].length; j++) {
        lat = parseFloat(ArrayPoliFin[i][j].lat);
        long = parseFloat(ArrayPoliFin[i][j].lng);
        Polylines.push({ lat: lat, lng: long });
      }
      const flightPath = new google.maps.Polyline({
        path: Polylines,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 3,
      });
      this.PoliLynes.push(flightPath);
      flightPath.setMap(this.map);
    }
    this.ArrayColors = [];
  }

  GenColor() {

    const Colors = ["#1C2833", "#7F8C8D", "#C0392B", "#9B59B6", "#2E86C1", "#D35400", "#7D6608", "#7D3C98", "#172A40", "#000000"];
    var color = "";
    for (var i = 0; i < 10; i++) {
      console.log(this.ArrayColors)
      if (Colors.length <= i) {
        if (this.ArrayColors.includes(Colors[i]) == false) {
          this.ArrayColors.push(Colors[i])
          color = "" + Colors[i];
          break;
        }
      } else {
        color = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
      }
    }
    return color;
  }


  ColorRandom() {

  }
  //#endregion Anterior


  //#region CerrarViajeUltimaMilla
  //Lista ofertas cerradas
  ListaOfertasPorCerrar() {
    this.ServiciosValorar.ConsOferEst('3').subscribe(ResultCons => {
      this.ArrayOfertasPorCerrar = ResultCons;
    });
  }
  LimpiaOfertCerrarViaje(clear: string) {
    this.IdOfertaCerrarViaje = "0";
    this.OfertaCerrarViaje = "";

    this.selectSectorCerrarViaje('0');
  }
  selectOferCerrarViaje(item: any) {
    this.IdOfertaCerrarViaje = item.CD_CNSCTVO;
    this.OfertaCerrarViaje = item.CD_CNSCTVO;

    this.ListaSectoresCerraViaje();
  }


  //Secores
  ListaSectoresCerraViaje() {
    this.ServiciosValorar.ConsultaSectoresOferta('1', this.IdOfertaCerrarViaje).subscribe(ResultCons => {
      this.ArraySectorCierraOferta = ResultCons;
    })
  }
  LimpiaSectorCerrarViaje(clear: string) {
    this.IdSecorCerrarOferta = "0";
    this.SectorCerrarOferta = "";
  }
  selectSectorCerrarViaje(item: any) {
    this.IdSecorCerrarOferta = item.ID_SCTOR_OFRTA;
    this.SectorCerrarOferta = item.DSCRPCION_SCTOR;
  }



  CerrarTransporte(ModalMensaje: any) {
    const body = {
      Estado: "2",
      Cd_cnctivo: this.IdOfertaCerrarViaje,
      Id_Sector: this.IdSecorCerrarOferta,
      Observacion: "0"
    }
    this.ServiciosValorar.modcentregacargabodega('3', body).subscribe(ResultCons => {
      this.MesajeModal = ResultCons;
      this.modalService.open(ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });

      this.LimpiaOfertCerrarViaje('0');
      this.ListaOfertasPorCerrar();
    });
  }
  //#endregion CerrarViajeUltimaMilla


  //#region LimpiaMaps
  LimpiaMaps() {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];

    for (var i = 0; i < this.PoliLynes.length; i++) {
      this.PoliLynes[i].setMap(null);
    }
    this.PoliLynes = [];

    this.ConsPins();
  }
  //#endregion LimpiaMaps


  //#region GrupoMilla

  //Reinicia la data de la ruta arreglos etc...
  ReiniciaDataRuta() {

    this.ConsultaGrupos();
    this.ListaGruposMilla();
  }


  //ListaGrupos
  ListaGruposMilla() {

    this.ArrayGruposMilla = [];

    this.sevicesmilla.ConsultaGruposMilla(this.SectorSelec, this.SelectOferta).subscribe(Respu => {
      for (var i = 0; i < Respu.length; i++) {
        this.ArrayGruposMilla.push({
          IdUltimaMilla: Respu[i].IdUltimaMilla,
          IdGrupo: Respu[i].IdGrupo,
          NombreGrupo: Respu[i].NombreGrupo,
          cd_cnctvo: Respu[i].cd_cnctvo,
          id_sector: Respu[i].id_sector,
          IdConductor: Respu[i].IdConductor,
          Estado: Respu[i].Estado,
          ValorTransporte: Respu[i].ValorTransporte,
          Participantes: []
        });
      }
      this.ConsPartGrupoMilla();
    });
  }
  //ListaGrupoParticipantesgrupo
  ConsPartGrupoMilla() {
    this.ServiciosValorar.ConsParadasRutaUltMilla('1', '0', this.SelectOferta, this.SectorSelec).subscribe(Resultado => {
      for (var y = 0; y < Resultado.length; y++) {
        if (Resultado[y].GrupoMilla != null && Resultado[y].GrupoMilla != '' && Resultado[y].GrupoMilla != 'null') {
          const existe = this.ArrayGruposMilla.findIndex((obj: any) => obj.IdGrupo.toString() === Resultado[y].GrupoMilla.toString());

          if (existe !== -1) {
            this.ArrayGruposMilla[existe].Participantes.push(Resultado[y]);
          } else {
            //alert("No existe");
          }
        }
      }


      this.ArrayPartGrupos = Resultado;
    })


  }


  //Agrega grupo
  CreaGrupoMilla() {
    const body = {
      IdGrupo: 0,
      cd_csctvo: this.SelectOferta,
      IdSector: this.SectorSelec
    }
    this.sevicesmilla.modgrupoMilla('3', body).subscribe(RespuMod => {
      var auxrespu = RespuMod.split("|");
      if (auxrespu.length > 1) {
        this.ListaGruposMilla();

        this.MesajeModal = auxrespu[1].toString();
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      } else {
        this.MesajeModal = auxrespu[0].toString();
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      }
    });
  }

  //Elimina grupo
  EliminaGrupoMilla(item: any) {
    const body = {
      IdGrupo: item.IdGrupo,
      cd_csctvo: this.SelectOferta,
      IdSector: this.SectorSelec
    }
    this.sevicesmilla.modgrupoMilla('4', body).subscribe(RespuMod => {
      var auxrespu = RespuMod.split("|");
      if (auxrespu.length > 1) {
        this.ListaGruposMilla();

        this.MesajeModal = auxrespu[1].toString();
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      } else {
        this.MesajeModal = auxrespu[0].toString();
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      }
    });
  }
  //#endregion GrupoMilla


  //#region ParticiantesMilla
  //ModOrden
  drop(event: CdkDragDrop<string[]>, Participantes: any, IdGrup: string) {
    moveItemInArray(Participantes, event.previousIndex, event.currentIndex);
    var cadenaOrden: string = "";
    for (var i = 0; i < Participantes.length; i++) {
      cadenaOrden += Participantes[i].ID_CARRO + "-" + (i + 1) + "|";
    }


    const orden = {
      CadenaOrden: cadenaOrden,
      IdGrupo: IdGrup,
      Cd_cnsctivo: this.SelectOferta,
      IdSector: this.SectorSelec
    }
    this.sevicesmilla.ModificaOrdenEntregas('1', orden).subscribe(Resultado => {
      this.VerBtnAgregarGrupo = false;
      this.SelectPin = false;
      this.ListaGruposMilla();
      this.LimpiaMaps();
    });
  }

  EliminaParticipanteGrupoMilla(item: any) {
    const body = {
      IdGrupo: item.GrupoMilla,
      IdCarro: item.ID_CARRO,
      cd_csctvo: this.SelectOferta,
      IdSector: this.SectorSelec
    }
    this.sevicesmilla.modpinmilla('4', body).subscribe(RespuMod => {
      var auxrespu = RespuMod.split("|");
      if (auxrespu.length > 1) {
        this.ListaGruposMilla();
        this.LimpiaMaps();

        this.MesajeModal = auxrespu[1].toString();
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      } else {
        this.MesajeModal = auxrespu[0].toString();
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      }
    });
  }


  AbreModalGrupos(ModalRutasUltMilla: any) {
    this.modalService.open(ModalRutasUltMilla, { ariaLabelledBy: 'modal-basic-title' });
  }
  AgregaComprasAruta(respugrupo: any) {
    const agregar = {
      IdGrupo: respugrupo.IdGrupo,
      IdCarro: this.ArrayAgregaEntrega.ID_CARRO,
      cd_csctvo: this.ArrayAgregaEntrega.CD_CNSCTVO,
      IdSector: this.ArrayAgregaEntrega.IdSector
    }
    this.sevicesmilla.modpinmilla('3', agregar).subscribe(Resultado => {
      this.modalService.dismissAll();
      var auxrespu = Resultado.split("|");
      if (auxrespu.length > 1) {
        this.ListaGruposMilla();
        this.LimpiaMaps();
        this.VerBtnAgregarGrupo = false;
        this.SelectPin = false;
        this.MesajeModal = auxrespu[1].toString();
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      } else {
        this.MesajeModal = auxrespu[0].toString();
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      }
    })
  }
  //#endregion ParticiantesMilla


  //#region MapaRutaEspecifica
  ModalMapaRutaEspecifica(ModalRuta: any, paerticipantes: any) {
    this.ArrayRuta = paerticipantes;
    this.modalService.open(ModalRuta, { size: 'xl', centered: true, backdrop: 'static', keyboard: false });
    this.CentramapaRuta({ address: 'Bogotá' + ',' + 'Bogotá' });
  }


  CentramapaRuta(request: google.maps.GeocoderRequest): void {
    this.geocoderRuta.geocode(request).then((result) => {
      const { results } = result;
      this.mapRuta = new google.maps.Map(
        document.getElementById("mapRuta") as HTMLElement,
        {
          center: { lat: this.latbodega, lng: this.longbodega },
          zoom: 11,
        }
      );
      this.AgregarSitiosRuta();

      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }
  AgregarSitiosRuta() {
    this.markers = [];


    const features = [];

    this.markerBodega = [];
    var lat: number;
    var long: number;


    var marker = new google.maps.Marker({
      title: "Bodega / Punto de partida",
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(this.latbodega, this.longbodega),
      map: this.mapRuta,
      icon: "../../../../assets/ImagenesAgroApoya2Adm/ic_bodega.png",
      label: ""
    });
    this.markerBodega.push(marker);


    for (var i = 0; i < this.ArrayRuta.length; i++) {
      if (this.ArrayRuta[i].CoordenadasEntrega != null && this.ArrayRuta[i].CoordenadasEntrega != undefined && this.ArrayRuta[i].CoordenadasEntrega != '') {
        var auxcoor = this.ArrayRuta[i].CoordenadasEntrega.split(",");
        lat = parseFloat(auxcoor[0]);
        long = parseFloat(auxcoor[1]);
        features.push({ position: new google.maps.LatLng(lat, long), NomCli: this.ArrayRuta[i].NombreCliente, IdGrupoMilla: this.ArrayRuta[i].GrupoMilla });
      }
    }

    for (let i = 0; i < features.length; i++) {

      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.mapRuta,
        icon: '../../../../assets/ImagenesAgroApoya2Adm/ic_AsignadoAruta.png',
        zIndex: i,
        label: ''
      });
      this.markers.push(marker);
    }
    this.AgregaPolilineasRuta();
  }

  AgregaPolilineasRuta() {
    var lat: number;
    var long: number;
    const Polylines = [];
    this.PoliLynes = [];
    Polylines.push({ lat: this.latbodega, lng: this.longbodega });
    for (var j = 0; j < this.ArrayRuta.length; j++) {
      var auxcoor = this.ArrayRuta[j].CoordenadasEntrega.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      Polylines.push({ lat: lat, lng: long });
    }
    const flightPath = new google.maps.Polyline({
      path: Polylines,
      geodesic: true,
      strokeColor: '#E74C3C',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    this.PoliLynes.push(flightPath);
    flightPath.setMap(this.mapRuta);
  }
  //#endregion MapaRutaEspecifica


  //#region CambioFechEntrega

  CargarListasCmbioFecha() {
    this.ListaOfertasCambioFecha();
  }

  //Lista ofertas cerradas
  ListaOfertasCambioFecha() {
    this.ServiciosValorar.ConsOferEst('1').subscribe(ResultCons => {
      this.ArrayCOfertaCambioFecha = ResultCons;
    });
  }
  LimpiaOfertCambioFecha(clear: string) {
    this.IdOfertaCambioFecha = "0";
    this.OfertaCambioFecha = "";

    this.LimpiaSectorCambioFecha('0');
  }
  selectOferCambioFecha(item: any) {
    this.IdOfertaCambioFecha = item.CD_CNSCTVO;
    this.OfertaCambioFecha = item.CD_CNSCTVO;

    this.ListaSectoresCambioFecha();
  }


  //Secores
  ListaSectoresCambioFecha() {
    this.ServiciosValorar.ConsultaSectoresOferta('1', this.IdOfertaCambioFecha).subscribe(ResultCons => {
      this.ArraySectorCambioFecha = ResultCons;
    })
  }
  LimpiaSectorCambioFecha(clear: string) {
    this.IdSecorCambioFecha = "0";
    this.SectorCambioFecha = "";
  }
  selectSectorCambioFecha(item: any) {
    this.IdSecorCambioFecha = item.ID_SCTOR_OFRTA;
    this.SectorCambioFecha = item.DSCRPCION_SCTOR;

    this.CargarListaFechas();
  }


  CargarListaFechas() {
    this.sevicesmilla.ConsultaTransportes(this.IdOfertaCambioFecha, this.IdSecorCambioFecha).subscribe(ResultCons => {
      this.ArrayFechas = ResultCons;
      alert(ResultCons.length)
    });
  }


  ActualizaFecha(item: any) {
    const body = {
      Cd_cnsctivo: this.IdOfertaCambioFecha,
      IdSecotor: this.IdSecorCambioFecha,
      IdGrupo: item.IdGrupo,
      FechaActualizar: item.FechaActual
    }

    this.sevicesmilla.ModificaFechaEntrega('1', body).subscribe(ResultCons => {
      this.CargarListaFechas();
    });
  }
  //#endregion CambioFechEntrega

}
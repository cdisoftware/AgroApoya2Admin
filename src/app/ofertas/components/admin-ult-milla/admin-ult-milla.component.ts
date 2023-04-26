import { Component, OnInit, ViewChild } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { ReporteService } from 'src/app/core/reporte.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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


  constructor(private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService,
    private serviciosreportes: ReporteService,
    private metodosglobales: MetodosglobalesService,
    public cookies: CookieService,
    public rutas: Router) { }

  ngOnInit(): void {
    this.UsuCod = this.cookies.get('IDU');
    this.UrlImagenes = this.metodosglobales.RecuperaRutaImagenes();
    this.ConsCdOfer();
  }

  //Reinicia la data de la ruta arreglos etc...
  ReiniciaDataRuta() {

    this.ConsultaGrupos();
    this.ConsPartGrupoMilla('0');
  }



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
    this.ReiniciaDataRuta();

  }
  LimpiaSector(Sector: String) {
    this.SectorSelec = "" + Sector;
    this.SelectPin = false;
  }


  ConsCdOfer() {
    this.ServiciosValorar.ConsOferEst('1').subscribe(ResultCons => {
      this.DataOfertas = ResultCons;
      this.KeywordOferta = 'CD_CNSCTVO';
    })
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
  PesoRuta(IdGrupo: string) {
    this.AcumPeso = 0;
    for (var i = 0; i < this.ArrayPartGrupos.length; i++) {

      this.AcumPeso += parseFloat(this.ArrayPartGrupos[i].PesoTotalCarga);
    }
  }
  ConsultaGrupos() {
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

  ConsPartGrupoMilla(IdGrupo: string) {
    this.ServiciosValorar.ConsParadasRutaUltMilla('1', '0', this.SelectOferta, this.SectorSelec).subscribe(Resultado => {
      const IdRuta: string | any[] = [];
      const RutaPeso: string | any[] = [];
      for (var f = 0; f < Resultado.length; f++) {
        if (IdRuta.includes(Resultado[f].GrupoMilla) == true) {
          for (var i = 0; i < IdRuta.length; i++) {
            if (IdRuta[i] == Resultado[f].GrupoMilla) {
              RutaPeso[i].PesoKg = parseInt(RutaPeso[i].PesoKg) + parseInt(Resultado[f].PesoTotalCarga);
            }
          }
        } else {
          IdRuta.push(Resultado[f].GrupoMilla)
          RutaPeso.push({ IdRuta: Resultado[f].GrupoMilla, PesoKg: Resultado[f].PesoTotalCarga })
        }
      }
      for (var k = 0; k < this.ArrayGrupos.length; k++) {
        for (var t = 0; t < RutaPeso.length; t++) {
          if (RutaPeso[t].IdRuta == this.ArrayGrupos[k].IdGrupo) {
            this.ArrayGrupos[k].PesoRuta = RutaPeso[t].PesoKg;
          }
        }
      }
      this.ArrayPartGrupos = Resultado;
      this.PesoRuta(IdGrupo);
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
    this.MesajeModal = '¿Esta seguro de actualizar el precio de la ruta ' + this.NomreGrupoMilla + ' ?';
    this.ArrayElimina = item;
    this.modalService.open(templateQuitaCompra, { ariaLabelledBy: 'modal-basic-title' });
  }
  ActualizarValorTransporte() {
    const body = {
      ValorTrans: this.ArrayElimina.ValorTransporte,
      cd_cnctvo: this.ArrayElimina.cd_cnctvo,
      idSector: this.ArrayElimina.id_sector,
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
    this.ServiciosValorar.ModPinMilla('3', agregar).subscribe(Resultado => {
      this.modalService.dismissAll();
      this.ConsPins();
      this.PesoRuta(respugrupo.IdGrupo);
      this.ReiniciaDataRuta();
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
      this.MesajeModal = 'No puedes publicar las rutas debido a que tienes entrega(s) no asignadas a una ruta.';
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
      const Polylines = [];
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
      flightPath.setMap(this.map);
    }
  }

  GenColor() {
    var color = "";
    for (var i = 0; i < 3; i++) {
      var sub = Math.floor(Math.random() * 256).toString(16);
      this.ArrayColors.push(color)
      for (var j = 0; 1 < 10; j++) {
        if (this.ArrayColors.includes(sub) == false && sub != 'ff') {
          this.ArrayColors.push(color)
          break;
        }
      }
      color += (sub.length == 1 ? "0" + sub : sub);
    }
    console.log("#" + color)
    return "#" + color;
  }
}

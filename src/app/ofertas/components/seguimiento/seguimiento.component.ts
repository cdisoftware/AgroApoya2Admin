import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {
  @ViewChild('ModalMensaje', { static: false }) ModalMensaje: any;

  selecsector: string = '0'
  selectConductor : string = '0'
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
  infoWindow = new google.maps.InfoWindow();

  //Buscar
  ArrayConsultaSeg: any = [];

  //Mensaje
  Mensaje: string = '';
  TituloModal: string = "AgroApoya2";




  //VariablesFiltro Oferta
  ArrayOferta: any = [];
  keywordOferta: string = '';
  SelectorOferta: string = '0';
  Oferta: string = '';

  //VariablesFiltro Oferta
  ArraySector: any = [];
  keywordSector: string = '';
  SelectorSector: string = '';
  Sector: string = '';

  //Tarjeta Transportista
  ArrayConductor: any = [];
  ArrayDetalle: any = [];
  ArrayVentas: any = [];
  ArrayConductores: any = [];
  ImgEvidencia: string = '';
  keywordConductor: string = 'NOMBRE'
  ConductorSelect: string = '0';
  ArrayReporte: any = [];
  CadenaGrafica: string = '';
  colorSchemeTort: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["#31C231", "#FAA432", "#F02C29", "#AAAAAA"]
  };
  viewBar: [number, number] = [800, 200];
  ArrayValores: any = [];
  Detalle: string = '';
  Conductor: string = ''


  constructor(
    private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService) { }

  ngOnInit(): void {
    this.ConsultaOferta();
  }

  ConsultaTransportista(idconductor: string, idtransportista: string) {
    this.ServiciosValorar.ConsultaDetalleCond('1', idconductor, idtransportista).subscribe(Resultado => {
      this.ArrayConductor = Resultado
      console.log(Resultado)
    })
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
    this.ServiciosValorar.BusquedaOferta('2', this.SelectorOferta, '0', '0', datosbusqueda).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      this.keywordOferta = 'Producto';
    })
  }
  LimpiaOferta(Valor: string) {
    this.Oferta = Valor;
    this.SelectorOferta = '0';
    this.selecsector = '0'
    this.ValidaInsertSec = '0';
    this.LimpiaSector('');
    this.ArrayConductor = []
  }
  selectOfertaFiltro(item: any) {
    this.SelectorOferta = item.cd_cnsctvo.toString();
    this.selecsector = '1'
    this.ConsultaSectores(item.cd_cnsctvo);
  }

  ConsultaSectores(cd_cnctivo: string) {
    this.ServiciosValorar.ConsultaSectoresOferta('2', cd_cnctivo).subscribe(Resultado => {
      this.ArraySector = Resultado;
      this.keywordSector = 'DSCRPCION_SCTOR';
    })
  }

  LimpiaSector(Valor: string) {
    this.Sector = Valor;
    this.SelectorSector = '';
    this.selecsector = '0';
  }
  LimpiaConductor(){
    this.Conductor = ''
    this.ConductorSelect = '0'
  }

  SelectSector(item: any) {
    this.SelectorSector = item.ID_SCTOR_OFRTA.toString();
    
    this.selecsector = '1'
    this.selectConductor = '1'
    this.ConsultarConductores()
  }

  SelectConductor(item: any){
    this.ConductorSelect = item.CODIGO;
  }





  Buscar(templateRespuesta: any) {
    if (this.SelectorSector == '' && this.SelectorOferta == '0' || this.SelectorSector != '' && this.SelectorOferta == '0' || this.SelectorSector == '' && this.SelectorOferta != '0') {
      this.Respuesta = 'Es necesario que selecciones una oferta y un sector.';
      this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' });
      this.ValidaInsertSec = '0';
    } else {
      const datos = {
        coordernadas: "0"
      }
      //this.ServiciosValorar.ConsultaSeguimiento('1', this.SelectorOferta, this.SelectorSector).subscribe(Resultado => {
      this.ServiciosValorar.ConsultaSeguimientoEntregas('1', this.ConductorSelect, this.SelectorSector, this.SelectorOferta, datos).subscribe(Resultado => {
        console.log(Resultado)
        if (Resultado.length == 0) {
          this.Respuesta = 'No encontramos registros de compras para este sector.';
          this.modalService.open(templateRespuesta, { ariaLabelledBy: 'modal-basic-title' });
          this.ValidaInsertSec = '0';
        } else {
          this.Detalle = '1';
          this.ArrayConsultaSeg = Resultado;

          this.ConsReporteEntregas()
          
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
          zoom: 15,
        }
      );
      this.AgregarMarcador(results[0].geometry.location, this.map);
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

  MostrarMapa(Entrega: any, TemplateMapa: any) {
    this.ValidaInsertSec = '1';
    this.Centramapa({ address: Entrega.COORDENADAS_ENTR })
    this.modalService.open(TemplateMapa, { size: 'md', centered: true });
  }

  MostrarDetalle(Entrega: any, TemplateDetalle: any) {
    console.log(Entrega)
    this.TituloModal = 'Detalle Entregas'
    var IdGrupo = Entrega.IdGrupoMilla
    var IdCarro = Entrega.ID_CARRO
    this.ServiciosValorar.ConsultaDetalleEntregas('1', IdCarro).subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayDetalle = Resultado;
    })
    this.modalService.open(TemplateDetalle, { size: 'md', centered: true });
  }

  MostrarEvidencia(Entrega: any, TemplateImagen: any) {
    this.TituloModal = 'Evidencia Entrega'
    this.ImgEvidencia = Entrega.imagen_evidencia;
    this.modalService.open(TemplateImagen, { size: 'md', centered: true });
  }

  AgregarSitios() {
    const features = [];
    const Polylines = [];
    this.markers = [];
    var lat: number;
    var long: number;

    for (var i = 0; i < this.ArrayConsultaSeg.length; i++) {
      var auxcoor = this.ArrayConsultaSeg[i].COORDENADAS_MAPA.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      features.push({ position: new google.maps.LatLng(lat, long), Estado: this.ArrayConsultaSeg[i].COD_ESTADO_COMPRA, NomCli: this.ArrayConsultaSeg[i].NOMBRE_CLIENTE + ' ' + this.ArrayConsultaSeg[i].APELLIDOS_CLIENTE, IdCompra: this.ArrayConsultaSeg[i].ID_COMPRA });
      Polylines.push({ lat: lat, lng: long });
    }

    for (let i = 0; i < features.length; i++) {
      var icon;
      var LabelOption;
      //alert(features[i].Estado)
      if (features[i].Estado == '1') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Entregado.png';
        // LabelOption = {
        //   text: "" + (i + 1),
        //   color: "#D35400",
        //   fontSize: "15px",
        //   fontWeight: "bold"
        // }
      } else if (features[i].Estado == '2') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Devuelto.png';
      } else if (features[i].Estado == '4') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Pendiente.png';
      } else {
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

    const flightPath = new google.maps.Polyline({
      path: Polylines,
      geodesic: true,
      strokeColor: "#397c97",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    flightPath.setMap(this.map);
  }


  AbreInfoEntrega() {
    this.modalService.dismissAll();
    this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
  }




  InfoWindow(i: any) {

    this.infoWindow.close();
    var NomCliente: string = '' + this.ArrayConsultaSeg[i].NOMBRE_CLIENTE + ' ' + this.ArrayConsultaSeg[i].APELLIDOS_CLIENTE;
    var FechaEntrega: string = '' + this.ArrayConsultaSeg[i].FECHA_ENTREGA;
    var CodigoOferta: string = '' + this.ArrayConsultaSeg[i].COD_OFERTA;
    var Direccion: string = '' + this.ArrayConsultaSeg[i].DIRECCION_CLIENTE;
    var Producto: string = '' + this.ArrayConsultaSeg[i].PRODUCTO;
    var Img: string = '' + this.ArrayConsultaSeg[i].IMAGEN_EVIDENCIA;
    var Pago: string = this.ArrayConsultaSeg[i].DES_TIPOPAGO
    var Telefono: string = '' + this.ArrayConsultaSeg[i].CELULAR_CLIENTE;
    var ComplementoDir: string = '' + this.ArrayConsultaSeg[i].COMPLEMENTO_DIRECCION;
    var Estado: string = '' + this.ArrayConsultaSeg[i].ESTADO_COMPRA;
    var Observaciones: string = '' + this.ArrayConsultaSeg[i].OBSERVACION;
    var Cantidad: string = '' + this.ArrayConsultaSeg[i].UNIDADES_PRODUCTO;

    const Html =
      //Estilos
      '<style>' +
      '#show{' +
      'display: none;' +
      '}' +

      'div#VerOcultar {' +
      ' display:none;' +
      ' padding:0px;' +
      ' width:630px;' +
      ' height:300px;' +
      ' cursor:pointer;' +
      '}' +




      'input#show:checked ~ div#VerOcultar {' +
      ' display:block;' +
      '}' +
      'input#show:checked ~ div#Ocultar {' +
      'display:none;' +
      '}' +
      'input#show:checked ~ div#VerMas {' +
      'display:none;' +
      '}' +
      '</style>' +







      '<input type="radio" id="show" name="group">' +


      //DivSensillo
      '<div id="Ocultar" class="gm-style-iw-d" style="max-height: 287px; max-width: 630px;">' +
      '<div id="content">' +
      '<h1 id="firstHeading" class="firstHeading">' + NomCliente + '</h1>' +
      '<h2 id="firstHeading" class="firstHeading">' + Estado + '</h2>' +
      '<div id="bodyContent">' +
      '<p>' +
      '<b>Fecha Entrega: </b>' + FechaEntrega + '' +
      '<br>' +
      '<b>Codigo Oferta: </b>' + CodigoOferta + '' +
      '<br>' +
      '<b>Metodo de pago: </b>' + Pago + '' +
      '<br>' +
      '<b>Dirección: </b>' + Direccion + '' +
      '<br>' +
      '<b>Producto: </b>' + Producto + '' +
      '<br>' +
      '<b>Cantidad: </b>' + Cantidad + ' Unidad(es)' +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +

      '<label id="VerMas" style="cursor: pointer; color: #397c97;" for="show">' +
      ' 	<span>Ver mas</span>' +
      '</label>' +

      '<div id="VerOcultar">' +
      //Div mas detalles
      '<div class="row col-12" style="overflow: auto; max-height: 320px; width: 630px;">' +
      '<div class="col-sm-12">' +
      '<h1 id="firstHeading" class="firstHeading">' + NomCliente + '</h1>' +
      '<h2 id="firstHeading" class="firstHeading">' + Estado + '</h2>' +
      '</div>' +
      '<hr>' +
      '<div class="col-sm-6">' +
      '<div id="content">' +
      '<div id="bodyContent">' +
      '<p style="font-size: 14px;">' +
      '<b>Dirección: </b> ' + Direccion + '' +
      '<br>' +
      '<b>Complemento dirección: </b>' + ComplementoDir + '' +
      '<br>' +
      '<b>Fecha Entrega: </b>' + FechaEntrega + '' +
      '<br>' +
      '<b>Metodo de pago: </b>' + Pago + '' +
      '<br>' +
      '<b>Codigo Oferta: </b>' + CodigoOferta + '' +
      '<br>' +
      '<b>Producto: </b>' + Producto + '' +
      '<br>' +

      '<b>Cantidad: </b>' + Cantidad + '' +
      '<br>' +

      '<b>Numero de telefono: </b>' + Telefono + '' +
      '<br>' +
      '<b>Estado: </b>' + Estado + '' +
      '<br>' +
      '<b>Observación: </b>' + Observaciones + '' +
      '<br>' +
      '</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="col-sm-6" style="height: 50%;">' +
      '<img src="' + Img + '" style="width: 100%; height:200px; object-fit: cover;">' +
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


  lastPanelId: string = '';
  defaultPanelId: string = "panel2";
  panelShadow($event: NgbPanelChangeEvent, shadow: any) {
    console.log($event);

    const { nextState } = $event;

    const activePanelId = $event.panelId;
    const activePanelElem = document.getElementById(activePanelId);

    if (!shadow.isExpanded(activePanelId)) {
      //activePanelElem.parentElement.classList.add("open");
    }

    if (!this.lastPanelId) this.lastPanelId = this.defaultPanelId;

    if (this.lastPanelId) {
      const lastPanelElem = document.getElementById(this.lastPanelId);

      if (this.lastPanelId === activePanelId && nextState === false)
        activePanelElem?.parentElement?.classList.remove("open");
      else if (this.lastPanelId !== activePanelId && nextState === true) {
        //lastPanelElem.parentElement.classList.remove("open");
      }

    }

    this.lastPanelId = $event.panelId;
  }

  ConsultarConductores(){
    this.ServiciosValorar.ConsultaConductoresAsociados('1', this.SelectorOferta, this.SelectorSector, '2').subscribe(Resultado => {
      this.ArrayConductores = Resultado
      console.log(Resultado)
    })
  }

  ConsReporteEntregas(){
    this.ServiciosValorar.ConsultaReporteEntregas('1',this.SelectorOferta, this.SelectorSector, '58').subscribe(Resultado => {
      this.ArrayReporte = Resultado;
      console.log(Resultado)
      for(var i = 0; this.ArrayReporte.length > i ; i++){
        const fila = {
          "name": this.ArrayReporte[i].PRODUCTO, "series":
          [
            {
              "name":"Entregado",
              "value":this.ArrayReporte[i].CANTIDAD_ENTREGADA 
            },
            {
              "name":"Pendiente",
              "value":this.ArrayReporte[i].CANTIDAD_PENDIENTE 
            },
            {
              "name":"Devuelto",
              "value":this.ArrayReporte[i].CANTIDAD_DEVUELTA 
            }
          ]
        }
        this.ArrayVentas.push(fila)
        const fila2 = {
          "name": this.ArrayReporte[i].PRODUCTO, "series":
          [
            {
              "name":"Recaudado",
              "value":this.ArrayReporte[i].VLR_RECAUDADO 
            },
            {
              "name":"Pendiente",
              "value":this.ArrayReporte[i].VLR_PENDIENTE_RECAUDO 
            },
            {
              "name":"Devuelto",
              "value":this.ArrayReporte[i].VLOR_DEVOLUCION 
            }
          ]
        }
        this.ArrayValores.push(fila2)
      }
    })
  }

  CambioDetalle(Bandera: string) {
    this.Detalle = Bandera;
  }

}

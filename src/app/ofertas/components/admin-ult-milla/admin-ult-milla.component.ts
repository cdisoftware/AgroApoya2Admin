import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { ReporteService } from 'src/app/core/reporte.service';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';

@Component({
  selector: 'app-admin-ult-milla',
  templateUrl: './admin-ult-milla.component.html',
  styleUrls: ['./admin-ult-milla.component.css']
})
export class AdminUltMillaComponent implements OnInit {

  UrlImagenes: string = '';

  //Filtros
  OferFiltro: string = '';
  DataOfertas: any = [];
  KeywordOferta: string = '';
  SelectOferta: string = '0';

  Sector: string = '';
  DataSectores: any = [];
  keywordSec: string = '';
  SectorSelec: string = '';
  DescripcionSector: string = '';


  //Mapa
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  infoWindow = new google.maps.InfoWindow();
  ArrayEntregas: any = [];


  //Agrega compra a entrega
  ArrayCompra: any = [];

  //Array Entrega
  ArrayEntrega: any = [];
  AcumPeso: number = 0;


  constructor(private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService,
    private serviciosreportes: ReporteService,
    private metodosglobales: MetodosglobalesService) { }

  ngOnInit(): void {
    this.UrlImagenes = this.metodosglobales.RecuperaRutaImagenes();
    this.ConsCdOfer();
    this.ConsultaSectores();

    this.Centramapa({ address: 'Bogotá' + ',' + 'Bogotá' });
    this.ConsumeService();


    this.ConsultaInfoOfer();
  }


  //Metodos filtros
  ConsultaSectores() {
    this.ServiciosValorar.ConsultaSectoresOferta('1', '2206').subscribe(ResultCons => {
      this.DataSectores = ResultCons
      this.keywordSec = 'DSCRPCION_SCTOR';
      console.log(ResultCons)
    })
  }
  selectSector(sector: any) {
    this.SectorSelec = sector.SCTOR_OFRTA;
    //this.DescripcionSector = sector.
  }
  LimpiaSector(Sector: String) {
    this.SectorSelec = "" + Sector;
  }


  ConsCdOfer() {
    this.ServiciosValorar.ConsOferEst('1').subscribe(ResultCons => {
      console.log(ResultCons)
      this.DataOfertas = ResultCons;
      this.KeywordOferta = 'CD_CNSCTVO';
    })
  }
  selectOfer(ofer: any) {
    this.SelectOferta = ofer.CD_CNSCTVO;
  }
  LimpiaOfert(ofer: String) {
    this.SelectOferta = "" + ofer;
  }



  //InformacionOferta
  ConsultaInfoOfer() {
    this.ServiciosValorar.ConsInfoOfer('1', '2206', '433').subscribe(Resultado => {
      this.ArrayCompra = Resultado;
      for (var i = 0; i < this.ArrayCompra.length; i++) {
        this.ArrayCompra[i].DescToppings = this.ArrayCompra[i].DescToppings.replace("|", "<br>");
      }
      console.log(Resultado)
    })
  }



  //Mapa
  ConsumeService() {
    this.ServiciosValorar.ConsEntregasConductor('1', '39', '433', '2206', '0').subscribe(Resultado => {
      this.ArrayEntregas = Resultado;
      console.log(Resultado)
    })
  }
  Centramapa(request: google.maps.GeocoderRequest): void {
    var lat: number;
    var long: number;
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 4.700694915619172, lng: -74.07112294318878 },
          zoom: 13,
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
    this.markers = [];
    var lat: number;
    var long: number;
    for (var i = 0; i < this.ArrayEntregas.length; i++) {
      if (this.ArrayEntregas[i].COORDENADAS_ENTR != null && this.ArrayEntregas[i].COORDENADAS_ENTR != undefined && this.ArrayEntregas[i].COORDENADAS_ENTR != '') {
        var auxcoor = this.ArrayEntregas[i].COORDENADAS_ENTR.split(",");
        lat = parseFloat(auxcoor[0]);
        long = parseFloat(auxcoor[1]);
        features.push({ position: new google.maps.LatLng(lat, long), Estado: this.ArrayEntregas[i].DescripcionProducto, NomCli: this.ArrayEntregas[i].NombreCompletoProductor, IdCompra: this.ArrayEntregas[i].IdEstado_Oferta });

      }
    }

    for (let i = 0; i < features.length; i++) {
      var icon;
      var LabelOption;
      if (features[i].Estado == '1') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Entregado.png';
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
  }
  InfoWindow(i: any) {
    this.ArrayCompra = this.ArrayEntregas[i];
    this.infoWindow.close();
    var NomCliente: string = '' + this.ArrayEntregas[i].NOMBRES_PERSONA + ' ' + this.ArrayEntregas[i].APELLIDOS_PERSONA;
    var CodigoOferta: string = '' + this.ArrayEntregas[i].CD_CNSCTVO;
    var Direccion: string = '' + this.ArrayEntregas[i].DRCCION;
    var Producto: string = '' + this.ArrayEntregas[i].Producto_ppal;
    var Cantidad: string = '' + this.ArrayEntregas[i].unidadesEntregar;
    var Peso: string = '' + this.ArrayEntregas[i].peso_prod_ppal;

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
  AgregaItemEntrega(item: any) {
    this.AcumPeso = 0;
    this.ArrayEntrega.push(item);
    for (var i = 0; i < this.ArrayEntrega.length; i++) {
      this.AcumPeso += parseFloat(this.ArrayEntrega[i].peso_prod_ppal);
      //this.AcumPeso += parseInt(this.ArrayEntrega[i].peso_prod_ppal);
    }
  }
}

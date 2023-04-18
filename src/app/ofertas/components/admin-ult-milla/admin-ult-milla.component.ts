import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { ReporteService } from 'src/app/core/reporte.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';

@Component({
  selector: 'app-admin-ult-milla',
  templateUrl: './admin-ult-milla.component.html',
  styleUrls: ['./admin-ult-milla.component.css']
})
export class AdminUltMillaComponent implements OnInit {

  UrlImagenes: string = '';

  //Filtros
  Oferta: string = '';
  DataOfertas: any = [];
  KeywordOferta: string = '';
  SelectOferta: string = '0';

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
  infoWindow = new google.maps.InfoWindow();
  ArrayEntregas: any = [];


  //ArraySelectPin
  ArraySelectPin: any = [];
  NomreGrupoMilla: string = '';
  SelectPin: boolean = false;
  VerBtnAgregarGrupo: boolean = false;
  IdGrupoMilla: string = '';
  NombreCliente: string = '';
  CantidadCompraCliente: string = '';
  AdicionalesSelectPin: string = '';

  //Array Entrega
  ArrayEntrega: any = [];
  AcumPeso: number = 0;

  //Modifica entregas de grupo ultima milla
  ArrayElimina: any = [];


  constructor(private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService,
    private serviciosreportes: ReporteService,
    private metodosglobales: MetodosglobalesService) { }

  ngOnInit(): void {
    this.UrlImagenes = this.metodosglobales.RecuperaRutaImagenes();
    this.ConsCdOfer();
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
    this.Centramapa({ address: 'Bogotá' + ',' + 'Bogotá' });
  }
  LimpiaSector(Sector: String) {
    this.SectorSelec = "" + Sector;
  }


  ConsCdOfer() {
    this.ServiciosValorar.ConsOferEst('1').subscribe(ResultCons => {
      this.DataOfertas = ResultCons;
      this.KeywordOferta = 'Nombre_Producto';
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



  //InformacionOferta
  ConsultaInfoOfer() {
    this.ServiciosValorar.ConsInfoOfer('2', this.SelectOferta, this.SectorSelec).subscribe(Resultado => {
      console.log(this.SelectOferta + '    ' + this.SectorSelec)
      this.ArrayTargeneral = Resultado;
      console.log(this.ArrayTargeneral)
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
    this.ServiciosValorar.ConsPinsUltMilla('1', this.SelectOferta, this.SectorSelec).subscribe(Resultado => {
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
    console.log(this.ArrayEntregas)
    var auxEstado = '';
    for (var i = 0; i < this.ArrayEntregas.length; i++) {
      if (this.ArrayEntregas[i].CoordenadasEntrega != null && this.ArrayEntregas[i].CoordenadasEntrega != undefined && this.ArrayEntregas[i].CoordenadasEntrega != '') {
        var auxcoor = this.ArrayEntregas[i].CoordenadasEntrega.split(",");
        lat = parseFloat(auxcoor[0]);
        long = parseFloat(auxcoor[1]);
        if (this.ArrayEntregas[i].GrupoMilla != null) {
          auxEstado = '1';
        }else{
          auxEstado = '2';
        }

        features.push({ position: new google.maps.LatLng(lat, long), NomCli: this.ArrayEntregas[i].NombreCliente, IdGrupoMilla: this.ArrayEntregas[i].GrupoMilla, Estado: auxEstado });

      }
    }

    for (let i = 0; i < features.length; i++) {
      var icon;
      var LabelOption;
      if (features[i].Estado == '1') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Entregado.png';
      } else if (features[i].Estado == '2') {
        icon = '../../../../assets/ImagenesAgroApoya2Adm/Pendiente.png';
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
      console.log(this.markers.length)


      const infoWindow = new google.maps.InfoWindow();
      this.markers[i].addListener("click", () => {
        this.InfoWindow(this.markers[i].getZIndex());
      });
    }
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
    console.log(this.ArrayEntregas[i].GrupoMilla)
    if(this.ArrayEntregas[i].GrupoMilla != null){
      this.VerBtnAgregarGrupo = false;
    }else{
      this.VerBtnAgregarGrupo = true;
    }
    


    this.SelectPin = true;
    this.PesoRuta();

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
  PesoRuta() {
    this.AcumPeso = 0;
    for (var i = 0; i < this.ArrayEntregas.length; i++) {
      this.AcumPeso += parseFloat(this.ArrayEntregas[i].PesoTotalCarga);
      //this.AcumPeso += parseInt(this.ArrayEntrega[i].peso_prod_ppal);
    }
  }
  ConsultaGrupos(){
    this.ServiciosValorar.ConsGruposUltimaMilla('1', this.SelectOferta, this.SectorSelec).subscribe(Resultado => {
      this.ArrayEntregas = Resultado;
      console.log(Resultado)
    })
  }
  






  AbreModalEliminaDeGrupo(templateQuitaCompra: any, item: any) {
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
    console.log(elimina)
    this.ServiciosValorar.ModPinMilla('4', elimina).subscribe(Resultado => {
      console.log(Resultado)
    })
  }
}

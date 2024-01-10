import { Component, OnInit, ViewChild } from '@angular/core';
import { CrearofertaService } from 'src/app/core/crearoferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-asigna-trans-campo-ciudad',
  templateUrl: './asigna-trans-campo-ciudad.component.html',
  styleUrls: ['./asigna-trans-campo-ciudad.component.css']
})
export class AsignaTransCampoCiudadComponent implements OnInit {

  @ViewChild('ModalMensaje', { static: false }) ModalMensaje: any;

  RespuestaModal: string = '';
  VerOcultarCampos: string = '1';

  ArrayTransportistas: any = [];
  keywordTrans: string = 'NMBRE_CNDCTOR';
  Transportst: string = '';
  IdTransportista: string = '0';

  IdOfertaSeleccion: string = '0';
  arrayOfertas: any = []
  keywordSecOferta: string = 'Producto'
  IdCntivOferta: string = '';

  FechaDesde: string = '';
  FechaHasta: string = '';


  //buscar
  arregloTransportes: any = [];

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



  constructor(private ServiciosOferta: CrearofertaService,
    private modalService: NgbModal,
    private serviciosvaloracion: ValorarofertaService,) { }


  ngOnInit(): void {
    this.ConsultaTransportistas();
    this.ListaOfertas();
    this.ConsultaDepartamentos();
    this.ConsultaCiudad();
  }

  //Region Buscar
  ConsultaTransportistas() {
    this.serviciosvaloracion.ConsultaConductores('2', '0', '0').subscribe(Resultado => {
      this.ArrayTransportistas = Resultado
    })
  }
  selecTrans(item: any) {
    this.IdTransportista = item.ID_CNDCTOR;
  }
  LimpiaTrans(campo: string) {
    this.IdCntivOferta = campo;
  }


  ListaOfertas() {
    const datosbusqueda = {
      UsuCodig: 1,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: '0',
      VigenciaHasta: '0',
      IdEstado_Oferta: '0',
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    this.serviciosvaloracion.BusquedaOferta('7', '0', '0', '0', datosbusqueda).subscribe(Resultado => {
      this.arrayOfertas = Resultado;
    })
  }
  SeleccionarOferta(item: any,) {
    this.IdOfertaSeleccion = item.cd_cnsctvo;
  }
  LimpiarOferta() {
    this.IdCntivOferta = '';
  }

  Buscar(modalBuscar: any) {

    const body = {
      fechaDesde: this.FechaDesde,
      fechaHasta: this.FechaHasta
    }
    this.ServiciosOferta.ConsultaAsignaTransport('1', this.IdOfertaSeleccion, '0', body).subscribe(resultado => {
      console.log(resultado)
      if (resultado.length == 0) {
        this.RespuestaModal = 'No hay resultados.';
        this.modalService.open(this.ModalMensaje, { size: 'md', centered: true, backdrop: 'static', keyboard: false });
      } else {
        this.arregloTransportes = resultado;
        this.modalService.open(modalBuscar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      }
    })
  }

  LimpiarBusqueda() {
    this.VerOcultarCampos = '1';
    this.Transportst = '';
    this.IdCntivOferta = '';
    this.FechaDesde = '';
    this.FechaHasta = '';
  }
  Crear() {
    this.VerOcultarCampos = '2';
  }
  //Fin Region Buscar




  //REGION CREAR ASIGNACION DE TRANSPORTE
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


  Guardar() {
    this.VerOcultarCampos = '3';
  }

  //FIN REGION CREAR ASIGNACION DE TRANSPORTE
}

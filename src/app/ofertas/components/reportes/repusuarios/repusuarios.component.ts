import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { ReporteService } from 'src/app/core/reporte.service';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-repusuarios',
  templateUrl: './repusuarios.component.html',
  styleUrls: ['./repusuarios.component.css']
})
export class RepusuariosComponent implements OnInit {

  constructor(
    private ServicioReporteService:ReporteService,
    private ModalService:NgbModal,
    public cookies:CookieService) { } 
  
  // Variables Ejecucion Reportes Por Ambiente de Trabajo
  ServidorReportesDesa: string = 'http://192.168.3.185:8080/ReportesServidor';
  PathReportesDesa: string = 'ServidorInformesAgroApoya2/ReporteUsuariosRegistrados'
  ServidorReportesProd: string = 'https://api.apptotrip.com/ReportesServidor';
  PathReportesProd: string = 'ServidorInformesAgroApoya2Prod/ReporteUsuariosRegistrados';


  IdUsuarioCooki:string = '';
  RespuestaModal:string = '';


  // Variables Lista desplegable
  DataLocalidades: any  = [];
  KeyWordLocalidad: string = '';
  SelectorLocalidades: string = '';

  // Variables Formulario
  NombreUsuario: string = '';
  NumeroUsuario: string = '';
  EmailUsuario: string = '';
  LocalidadUsuario: string = '';
  FechaRegistroUsuario: string = '';
  ComprasUsuario: string = '';
  UsuariosRegistrados: any = [];
  MostrarGrilla:boolean = false;
  MostrarGenerarGrilla:boolean = true;
  NumeroResgistros: number = 0;

  // Variables Reporte
  reportServer: string = '';
  reportUrl: string = '';
  showParameters: string = '';
  parameters: any = {};
  toolbar: string = '';
  MostrarReporte:boolean = false;
  MostrarGenerarReporte:boolean = false;



  ngOnInit(): void {
    this.IdUsuarioCooki = this.cookies.get('IDU');
    this.CargarListasDesplegables();
  }

  CargarListasDesplegables() {
    this.ListaDespegableLocalidades();
  }

  ListaDespegableLocalidades() {
    this.ServicioReporteService.ListaLocalidades('1').subscribe(ResultadoLista =>{
      this.DataLocalidades = ResultadoLista;
      this.KeyWordLocalidad = 'dscrpcion_sctor';
    })
  }

  SelectListaLocalidades (sector: any) {
    this.SelectorLocalidades = sector.sctor_ofrta;
  }

  LimpiarListaLocalidades(Localidades: String){
    this.SelectorLocalidades = "" + Localidades;
  }

  CargarGrilla(ModalUsuariosInfo:any) {
    this.MostrarGrilla = false;
    this.MostrarReporte = false;

    let auxNombreUsuario: string = '';
    let auxNumeroUsuario: string = '';
    let auxEmailUsuario: string = '';
    let auxLocalidadUsuario: string = '';
    let auxFechaRegistroUsuario: string = '';
    let auxComprasUsuario: number = 0;

    if (this.NombreUsuario == '') {
      auxNombreUsuario = '0';
    } else {
      auxNombreUsuario = this.NombreUsuario;
    }

    if (this.NumeroUsuario == '') {
      auxNumeroUsuario = '0';
    } else {
      auxNumeroUsuario = this.NumeroUsuario;
    }

    if (this.EmailUsuario == '') {
      auxEmailUsuario = '0';
    } else {
      auxEmailUsuario = this.EmailUsuario;
    }

    if (this.SelectorLocalidades == '') {
      auxLocalidadUsuario = '0';
    } else {
      auxLocalidadUsuario = this.SelectorLocalidades;
    }

    if (this.FechaRegistroUsuario == '') {
      auxFechaRegistroUsuario = '0';
    } else {
      auxFechaRegistroUsuario = this.FechaRegistroUsuario;
    }

    if (this.ComprasUsuario == '') {
      auxComprasUsuario = 0;
    } else {
      auxComprasUsuario = Number(this.ComprasUsuario);
    }

    const body = {
      NombrePersona: auxNombreUsuario,
      CelularPersona: auxNumeroUsuario,
      CorreoPersona: auxEmailUsuario,
      FechaCreacion: auxFechaRegistroUsuario,
      NumCompras: auxComprasUsuario
    }

    this.ServicioReporteService.UsuariosRegistrados('1', auxLocalidadUsuario, body).subscribe(ResultadoUsuarios =>{      
      this.UsuariosRegistrados = ResultadoUsuarios;
      if (this.UsuariosRegistrados.length > 0) {
        this.NumeroResgistros = this.UsuariosRegistrados.length;
        this.MostrarGrilla = true;
        this.MostrarGenerarReporte = true;
      } else {
        this.RespuestaModal = 'No existen registros de acuerdo a los parámetros de búsqueda ingresados.';
        this.ModalService.open(ModalUsuariosInfo, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        this.MostrarGrilla = false;
      }
    })
  }

  GenerarReporte(){
    this.MostrarGrilla = false;
    let auxNombreUsuario: string = '';
    let auxNumeroUsuario: number = 0;
    let auxEmailUsuario: string = '';
    let auxLocalidadUsuario: string = '';
    let auxFechaRegistroUsuario: string = '';
    let auxComprasUsuario: number = 0;

    if (this.NombreUsuario == '') {
      auxNombreUsuario = '0';
    } else {
      auxNombreUsuario = this.NombreUsuario;
    }

    if (this.NumeroUsuario == '') {
      auxNumeroUsuario = 0;
    } else {
      auxNumeroUsuario = Number(this.NumeroUsuario);
    }

    if (this.EmailUsuario == '') {
      auxEmailUsuario = "0";
    } else {
      auxEmailUsuario = this.EmailUsuario;
    }

    if (this.SelectorLocalidades == '') {
      auxLocalidadUsuario = '0';
    } else {
      auxLocalidadUsuario = this.SelectorLocalidades;
    }

    if (this.FechaRegistroUsuario == '') {
      auxFechaRegistroUsuario = '0';
    } else {
      auxFechaRegistroUsuario = this.FechaRegistroUsuario;
    }

    if (this.ComprasUsuario == '') {
      auxComprasUsuario = 0;
    } else {
      auxComprasUsuario  = Number(this.ComprasUsuario);
    }

    this.reportServer = this.ServidorReportesProd;
    this.reportUrl = this.PathReportesProd;
    this.showParameters = "false";
    this.parameters = {
      "Bandera": '1',
      "NombrePersona": auxNombreUsuario,
      "NumeroTelefono": auxNumeroUsuario,
      "Correo": auxEmailUsuario,
      "IdLocalidad": auxLocalidadUsuario,
      "FechaRegistro": auxFechaRegistroUsuario,
      "NumeroCompras": auxComprasUsuario
    };
    this.toolbar = "true";

    if (this.reportServer != "" && this.reportUrl != "" && this.showParameters != "" && this.parameters != "" && this.toolbar != "") {
      this.MostrarReporte = true;
      this.MostrarGenerarReporte = false;
    }
  }

  BotonLimpiar(){
    this.MostrarReporte = false;
    this.MostrarGenerarReporte = false;
    this.MostrarGrilla = false;
    this.MostrarGenerarGrilla = true;
    this.NombreUsuario = '';
    this.NumeroUsuario = '';
    this.EmailUsuario = '';
    this.LocalidadUsuario = '';
    this.FechaRegistroUsuario = '';
    this.ComprasUsuario = '';
    this.reportUrl = '';
    this.showParameters = '';
    this.parameters = {};
    this.toolbar = '';
  }

}

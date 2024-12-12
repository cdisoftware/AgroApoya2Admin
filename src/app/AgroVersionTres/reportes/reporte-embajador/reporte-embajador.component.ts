import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-reporte-embajador',
  templateUrl: './reporte-embajador.component.html',
  styleUrls: ['./reporte-embajador.component.css']
})
export class ReporteEmbajadorComponent implements OnInit {

  filtroReset: FormGroup;
  mostrarTabla: string = '0'; //por defecto esta oculta , 1--> Muestra, 0--> Oculta
  ListaLocalidad: any = [];
  ListaTabla: any = [];
  ReporteVecinos: any = [];

  FechaInicioEmba: string
  FechaFinEmba: string
  CodigoUsuarioEmba: string
  CorreoEmba: string
  telefonoEmbajador: string
  CodigoUsuarioVecino: string
  CorreoVeci: string
  TelefonoVeci: string
  localidad: string

  Idusuario: any;
  Nombre: any;
  Correo: any;
  Fecharegistro: any;
  CelularPersona: any;
  IdManyChat: any;
  Direccion: any;
  Complementodireccion: any;
  NombreConjunto: any;
  Linkrelacionvecinos: any;
  Numerovecinos: any;
  Fechaincioembajador: any;


  @ViewChild('ModalVecino', { static: false }) ModalVecino: any;
  
  constructor(public ServiciosGenerales: ServiciosService, private fb: FormBuilder, private modalService: NgbModal) {
    this.filtroReset = this.fb.group({
      FechaInicioEmba: [''],
      FechaFinEmba: [''],
      CodigoUsuarioEmba: [''],
      CorreoEmba: [''],
      CodigoUsuarioVecino: [''],
      telefonoEmbajador: [''],
      CorreoVeci: [''],
      TelefonoVeci: [''],
      localidad: ['0']
    });
  }

  ngOnInit(): void {
    this.CargasIniciales();
  }

  CargasIniciales(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(rest => {
      this.ListaLocalidad = rest;
    });
  }

  //Metodos accion botones filtros
  btnBuscar() {
    this.mostrarTabla = '1';
    const body = {
      Fechainicio: "0",
      Fechafin: "0"
    };
    this.ServiciosGenerales.consEmbajadorConjuntosReporte('1', '0', '0', '0', '0', '0', '0', body).subscribe(Rest => {
      this.ListaTabla = Rest;
      console.log(Rest);
    });
  }

  BtnLimpiar(): void {
    this.filtroReset.patchValue({
      FechaInicioEmba: '',
      FechaFinEmba: '',
      CodigoUsuarioEmba: '',
      CorreoEmba: '',
      telefonoEmbajador: '',
      TelefonoVeci: '',
      CodigoUsuarioVecino: '',
      CorreoVeci: '',
      localidad: '0'
    });
    this.mostrarTabla = '0';
  }
  AbrirModal(ListaTabla: any): void{
    this.modalService.open(this.ModalVecino, { ariaLabelledBy: 'modal-basic-title', size: 'xl'})

    this.Idusuario 	= ListaTabla.IdUsuarioEmbajador 
    this.Nombre	= ListaTabla.NombrePersona
    this.Correo	= ListaTabla.CorreoPersona
    this.Fecharegistro	=  ListaTabla.FechaCreacion 
    this.CelularPersona	= ListaTabla.CelularPersona
    this.IdManyChat	= ListaTabla.id_manychat
    this.Direccion	= ListaTabla.DRCCION
    this.Complementodireccion	= ListaTabla.CMPLMNTO_DRRCCION
    this.NombreConjunto	=  ListaTabla.NombreConjunto
    this.Linkrelacionvecinos	= ListaTabla.LinkCortoVecino
    this.Numerovecinos	= ListaTabla.NumeroVecino
    this.Fechaincioembajador = ListaTabla.FechaCreacioncomoEmbajador
    console.log(ListaTabla)

    this.VecinosListas(ListaTabla.IdUsuarioEmbajador);
  }
  
  VecinosListas(UsucodigEmbajador: string): void{
    this.ServiciosGenerales.consEmbajadorVecinosReporte('1', UsucodigEmbajador).subscribe(Rest => {
      this.ReporteVecinos = Rest;
      console.log(Rest);
     },
     (error) => {
      console.error('Error al obtener los datos:', error);
    });
  }
}

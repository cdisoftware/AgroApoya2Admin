import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';

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
  mostrarModal: boolean = false;

  FechaInicioEmba: string
  FechaFinEmba: string
  CodigoUsuarioEmba: string
  CorreoEmba: string
  telefonoEmbajador: string
  CodigoUsuarioVecino: string
  CorreoVeci: string
  TelefonoVeci: string
  localidad: string

  constructor(public ServiciosGenerales: ServiciosService, private fb: FormBuilder) {
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



}

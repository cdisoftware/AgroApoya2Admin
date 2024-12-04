import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service'

@Component({
  selector: 'app-reporte-embajador',
  templateUrl: './reporte-embajador.component.html',
  styleUrls: ['./reporte-embajador.component.css']
})
export class ReporteEmbajadorComponent implements OnInit {

  filtroReset: FormGroup;
  mostraTabla: string = '0'; //por defecto esta oculta , 1--> Muestra, 0--> Oculta
  ListaLocalidad: any = [];

  constructor(public ServiciosGenerales: ServiciosService, private fb: FormBuilder) {

    this.filtroReset = this.fb.group({
      FechaInicioEmba: [''],
      FechaFinEmba: [''],
      CodigoUsuarioEmba: [''],
      CorreoEmba: [''],
      CodigoUsuarioVecino: [''],
      CorreoVeci: [''],
      TelefonoVeci: [''],
      localidad: ['0']
    });
  }

  ngOnInit(): void {
    this.CargasIniciales()
  }

  CargasIniciales(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(rest => {
      this.ListaLocalidad = rest;
    });
  }

  btnBuscar() {
    this.mostraTabla = '1';
    
  }

  // metodos Filtros limpos
  BtnLimpiar(): void {
    this.filtroReset.reset({
      FechaInicioEmba: '',
      FechaFinEmba: '',
      CodigoUsuarioEmba: '',
      CorreoEmba: '',
      TelefonoEmba: '',
      CodigoUsuarioVecino: '',
      CorreoVeci: '',
      TelefonoVeci: '',
      localidad: '0'
    });

    this.mostraTabla = '0';
  }

}

import { Component, OnInit } from '@angular/core';
import {ServiciosService} from 'src/app/AgroVersionTres/core/servicios.service'
import {  FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  // VARIABLES DE FILTROS NUMCOP-LOCALI 
  ComprasFil: any =  []
  LocaliFiltro: any = []
  limpiarFiltros: FormGroup;

  constructor(public ServiciosGenerales: ServiciosService, private fb: FormBuilder ) {
    this.limpiarFiltros = this.fb.group({
      localidad: ['0'], 
      codigoUsuario: [''], 
      correo: [''],
      telefono: [''], 
      nombreApellido: [''], 
      fechaRegistroInicio: [''], 
      numeroCompras: ['0'], 
      fechaRegistroFin: [''] 
    })
  }
  ngOnInit(): void {
    this.CargasIniciales();
  }
  filtrosLimpios(): void{
    this.limpiarFiltros.reset({
      localidad: '0', // Valor inicial del dropdown de Localidad
      codigoUsuario:'', // Campo para Código de Usuario
      correo: '', // Campo para Correo
      telefono: '', // Campo para Teléfono
      nombreApellido: '', // Campo para Nombre y Apellido
      fechaRegistroInicio:'', // Campo para Fecha de Registro Inicio
      numeroCompras: '0', // Valor inicial del dropdown de Número de Compras
      fechaRegistroFin: '' // Campo para Fecha de Registro Fin
    })
  }
  CargasIniciales(): void { 
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(Resultado => {
      this.LocaliFiltro = Resultado;
    });
    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe(rest => {
      this.ComprasFil = rest;
    });
}
}
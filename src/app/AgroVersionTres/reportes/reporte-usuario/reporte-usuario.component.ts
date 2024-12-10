import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';

@Component({
  selector: 'app-reporte-usuario',
  templateUrl: './reporte-usuario.component.html',
  styleUrls: ['./reporte-usuario.component.css']
})
export class ReporteUsuarioComponent implements OnInit {

  // Variables para los filtros
  NumeroFil: any = [];
  LocalidadesFiltro: any = [];
  filtroForm: FormGroup;

  constructor(public ServiciosGenerales: ServiciosService, private fb: FormBuilder) {
    // Inicialización del formulario reactivo
    this.filtroForm = this.fb.group({
      FechaIncioCompra: [''],
      FechaFinCompra: [''],
      FechaRegistro: [''],
      Localidad: ['0'], // **Cambio: Valor inicial configurado para select**
      NumeroCompras: ['0'], // **Cambio: Valor inicial configurado para select**
      
    });
  }

  ngOnInit(): void {
    this.CargasIniciales();
  }

  // Método para limpiar filtros
  limpiarFiltros(): void {
    this.filtroForm.reset({
      FechaIncioCompra: '',
      FechaFinCompra: '',
      FechaRegistro: '',
      Localidad: '0', // **Cambio: Restablecer select a "Seleccione"**
      NumeroCompras: '0', // **Cambio: Restablecer select a "Seleccione"**
      
    });
  }

  // Método para cargar datos iniciales
  CargasIniciales(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(Resultado => {
      this.LocalidadesFiltro = Resultado;
    });
    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe(rest => {
      this.NumeroFil = rest;
    });
  }
}

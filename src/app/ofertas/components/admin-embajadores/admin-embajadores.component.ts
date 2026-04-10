import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-embajadores',
  templateUrl: './admin-embajadores.component.html',
  styleUrls: ['./admin-embajadores.component.css']
})
export class AdminEmbajadoresComponent implements OnInit {

  // variables de filtro
  fechaInicio: string = '';
  fechaFin: string = '';
  correoEmbajador: string = '';
  telefonoEmbajador: string = '';
  correoVecino: string = '';
  telefonoVecino: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  Buscar() {
    console.log("Valores de búsqueda: ", {
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      correoEmbajador: this.correoEmbajador,
      telefonoEmbajador: this.telefonoEmbajador,
      correoVecino: this.correoVecino,
      telefonoVecino: this.telefonoVecino
    });
  }

  Limpiar() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.correoEmbajador = '';
    this.telefonoEmbajador = '';
    this.correoVecino = '';
    this.telefonoVecino = '';
  }

}

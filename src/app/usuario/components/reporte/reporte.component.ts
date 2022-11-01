import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  constructor(
    private ReporteService: ReporteService, ) { }

  ngOnInit() {
    this.cargarListas();
  }

  mail: string = '';
  tipoUsuario: string ='0';
  nombre: string='';
  codigo: number;
  FechaDesde: String;
  FechaHasta: String;
  ArrayTipoUsuario: any = [];
  ArrayUsuarios: any =[];


  cargarListas(){
    this.ReporteService.ConsultaUsuario('1').subscribe(Resultado => {
      this.ArrayTipoUsuario = Resultado;
      console.log(this.ArrayTipoUsuario[0]);
    })
  }

  buscar(){
    if(this.codigo == null)
    {
      this.codigo = 0;
    }
    if(this.mail == '')
    {
      this.mail = "0";
    }
    if(this.nombre == '')
    {
      this.nombre = "0";
    }
    if(this.FechaDesde == null)
    {
      this.FechaDesde = "0";
    }
    if(this.FechaHasta == null)
    {
      this.FechaHasta= "0";
    }
    const bodyPost = {
      "IdTipoPersona":this.tipoUsuario,
      "Usucodig":this.codigo,
      "FechaDesde":this.FechaDesde,
      "FechaHasta":this.FechaHasta,
      "CorreoPersona":this.mail,
      "NombrePersona":this.nombre
    }
    this.ReporteService.ReporteUsuarios("1", bodyPost).subscribe(Resultado => {
      this.ArrayUsuarios = Resultado;
    })
    if(this.mail == '0')
    {
      this.mail = "";
    }
    if(this.nombre == '0')
    {
      this.nombre = "";
    }
    if(this.FechaDesde == "0")
    {
      this.FechaDesde= "";
    }
    if(this.FechaHasta == "0")
    {
      this.FechaHasta= "";
    }
  }

  limpiarDatos() {
    this.nombre = '';
    this.mail = '';
    this.FechaHasta= ""
    this.codigo = 0
    this.tipoUsuario ='0'
    this.FechaDesde= ""
    this.ArrayUsuarios=[]
  }

}

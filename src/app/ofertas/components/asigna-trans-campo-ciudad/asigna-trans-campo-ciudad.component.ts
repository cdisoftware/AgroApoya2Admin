import { Component, OnInit } from '@angular/core';
import { CrearofertaService } from 'src/app/core/crearoferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-asigna-trans-campo-ciudad',
  templateUrl: './asigna-trans-campo-ciudad.component.html',
  styleUrls: ['./asigna-trans-campo-ciudad.component.css']
})
export class AsignaTransCampoCiudadComponent implements OnInit {

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

  constructor(private ServiciosOferta: CrearofertaService) { }


  ngOnInit(): void {
    this.ConsultaDepartamentos();
    this.ConsultaCiudad();
  }


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

}

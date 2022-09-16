import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../../core/valoraroferta.service'
import { CrearofertaService } from './../../../../core/crearoferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-costeo',
  templateUrl: './costeo.component.html',
  styleUrls: ['./costeo.component.css']
})
export class CosteoComponent implements OnInit {

  Producto: string = '';
  Unidades: string = '';
  Empaque: string = '';
  Concepto: string = '';
  VTotal: string = '';
  ArrayCostos: any = [];
  ValorTotal: string = '0';
  IdOferta: string = '';
  IdTipoConcepto: string = '0';
  ArrayConceptos: any = [];

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosValorar: ValorarofertaService,
    private ServiciosCreaOferta: CrearofertaService,
    private modalService: NgbModal,
    public rutas: Router,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.IdOferta = this.cookies.get('IDO')
    this.ConsultaOferta();
    this.ConsultaCosteo();
    this.ConsultaConceptos()
  }

  ConsultaCosteo() {
    this.ServiciosValorar.ConsultaCosteo('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayCostos = Resultado;
      console.log(Resultado)
    })
  }

  ConsultaConceptos(){
    this.ServiciosValorar.ConsultaConceptos('1').subscribe(Resultado => {
      this.ArrayConceptos = Resultado;
    })
  }

  AsociarConcepto() {
    const conceptos = {

    }
  }

  ConsultaOferta() {
    this.ServiciosValorar.ConsultaOferta('1', this.IdOferta).subscribe(Resultado => {
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.Producto = Resultado[0].Nombre_Producto;
        this.Unidades = Resultado[0].Unidades_disponibles;
        this.Empaque = Resultado[0].Descripcion_empaque;
      }
    })
  }

  Siguiente() {
    this.rutas.navigateByUrl('/home/valoracion')
  }

  Atras() {
    this.rutas.navigateByUrl('/home/transportista')
  }

  SelTConcepto(tipoconcepto : string){
    this.IdTipoConcepto = tipoconcepto
  }

}

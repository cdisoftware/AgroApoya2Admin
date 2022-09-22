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
  concepto = 'nombre';
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
  ArrayOferta: any = [];
  IdConcepto: string = '';
  RutaImagen: string = this.SeriviciosGenerales.RecuperaRutaImagenes();
  Respuesta: string = '';

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
    this.ConsultaConceptos();
  }

  ConsultaCosteo() {
    this.ServiciosValorar.ConsultaCosteo('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayCostos = Resultado;
      if (Resultado.length > 0) {
        this.ValorTotal = '0'
        for (var a in Resultado) {
          if (Resultado[a].CD_TPO_VLOR == '1') {
            this.ValorTotal = (Number(this.ValorTotal) + Number(Resultado[a].VLOR) * Number(this.Unidades)).toString()
          } else {
            this.ValorTotal = (Number(this.ValorTotal) + Number(Resultado[a].VLOR)).toString()
          }
        }
      }
      console.log(Resultado)
    })
  }

  LimpiarFiltro() {
    this.IdConcepto = '0'
  }

  ConsultaConceptos() {
    this.ServiciosValorar.ConsultaConceptos('1').subscribe(Resultado => {
      this.ArrayConceptos = Resultado;
      console.log(Resultado)
    })
  }

  AsociarConcepto(modalRespuesta: any) {
    const conceptos = {
      CD_CNSCTVO: this.IdOferta,
      CD_TIPO_COSTEO: this.IdConcepto,
      CD_TPO_VLOR: this.IdTipoConcepto,
      VLOR: this.VTotal
    }
    this.ServiciosValorar.AsociarCosteo('3', conceptos).subscribe(Resultado => {
      console.log(Resultado)
      if (Resultado.toString().includes('-1')){
        this.Respuesta = 'No se puede asociar el valor de costeo seleccionado, por favor valide sus datos';
        this.modalService.dismissAll();
        this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      } else if (Resultado.toString().includes('No fue posible ejecutar los datos')) {
        this.Respuesta = 'Debe completar todos los campos para asociar el valor de costeo.';
        this.modalService.dismissAll();
        this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      } else {
        if (this.IdTipoConcepto == '1') {
          this.ValorTotal = (Number(this.ValorTotal) + (Number(this.Unidades) * Number(this.VTotal))).toString()
        } else if (this.IdTipoConcepto == '2') {
          this.ValorTotal = (Number(this.ValorTotal) + Number(this.VTotal)).toString()
        }
        this.ConsultaCosteo();
      }

    })
  }

  EliminarCosteo(Costo: any) {
    const conceptos = {
      CD_CNSCTVO: this.IdOferta,
      CD_TIPO_COSTEO: Costo.CD_TIPO_COSTEO,
      CD_TPO_VLOR: Costo.CD_TPO_VLOR,
      VLOR: Costo.VLOR
    }
    this.ServiciosValorar.AsociarCosteo('4', conceptos).subscribe(Resultado => {
      this.ValorTotal = '0';
      this.ConsultaCosteo()
    })
  }

  ConsultaOferta() {
    this.ServiciosValorar.ConsultaOferta('1', this.IdOferta).subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayOferta = Resultado;
      if (Resultado.length > 0) {
        this.Producto = Resultado[0].Nombre_Producto;
        this.Unidades = Resultado[0].Unidades_disponibles;
        this.Empaque = Resultado[0].Descripcion_empaque;
      }
    })
  }


  selectConcepto(item: any) {
    this.IdConcepto = item.codigo;
  }
  Siguiente() {
    this.rutas.navigateByUrl('/home/valoracion')
  }

  Atras() {
    this.rutas.navigateByUrl('/home/transportista')
  }

  SelTConcepto(tipoconcepto: string) {
    this.IdTipoConcepto = tipoconcepto
  }

}

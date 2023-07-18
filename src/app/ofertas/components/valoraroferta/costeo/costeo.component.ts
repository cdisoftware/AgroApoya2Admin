import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../../core/valoraroferta.service'
import { CrearofertaService } from './../../../../core/crearoferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ThisReceiver } from '@angular/compiler';

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
  ArrayConceptosOfer: any = [];
  ArrayOferta: any = [];
  IdConcepto: string = '';
  RutaImagen: string = this.SeriviciosGenerales.RecuperaRutaImagenes();
  Respuesta: string = '';
  lblConceptoAgregar: string = '';
  arregloListaConcepto: any;
  ConceptoSel: string;

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
    this.ConsultaConceptosGen();
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
    })
  }

  LimpiarFiltro() {
    this.IdConcepto = '0'
    this.lblConceptoAgregar = '';
    this.ConceptoSel = '';
  }

  ConsultaConceptosGen() {
    this.ServiciosValorar.ConsultaConceptos('1').subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayConceptos = Resultado;
    })
  }

  ConsultaConceptos() {
    this.ServiciosValorar.conscTipoCosteoXOferta('1', this.IdOferta).subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayConceptosOfer = Resultado;
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
      if (Resultado.toString().includes('-1')) {
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
        this.ConsultaConceptos();
        this.ConceptoSel = '';
        this.VTotal = '';
        this.IdConcepto = '0'
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
      this.ConsultaCosteo();
      this.ConsultaConceptos();
    })
  }

  ConsultaOferta() {
    this.ServiciosValorar.ConsultaOferta('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      if (Resultado.length > 0) {
        this.Producto = Resultado[0].Nombre_Producto;
        this.Unidades = Resultado[0].Unidades_disponibles;
        this.Empaque = Resultado[0].Descripcion_empaque;
      }
    })
  }

  CrearEditarosteo(modalMod: any) {
    this.modalService.open(modalMod, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    this.banderaAgregar = '1';
  }

  NovedadConcepto(bandera: string, modalRespuesta: any) {
    if (bandera == '1') {
      const body = {
        Descripcion: this.lblConceptoAgregar,
        IdTipoCosteo: 0
      }
      if (this.lblConceptoAgregar == undefined || this.lblConceptoAgregar == '') {
        this.Respuesta = 'Debe completar el campo Concepto.';
        this.modalService.dismissAll();
        this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      } else {
        this.ServiciosValorar.ModificaConcepto('3', body).subscribe(respu => {
          this.Respuesta = respu;
          this.modalService.dismissAll();
          this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.ConsultaConceptos();
          this.LimpiarFiltro();
        })
      }
    }
    else if (bandera == '2') {
      const body = {
        Descripcion: this.lblConceptoAgregar,
        IdTipoCosteo: this.auxIdConcepto
      }
      if (this.lblConceptoAgregar == undefined || this.lblConceptoAgregar == '') {
        this.Respuesta = 'Debe completar el campo Concepto.';
        this.modalService.dismissAll();
        this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      } else {
        this.ServiciosValorar.ModificaConcepto('2', body).subscribe(respu => {
          var auxrespu: string = respu.split("|");
          this.Respuesta = auxrespu[1];
          this.modalService.dismissAll();
          this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.ConsultaConceptos();
          this.LimpiarFiltro();
        })
      }
    }
  }

  banderaAgregar: string = '1';
  auxIdConcepto: string = '';

  SeleccionarEditarConcepto(arreglo: any) {
    this.lblConceptoAgregar = arreglo.nombre
    this.banderaAgregar = '2';
    this.auxIdConcepto = arreglo.codigo;
  }

  EliminaCosteo: any = [];
  PopupEliminaConcepto(modalConfirmacion: any, item: any) {
    this.modalService.open(modalConfirmacion, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    this.EliminaCosteo = item;
  }

  EliminaConcepto(modalRespuesta: any) {
    const body = {
      Descripcion: this.lblConceptoAgregar,
      IdTipoCosteo: this.EliminaCosteo.codigo
    }
    this.ServiciosValorar.ModificaConcepto('4', body).subscribe(respu => {
      var auxrespu: string = respu.split("|");
      this.Respuesta = auxrespu[1];
      this.modalService.dismissAll();
      this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
      this.ConsultaConceptos();
      this.LimpiarFiltro();
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

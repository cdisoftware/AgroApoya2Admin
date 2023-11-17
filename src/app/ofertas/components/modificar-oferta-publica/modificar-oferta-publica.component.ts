import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-modificar-oferta-publica',
  templateUrl: './modificar-oferta-publica.component.html',
  styleUrls: ['./modificar-oferta-publica.component.css']
})
export class ModificarOfertaPublicaComponent implements OnInit {

  //VariablesFiltro Oferta
  ArrayOferta: any = [];
  keywordOferta: string = '';
  SelectorOferta: string = '0';
  OfertaSelect: string = '';
  Oferta: string = '';

  IdOfertaSelect: string = '';
  DataOferta: any[] = [];
  RutaImagen: string;
  ValidaVigencia: string;
  Respuesta: string = '';

  VigenDesde: any;
  VigenHasta: any;
  FechaEntrega: any;
  SessionFechaRecogida: any;
  Observaciones: any;

  //variables tipo de oferta
  DataTipoOferta: any[] = []
  ArrayTipoOferCon: any = [];

  MuestraGrupal: string = '';
  MuestraIndividual: string = '';
  MuestraVigencial: string = '';
  MuestraValoReferencia: string = '';
  keyword: string = '';

  constructor(private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService,
    private SeriviciosGenerales: MetodosglobalesService,
    private formatofecha: DatePipe) { }

  ngOnInit(): void {
    this.ValidaVigencia = '0';
    this.ConsultaOferta(); 
    this.RutaImagen = this.SeriviciosGenerales.RecuperaRutaImagenes();

    this.DataTipoOferta = [
      {
        id: 1,
        name: 'Individual'
      },
      {
        id: 3,
        name: 'Mixta'
      }
    ];
  }


  ConsultaOferta() {
    const datosbusqueda = {
      UsuCodig: 0,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: 0,
      VigenciaHasta: 0,
      IdEstado_Oferta: 0,
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    this.ServiciosValorar.BusquedaOferta('2', this.SelectorOferta, '0', '0', datosbusqueda).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      this.keywordOferta = 'Producto';
      
    })
  }
  LimpiaOferta(Valor: string) {
    this.Oferta = Valor;
    this.SelectorOferta = '0';

  }
  selectOfertaFiltro(item: any) {
    this.SelectorOferta = item.cd_cnsctvo.toString();
    this.OfertaSelect = item.Producto;
    const IdOferta = item.Producto.split(' ');
    this.IdOfertaSelect = IdOferta[0];
    this.ConsultaDetalleOferta(this.IdOfertaSelect);
    this.ConsultaVigenciaOferta();
    this.ValidaVigencia = '1';
  }

  ConsultaDetalleOferta(idoferta: String) {
    this.ServiciosValorar.ConsultaOferta('1', idoferta.toString()).subscribe(ResultConsu => {
      this.DataOferta = ResultConsu;     
      this.SessionFechaRecogida = this.DataOferta[0].fecha_recogida;
    })
  }

  ConsultaVigenciaOferta() {
    this.ServiciosValorar.ConsultaVigenciaOferta('1', this.SelectorOferta, '').subscribe(ResultCons => {
      console.log(ResultCons)
      if (ResultCons.length > 0) {
        this.VigenDesde = ResultCons[0].vgncia_desde;
        this.VigenHasta = ResultCons[0].vgncia_hasta;    
        this.FechaEntrega = ResultCons[0].fcha_vgncia;
        this.Observaciones = ResultCons[0].observaciones;
      }

    })
  }

  ValidaVigencias(templateMensaje: any, bandera: string) {

    var fechaA = new Date();
    var fechaD = this.VigenDesde;
    var fechaH = this.VigenHasta;
    var fechaR = this.SessionFechaRecogida;
    var fechaE = this.FechaEntrega;

    var fechaAF = this.formatofecha.transform(fechaA, "yyyy-MM-dd")!;
    var fechaDF = this.formatofecha.transform(fechaD, "yyyy-MM-dd")!;
    var fechaHF = this.formatofecha.transform(fechaH, "yyyy-MM-dd")!;
    var fechaRF = this.formatofecha.transform(fechaR, "yyyy-MM-dd")!;
    var fechaEF = this.formatofecha.transform(fechaE, "yyyy-MM-dd")!;

    if (bandera == '1') {
      if (fechaDF < fechaAF) {
        this.VigenDesde = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha inicio de la vigencia no puede ser menor a la fecha actual, favor valida tu información.';
      }
      else if (fechaDF <= fechaHF) {
        this.VigenDesde = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha inicio de la vigencia no puede ser mayor a la fecha final de la vigencia, favor valida tu información.';
      }
    }

    if (bandera == '2') {
      if (fechaDF > fechaHF) {
        this.VigenHasta = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha fin de la vigencia no puede ser menor a la fecha inicio de la vigencia, favor valida tu información.';
      }
      else if (fechaHF < fechaAF) {
        this.VigenHasta = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha fin de la vigencia no puede ser menor a la fecha actual, favor valida tu información.';
      } else if (fechaHF > fechaEF) {
        this.VigenHasta = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha fin de la vigencia no puede ser mayor a la fecha de entrega, favor valida tu información.';
      }
    }
    if (bandera == '3') {
      if (fechaEF < fechaHF) {
        this.FechaEntrega = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha entrega no puede ser menor a la fecha vigencia hasta, favor valida tu información.';
      }
    }
    if (bandera == '4') {
      if (fechaRF < fechaEF) {
        this.SessionFechaRecogida = '';
        this.modalService.open(templateMensaje);
        this.Respuesta = 'La fecha de recogida no puede ser mayor a la fecha entrega, favor valida tu información.';
      }
    }
  }

  GuardaVigencia(templateMensaje: any) {
   
    this.Respuesta = '';
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title' })
    
  }
  

  LimpiaTipoOferta(item: any) {
    this.MuestraGrupal = '0';
    this.MuestraIndividual = '0';
    this.MuestraVigencial = '0';
    this.MuestraValoReferencia = '0';
  }

   selectTipOferta(item: any) {

    
  }

}

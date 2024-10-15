import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrearofertaService } from 'src/app/core/crearoferta.service'
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service'

@Component({
  selector: 'app-creacionoferta',
  templateUrl: './creacionoferta.component.html',
  styleUrls: ['./creacionoferta.component.css']
})
export class CreacionofertaComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private ServiciosOferta: CrearofertaService,
    private ServiciosService: ServiciosService,
  ) { }

  @ViewChild('ModalRespuesta', { static: false }) ModalRespuesta: any;
  @ViewChild('ModalFechasOferta', { static: false }) ModalFechasOferta: any;
  @ViewChild('ModalNuevoProducto', { static: false }) ModalNuevoProducto: any;
  @ViewChild('ModalPresentaciones', { static: false }) ModalPresentaciones: any;
  @ViewChild('ModalImfOfertaSector', { static: false }) ModalImfOfertaSector: any;

  //Parametros generales de la  (Primer modulo/modulo superior)
  IdTipoOfertaSelect: string;
  VerOcultarModulos: string = '';
  VerOcultarDomicilio: string = '';
  FechaInicio: string = '';
  FechaFin: string = '';
  FechaEntrega: string = '';
  MascaraSector: string = '';
  IdTipoDomicilio: string = '';
  ValorCompraDomicilio: string = '';
  ValorDomicilio: string = '';

  ArrayTipoOferta: any[];
  ArrayTipoDomicilio: any[];
  ArrayFechasOferta: any[];

  file: FileList | undefined;

  ImgMapaSec: string
  ngOnInit(): void {
    this.CargaIncialCrearOferta();
  }

  CargaIncialCrearOferta() {
    this.VerOcultarModulos = "1";
    this.IdTipoOfertaSelect = "0";
    this.IdTipoDomicilio = "0";
    this.CargarListasIniciales();
  }

  CargarListasIniciales() {
    this.ServiciosService.consTipoOferta('1').subscribe(Resultado => {
      this.ArrayTipoOferta = Resultado;
    })

    this.ServiciosService.consZTipoDomicilio('1').subscribe(Resultado => {
      this.ArrayTipoDomicilio = Resultado;
    })
  }

  /*AREA INFORMACIÓN GENERAL PARA LA OFERTA */
  BtnModalFechasAnteriores() {
    this.ServiciosService.conszOfertaActivaProductosCo('1').subscribe(Resultado => {
      this.ArrayFechasOferta = Resultado;
      this.modalService.open(this.ModalFechasOferta, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    })
  }

  BtnGuardarNuevaOferta() {
    //Validaciones para la creacion de la oferta
    if (this.FechaInicio == '' || this.FechaFin == '' || this.FechaEntrega == '') {
      alert("Las fechas de inicio, fin y entrega son obligatorias")
    }
    else if (this.MascaraSector == '') {
      alert("La mascara del sector es obligatoria")
    }
    else if (this.IdTipoOfertaSelect == '0') {
      alert("El tipo de oferta es obligatorio")
    }
    else if (this.IdTipoDomicilio == '0') {
      alert("El tipo domicilio es obligatorio")
    }
    else if (this.IdTipoDomicilio == '1' && (this.ValorCompraDomicilio == '' || this.ValorDomicilio == '')) {
      alert("El Valor comprar domicilio y el valor domicilio son obligatorios")
    }
    else if (this.IdTipoDomicilio == '3' && this.ValorDomicilio == '') {
      alert("El valor domicilio son obligatorios")
    }
    else {
      this.VerOcultarModulos = "2";

      const body = {
        IdOferta: 0,
        FechaInicio: this.FechaInicio,
        FechaFin: this.FechaFin,
        FechaEntrega: this.FechaEntrega,
        TipoOfeta: 1,
        MascaraLocali: "Engativa suba y usaquen",
        TipoDomicilio: 1,
        ValorDomicilio: 13000,
        ValorInicialDomicilio: 10000
      }
      console.log(body)
     /* const body = {
        IdOferta: 8,
        FechaInicio: "2024-09-26",
        FechaFin: "2024-09-26",
        FechaEntrega: "2024-09-26",
        TipoOfeta: 1,
        MascaraLocali: "Engativa suba y usaquen",
        TipoDomicilio: 1,
        ValorDomicilio: 13000,
        ValorInicialDomicilio: 10000
      }*/

     /* this.ServiciosService.conszOfertaActivaProductosCo('1').subscribe(Resultado => {
        alert(Resultado.toString())
      })*/
    }
  }

  /*AREA ASOCIACION DE SECTORES */
  SubirImgMapa(event: any) {
    this.file = event.target.files[0];
    this.ServiciosOferta.postFileImagen(event.target.files[0]).subscribe(
      response => {
        if (response == 'Archivo Subido Correctamente') {
          this.ImgMapaSec = 'https://api.apptotrip.com/ImagenesAgroapoya2/ImagenesOfertas/' + event.target.files[0].name;
        } else {
          console.log(response);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  BtnModalImagenSector() {
    this.modalService.open(this.ModalImfOfertaSector, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  BtnModalNuevoProducto() {
    this.modalService.open(this.ModalNuevoProducto, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  BtnModalDetalleInfoProducto() {
    this.modalService.open(this.ModalNuevoProducto, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  BtnModalDetallePresentaciones() {
    this.modalService.open(this.ModalPresentaciones, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

}

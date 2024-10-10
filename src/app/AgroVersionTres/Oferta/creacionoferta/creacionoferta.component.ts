import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrearofertaService } from 'src/app/core/crearoferta.service'

@Component({
  selector: 'app-creacionoferta',
  templateUrl: './creacionoferta.component.html',
  styleUrls: ['./creacionoferta.component.css']
})
export class CreacionofertaComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private ServiciosOferta: CrearofertaService
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

  file: FileList | undefined;

  ImgMapaSec:string
  ngOnInit(): void {
    this.CargaIncialCrearOferta();
  }

  CargaIncialCrearOferta() {
    this.VerOcultarModulos = "2";
    this.IdTipoOfertaSelect = "0";
    this.IdTipoDomicilio = "0";
    this.ImgMapaSec = 'https://cdn-icons-png.flaticon.com/128/8191/8191568.png'

    //TODO Cargar Informacion de la lista tipo de oferta
    //exec z_TipoOferta_cons 1

    //TODO Cargar Informacion de la lista tipo domicilio
    //exec z_TipoDomicilio_Cons 1
  }

  /*AREA INFORMACIÓN GENERAL PARA LA OFERTA */
  BtnModalFechasAnteriores() {
    //TODO Cargar informacion de la fechas de las ofertas
    //exec z_OfertaActivaProductos_Cons 1
    this.modalService.open(this.ModalFechasOferta, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
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
      //TODO Guardar nueva oferta
      //EXEC Z_OfertaActivaInfoMod 1,0, '2024-10-03', '2024-10-15', '2024-10-20', 1, 'Engativa suba y usaquen', 1, 13000, 10000 ,''
      this.VerOcultarModulos = "2";
    }

    this.VerOcultarModulos = "2";
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

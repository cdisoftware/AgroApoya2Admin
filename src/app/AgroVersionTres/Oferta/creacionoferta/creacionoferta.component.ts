import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service'

@Component({
  selector: 'app-creacionoferta',
  templateUrl: './creacionoferta.component.html',
  styleUrls: ['./creacionoferta.component.css']
})
export class CreacionofertaComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private ServiciosService: ServiciosService,
  ) { }

  @ViewChild('ModalRespuesta', { static: false }) ModalRespuesta: any;
  @ViewChild('ModalFechasOferta', { static: false }) ModalFechasOferta: any;
  @ViewChild('ModalNuevoProducto', { static: false }) ModalNuevoProducto: any;
  @ViewChild('ModalPresentaciones', { static: false }) ModalPresentaciones: any;
  @ViewChild('ModalImfOfertaSector', { static: false }) ModalImfOfertaSector: any;

  //Parametros tranversales para la oferta
  IdOferta: string = '11';
  RutaImagenSector: string = "https://api.apptotrip.com/ImagenesAgroapoya2/ImagenesSectores/";

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

  //Sectorizacion
  IdLocalidad: string = '0';
  IdSector: string = '0';
  ArrayImagenesSector: any[];
  ArrayLocalidadesTipo: any[];
  ArraySectorTipo: any[];
  ArraySectoresOferta: any[];
  file: FileList | undefined;

  //Regalos por defecto para la oferta
  IdTipoRegalo: string = "0";
  IdTipoRegaloPersona: string = "0";
  ArrayRegalosTipo: any[];
  ArrayRegalosPersonaTipo: any[];

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

    this.ServiciosService.consTipoLocalidad('1').subscribe(Resultado => {
      this.ArrayLocalidadesTipo = Resultado;
    })

    this.ServiciosService.consTipoRegalo('1').subscribe(Resultado => {
      this.ArrayRegalosTipo = Resultado;
    })

    this.ServiciosService.consPersonasAplicaRegalo('1').subscribe(Resultado => {
      this.ArrayRegalosPersonaTipo = Resultado;
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
    this.VerOcultarModulos = "2";

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
      const body = {
        IdOferta: 0,
        FechaInicio: this.FechaInicio,
        FechaFin: this.FechaFin,
        FechaEntrega: this.FechaEntrega,
        TipoOfeta: this.IdTipoOfertaSelect,
        MascaraLocali: this.MascaraSector,
        TipoDomicilio: this.IdTipoDomicilio,
        ValorDomicilio: this.ValorDomicilio,
        ValorInicialDomicilio: this.ValorCompraDomicilio
      }
      console.log('Cuerpo datos de insecion para la nueva oferta')
      console.log(body)
      this.ServiciosService.modOfertaActivaInfo('1', body).subscribe(Resultado => {
        var auxSplit: any = [];
        auxSplit = Resultado.split('|');
        if (auxSplit[0] == '-1') {
          alert(Resultado.toString())
        } else {
          alert(Resultado.toString())
          this.IdOferta = auxSplit[0];
          this.VerOcultarModulos = "2";
        }
      })
    }
  }

  /*AREA ASOCIACION DE SECTORES */
  BtnModalImagenSector() {
    this.ServiciosService.conszImgAsociadosSectorOferta('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayImagenesSector = Resultado;
    })
    this.modalService.open(this.ModalImfOfertaSector, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  ImgSeleccionarImgSector(Resultados: any) {
    const body = {
      IdImagen: Resultados.Id,
      Nombre: "",
      IdOferta: this.IdOferta
    }
    this.ServiciosService.modImgAsociadasSectorOfertas('4', body).subscribe(Resultado => {
      this.ServiciosService.conszImgAsociadosSectorOferta('1', this.IdOferta).subscribe(Resultado => {
        this.ArrayImagenesSector = Resultado;
      })
    })
  }

  SubirImgMapa(event: any) {
    this.file = event.target.files[0];
    this.ServiciosService.uploadImgSector(event.target.files[0]).subscribe(
      response => {
        console.log(response)
        alert(response)
        const body = {
          IdImagen: "0",
          Nombre: event.target.files[0].name,
          IdOferta: "0"
        }
        this.ServiciosService.modImgAsociadasSectorOfertas('1', body).subscribe(Resultado => {
          this.ServiciosService.conszImgAsociadosSectorOferta('1', this.IdOferta).subscribe(Resultado => {
            this.ArrayImagenesSector = Resultado;
          })
        })
      },
      error => {
        console.log(error);
      }
    );
  }

  changeSelectLocalidad() {
    this.IdSector = '0';
    if (this.IdLocalidad != '0') {
      this.ServiciosService.consRelacionLocalidadZona('1', this.IdLocalidad).subscribe(Resultado => {
        this.ArraySectorTipo = Resultado;
        console.log(Resultado)
      })
    } else {
      this.ArraySectorTipo = [];
    }
  }

  BtnAgregarLocalidadOferta() {
    alert(this.IdSector)
    if (this.IdSector == '0') {
      alert('Es obligatorio el campo localidad y sector');
    } else {
      const body = {
        IdZona: this.IdSector,
        IdOferta: this.IdOferta
      }
      console.log(body)
      this.ServiciosService.modZonaOferta('1', body).subscribe(Resultado => {
        console.log(Resultado)
        //TODO FALTA EL SERVICIO PARA MOSTAR LOS SECOTES ASOCIADOS A LA OFERTA
      })
    }
  }

  //Regalos por defecto para la oferta

  BtnAgregarRegaloDefecto() {
    if (this.IdTipoRegaloPersona == '0' || this.IdTipoRegalo == '0') {
      alert('El campo tipo regalo y aplicable a son obliagatorios');
    } else {
      const body = {
        IdOferta: this.IdOferta,
        IdTipoRegalo: this.IdTipoRegalo,
        AplicablePersona: this.IdTipoRegaloPersona,
        TipoEstado: "1"
      }
      this.ServiciosService.modOfertaRegalos('1',body).subscribe(Resultado => {
        alert(Resultado)
      })
    }
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

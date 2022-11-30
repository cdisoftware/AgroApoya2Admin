import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicidadService } from 'src/app/core/publicidad.service';

@Component({
  selector: 'app-carguepublicidad',
  templateUrl: './carguepublicidad.component.html',
  styleUrls: ['./carguepublicidad.component.css']
})
export class CarguepublicidadComponent implements OnInit {
  ImagenCargar: string = '../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
  Respuesta: string = '';
  imagenesPublicidad: string = '';

  IdListaModulo: string = '0';
  arregloListaModulo: any;

  IdListaAccion: string = '0';
  arregloListaAccion: any;

  banderaAgregar: string = '1';
  auxIdModulo: string = '';
  lblModuloEditar: string = '';

  boxAncho: string;
  boxLargo: string;
  boxOrden: string;

  NombreModulo: string = '';
  VerOcultarCampos: string = '';

  IdModulo: string;

  DataModulos: any = [];


  boxPath: string;
  btnImagen: string;

  constructor(private serviciospublicidad: PublicidadService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.ListaModulo();
    this.ListaAccion();
    this.VerOcultarCampos = '1';
  }

  LimpiarModule(){
    this.NombreModulo = '';
  }

  CambiarBtnModulo() {
    if (this.IdListaModulo == '0') {
      this.banderaAgregar = '1';
    } else {
      this.banderaAgregar = '2';
    }
  }

  AgregarModulo(modalMod: any) {
    this.modalService.open(modalMod, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  EditarModulo(modalMod: any) {
    this.modalService.open(modalMod, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  AgregarDetalleImagen(modalMod: any) {
    this.modalService.open(modalMod, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  ListaModulo() {
    this.arregloListaModulo = [];
    this.serviciospublicidad.ConsultaVistasPublic('1').subscribe(resultado => {
      this.arregloListaModulo = resultado;
    })
  }

  ListaAccion() {
    this.arregloListaAccion = [];
    this.serviciospublicidad.ConsultaAccionPubli('1').subscribe(resultado => {
      this.arregloListaAccion = resultado;
    })
  }

  SeleccionarEditarModulo(arreglo: any) {
    console.log(arreglo)
    this.IdListaModulo = arreglo.codigo;
    this.banderaAgregar = '2';

  }

  BtnGuardarModulo(templateMensaje: any) {

    if (this.NombreModulo == undefined || this.NombreModulo == null || this.NombreModulo == '') {
      this.Respuesta = 'El campo nombre módulo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })

    } else {
      const body = {
        IdModulo: 0,
        NomModulo: this.NombreModulo,

      }
      this.serviciospublicidad.ModCModulo('3', body).subscribe(resultado => {
        if (resultado == 'OK') {
          this.Respuesta = "El modulo se a creado exitosamente, para editarlo debes seleccionarlo en los filtros.";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.VerOcultarCampos = '1';
        } else {
          this.Respuesta = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }

      })
      this.VerOcultarCampos = '3';
      this.ListaModulo();
    }
  }


  BtnGuardarModuloDetalle(templateMensaje: any) {
    if (this.boxAncho == undefined || this.boxAncho == null || this.boxAncho == '') {
      this.Respuesta = 'El campo ancho es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.boxLargo == undefined || this.boxLargo == null || this.boxLargo == '0') {
      this.Respuesta = 'El campo largo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.boxOrden == undefined || this.boxOrden == null || this.boxOrden == '0') {
      this.Respuesta = 'El campo orden es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        Id: 0,
        IdVista: this.IdModulo,
        Alto: this.boxLargo,
        Ancho: this.boxAncho,
        Orden: this.boxOrden,
        Usucodig: 0,
        Observacion: 0
      }
      this.serviciospublicidad.ModCPubli('3', body).subscribe(resultado => {
        console.log(resultado)
        if (resultado == 'OK') {
          this.Respuesta = "El modulo se a creado exitosamente, para editarlo debes seleccionarlo en los filtros.";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.VerOcultarCampos = '1';
        } else {
          this.Respuesta = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    }
  }


  BtnGuardarModAccion(templateMensaje: any) {
    if (this.boxPath == undefined || this.boxPath == null || this.boxPath == '') {
      this.Respuesta = 'El campo path es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.IdListaAccion == undefined || this.IdListaAccion == null || this.IdListaAccion == '0') {
      this.Respuesta = 'El campo acción es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.btnImagen == undefined || this.btnImagen == null || this.btnImagen == '0') {
      this.Respuesta = 'Subir una imagen es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        Id: 0,
        IdVista: this.IdModulo,
        IdAccion: this.ListaAccion,
        Patch: this.boxPath,
        Imagen: this.imagenesPublicidad,
        Usucodig: 0,
        Observacion: 0
      }
      this.serviciospublicidad.ModCPublicidad('3', body).subscribe(resultado => {
        console.log(resultado)
        if (resultado == 'OK') {
          this.Respuesta = "Guardado exitosamente";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        } else {
          this.Respuesta = resultado;
          console.log(this.Respuesta)
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    }
  }


  public CargaImgPublicidad(event: any, modalmensaje: any) {

    if (!(/\.(jpg|png)$/i).test(event.target.files[0].name)) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, valide la extención, las permitidas son .jpg .png";
    }
    else if (event.target.files[0].name.includes(" ")) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, el nombre no debe contener espacios";
    }
    else if (event.target.files[0].size > 1300000) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El peso del archivo no puede exceder 1.3 megabyte";
    } else {
      this.serviciospublicidad.postImgPublicidad(event.target.files[0]).subscribe(
        response => {
          if (response <= 1) {
            console.log("Error en el servidor");
          } else {
            if (response == 'Archivo Subido Correctamente') {
              this.imagenesPublicidad = event.target.files[0].name;
              this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
              this.Respuesta = "Imagen cargada correctamente.";
            } else {
              console.log(response)
            }
          }
        },
        error => {
          console.log(<any>error);
          this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.Respuesta = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }


}

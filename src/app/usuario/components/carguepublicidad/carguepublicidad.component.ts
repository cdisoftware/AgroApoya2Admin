import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicidadService } from 'src/app/core/publicidad.service';
import { CookieService } from 'ngx-cookie-service';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';


@Component({
  selector: 'app-carguepublicidad',
  templateUrl: './carguepublicidad.component.html',
  styleUrls: ['./carguepublicidad.component.css']
})
export class CarguepublicidadComponent implements OnInit {

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
  auxLargo: string;
  auxAncho: string;
  auxOrden: string;
  NombreModulo: string = '';
  VerOcultarCampos: string = '';
  IdModulo: string;
  DataModulos: any = [];
  boxPath: string;
  btnImagen: string;
  usucodig: string = '';
  ConsultaTarjetas: any[];
  RutaImagenTar: string = '';
  auxGuardarNombreMod: string;
  IdVistaModulo: string = '';
  Id: string = '';

  constructor(private serviciospublicidad: PublicidadService,
    private modalService: NgbModal,
    public cookies: CookieService,
    private SeriviciosGenerales: MetodosglobalesService,) { }

  ngOnInit(): void {
    this.usucodig = this.cookies.get('IDU');
    this.ListaModulo();
    this.ListaAccion();
    this.VerOcultarCampos = '1';
    this.RutaImagenTar = this.SeriviciosGenerales.RecuperarRutasOtrasImagenes('5');
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

  CambiarBtnModulo() {
    // Consultar tarjetas segun id de modulo
    this.ConsultaTarjetas = [];
    this.serviciospublicidad.ConsultaCPublicidad('1', '0', this.IdListaModulo, this.usucodig).subscribe(resultado => {
      this.ConsultaTarjetas = resultado;
      for (var i = 0; i < this.ConsultaTarjetas.length; i++) {
        if (this.ConsultaTarjetas[i].Imagen == '') {
          this.ConsultaTarjetas[i].Imagen = '../../../../assets/ImagenesAgroApoya2Adm/SubirImagen.png';
        } else {
          this.ConsultaTarjetas[i].Imagen = this.ConsultaTarjetas[i].Imagen;
        }
      }
    })
  }

  AgregarModulo(modalMod: any) {
    this.NombreModulo = '';
    this.boxAncho = '';
    this.boxLargo = '';
    this.boxOrden = '';
    this.auxGuardarNombreMod = '1';
    this.modalService.open(modalMod, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  Limpiar() {
    location.reload();
  }

  BtnGuardarModulo(templateMensaje: any) {
    if (this.NombreModulo == '') {
      this.Respuesta = 'El campo nombre módulo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        IdModulo: 0,
        NomModulo: this.NombreModulo,
      }
      this.serviciospublicidad.ModCModulo('3', body).subscribe(resultado => {
        var aux = resultado.split('|');
        this.IdVistaModulo = aux[0].replace(' ', '');
        if (this.IdVistaModulo.trim() != '-1') {
          this.auxGuardarNombreMod = '2';
          this.Respuesta = "El modulo se a creado exitosamente, para editarlo debes seleccionarlo en los filtros.";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
          this.VerOcultarCampos = '3';
          this.ListaModulo();
        } else {
          this.VerOcultarCampos = '1';
          this.auxGuardarNombreMod = '1'
          this.Respuesta = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
        }
      })
    }
  }

  BtnGuardarModuloDetalle(templateMensaje: any) {
    if (this.boxAncho == '' || this.boxAncho == '0') {
      this.Respuesta = 'El campo ancho es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.boxLargo == '' || this.boxLargo == '0') {
      this.Respuesta = 'El campo largo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.boxOrden == '' || this.boxOrden == '0') {
      this.Respuesta = 'El campo orden es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        Id: 0,
        IdVista: this.IdVistaModulo,
        Alto: this.boxLargo,
        Ancho: this.boxAncho,
        Orden: this.boxOrden,
        Usucodig: 0,
        Observacion: 0
      }
      this.serviciospublicidad.ModCPubli('3', body).subscribe(resultado => {
        var aux = resultado.split('|');
        this.Id = aux[0].replace(' ', '');
        if (resultado == 'Se ha insertado correctamente') {
          this.Respuesta = "El modulo se a creado exitosamente, para editarlo debes seleccionarlo en los filtros.";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.ListaPublicidad();
          this.LimpiarModuloDetalle();
        } else {
          this.Respuesta = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    }
  }

  AgregarDetalleImagen(modalMod: any, respu: any) {
    this.Id = respu.Id;
    this.modalService.open(modalMod, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  ListaPublicidad() {
    this.serviciospublicidad.ConsultaCPublicidad('1', '0', this.IdVistaModulo, this.usucodig).subscribe(resultado => {
      this.DataModulos = resultado;
    })
  }

  SeleccionarEditarModulo(arreglo: any) {
    this.IdListaModulo = arreglo.codigo;
    this.banderaAgregar = '2';

  }

  BtnEditarModulo(templateMensaje: any) {
    if (this.NombreModulo == undefined || this.NombreModulo == null || this.NombreModulo == '') {
      this.Respuesta = 'El campo nombre módulo es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        IdModulo: this.IdModulo,
        NomModulo: this.NombreModulo,
      }
      this.serviciospublicidad.ModCModulo('2', body).subscribe(resultado => {
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


  LimpiarModuloDetalle() {
    this.boxLargo = '';
    this.boxAncho = '';
    this.boxOrden = '';
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
        Id: this.Id,
        IdVista: this.IdVistaModulo,
        IdAccion: this.ListaAccion,
        Patch: this.boxPath,
        Imagen: this.imagenesPublicidad,
        Usucodig: 0,
        Observacion: 0
      }
      this.serviciospublicidad.ModCPublicidad('2', body).subscribe(resultado => {
        if (resultado == 'Se ha actualizado correctamente') {
          this.Respuesta = "El detalle se a creado exitosamente";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.CambiarBtnModulo();
          this.LimpiarModAccion();
        } else {
          this.Respuesta = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    }
    this.modalService.dismissAll();
  }

  LimpiarModAccion() {
    this.boxPath = '';
    this.IdListaAccion = '';
    this.btnImagen = '';
  }

  EditarModulo(modalMod: any) {
    this.NombreModulo = modalMod.NombreModulo;
    this.boxLargo = modalMod.auxLargo;
    this.boxAncho = modalMod.auxAncho;
    this.boxOrden = modalMod.auxOrden;
    this.modalService.open(modalMod, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  BtnEliminarDetalleMod(arreglo: any, templateMensaje: any) {
    const body = {
      Id: arreglo.Id,
      IdVista: arreglo.IdVistaModulo,
      Alto: this.boxLargo,
      Ancho: this.boxAncho,
      Orden: this.boxOrden,
      Usucodig: 0,
      Observacion: 0
    }
    this.serviciospublicidad.ModCPubli('4', body).subscribe(resultado => {
      this.Respuesta = resultado;
      this.Respuesta = "Se ha eliminado correctamente";
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.ListaPublicidad();
    })
  }

  BtnEditarMod(arregloPlantilla: any) {
    this.boxLargo = arregloPlantilla.auxLargo;
    this.boxAncho = arregloPlantilla.auxAncho;
    this.boxOrden = arregloPlantilla.auxOrden;
    this.serviciospublicidad.ConsultaCPublicidad('1', '0', this.IdVistaModulo, this.usucodig).subscribe(resultado => {
      if (resultado != null && resultado != undefined) {
        this.DataModulos = resultado;

      } else {
        this.DataModulos = [];
      }
    })
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
              this.imagenesPublicidad = this.RutaImagenTar + event.target.files[0].name;
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
  LimpiarModule() {
    this.NombreModulo = '';
  }
}

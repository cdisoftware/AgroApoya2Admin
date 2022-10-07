import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PlantillacorreosService } from '../../../core/plantillacorreos.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { CookieService } from 'ngx-cookie-service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-plantillascorreo',
  templateUrl: './plantillascorreo.component.html',
  styleUrls: ['./plantillascorreo.component.css']
})

export class PlantillascorreoComponent implements OnInit {

  Respuesta: string = '';
  IdListaplantilla: string = '0';
  DescripcionListaPlantilla: string = '';
  arregloListaTipoPlantilla: any;

  arregloListaMomentoEnvio: any;
  IdMomentoEnvio: string = '0';

  IdPlantilla: string = '';
  IdDocumento: string = '';


  arregloCamposCorreo: any;
  IdCampo: string = '0';
  CampoDesc: string = '';

  VerOcultarCampos: string = '';

  arregloListaPlantillaCorreo: any;

  NombrePlantilla: string = '';

  caracteresDescForm: string;

  //INFORMACION PLANTILLA
  descripcionForm: string;
  RutaImagenes: string = '';
  RutaArchivosAdj: string = '';

  NombrePlantillaForm: string = '';
  TipoPlantillaForm: string = '';
  MomentoEnvioForm: string = '';
  AsuntoForm: string = '';
  EstadoForm: string = '';
  DescripcionForm: string = '';
  HtmlForm: string = '';

  arregloListaAdjuntos: any;

  //cookies nombre usuario
  usuarioMod: string = this.cookies.get('IDU');
  constructor(private serviciosplantillacorreos: PlantillacorreosService,
    private modalService: NgbModal,
    private SeriviciosGenerales: MetodosglobalesService,
    public cookies: CookieService,) { }

  ngOnInit(): void {
    this.usuarioMod = this.cookies.get('IDU');
    this.RutaImagenes = this.SeriviciosGenerales.RecuperarRutasOtrasImagenes('3');
    this.ListaTipoPlantilla();
    this.ListaMomentoEnvio();
    this.ListaCamposCodigo();
    this.CaracteresDescripcion();

    //uno solo muestra los filtros
    this.VerOcultarCampos = '1';
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '300px',
    maxHeight: '600px',
    placeholder: 'Ingrese el texto',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  ListaTipoPlantilla() {
    this.arregloListaTipoPlantilla = [];
    this.serviciosplantillacorreos.ConsultaTipoPlatilla('1').subscribe(resultado => {
      this.arregloListaTipoPlantilla = resultado;
    })
  }
  ListaMomentoEnvio() {
    this.arregloListaMomentoEnvio = [];
    this.serviciosplantillacorreos.ConsultaCorreoMomentoEnvio('1').subscribe(resultado => {
      this.arregloListaMomentoEnvio = resultado;
    })
  }

  ListaCamposCodigo() {
    this.arregloCamposCorreo = [];
    this.serviciosplantillacorreos.ConsultaTipoCamposCorreo('1').subscribe(resultado => {
      this.arregloCamposCorreo = resultado;
    })
  }
  SeleccionarPlantillaModal(arregloPlantilla: any) {
    console.log(arregloPlantilla)
    this.NombrePlantillaForm = arregloPlantilla.NombrePlantilla;
    this.TipoPlantillaForm = arregloPlantilla.IdTipoPlantilla;
    this.MomentoEnvioForm = arregloPlantilla.idMomentoEnvio;
    this.AsuntoForm = arregloPlantilla.Asunto;
    this.EstadoForm = arregloPlantilla.Estado;
    this.descripcionForm = arregloPlantilla.Descripcion;
    this.Imagencabeza = arregloPlantilla.ImgEncabezado;
    this.ImagenPie = arregloPlantilla.ImgPie;
    this.IdPlantilla = arregloPlantilla.IdPlantilla;
    this.modalService.dismissAll();
    this.VerOcultarCampos = '3';
    this.HtmlForm = arregloPlantilla.html

    this.serviciosplantillacorreos.ConsultaDocumentoCorreo('1', this.IdPlantilla).subscribe(resultado => {
      if (resultado != null && resultado != undefined) {
        this.arregloListaAdjuntos = resultado;

      } else {
        this.arregloListaAdjuntos = [];
      }
    })
  }


  BuscarPlantilla(modalBuscar: any, modalmensaje: any) {
    var AuxNombre: string;
    if (this.NombrePlantilla == undefined || this.NombrePlantilla == null) {
      AuxNombre = '';
    } else {
      AuxNombre = this.NombrePlantilla
    }
    const body = {
      NombrePlantilla: AuxNombre,
      idMomentoEnvio: this.IdMomentoEnvio,
      idTipoPlantilla: this.IdListaplantilla,
      idPlantilla: 0
    }

    this.arregloListaPlantillaCorreo = [];
    this.serviciosplantillacorreos.ConsultaPlatillaCorreo('1', body).subscribe(resultado => {

      if (resultado.length == 0) {
        this.Respuesta = 'No hay resultados.';
        this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      } else {
        this.arregloListaPlantillaCorreo = resultado;
        this.modalService.open(modalBuscar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      }

    })

  }
  CrearPlantilla() {
    this.VerOcultarCampos = '2';
    this.NombrePlantillaForm = '';
    this.TipoPlantillaForm = '0';
    this.MomentoEnvioForm = '0';
    this.AsuntoForm = '';
    this.EstadoForm = '0';
    this.descripcionForm = '';
    this.Imagencabeza = '../../../../assets/ImagenesAgroApoya2Admin/imgtres.png';
    this.ImagenPie = '../../../../assets/ImagenesAgroApoya2Admin/imgtres.png';
    this.CaracteresDescripcion();

  }

  Imagencabeza: string = '../../../../assets/ImagenesAgroApoya2Admin/imgtres.png';
  public CargaImagenCabeza(event: any, modalmensaje: any) {

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
      this.serviciosplantillacorreos.postImgPlantillaCorreo(event.target.files[0]).subscribe(
        response => {
          if (response <= 1) {
            console.log("Error en el servidor");
          } else {
            if (response == 'Archivo Subido Correctamente') {
              this.Imagencabeza = this.RutaImagenes + event.target.files[0].name;
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



  ImagenPie: string = '../../../../assets/ImagenesAgroApoya2Admin/imgtres.png';
  public CargaImagenPie(event: any, modalmensaje: any) {
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
      this.serviciosplantillacorreos.postImgPlantillaCorreo(event.target.files[0]).subscribe(
        response => {

          if (response <= 1) {
            console.log("Error en el servidor");
          } else {

            if (response == 'Archivo Subido Correctamente') {
              this.ImagenPie = this.RutaImagenes + event.target.files[0].name;
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

  BtnGuardarPlantilla(templateMensaje: any) {
    if (this.NombrePlantillaForm == undefined || this.NombrePlantillaForm == null || this.NombrePlantillaForm == '') {
      this.Respuesta = 'El campo nombre plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.TipoPlantillaForm == undefined || this.TipoPlantillaForm == null || this.TipoPlantillaForm == '0') {
      this.Respuesta = 'El campo tipo plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.MomentoEnvioForm == undefined || this.MomentoEnvioForm == null || this.MomentoEnvioForm == '0') {
      this.Respuesta = 'El campo momento envio es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.AsuntoForm == undefined || this.AsuntoForm == null || this.AsuntoForm == '') {
      this.Respuesta = 'El campo asunto es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.EstadoForm == undefined || this.EstadoForm == null || this.EstadoForm == '0') {
      this.Respuesta = 'El campo estado es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.descripcionForm == undefined || this.descripcionForm == null || this.descripcionForm == '') {
      this.Respuesta = 'El campo descripción es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Imagencabeza == '../../../../assets/ImagenesAgroApoya2Admin/imgtres.png') {
      this.Respuesta = 'El campo imagen encabezado es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ImagenPie == '../../../../assets/ImagenesAgroApoya2Admin/imgtres.png') {
      this.Respuesta = 'El campo imagen pie de pagina es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        UsucodigAdmin: this.usuarioMod,
        idplantilla: 0,
        NombrePlantilla: this.NombrePlantillaForm,
        idTipoPlantilla: this.TipoPlantillaForm,
        idMomentoEnvio: this.MomentoEnvioForm,
        Asunto: this.AsuntoForm,
        idEstado: this.EstadoForm,
        descripcion: this.descripcionForm,
        html: '',
        imgEncabezado: this.Imagencabeza,
        imgPiePagina: this.ImagenPie
      }
      this.serviciosplantillacorreos.ModPlantillaCorreo('3', body).subscribe(resultado => {
        if (resultado == 'OK') {
          this.Respuesta = "La nueva plantilla se a creado exitosamente, para editarla debes seleccionarla en los filtros.";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.VerOcultarCampos = '1';
        } else {
          this.Respuesta = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }

      })

    }
  }

  BtnActualizarrPlantilla(templateMensaje: any) {
    if (this.NombrePlantillaForm == undefined || this.NombrePlantillaForm == null || this.NombrePlantillaForm == '') {
      this.Respuesta = 'El campo nombre plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.TipoPlantillaForm == undefined || this.TipoPlantillaForm == null || this.TipoPlantillaForm == '0') {
      this.Respuesta = 'El campo tipo plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.MomentoEnvioForm == undefined || this.MomentoEnvioForm == null || this.MomentoEnvioForm == '0') {
      this.Respuesta = 'El campo momento envio es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.AsuntoForm == undefined || this.AsuntoForm == null || this.AsuntoForm == '') {
      this.Respuesta = 'El campo asunto es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.EstadoForm == undefined || this.EstadoForm == null || this.EstadoForm == '0') {
      this.Respuesta = 'El campo estado es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.descripcionForm == undefined || this.descripcionForm == null || this.descripcionForm == '') {
      this.Respuesta = 'El campo descripción es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Imagencabeza == '../../../../assets/ImagenesAgroApoya2Admin/imgtres.png') {
      this.Respuesta = 'El campo imagen encabezado es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ImagenPie == '../../../../assets/ImagenesAgroApoya2Admin/imgtres.png') {
      this.Respuesta = 'El campo imagen pie de pagina es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        UsucodigAdmin: this.usuarioMod,
        idplantilla: this.IdPlantilla,
        NombrePlantilla: this.NombrePlantillaForm,
        idTipoPlantilla: this.TipoPlantillaForm,
        idMomentoEnvio: this.MomentoEnvioForm,
        Asunto: this.AsuntoForm,
        idEstado: this.EstadoForm,
        descripcion: this.descripcionForm,
        html: '',
        imgEncabezado: this.Imagencabeza,
        imgPiePagina: this.ImagenPie
      }
      this.serviciosplantillacorreos.ModPlantillaCorreo('2', body).subscribe(resultado => {
        if (resultado == 'OK') {
          this.Respuesta = "Se realizo la actualización correctamente.";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.VerOcultarCampos = '1';
        } else {
          this.Respuesta = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    }
  }

  ArchivoAdj: string = '../../../../assets/ImagenesAgroApoya2Admin/ic_adjunto.PNG';
  public CargaArchivoAdjunto(event: any) {

    this.serviciosplantillacorreos.postAdjuntoPlantillaCorreo(event.target.files[0]).subscribe(
      response => {
        if (response <= 1) {
          console.log("Error en el servidor");
        } else {
          if (response == 'Archivo Subido Correctamente') {
            const body = {
              IdPlantilla: this.IdPlantilla,
              IdDocumento: 0,
              NombreDocumento: event.target.files[0].name,
              rutaDocumento: this.RutaImagenes + event.target.files[0].name
            }

            this.serviciosplantillacorreos.ModDocumentoCorreo('3', body).subscribe(resultado => {
              this.serviciosplantillacorreos.ConsultaDocumentoCorreo('1', this.IdPlantilla).subscribe(resultado => {
                if (resultado != null && resultado != undefined) {
                  this.arregloListaAdjuntos = resultado;
                } else {
                  this.arregloListaAdjuntos = [];
                }
              })
            })
          } else {
            console.log(response)
          }
        }
      },
      error => {

      }
    );
  }
  EliminaAdjunto(arreglo: any, modalMensaje: any) {
    const bodyDelete = {
      IdPlantilla: arreglo.IdPlantilla,
      IdDocumento: arreglo.id,
      NombreDocumento: '',
      rutaDocumento: ''
    }
    this.serviciosplantillacorreos.ModDocumentoCorreo('4', bodyDelete).subscribe(resultado1 => {
      this.Respuesta = resultado1;
      this.modalService.open(modalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.serviciosplantillacorreos.ConsultaDocumentoCorreo('1', this.IdPlantilla).subscribe(resultado => {
        if (resultado != null && resultado != undefined) {
          this.arregloListaAdjuntos = resultado;
        } else {
          this.arregloListaAdjuntos = [];
        }
      })
    })
  }



  BtnActualizarPlantillaHtml(templateMensaje: any) {
    if (this.HtmlForm == undefined || this.HtmlForm == null || this.HtmlForm == '') {
      this.Respuesta = 'El campo editar plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      var elemesnt = document.getElementsByClassName("angular-editor-textarea");
      var elemttres = <HTMLInputElement>elemesnt[0];
      const bodyhtml = {
        UsucodigAdmin: this.usuarioMod,
        idplantilla: this.IdPlantilla,
        NombrePlantilla: this.NombrePlantillaForm,
        idTipoPlantilla: this.TipoPlantillaForm,
        idMomentoEnvio: this.MomentoEnvioForm,
        Asunto: this.AsuntoForm,
        idEstado: this.EstadoForm,
        descripcion: this.descripcionForm,
        html: elemttres.innerHTML,
        imgEncabezado: this.Imagencabeza,
        imgPiePagina: this.ImagenPie
      }
      console.log(bodyhtml)
      this.serviciosplantillacorreos.ModPlantillaCorreo('4', bodyhtml).subscribe(resultado => {

        this.Respuesta = resultado;
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })

      })
    }
  }



  changeCampo() {
    this.CampoDesc = this.IdCampo;
  }

  CaracteresDescripcion() {
    if (this.descripcionForm != undefined && this.descripcionForm != null) {
      var auxCont = this.descripcionForm.length;
      auxCont = 500 - auxCont;
      this.caracteresDescForm = 'Quedan ' + auxCont + ' de 500 carácteres';
    } else {
      this.caracteresDescForm = 'Quedan ' + '500' + ' de 500 carácteres';
    }

  }
  CaracteresHtmlDos(templateMensaje: any) {

    if (this.descripcionForm != undefined) {
      var auxCont = this.descripcionForm.length;
      auxCont = 5000 - auxCont;
      if (this.descripcionForm.length > 5000) {
        this.Respuesta = "La plantilla HTML no puede exceder los 5000 caracteres";
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      }
      this.caracteresDescForm = 'Quedan ' + auxCont + ' de 5000 carácteres';
    } else {
      this.caracteresDescForm = 'Quedan ' + '5000' + ' de 5000 carácteres';
    }

  }
  onChange2(templateMensaje: TemplateRef<any>) {
    this.CaracteresHtmlDos(templateMensaje);
  }

}

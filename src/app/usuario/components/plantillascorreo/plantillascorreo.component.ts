import { CookieService } from 'ngx-cookie-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Component, OnInit } from '@angular/core';
import { PlantillacorreosService } from '../../../core/plantillacorreos.service'
import { MetodosglobalesService } from './../../../core/metodosglobales.service'


@Component({
  selector: 'app-plantillascorreo',
  templateUrl: './plantillascorreo.component.html',
  styleUrls: ['./plantillascorreo.component.css']
})

export class PlantillascorreoComponent implements OnInit {

  RespuestaModal: string = '';

  IdListaplantillaBuscar: string = '0';
  IdMomentoEnvioBuscar: string = '0';
  NombrePlantillaBuscar: string = '';

  arregloListaTipoPlantilla: any;
  arregloListaMomentoEnvio: any;
  arregloCamposCorreo: any;
  arregloListaPlantillaCorreo: any;
  arregloListaAdjuntos: any;
  arregloElimina: any;

  IdCampo: string = '';
  CampoDesc: string = '';

  NombrePlantillaForm: string = '';
  TipoPlantillaForm: string = '';
  MomentoEnvioForm: string = '';
  AsuntoForm: string = '';
  EstadoForm: string = '';
  DescripcionForm: string = '';
  HtmlForm: string = '';
  caracteresDescForm: string;
  caracteresHtmlForm: string;
  caracteresQueryForm: string;
  descripcionForm: string;
  queryForm: string;
  Imagencabeza: string = '';
  ImagenPie: string = '';

  RutaImagenes: string = '';
  RutaArchivosAdj: string = '';


  IdUsuario: string = '';
  IdPlantilla: string = '';


  // 1 solo muestra los campos de los filtros,
  // 2 Muestra los campos para la creacion de una plantilla
  // 3 Muestra todo el contenido actualizar plantilla
  VerOcultarCampos: string = ''; 

  constructor(
    public cookies: CookieService,
    private modalService: NgbModal,
    private SeriviciosGenerales: MetodosglobalesService,
    private serviciosplantillacorreos: PlantillacorreosService) { }

  ngOnInit(): void {

    this.VerOcultarCampos = '1';
    this.IdUsuario = this.cookies.get('IDU');
    this.RutaImagenes = this.SeriviciosGenerales.RecuperarRutasOtrasImagenes('3');

    this.ListaTipoPlantilla();
    this.ListaMomentoEnvio();

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

  BuscarPlantilla(modalBuscar: any, modalmensaje: any) {
    var AuxNombre: string;
    if (this.NombrePlantillaBuscar == undefined || this.NombrePlantillaBuscar == null) {
      AuxNombre = '';
    } else {
      AuxNombre = this.NombrePlantillaBuscar
    }

    const body = {
      NombrePlantilla: AuxNombre,
      idMomentoEnvio: this.IdMomentoEnvioBuscar,
      IdTipoPlantilla: this.IdListaplantillaBuscar,
      IdPlantilla: 0
    }
    
    this.serviciosplantillacorreos.ConsultaPlatillaCorreo('1', body).subscribe(resultado => {
      console.log(resultado)
      if (resultado.length == 0) {
        this.RespuestaModal = 'No hay resultados.';
        this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      } else {
        this.arregloListaPlantillaCorreo = resultado;
        this.modalService.open(modalBuscar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      }
    })
  }

  SeleccionarPlantillaModal(arregloPlantilla: any) {
    this.VerOcultarCampos = '3'; 
    this.IdPlantilla = arregloPlantilla.IdPlantilla;

    this.NombrePlantillaForm = arregloPlantilla.NombrePlantilla;
    this.TipoPlantillaForm = arregloPlantilla.IdTipoPlantilla;
    this.MomentoEnvioForm = arregloPlantilla.idMomentoEnvio;
    this.AsuntoForm = arregloPlantilla.Asunto;
    this.EstadoForm = arregloPlantilla.Estado;
    this.descripcionForm = arregloPlantilla.Descripcion;
    this.Imagencabeza = arregloPlantilla.ImgEncabezado;
    this.ImagenPie = arregloPlantilla.ImgPie;
    this.HtmlForm = arregloPlantilla.html

    this.serviciosplantillacorreos.ConsultaDocumentoCorreo('1', this.IdPlantilla).subscribe(resultado => {
      if (resultado != null && resultado != undefined) {
        this.arregloListaAdjuntos = resultado;
      } else {
        this.arregloListaAdjuntos = [];
      }
    })

    this.SelectListasPlatilla(this.TipoPlantillaForm);
    this.CaracteresDescripcion();
    this.CaracteresHtmlDos(null);
    this.CaracteresQuery();

    this.modalService.dismissAll();
  }

  SelectListasPlatilla(IdTipoPlantilla: string) {
    this.arregloCamposCorreo = [];
    if (IdTipoPlantilla == '1') {
      this.serviciosplantillacorreos.ConsultaTipoCamposCorreo('1').subscribe(resultado => {
        this.arregloCamposCorreo = resultado;
      })
    } else if (IdTipoPlantilla == '2') {
      this.serviciosplantillacorreos.ConsultaTipoCamposCorreo('2').subscribe(resultado => {
        this.arregloCamposCorreo = resultado;
      })
    }
  }

  CrearPlantilla() {
    this.VerOcultarCampos = '2';
    this.NombrePlantillaForm = '';
    this.TipoPlantillaForm = '0';
    this.MomentoEnvioForm = '0';
    this.AsuntoForm = '';
    this.EstadoForm = '0';
    this.descripcionForm = '';
    this.Imagencabeza = '../../../../assets/ImagenesAgroApoya2Adm/imgtres.png';
    this.ImagenPie = '../../../../assets/ImagenesAgroApoya2Adm/imgtres.png';
    this.CaracteresDescripcion();
  }

  BtnGuardarPlantilla(templateMensaje: any) {
    if (this.NombrePlantillaForm == undefined || this.NombrePlantillaForm == null || this.NombrePlantillaForm == '') {
      this.RespuestaModal = 'El campo nombre plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.TipoPlantillaForm == undefined || this.TipoPlantillaForm == null || this.TipoPlantillaForm == '0') {
      this.RespuestaModal = 'El campo tipo plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.MomentoEnvioForm == undefined || this.MomentoEnvioForm == null || this.MomentoEnvioForm == '0') {
      this.RespuestaModal = 'El campo momento envio es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.AsuntoForm == undefined || this.AsuntoForm == null || this.AsuntoForm == '') {
      this.RespuestaModal = 'El campo asunto es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.EstadoForm == undefined || this.EstadoForm == null || this.EstadoForm == '0') {
      this.RespuestaModal = 'El campo estado es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.descripcionForm == undefined || this.descripcionForm == null || this.descripcionForm == '') {
      this.RespuestaModal = 'El campo descripción es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Imagencabeza == '../../../../assets/ImagenesAgroApoya2Adm/imgtres.png') {
      this.RespuestaModal = 'El campo imagen encabezado es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ImagenPie == '../../../../assets/ImagenesAgroApoya2Adm/imgtres.png') {
      this.RespuestaModal = 'El campo imagen pie de pagina es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        UsucodigAdmin: this.IdUsuario,
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
          this.RespuestaModal = "La nueva plantilla se a creado exitosamente, para editarla debes seleccionarla en los filtros.";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.VerOcultarCampos = '1';
        } else {
          this.RespuestaModal = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    }
  }

  EstasSeguro(arreglo: any, templateEstasSeguro: any) {
    const body = {
      idplantilla: arreglo.IdPlantilla,
      NombrePlantilla: '',
      idTipoPlantilla: arreglo.TipoPlantillaForm,
    }
    this.arregloElimina = arreglo;
    this.serviciosplantillacorreos.ModPlantillaCorreo('5', body).subscribe(resultado => {
      this.RespuestaModal = resultado;
      this.RespuestaModal = "Estas a punto de eliminar la plantilla  " + arreglo.NombrePlantilla + " estas seguro?";
      this.modalService.open(templateEstasSeguro, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    })
  }

  BtnEliminarPlantilla(templateMensaje: any) {
    this.modalService.dismissAll();
    const body = {
      idplantilla: this.arregloElimina.IdPlantilla,
      NombrePlantilla: '',
      idTipoPlantilla: this.arregloElimina.TipoPlantillaForm,
    }
    this.serviciosplantillacorreos.ModPlantillaCorreo('5', body).subscribe(resultado => {
      this.RespuestaModal = resultado;
      this.RespuestaModal = "Eliminación de plantilla correcta.";
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    })

  }

  BtnActualizarrPlantilla(templateMensaje: any) {
    if (this.NombrePlantillaForm == undefined || this.NombrePlantillaForm == null || this.NombrePlantillaForm == '') {
      this.RespuestaModal = 'El campo nombre plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.TipoPlantillaForm == undefined || this.TipoPlantillaForm == null || this.TipoPlantillaForm == '0') {
      this.RespuestaModal = 'El campo tipo plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.MomentoEnvioForm == undefined || this.MomentoEnvioForm == null || this.MomentoEnvioForm == '0') {
      this.RespuestaModal = 'El campo momento envio es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.AsuntoForm == undefined || this.AsuntoForm == null || this.AsuntoForm == '') {
      this.RespuestaModal = 'El campo asunto es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.EstadoForm == undefined || this.EstadoForm == null || this.EstadoForm == '0') {
      this.RespuestaModal = 'El campo estado es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.descripcionForm == undefined || this.descripcionForm == null || this.descripcionForm == '') {
      this.RespuestaModal = 'El campo descripción es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.Imagencabeza == '../../../../assets/ImagenesAgroApoya2Adm/imgtres.png') {
      this.RespuestaModal = 'El campo imagen encabezado es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else if (this.ImagenPie == '../../../../assets/ImagenesAgroApoya2Adm/imgtres.png') {
      this.RespuestaModal = 'El campo imagen pie de pagina es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      const body = {
        UsucodigAdmin: this.IdUsuario,
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
          this.RespuestaModal = "Se realizo la actualización correctamente.";
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.VerOcultarCampos = '1';
        } else {
          this.RespuestaModal = resultado;
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }
      })
    }
  }

  public CargaImagenCabeza(event: any, modalmensaje: any) {
    if (!(/\.(jpg|png)$/i).test(event.target.files[0].name)) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.RespuestaModal = "El archivo no pudo ser cargado, valide la extención, las permitidas son .jpg .png";
    }
    else if (event.target.files[0].name.includes(" ")) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.RespuestaModal = "El archivo no pudo ser cargado, el nombre no debe contener espacios";
    }
    else if (event.target.files[0].size > 1300000) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.RespuestaModal = "El peso del archivo no puede exceder 1.3 megabyte";
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
          this.RespuestaModal = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }

  public CargaImagenPie(event: any, modalmensaje: any) {
    if (!(/\.(jpg|png)$/i).test(event.target.files[0].name)) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.RespuestaModal = "El archivo no pudo ser cargado, valide la extención, las permitidas son .jpg .png";
    }
    else if (event.target.files[0].name.includes(" ")) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.RespuestaModal = "El archivo no pudo ser cargado, el nombre no debe contener espacios";
    }
    else if (event.target.files[0].size > 1300000) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.RespuestaModal = "El peso del archivo no puede exceder 1.3 megabyte";
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
          this.RespuestaModal = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }

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
      this.RespuestaModal = resultado1;
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
      this.RespuestaModal = 'El campo editar plantilla es obligatorio.';
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      var elemesnt = document.getElementsByClassName("angular-editor-textarea");
      var elemttres = <HTMLInputElement>elemesnt[0];
      const bodyhtml = {
        UsucodigAdmin: this.IdUsuario,
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
        this.RespuestaModal = resultado;
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      })
    }
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

  CaracteresQuery() {
    if (this.queryForm != undefined && this.queryForm != null) {
      var auxCont = this.queryForm.length;
      auxCont = 2000 - auxCont;
      this.caracteresQueryForm = 'Quedan ' + auxCont + ' de 2000 carácteres';
    } else {
      this.caracteresQueryForm = 'Quedan ' + '2000' + ' de 2000 carácteres';
    }

  }

  CaracteresHtmlDos(templateMensaje: any) {
    if (this.descripcionForm != undefined) {
      var auxCont = this.descripcionForm.length;
      auxCont = 5000 - auxCont;
      if (this.descripcionForm.length > 5000) {
        this.RespuestaModal = "La plantilla HTML no puede exceder los 5000 caracteres";
        this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      }
      this.caracteresHtmlForm = 'Quedan ' + auxCont + ' de 5000 carácteres';
    } else {
      this.caracteresHtmlForm = 'Quedan ' + '5000' + ' de 5000 carácteres';
    }

  }

}

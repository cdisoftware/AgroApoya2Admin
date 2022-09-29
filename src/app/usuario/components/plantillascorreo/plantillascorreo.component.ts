import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PlantillacorreosService } from '../../../core/plantillacorreos.service'

@Component({
  selector: 'app-plantillascorreo',
  templateUrl: './plantillascorreo.component.html',
  styleUrls: ['./plantillascorreo.component.css']
})

export class PlantillascorreoComponent implements OnInit {
  htmlContent = '';

  IdListaplantilla: string = '0';
  DescripcionListaPlantilla: string = '';
  arregloListaTipoPlantilla: any;

  arregloListaMomentoEnvio: any;
  IdMomentoEnvio: string = '0';

  arregloCamposCorreo: any;
  IdCampo: string = '0';

  VerOcultarCampos: string = '';

  constructor(private serviciosplantillacorreos: PlantillacorreosService) { }

  ngOnInit(): void {
    this.ListaTipoPlantilla();
    this.ListaMomentoEnvio();
    this.ListaCamposCodigo();
    
    //uno solo muestra los filtros
    this.VerOcultarCampos = '1';
  }
  prb: string = 'hola';

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
}

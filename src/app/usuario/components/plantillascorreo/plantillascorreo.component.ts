import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-plantillascorreo',
  templateUrl: './plantillascorreo.component.html',
  styleUrls: ['./plantillascorreo.component.css']
})
export class PlantillascorreoComponent implements OnInit {
  htmlContent = '';
  constructor() { }

  ngOnInit(): void {
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
}

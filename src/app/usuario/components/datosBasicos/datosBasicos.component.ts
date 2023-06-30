import { Component, OnInit } from '@angular/core';
import { datosBasicosService } from 'src/app/core/datosBasicos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Console } from 'console';


@Component({
  selector: 'app-datosBasicos',
  templateUrl: './datosBasicos.component.html',
  styleUrls: ['./datosBasicos.component.css']
})
export class DatosBasicosComponent implements OnInit {

  constructor(
    private DatosService: datosBasicosService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.llenarModelo();
  }

  breakUno: boolean = false;
  breakDos: boolean = false;

  tipoModelo: string = '0';
  tipoBoton: string = '';
  nombreBoton: string = '';
  ArrayModelo: any = [];
  ArrayBotones: any = [];
  ArrayItems: any = [];
  ArrayLabels: any = [];
  ArrayRelaciones: any = [];
  ArrayRelacionItem: any = [];
  nombreItem: string = '';
  descripcionDos: string = '';
  estadoItem: string = '';
  IdItem: string = '';
  descripcion: string = '';
  textoayuda: string = '';
  idRelacion: string = '';
  isEnabled: boolean = true;

  Respuesta: string = "";

  llenarModelo() {
    this.DatosService.ConsultaDatos("1").subscribe(Resultado => {
      this.ArrayModelo = Resultado;
    })
  }

  cargarBotones() {
    this.breakUno = true;
    this.DatosService.ConsultaBasicos("1", this.tipoModelo).subscribe(Resultado => {
      this.ArrayBotones = Resultado
    })
    this.breakDos = false;
  }

  cargarGrilla(idBoton: string, nomBoton: string) {
    this.breakUno = false;
    this.breakDos = true;
    this.tipoModelo = '0';

    this.nombreBoton = nomBoton;
    this.tipoBoton = idBoton

    const bodyPost = {
      "DSCRIPCION": "0"
    }
    this.DatosService.ConsultaItem('1', idBoton, bodyPost).subscribe(Resultado => {
      this.ArrayItems = Resultado;
    })
  }


  buscarGrilla(descripcion: string) {
    const bodyPost = {
      "DSCRIPCION": descripcion
    }
    this.DatosService.ConsultaItem('1', this.tipoBoton, bodyPost).subscribe(Resultado => {
      this.ArrayItems = Resultado;
    })
  }

  activarBoton() {
    if (this.descripcion != '')
      this.isEnabled = false;
    else
      this.isEnabled = true;
  }

  Agregar() {
    const bodyPost = {
      "IdDatoBasico": this.tipoBoton,
      "Id": "0",
      "Estado": "1",
      "Descripcion": this.descripcion,
      "Texto": "0"
    }
    this.DatosService.AgregarItem("3", bodyPost).subscribe(Resultado => {
      this.textoayuda = Resultado;
      this.cargarGrilla(this.tipoBoton, this.nombreBoton);
      this.descripcion = '';
      this.isEnabled = true;
    });
  }


  modVisibleItem(idItem: string, estadoItem: string, descripcionItem: string, descripcionDos: string) {

    var estadoFinal = "0";

    if (estadoItem == '1') {
      estadoFinal = '2'
    }
    else {
      estadoFinal = '1';
    }

    const bodyPost = {
      "IdDatoBasico": this.tipoBoton,
      "Id": idItem,
      "Estado": estadoFinal,
      "Descripcion": descripcionItem,
      "Texto": descripcionDos
    }
    this.DatosService.AgregarItem("2", bodyPost).subscribe(Resultado => {
      this.textoayuda = Resultado;
      this.buscarGrilla(this.descripcion);
    })
  }

  cargarLabel() {
    this.DatosService.ConsultaLabel("1", this.tipoBoton).subscribe(Resultado => {
      this.ArrayLabels = Resultado;
    })
  }

  modificarItem(templateMensaje: any) {
    const bodyPost = {
      "IdDatoBasico": this.tipoBoton,
      "Id": this.IdItem,
      "Estado": this.estadoItem,
      "Descripcion": this.nombreItem,
      "Texto": this.descripcionDos
    }
    this.DatosService.AgregarItem("2", bodyPost).subscribe(Resultado => {
      this.textoayuda = Resultado;
      this.Respuesta = 'Modificado correctamente'
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 's' })
    })
  }

  cargarRelaciones(idRelacion: string) {
    this.DatosService.ConsultaRelacionItem(this.tipoBoton, idRelacion, this.IdItem).subscribe(Resultado => {
      this.ArrayRelacionItem = Resultado;
    })
    this.idRelacion = idRelacion
  }

  modRelacion(idRelacion: string, bandera: string) {
    if (this.tipoBoton == "1") {
      const bodyPost = {
        "IdDtoBasico": this.tipoBoton,
        "IdDtoRelacion": this.idRelacion,
        "IdSubitem": this.IdItem,
        "IdSubitemDos": idRelacion
      }
      this.DatosService.modificarRelacion(bandera, bodyPost).subscribe(Resultado => {
        this.textoayuda = Resultado;
        this.cargarRelaciones(this.idRelacion)
      })  
    }else{
      this.ArrayRelacionItem = [];
    }
  }


  abrirModal(templateMensaje: any) {
    this.Respuesta = 'Se ha agregado correctamente'
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 's' })
  }

  abrirModalEditar(templateMensaje: any, id: string, descripcion: string, descripcionDos: string, estado: string) {
    this.nombreItem = descripcion;
    this.IdItem = id;
    this.descripcionDos = descripcionDos;
    this.estadoItem = estado;
    this.cargarLabel();
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });

    if (this.tipoBoton == "1") {

      this.DatosService.CosultaRelacion(this.tipoBoton).subscribe(Resultado => {
        this.ArrayRelaciones = Resultado;
      });
    } else {
      this.ArrayRelaciones = [];
    }

  }

  cambiarOjo() {
    if (this.estadoItem == '1') {
      this.estadoItem = '2'
    }
    else
      this.estadoItem = '1';
  }
}

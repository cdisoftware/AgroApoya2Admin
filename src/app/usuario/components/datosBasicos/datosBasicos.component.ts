import { Component, OnInit } from '@angular/core';
import { datosBasicosService } from 'src/app/core/datosBasicos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { strict } from 'assert';
import { BoundElementProperty } from '@angular/compiler';

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
  breakDos:boolean = false;

  tipoModelo: string ='0';
  tipoBoton: string ='';
  nombreBoton: string ='';
  ArrayModelo: any =[];
  ArrayBotones: any =[];
  ArrayItems: any =[];
  ArrayLabels: any =[];
  ArrayRelaciones: any =[];
  ArrayRelacionItem: any =[];
  nombreItem: string='';
  descripcionDos: string ='';
  estadoItem: string='';
  IdItem:string='';
  descripcion: string =''
  textoayuda: string =''
  idRelacion:string=''



  llenarModelo(){
    this.DatosService.ConsultaDatos("1").subscribe(Resultado => {
      this.ArrayModelo = Resultado;
    })

  }

  cargarBotones(){
    this.breakUno = true;
    this.DatosService.ConsultaBasicos("1", this.tipoModelo).subscribe(Resultado =>{
      this.ArrayBotones=Resultado
    })
    this.breakDos = false;
  }

  cargarGrilla( idBoton: string, nomBoton:string){
    this.breakUno=false;
    this.breakDos =true;
    this.tipoModelo = '0';
    this.nombreBoton = nomBoton;
    this.tipoBoton=idBoton

    const bodyPost ={
      "DSCRIPCION": "0"
    }
    this.DatosService.ConsultaItem('1',idBoton, bodyPost).subscribe(Resultado=>{
      this.ArrayItems = Resultado;
    })
  }

  buscarGrilla(descripcion:string){
    const bodyPost ={
      "DSCRIPCION": descripcion
    }
    this.DatosService.ConsultaItem('1',this.tipoBoton, bodyPost).subscribe(Resultado=>{
      this.ArrayItems = Resultado;
    })
  }

  Agregar(){
    const bodyPost={

        "IdDatoBasico": this.tipoBoton,
        "Id": "0",
        "Estado": "1",
        "Descripcion":this.descripcion,
        "Texto":"0"
      }
      this.DatosService.AgregarItem("3", bodyPost).subscribe(Resultado=>{
        this.textoayuda = Resultado;
      });

      this.cargarGrilla(this.tipoBoton, this.nombreBoton);
      this.descripcion='';
  }


  modVisibleItem(idItem: string, estadoItem: string, descripcionItem: string){

    var estadoFinal = "0";

    if(estadoItem == '1'){
      estadoFinal = '2'
    }
    else{
      estadoFinal='1';
    }

    const bodyPost={
      "IdDatoBasico": this.tipoBoton,
      "Id": idItem,
      "Estado": estadoFinal,
      "Descripcion":descripcionItem,
      "Texto":"Descrifiondos"
    }
    this.DatosService.AgregarItem("2", bodyPost).subscribe(Resultado=>{
      this.textoayuda = Resultado;
    })
    this.buscarGrilla(this.descripcion);
  }

  cargarLabel(){
    this.DatosService.ConsultaLabel("1",this.tipoBoton).subscribe(Resultado=>{
      this.ArrayLabels = Resultado;
    })
  }

  modificarItem(){
    const bodyPost={
      "IdDatoBasico": this.tipoBoton,
      "Id": this.IdItem,
      "Estado": this.estadoItem,
      "Descripcion": this.nombreItem,
      "Texto": this.descripcionDos
    }
    this.DatosService.AgregarItem("2", bodyPost).subscribe(Resultado=>{
      this.textoayuda = Resultado;
    })
  }

  cargarRelaciones(idRelacion:string){
    this.DatosService.ConsultaRelacionItem(this.tipoModelo, idRelacion, this.IdItem).subscribe(Resultado=>{
      this.ArrayRelacionItem =Resultado;
    })
    this.idRelacion=idRelacion
  }

  modRelacion(idRelacion:string, bandera:string){

    const bodyPost={
        "IdDtoBasico":this.tipoModelo,
        "IdDtoRelacion":this.idRelacion,
        "IdSubitem":this.IdItem,
        "IdSubitemDos":idRelacion
    }
    this.DatosService.modificarRelacion(bandera, bodyPost).subscribe(Resultado=>{
      this.textoayuda = Resultado;
    })
  }


  abrirModal(templateMensaje: any){
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 's' })
  }

  abrirModalEditar(templateMensaje: any, id: string, descripcion: string, descripcionDos: string, estado: string)
  {
    this.nombreItem=descripcion;
    this.IdItem=id;
    this.descripcionDos=descripcionDos;
    this.estadoItem = estado;
    this.cargarLabel();
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
    this.DatosService.CosultaRelacion().subscribe(Resultado=>{
      this.ArrayRelaciones = Resultado;
    })
  }





}

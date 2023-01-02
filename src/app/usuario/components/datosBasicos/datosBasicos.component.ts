import { Component, OnInit } from '@angular/core';
import { datosBasicosService } from 'src/app/core/datosBasicos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { strict } from 'assert';

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

  descripcion: string =''

  textoayuda: string =''



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


  abrirModal(templateMensaje: any){
    this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 's' })
  }



}

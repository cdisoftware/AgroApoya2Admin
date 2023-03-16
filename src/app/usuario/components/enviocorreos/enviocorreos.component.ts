import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlantillacorreosService } from '../../../core/plantillacorreos.service'
import { MetodosglobalesService } from './../../../core/metodosglobales.service'


@Component({
  selector: 'app-enviocorreos',
  templateUrl: './enviocorreos.component.html',
  styleUrls: ['./enviocorreos.component.css']
})
export class EnviocorreosComponent implements OnInit {

  
  idOferta: string = '';
  idSector: string = '';
  idPlantilla: string = '';
  IdTipoPersona: string = '';
  correoPersona: string= '';
  Query: string = '';

  ArregloPlantilla: any = [];
  ArregloPlantillaUnica: any;

  RespuestaModal: string = '';
  verOcultarCampos: number = 1;

  constructor(    private modalService: NgbModal,
    private SeriviciosGenerales: MetodosglobalesService,
    private serviciosplantillacorreos: PlantillacorreosService) { }

  ngOnInit(): void {

    this. CargarPlantillas();
  }

  CargarPlantillas() {
    const body = {
      NombrePlantilla: '',
      idMomentoEnvio: '2',
      IdTipoPlantilla:'0',
      IdPlantilla: 0
    }
    this.serviciosplantillacorreos.ConsultaPlatillaCorreo('1', body).subscribe(resultado => {
      this.ArregloPlantilla = resultado;
    })
  }

  ChangePlantillaCorreo(){
    for(var i = 0; this.ArregloPlantilla.length > i; i++){
      if(this.idPlantilla == this.ArregloPlantilla[i].IdPlantilla ){
        this.ArregloPlantillaUnica = this.ArregloPlantilla[i];
      }
    }
  }

  PrevisualizarPlantillaModal(modalPrevi: any,ModalRespuesta: any){
    if(this.idPlantilla  != '' ){
      this.modalService.open(modalPrevi, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    }else{
      this.verOcultarCampos = 1;
      this.RespuestaModal = 'Es obligatoria la seleccion de la plantilla '
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }
  }

  GenerarQuey(ModalRespuesta: any){
    if(this.idPlantilla == ''){
      this.verOcultarCampos = 1;
      this.RespuestaModal = 'Es obligatoria la seleccion de la plantilla '
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }else{
      this.verOcultarCampos = 2;

      var auxcd_cnctivo: string;
      var auxSector: string;

      if(this.idSector == undefined){
        auxSector = '0'
      }else{
        auxSector = this.idSector
      }

      if(this.idOferta == undefined){
        auxcd_cnctivo = '0'
      }else{
        auxcd_cnctivo = this.idOferta
      }

      const body = {
        Idplantilla: this.idPlantilla,
        IdSector: auxSector,
        cd_cnctivo: auxcd_cnctivo
      }

      this.serviciosplantillacorreos.ConsGenQuery('1', body).subscribe(resultado => {
        this.Query = resultado;
        console.log(resultado)
      })

    }
  }
}

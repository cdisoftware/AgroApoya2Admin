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
      console.log(resultado)
      this.ArregloPlantilla = resultado;
    })
  }

  ChangePlantillaCorreo(){
    for(var i = 0; this.ArregloPlantilla.length > i; i++){
      if(this.idPlantilla == this.ArregloPlantilla[i].IdPlantilla ){
        this.ArregloPlantillaUnica = this.ArregloPlantilla[i];
      }
    }
    console.log(this.ArregloPlantillaUnica )
  }

  PrevisualizarPlantillaModal(modalPrevi: any,){
    this.modalService.open(modalPrevi, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  GenerarQuey(ModalRespuesta: any){
    if(this.idPlantilla == ''){
      this.verOcultarCampos = 1;
      this.RespuestaModal = 'Es obligatoria la seleccion de la plantilla '
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }else{
      this.verOcultarCampos = 2;
    }
  }
}

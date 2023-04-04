import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { PlantillacorreosService } from '../../../core/plantillacorreos.service'

@Component({
  selector: 'app-consultacorreos',
  templateUrl: './consultacorreos.component.html',
  styleUrls: ['./consultacorreos.component.css']
})
export class ConsultacorreosComponent implements OnInit {

  IdEstadoBus : string = '0';

  ArregloCorreos: any = [];
  ArregloUnico: any ;

  RespuestaModal: string = '';

  constructor(private modalService: NgbModal,
    private datePipe: DatePipe,
    public sectoresservices: ValorarofertaService,
    private serviciosplantillacorreos: PlantillacorreosService) { }

  ngOnInit(): void {
    this.CargarCorreosEnviados();
  }

  CargarCorreosEnviados(){
    this.serviciosplantillacorreos.CorreosEnviadosConsulta('0','0','0','0','0',this.IdEstadoBus,'0').subscribe(resultado => {
      this.ArregloCorreos = resultado;
    })
  }

  VerDetallesModal(arreglo: any, ModalDetalles : any){
    this.ArregloUnico = arreglo;
    this.modalService.open(ModalDetalles, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }


  CancelarEnvioCorreo(ModalRespuesta: any, Arreglo: any){
    this.modalService.dismissAll();
    const body = {
      IdEnvio: Arreglo.IdEnvio,
      Query: 0,
      IdSector: 0,
      Cd_cnctivo: 0,
      IdPlantilla: 0,
      IdEstado: 3,
      IdProgramado: 2,
      FechaEnvio: this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
      HorarioEnvio : '0'
    }

    this.serviciosplantillacorreos.correoManualMod('5', body).subscribe(resultado => {
      this.CargarCorreosEnviados();
      var AuxResu = resultado.split('|')
      this.RespuestaModal = AuxResu[1]
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    })
  }
}

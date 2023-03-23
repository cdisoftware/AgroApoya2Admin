import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { PlantillacorreosService } from '../../../core/plantillacorreos.service'


@Component({
  selector: 'app-enviocorreos',
  templateUrl: './enviocorreos.component.html',
  styleUrls: ['./enviocorreos.component.css']
})

export class EnviocorreosComponent implements OnInit {

  idZona: string = '0';
  idOferta: string = '';
  idSector: string = '0';
  idHorario: string = '0';
  idPlantilla: string = '';
  IdTipoPersona: string = '';
  FechaEnvio: string = '';
  Query: string = '';

  ArregloZona: any = [];
  ArregloSector: any = [];
  ArregloPlantilla: any = [];
  ArregloHorarioTarea: any = [];
  ArregloPlantillaUnica: any;

  RespuestaModal: string = '';
  verOcultarCampos: number = 1;

  constructor(private modalService: NgbModal,
    private datePipe: DatePipe,
    public sectoresservices: ValorarofertaService,
    private serviciosplantillacorreos: PlantillacorreosService) { }

  ngOnInit(): void {

    this.CargarPlantillas();
    this.ConsultaZonas();
    this.ConsultaHorarioPorgramado();
  }

  CargarPlantillas() {
    const body = {
      NombrePlantilla: '',
      idMomentoEnvio: '2',
      IdTipoPlantilla: '0',
      IdPlantilla: 0
    }
    this.serviciosplantillacorreos.ConsultaPlatillaCorreo('1', body).subscribe(resultado => {
      this.ArregloPlantilla = resultado;
    })
  }

  ChangePlantillaCorreo() {
    for (var i = 0; this.ArregloPlantilla.length > i; i++) {
      if (this.idPlantilla == this.ArregloPlantilla[i].IdPlantilla) {
        this.ArregloPlantillaUnica = this.ArregloPlantilla[i];
      }
    }
  }

  PrevisualizarPlantillaModal(modalPrevi: any, ModalRespuesta: any) {
    if (this.idPlantilla != '') {
      this.modalService.open(modalPrevi, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    } else {
      this.verOcultarCampos = 1;
      this.RespuestaModal = 'Es obligatoria la seleccion de la plantilla '
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }
  }

  ConsultaZonas() {
    const descripcion = {
      "Descripcion": ""
    }
    this.sectoresservices.ConsZona('1', '0', '401', '261', descripcion).subscribe(ResultadoCons => {
      console.log(ResultadoCons)
      this.ArregloZona = ResultadoCons;
    })
  }

  ChangeLocalidad() {
    this.idSector = '0';
    this.sectoresservices.ConsultaSectoresEtv('1', '0', this.idZona, '0').subscribe(Result => {
      console.log(Result)
      this.ArregloSector = Result;
    })
  }

  
  ConsultaHorarioPorgramado() {
    const descripcion = {
      "Descripcion": ""
    }
    this.sectoresservices.ConsZona('1', '0', '401', '261', descripcion).subscribe(ResultadoCons => {
      console.log(ResultadoCons)
      this.ArregloHorarioTarea = ResultadoCons;
    })
  }


  GenerarQuey(ModalRespuesta: any) {
    if (this.idPlantilla == '') {
      this.verOcultarCampos = 1;
      this.RespuestaModal = 'Es obligatoria la seleccion de la plantilla '
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      this.verOcultarCampos = 2;

      var auxcd_cnctivo: string;
      var auxSector: string;

      if (this.idSector == undefined) {
        auxSector = '0'
      } else {
        auxSector = this.idSector
      }

      if (this.idOferta == undefined) {
        auxcd_cnctivo = '0'
      } else {
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

  ContinuarCorreo(ModalEnvioCorreos: any) {
    this.modalService.open(ModalEnvioCorreos, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  EnvioCorreoManual(ModalRespuesta: any) {
    this.modalService.dismissAll();

    var auxsector: string = '0';
    var auxOferta: string = '0';

    if(this.idSector != ''){
      auxsector = this.idSector
    }
    if(this.idOferta != ''){
      auxOferta = this.idOferta
    }

    const body = {
      IdEnvio: 0,
      Query: this.Query,
      IdSector: auxsector,
      Cd_cnctivo: auxOferta,
      IdPlantilla: this.idPlantilla,
      IdEstado: 2,
      IdProgramado: 2,
      FechaEnvio: this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
      HorarioEnvio : '0'
    }
    this.serviciosplantillacorreos.correoManualMod('3', body).subscribe(resultado => {
      console.log(resultado)
      var AuxResu = resultado.split('|')
      if (AuxResu[0].trim() == '1') {
        this.sectoresservices.CorreoMasivo('1', this.idPlantilla, '2', auxOferta , auxsector).subscribe(ResultCorreo => {
          this.RespuestaModal = ResultCorreo.toString()
          this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        })
      } else {
        this.RespuestaModal = AuxResu[1]
        this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      }
    })

  }

  ProgramarCorreo(ModalProgramado: any) {
    this.modalService.dismissAll();
    this.modalService.open(ModalProgramado, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  GuardarProgramado(ModalRespuesta: any){
    this.modalService.dismissAll();

    if(this.idHorario == '0' || this.FechaEnvio == ''){
      this.RespuestaModal = 'El campo horario y fecha de envio son obligatorios'
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }else{
      var auxsector: string = '0';
      var auxOferta: string = '0';
  
      if(this.idSector != ''){
        auxsector = this.idSector
      }
      if(this.idOferta != ''){
        auxOferta = this.idOferta
      }

      const body = {
        IdEnvio: 0,
        Query: this.Query,
        IdSector: auxsector,
        Cd_cnctivo: auxOferta,
        IdPlantilla: this.idPlantilla,
        IdEstado: 1,
        IdProgramado: 1,
        FechaEnvio: this.datePipe.transform(this.FechaEnvio, 'dd-MM-yyyy'),
        HorarioEnvio : this.idHorario
      }
  
      this.serviciosplantillacorreos.correoManualMod('3', body).subscribe(resultado => {
        var AuxResu = resultado.split('|')
        this.RespuestaModal = AuxResu[1]
        this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      })
    }

  }
}


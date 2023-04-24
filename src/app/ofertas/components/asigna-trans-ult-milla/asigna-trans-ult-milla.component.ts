import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { NgbModal, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asigna-trans-ult-milla',
  templateUrl: './asigna-trans-ult-milla.component.html',
  styleUrls: ['./asigna-trans-ult-milla.component.css']
})
export class AsignaTransUltMillaComponent implements OnInit {

  IdOferta: any = ''
  DataSectores: any = []
  keywordSec: string = 'DSCRPCION_SCTOR'
  IdSector: any = ''
  NomSector: string = ''
  ValidaOferta: boolean = true;
  arrayGrupos: any = [];
  arrayDescargas: any = [];
  ArrayConductores: any = [];
  IdGrupoSelect: string;
  IdConductor: string = '-1';
  ValidaConductor: boolean = false;



  constructor(
    private serviciosvaloracion: ValorarofertaService,
    private ModalService: NgbModal,
    private rutaActiva: ActivatedRoute
  ) {
    

   }

  ngOnInit(): void {
    this.IdOferta = this.rutaActiva.snapshot.paramMap.get('IdOferta');
    this.IdSector = this.rutaActiva.snapshot.paramMap.get('IdSector');
    if(this.IdOferta != ''){
      this.ValidaSector()
      
      this.BuscarGruposMilla()
    }
  }

  ngAfterViewInit() {
    this.NomSector = this.DataSectores.DSCRPCION_SCTOR;
  }

  LimpiaSector() {
    this.NomSector = '';
    this.IdSector = ''
  }

  selectSector(item: any) {
    console.log(item)
    this.IdSector = item.ID_SCTOR_OFRTA;

  }

  ValidaSector() {
    if (this.IdOferta.length > 3) {
      this.ValidaOferta = false;
      this.ConsultaSectores();
    } else {
      this.ValidaOferta = true;
      this.DataSectores = [];
    }
  }

  ConsultaSectores() {

    this.serviciosvaloracion.ConsultaSectoresOferta('2', this.IdOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.keywordSec = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
        if(this.IdSector != ''){
          this.NomSector = ResultConsulta[0].DSCRPCION_SCTOR
        }
      }
    })
  }

  BuscarGruposMilla() {
    if (this.IdOferta == null || this.IdSector == '') {
      alert('los campos son obligatorios')
    } else {
      this.serviciosvaloracion.ConsGruposUltimaMilla('1', this.IdOferta, this.IdSector).subscribe(Resultado => {
        if (Resultado.length > 0) {
          console.log(Resultado)
          this.arrayGrupos = Resultado;
        }
      })
    }
  }

  EditarGrupo(modalGrupo: any, grupo: any) {
    console.log(grupo)
    if(grupo.ID_CNDCTOR == null){
      this.ValidaConductor = true
    }else{
      this.ValidaConductor = false
    }
    this.IdGrupoSelect = grupo.IdGrupo
    this.ConsultaConductores();
    this.serviciosvaloracion.ConsParadasRutaUltMilla('1', this.IdGrupoSelect, this.IdOferta, this.IdSector).subscribe(Resultado => {
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.arrayDescargas = Resultado
        this.ModalService.open(modalGrupo, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      }

    })

  }

  SelConductor(idconductor: string) {
    this.IdConductor = idconductor;
  }

  ConsultaConductores() {
    this.serviciosvaloracion.ConsultaConductores('1', this.IdOferta, this.IdSector).subscribe(Resultado => {
      console.log(Resultado)
      if (Resultado.length > 0) {
        this.ArrayConductores = Resultado
      }
    })
  }

  AceptaEditar() {
    if (this.IdConductor != '-1') {
      const Datos = {
        IdGrupo: this.IdGrupoSelect,
        cd_cnsctivo: this.IdOferta,
        idSector: this.IdSector,
        idConductor: this.IdConductor
      }
      this.serviciosvaloracion.ModificaConductor('2', Datos).subscribe(Resultado => {
        console.log(Resultado)
        this.BuscarGruposMilla();
      })
      
      this.ModalService.dismissAll();
    }

  }

  ModificaConductor(bandera: string) {
    const Datos = {
      IdGrupo: this.IdGrupoSelect,
      cd_cnsctivo: this.IdOferta,
      idSector: this.IdSector,
      idConductor: this.IdConductor
    }
    this.serviciosvaloracion.ModificaConductor(bandera, Datos).subscribe(Resultado => {
      console.log(Resultado)
    })
  }

  EliminaConductor(grupo: any) {
    const Datos = {
      IdGrupo: grupo.IdGrupo,
      cd_cnsctivo: this.IdOferta,
      idSector: this.IdSector,
      idConductor: grupo.ID_CNDCTOR
    }
    this.serviciosvaloracion.ModificaConductor('4', Datos).subscribe(Resultado => {
      console.log(Resultado)
      this.BuscarGruposMilla();
    })
  }

  limpiarForm(){
    this.NomSector = ''
    this.IdSector = ''
    this.IdOferta = ''
    this.arrayGrupos = []
    this.arrayDescargas = []
    this.DataSectores = []
    this.ValidaOferta = true
  }

}

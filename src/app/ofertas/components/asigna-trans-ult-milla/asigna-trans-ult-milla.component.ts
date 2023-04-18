import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-asigna-trans-ult-milla',
  templateUrl: './asigna-trans-ult-milla.component.html',
  styleUrls: ['./asigna-trans-ult-milla.component.css']
})
export class AsignaTransUltMillaComponent implements OnInit {

  IdOferta: string = ''
  DataSectores: any = []
  keywordSec: string = 'DSCRPCION_SCTOR'
  IdSector: string = ''
  NomSector: string = ''
  ValidaOferta: boolean = true;

  constructor(
    private serviciosvaloracion: ValorarofertaService
  ) { }

  ngOnInit(): void {
  }

  LimpiaSector() {
    this.NomSector = '';
    this.IdSector = ''
  }

  selectSector(item: any) {
    this.IdSector = item.COD_OFERTA_SECTOR;
  }

  ValidaSector(){
    if(this.IdOferta.length > 3){
      this.ValidaOferta = false;
      this.ConsultaSectores();
    }else{
      this.ValidaOferta = true;
      this.DataSectores = [];
    }
  }

  ConsultaSectores() {
    
    this.serviciosvaloracion.ConsultaSectoresOferta('2', this.IdOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.keywordSec = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
      }
    })
  }


}

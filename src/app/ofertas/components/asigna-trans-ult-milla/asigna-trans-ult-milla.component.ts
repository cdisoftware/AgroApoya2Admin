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
  arrayGrupos: any = [];

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
      }
    })
  }

  BuscarGruposMilla() {
    if (this.IdOferta == null || this.IdSector == '') {
      alert('los campos son obligatorios')
    } else {
      this.serviciosvaloracion.ConsPinsUltMilla('1', this.IdOferta, this.IdSector).subscribe(Resultado => {
        for(var i = 0; i< Resultado.length; i++){
          alert(this.arrayGrupos.length)
          if(this.arrayGrupos.length == 0){
            this.arrayGrupos = Resultado[i]
            console.log('*-*-*-*')
            console.log(this.arrayGrupos)
          }else{
            for(var a = 0; a < this.arrayGrupos.length; a++){
              alert(a)
              if(Resultado[i].GrupoMilla == this.arrayGrupos[a].GrupoMilla){
                this.arrayGrupos.splice(Resultado[i])
              }else{
                this.arrayGrupos[a+1].splice(Resultado[i])
              }
            }
          }
        }
        console.log(this.arrayGrupos)
      })
    }

  }


}

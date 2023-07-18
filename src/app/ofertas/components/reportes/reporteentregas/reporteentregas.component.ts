import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-reporteentregas',
  templateUrl: './reporteentregas.component.html',
  styleUrls: ['./reporteentregas.component.css']
})
export class ReporteentregasComponent implements OnInit {

  constructor(private ServiciosValorar: ValorarofertaService) { }

  //#region VariablesOferta
  DataOfertas: any = [];
  keywordOferta: string = "";
  SelectOferta: string = "0";
  //#endregion VariablesOferta


  //#region VariablesSector
  DataSector: any = [];
  keywordSector: string = "";
  SelectSector: string = "";
  Sector: string = "";
  //#endregion VariablesSector

  //#region ConsGruposOferta
  DataUsersGruposMilla: any = [];
  //#endregion ConsGruposOferta
  ngOnInit(): void {
    this.DataOferta();
  }

  //#region MetodosSelectOferta
  DataOferta() {
    this.ServiciosValorar.ConsOferEst('1').subscribe(ResultCons => {
      this.DataOfertas = ResultCons;
      this.keywordOferta = 'CD_CNSCTVO';
    })
  }

  selectOferta(item: any) {
    this.SelectOferta = item.CD_CNSCTVO;
    this.DataSectores();
  }
  LimpiaOferta(Valor: string) {
    this.SelectOferta = Valor;
    this.LimpiaSector('0');
  }
  //#endregion MetodosSelectOferta


  //#region MetodosSelectSector
  DataSectores() {
    this.ServiciosValorar.ConsultaSectoresOferta('1', this.SelectOferta).subscribe(ResultCons => {
      this.DataSector = ResultCons
      this.keywordSector = 'DSCRPCION_SCTOR';
    })
  }
  selectSector(item: any) {
    this.SelectSector = item.ID_SCTOR_OFRTA;
    this.ConsConductoresOferta();
  }

  LimpiaSector(value: string) {
    this.Sector = "";
    this.SelectSector = value;
  }
  //#endregion MetodosSelectSector

  //#region ConsultaConductoresAsociadosAoferta
  ConsConductoresOferta() {
    this.DataUsersGruposMilla = [];
    this.ServiciosValorar.ConscGrupoMilla('1', this.SelectSector, this.SelectOferta).subscribe(ResultCons => {
      for (var i = 0; i < ResultCons.length; i++) {
        this.DataGruposMilla(ResultCons[i].IdGrupo, ResultCons[i].IdConductor);
      }
    });
  }
  //#endregion ConsultaConductoresAsociadosAoferta

  //#region ConsGruposOferta
  DataGruposMilla(IdGrupo: string, IdConductor: string) {
    let IdGruposMilla: any = [];
    var index: number = 0;

    this.ServiciosValorar.ConsentregasConductor(IdGrupo, IdConductor, this.SelectSector, this.SelectOferta).subscribe(ResultCons => {
      for (var i = 0; i < ResultCons.length; i++) {
        if (IdGruposMilla.includes(ResultCons[i].IdGrupoMilla)) {
          index = IdGruposMilla.indexOf(ResultCons[i].IdGrupoMilla);

          ResultCons[i].producto_add2 = "<p>" + ResultCons[i].producto_add2.replace("|","<br><br>") + "</p>";

          this.DataUsersGruposMilla[index].Entregas.push(ResultCons[i]);
        } else {
          IdGruposMilla.push(ResultCons[i].IdGrupoMilla);
          ResultCons[i].producto_add2 = "<p>" + ResultCons[i].producto_add2.replace("|","<br><br>") + "</p>";
          this.DataUsersGruposMilla.push({ NMBRE_CNDCTOR: ResultCons[i].NMBRE_CNDCTOR.trim(), Entregas: [ResultCons[i]] });
        }
      }
      console.log(this.DataUsersGruposMilla)
    });
  }
  //#endregion ConsGruposOferta
}

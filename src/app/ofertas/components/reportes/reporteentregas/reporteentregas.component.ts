import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CrearofertaService } from 'src/app/core/crearoferta.service';

@Component({
  selector: 'app-reporteentregas',
  templateUrl: './reporteentregas.component.html',
  styleUrls: ['./reporteentregas.component.css']
})
export class ReporteentregasComponent implements OnInit {

  constructor(private ServiciosValorar: ValorarofertaService, private ServiciosOferta: CrearofertaService,) { }

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

  //#region VariablesTableDinac
  NumberColspan: number = 5;
  //#endregion VariablesTableDinac
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

          ResultCons[i].producto_add2 = "<p>" + ResultCons[i].producto_add2.replace("|", "<br><br>") + "</p>";

          this.DataUsersGruposMilla[index].Entregas.push(ResultCons[i]);
        } else {
          IdGruposMilla.push(ResultCons[i].IdGrupoMilla);
          ResultCons[i].producto_add2 = "<p>" + ResultCons[i].producto_add2.replace("|", "<br><br>") + "</p>";
          this.DataUsersGruposMilla.push({ NMBRE_CNDCTOR: ResultCons[i].NMBRE_CNDCTOR.trim(), Entregas: [ResultCons[i]] });
        }
      }
      console.log(this.DataUsersGruposMilla)
    });
  }
  //#endregion ConsGruposOferta

  //#region EvioEmail
  async EnvioEmail(id: string) {
    await new Promise((resolve, reject) => {
      this.NumberColspan = 5;
      this.EnvioPdfEmail(id);
      resolve(true);
    });


  }
  EnvioPdfEmail(id: string) {
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };


    var DATAg = document.getElementById(id);
    var DATAFirma = document.getElementById("Firma");

    var imgFirma: any;
    if (DATAg != null) {


      html2canvas(DATAg, options).then((canvas) => {
        var imgDos = canvas.toDataURL('image/PNG');
        imgFirma = canvas.toDataURL('image/PNG');
        var imgPropDso = (doc as any).getImageProperties(imgDos);

        var pdfWidthDso = doc.internal.pageSize.getWidth() - 2 * 15;
        var pdfHeightDso = (imgPropDso.height * pdfWidthDso) / imgPropDso.width;

        doc.addImage(imgDos, 'PNG', 15, 15, pdfWidthDso, pdfHeightDso, undefined, 'FAST');
        doc.addImage(imgFirma, 'PNG', 15, 15, pdfWidthDso, pdfHeightDso, undefined, 'FAST');

        const bytesPDF = doc.output('arraybuffer');
        const blobPDF = new Blob([bytesPDF], { type: 'application/pdf' });
        const archivoPDF = new File([blobPDF], 'documento.pdf', { type: 'application/pdf' });
        this.CargaImagen('7143',archivoPDF);
      })
    }
  }
  //#endregion EvioEmail

  //#region EnvioEmail
  public CargaImagen(UsuCod: string, pdf: any) {
    this.ServiciosValorar.postFilePdf('1', '0', '0', '246', UsuCod, '0', pdf).subscribe(response => {
      console.log(response);
    },
      error => {

      }
    );
  }
  //#endregion EnvioEmail
}
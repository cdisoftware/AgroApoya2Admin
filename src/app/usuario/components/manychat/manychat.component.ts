import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
@Component({
  selector: 'app-manychat',
  templateUrl: './manychat.component.html',
  styleUrls: ['./manychat.component.css']
})
export class ManychatComponent implements OnInit {

  constructor(private serviciosoferta: ValorarofertaService,
  ) { }

  //variales Estado pago
  DataEstadoPago: any = [];
  keywordEsPago: string = '';
  SelectorEstPago: string = '';
  EstadoPago: string = '';
  //variables sectores
  DataSectores: any = [];
  keywordSec: string = '';
  SectorSelec: string = '';
  Sector: string = '';

  ngOnInit(): void {
    this.ConsultaEstadoPago();
    this.ConsultaSectores();
  }

  ConsultaEstadoPago() {
    this.serviciosoferta.ConsultaCompraPagos('2').subscribe(ResultCons => {
      console.log(ResultCons);
      this.DataEstadoPago = ResultCons
      this.keywordEsPago = 'descripcion';
    })
  }
  selectEstadoPago(sector: any) {
    this.SelectorEstPago = sector.codigo.toString();
  }
  LimpiaEstadoPago(EsPago: String) {
    this.SelectorEstPago = "" + EsPago;
  }

  ConsultaSectores() {
    this.serviciosoferta.ConsultaSectores('1', '0', '0', '0', '0').subscribe(ResultCons => {
      this.DataSectores = ResultCons
      this.keywordSec = 'DSCRPCION_SCTOR';
    })
  }
  selectSector(sector: any) {
    this.SectorSelec = sector.SCTOR_OFRTA;
  }
  LimpiaSector(Sector: String) {
    this.SectorSelec = "" + Sector;
  }

}

import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';

@Component({
  selector: 'app-adminsectores',
  templateUrl: './adminsectores.component.html',
  styleUrls: ['./adminsectores.component.css']
})
export class AdminsectoresComponent implements OnInit {
  SessionOferta: any;
  IdDepa: string = "";
  IdCiudad: string = "";

  constructor(private modalService: NgbModal, public sectoresservices: ValorarofertaService, public rutas: Router, private cookies: CookieService, private ServiciosGenerales: MetodosglobalesService) { }

  DataZonas: any = [];
  keywordZonasAsignaSector: string = '';
  Cant: string = '';
  seleczona: string = '0';
  ZonaAsignaSector: string = '';


  DataTipoSector: any = [];
  keywordTipoSector: string = "Descripcion";
  TipoSector: string = "";

  DataSectores: any = [];


  DataBodegas: any = [];
  keywordBodega: string = 'NombreBodega';
  Bodega: string = '';

  NombreBodega: string = "";
  DireccionBodega: string = "";
  CoordenadasBodega: string = "";
  IdBodega: string = "";

  ngOnInit(): void {
    this.SessionOferta = this.cookies.get('IDO');

    this.ConsultaCiudadOferta();
    this.ConsultaDetalleOferta();
    this.ConsultaTipoSector();
    this.ConsultaSectores('0');
  }

  ConsultaDetalleOferta() {
    this.sectoresservices.ConsultaOferta('1', this.SessionOferta).subscribe(ResultConsu => {
      this.IdDepa = ResultConsu[0].MunicipioEntrega;
      this.IdCiudad = ResultConsu[0].deptoEntrega;
      this.ConsultaBodegas();
    })
  }

  ConsultaCiudadOferta() {
    this.sectoresservices.ConsultaCiudadOferta('1', this.SessionOferta).subscribe(ResultadoCons => {
      this.ConsultaZonas(ResultadoCons[0].CD_MNCPIO, ResultadoCons[0].CD_RGION);
    })
  }


  ConsultaZonas(idCiudad: string, IdDepartamento: string) {
    const descripcion = {
      "Descripcion": ""
    }
    this.sectoresservices.ConsZona('1', '0', idCiudad, IdDepartamento, descripcion).subscribe(ResultadoCons => {
      this.DataZonas = ResultadoCons;
      this.keywordZonasAsignaSector = 'Descripcion';

    })
  }
  selectZona(item: any) {
    //this.Sessionzona = item.id;
    //this.ConsultaSectores(item.id);
    if (this.Cant != "" && this.Cant != "0") {
      this.seleczona = '1';
    }
    //Cada vez que seleccione una zona debo ir a consultar los sectores de esa zona, metodo ConsultaSectores(),
    //a dicho metodo falta agregarle parametro idzona
  }
  LimpiaZona(result: string) {
    this.ZonaAsignaSector = result;
    this.seleczona = '0';
    this.Cant = '';
  }


  ConsultaTipoSector(){
    this.DataTipoSector = [];
    this.DataTipoSector.push({IdTs: "1", Descripcion: "Temporal"});
    this.DataTipoSector.push({IdTs: "2", Descripcion: "Permanente"});
  }
  SelectTipoSect(item: any){

  }
  LimpiaTipoSect(){

  }






  ConsultaBodegas() {
    this.sectoresservices.ConsultaBodegas('1', this.IdCiudad, this.IdDepa).subscribe(Resultado => {
      if (Resultado.length > 0) {
        this.DataBodegas = Resultado
      }
    })
  }
  selectBodega(item: any) {
    this.NombreBodega = item.NombreBodega
    this.DireccionBodega = item.Direccion
    this.CoordenadasBodega = item.Coordenadas
    this.IdBodega = item.IdBodega
  }
  LimpiaBodega() {
    this.IdBodega = '';
  }



  ConsultaSectores(IdZona: string) {
    this.sectoresservices.ConsultaSectoresEtv('1', '0', IdZona, '0').subscribe(Result => {
      console.log(Result)
      this.DataSectores = Result;
    })
  }
}

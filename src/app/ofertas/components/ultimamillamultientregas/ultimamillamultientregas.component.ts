import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-ultimamillamultientregas',
  templateUrl: './ultimamillamultientregas.component.html',
  styleUrls: ['./ultimamillamultientregas.component.css']
})
export class UltimamillamultientregasComponent implements OnInit, AfterViewInit {
  constructor(private modalService: NgbModal, public sevicesmilla: GrupoMillaServices, public sectoresservices: ValorarofertaService) { }

  //#region General
  IdGrugo_: string = "0";
  //#endregion General

  //#region ModalMensaje
  @ViewChild('ModalMensaje', { static: false }) ModalMensaje: any;
  MesajeModal: string = "";
  //#endregion ModalMensaje

  //#region EstadoProceso
  //0 Botones nuevo transporte o editar transporte
  //1 Nuevo Transporte
  //2 Consulta Ofertas para asignar entregas
  IdEstadoProceso: string = "2";
  //#endregion EstadoProceso

  //#region  CreaTransporte
  //#region Variables
  ValorFlete: string = "";
  FechaEntrega: string = "";//2023/10/31
  UbicacionEntrega: string = "";
  //#endregion Variables
  //#region Bodega
  DataBodegas: any = [];
  NombreBodega: string = "";
  Bodega: string = "";
  //#endregion Bodega
  //#endregion CreaTransporte

  //#region ConsultaTransporte
  ArrayConsTransporte: any = [];
  //#endregion ConsultaTransporte

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    //Borrar
    this.ConsultaTransporte();
    //Borrar

    this.ConsultaListas();
  }


  //#region CambioEstadoProceso
  CambioEstadoProceso() {
    if (this.IdEstadoProceso == '0') {
      this.IdEstadoProceso = '1';
    }
  }
  //#endregion CambioEstadoProceso

  //#region General
  ConsultaListas() {
    this.ConsultaBodegas();
  }
  //#endregion General



  //#region CreaTransporte

  //#region Bodega
  ConsultaBodegas() {
    this.sectoresservices.ConsultaBodegas("2", '401', '2161', '0').subscribe(Resultado => {
      if (Resultado.length > 0) {
        this.DataBodegas = Resultado;
      }
    })
  }
  selectBodega(item: any) {
    this.NombreBodega = item.NombreBodega;
    this.Bodega = item.NombreBodega;
  }
  LimpiaBodega(limpia: string) {
    this.NombreBodega = limpia;
    this.Bodega = "";
  }
  //#endregion Bodega

  //#region creaTransporte
  CreaTransporte() {
    if (this.NombreBodega != "" && Number(this.ValorFlete) >= 0 && this.FechaEntrega != "" && this.UbicacionEntrega != "") {
      const body = {
        IdGrupoMilla: 0,
        ValorFlete: Number(this.ValorFlete),
        FechaEntrega: this.FechaEntrega,
        UbicacionEntrega: this.UbicacionEntrega,
        UbicacionRecoge: this.NombreBodega
      }
      this.sevicesmilla.CreaTransporteEntrega('4', body).subscribe(Resultado => {
        const result = Resultado.split("|");
        this.IdGrugo_ = result[0];
        this.ConsultaTransporte();
      })


    } else {
      this.MesajeModal = "Por favor, verifique los datos ingresados e inténtente nuevamente.";
      this.modalService.open(this.ModalMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
  }
  //#endregion creaTransporte
  //#endregion CreaTransporte

  //#region ConsultaTransporte
  ConsultaTransporte() {
    this.ArrayConsTransporte = [];
    this.IdEstadoProceso = "2";
    this.sevicesmilla.ConsultaTransporte("1", /*this.IdGrugo_*/'1147').subscribe(Respu => {
      for (var i = 0; i < Respu.length; i++) {
        this.ArrayConsTransporte.push({ CD_CNSCTVO: Respu[i].CD_CNSCTVO, IdSector: Respu[i].IdSector, DesSector: Respu[i].DesSector, NumeroDeCompras: Respu[i].NumeroDeCompras, checked: false })
      }
    })
  }
  SetStile(e: any, position: number) {
    this.ArrayConsTransporte[position].checked = e.target.checked;
  }
  //#endregion ConsultaTransporte


  //#region Volver
  Volver() {
    this.IdEstadoProceso = '0';
    this.MesajeModal = "";
    this.IdGrugo_ = "0";

    this.ValorFlete = "";
    this.FechaEntrega = "";
    this.UbicacionEntrega = "";

    this.NombreBodega = "";
    this.Bodega = "";

    this.ArrayConsTransporte = [];
  }
  //#endregion Volver
}
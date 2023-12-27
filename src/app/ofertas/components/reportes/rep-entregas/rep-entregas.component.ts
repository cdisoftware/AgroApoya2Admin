import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-rep-entregas',
  templateUrl: './rep-entregas.component.html',
  styleUrls: ['./rep-entregas.component.css']
})
export class RepEntregasComponent implements OnInit {

  @ViewChild('ModalOferta', { static: false }) ModalOferta: any;
  @ViewChild('ModalFechas', { static: false }) ModalFechas: any;
  @ViewChild('ModalGrupo', { static: false }) ModalGrupo: any;

  constructor(private modalservice: NgbModal) { }

  /*MODAL ID OFERTA */
  ArrayOfertaBuscar: any = [];
  IdOfertaB: string = '';
  CadenaIdOferta: string = '';

  /*MODAL ID GRUPO TRANSPORTE */
  ArrayGrupoBuscar: any = [];
  IdOGrupoB: string = '';
  CadenaIdGrupo: string = '';

  /*MODAL FECHAS */
  FechaIncial: string = '';
  FechaFinal: string = '';

  /*GENERALES */
  smsError: string = ''


  ngOnInit(): void {
  }

  /******** Filtro por oferta */
  AbrirModalIdOferta() {
    this.smsError = '';
    this.IdOfertaB = '';
    this.ArrayOfertaBuscar = [];
    this.modalservice.open(this.ModalOferta, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });

  }

  AgregarIdOfertaClick() {
    this.smsError = '';
    if (this.IdOfertaB != undefined && this.IdOfertaB != null
      && this.IdOfertaB != 'undefined' && this.IdOfertaB != '') {
      this.ArrayOfertaBuscar.push({ IdOfertaB: this.IdOfertaB })
    } else {
      this.smsError = 'El campo Id oferta es obligatario';
    }
    this.IdOfertaB = '';
  }

  QuitarIdOfertaClick(idOferta: string) {
    var ArregloTempo: any = this.ArrayOfertaBuscar;
    this.ArrayOfertaBuscar = [];
    for (var a = 0; ArregloTempo.length > a; a++) {
      if (idOferta != ArregloTempo[a].IdOfertaB) {
        this.ArrayOfertaBuscar.push(ArregloTempo[a])
      }
    }
  }

  BuscarIdOfertaClick() {
    this.CadenaIdOferta = ''
    var pruebaNum: Boolean = false;
    for (var a = 0; this.ArrayOfertaBuscar.length > a; a++) {
      console.log(this.ArrayOfertaBuscar[a].IdOfertaB)
      isNaN(this.ArrayOfertaBuscar[a].IdOfertaB)
      console.log(isNaN(this.ArrayOfertaBuscar[a].IdOfertaB))
      if (isNaN(this.ArrayOfertaBuscar[a].IdOfertaB) == true) {
        pruebaNum = true;
      }
      this.CadenaIdOferta = this.CadenaIdOferta + this.ArrayOfertaBuscar[a].IdOfertaB + ','
    }

    if (pruebaNum == true) {
      this.smsError = 'Todos los valores ingresados deben ser númericos';
    } else {

    }
  }

  /******** Filtro por grupo */
  AbrirModalIdGrupos() {
    this.smsError = '';
    this.IdOGrupoB = '';
    this.ArrayGrupoBuscar = [];
    this.modalservice.open(this.ModalGrupo, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });

  }

  AgregarIdGrupoClick() {
    this.smsError = '';
    if (this.IdOGrupoB != undefined && this.IdOGrupoB != null
      && this.IdOGrupoB != 'undefined' && this.IdOGrupoB != '') {
      this.ArrayGrupoBuscar.push({ IdOGrupoB: this.IdOGrupoB })
    } else {
      this.smsError = 'El campo Id grupo es obligatario';
    }
    this.IdOGrupoB = '';
  }

  QuitarIdGrupoClick(idGrupo: string) {
    var ArregloTempo: any = this.ArrayGrupoBuscar;
    this.ArrayGrupoBuscar = [];
    for (var a = 0; ArregloTempo.length > a; a++) {
      if (idGrupo != ArregloTempo[a].IdOGrupoB) {
        this.ArrayGrupoBuscar.push(ArregloTempo[a])
      }
    }
  }

  BuscarIdGrupoClick() {
    this.CadenaIdGrupo = ''
    var pruebaNum: Boolean = false;
    for (var a = 0; this.ArrayGrupoBuscar.length > a; a++) {
      console.log(this.ArrayGrupoBuscar[a].IdOGrupoB)
      isNaN(this.ArrayGrupoBuscar[a].IdOGrupoB)
      console.log(isNaN(this.ArrayGrupoBuscar[a].IdOGrupoB))
      if (isNaN(this.ArrayGrupoBuscar[a].IdOGrupoB) == true) {
        pruebaNum = true;
      }
      this.CadenaIdGrupo = this.CadenaIdGrupo + this.ArrayGrupoBuscar[a].IdOGrupoB + ','
    }

    if (pruebaNum == true) {
      this.smsError = 'Todos los valores ingresados deben ser númericos';
    } else {

    }
  }

  /******** Filtro por grupo */

  AbrirModalFechas() {
    this.FechaFinal = '';
    this.FechaIncial = '';
    this.smsError = '';
    this.modalservice.open(this.ModalFechas, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });

  }

  BuscarFechaClick() {
    if (this.FechaFinal == '' && this.FechaIncial == '') {
      this.smsError = 'Mínimo una de las fechas es obligatoria';
    } else {

    }
  }
}


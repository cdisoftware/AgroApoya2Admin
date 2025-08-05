import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service'

@Component({
  selector: 'app-minimocompratotal',
  templateUrl: './minimocompratotal.component.html',
  styleUrls: ['./minimocompratotal.component.css']
})
export class MinimocompratotalComponent implements OnInit {

  IdOferta: string = '';

  ArrayCompraGeneral: any = [];
  ArrayCompraDetalle: any = [];

  ListTipoRelacionGeneral: any = [];
  PesocompraDetalle: string = '';
  mascaraPesoCompra: string = '';
  IdTipoRelacionGeneral: string = '';

  verOcultarModal:string = '';

  constructor(
    private modalService: NgbModal,
    private ServiciosService: ServiciosService,
  ) { }

  @ViewChild('ModalEditarGeneral', { static: false }) ModalEditarGeneral: any;

  ngOnInit(): void {
  }

  BusquedaGeneral() {
    var ofertaAux = '0';
    if (this.IdOferta == '') {
      ofertaAux = this.IdOferta;
    }
    this.modalService.open(this.ModalEditarGeneral, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })

  }

  LimpiazaGeneral() {
    this.IdOferta = '';
  }

  SeleccionarGeneral(idOfer:string){

  }

  SeleccionarEspecifico(IdDetalle:string){
    
  }

  GuardarGeneral(){

  }

  GuardarEspecifico(){

  }

}

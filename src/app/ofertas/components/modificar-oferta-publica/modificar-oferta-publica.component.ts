import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modificar-oferta-publica',
  templateUrl: './modificar-oferta-publica.component.html',
  styleUrls: ['./modificar-oferta-publica.component.css']
})
export class ModificarOfertaPublicaComponent implements OnInit {

  //VariablesFiltro Oferta
  ArrayOferta: any = [];
  keywordOferta: string = '';
  SelectorOferta: string = '0';
  OfertaSelect: string = '';
  Oferta: string = '';

  //variables tipo de oferta
  

  constructor(private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService) { }

  ngOnInit(): void {
    this.ConsultaOferta();
  }


  ConsultaOferta() {
    const datosbusqueda = {
      UsuCodig: 0,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: 0,
      VigenciaHasta: 0,
      IdEstado_Oferta: 0,
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    this.ServiciosValorar.BusquedaOferta('2', this.SelectorOferta, '0', '0', datosbusqueda).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      this.keywordOferta = 'Producto';
    })
  }
  LimpiaOferta(Valor: string) {
    this.Oferta = Valor;
    this.SelectorOferta = '0';
  
  }
  selectOfertaFiltro(item: any) {
    this.SelectorOferta = item.cd_cnsctvo.toString();
    this.OfertaSelect = item.Producto;

  }

}

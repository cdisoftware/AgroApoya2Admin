import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service';

@Component({
  selector: 'app-coordenadasusuarios',
  templateUrl: './coordenadasusuarios.component.html',
  styleUrls: ['./coordenadasusuarios.component.css']
})
export class CoordenadasusuariosComponent implements OnInit {

  ValidaMapSector: string = '0';

  // Variables filtros
  UsucodigFiltro: string = '';
  NombreFiltro: string = '';
  ArrayUsucodig: any = [];
  keywordConSec: string = 'usucodig';

  Usucodig: string = '0';
  DataUsuarios: any = [];
  VerOcultarCampos: string = '1';

  //Variables Datos usuario
  DatosUser: any = [];
  ValidaInsertSec: string = '1';

  constructor(private serviciosvaloracion: ValorarofertaService,) { }

  ngOnInit(): void {
    this.ConsultaUsuarios();

  }

  ConsultaUsuarios() {
    const body = {
      nombres_persona: this.NombreFiltro
    }
    this.serviciosvaloracion.ConsultaListaPersonas('1', '1', '0', body).subscribe(Resultado => {
      this.ArrayUsucodig = Resultado;
    })
  }

  selectUsucodig(item: any) {
    this.Usucodig = item.usucodig;
    this.NombreFiltro = item.NombreCompleto
  }

  LimpiaUsucodig(Valor: string) {
    this.UsucodigFiltro = Valor;
    this.NombreFiltro = '';
    this.Usucodig = '0';
  }

  BuscarUsuarios() {
    const body = {
      nombres_persona: this.NombreFiltro
    }
    this.serviciosvaloracion.ConsultaListaPersonas('1', '0', this.Usucodig, body).subscribe(Resultado => {
      this.DataUsuarios = Resultado;
      this.VerOcultarCampos = '2';
    })
  }
  LimpiarFiltros() {
    this.LimpiaUsucodig('');
    this.NombreFiltro = '';
    this.Usucodig = '0';
    this.VerOcultarCampos = '1';
  }


  AccionMapaUsuario(idValor: any) {  
    this.VerOcultarCampos = '3';
    const body = {
      nombres_persona: idValor.nombres_persona
    }
    this.serviciosvaloracion.ConsultaListaPersonas('1', '0', idValor.usucodig, body).subscribe(Resultado => {
      this.DatosUser = Resultado;     
    })
  }

}

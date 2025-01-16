import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';
@Component({
  selector: 'app-validar-usuario',
  templateUrl: './validar-usuario.component.html',
  styleUrls: ['./validar-usuario.component.css']
})
export class ValidarUsuarioComponent {

  @ViewChild('ModalValidarUsuario') ModalValidarUsuario!: any;
  mapa: google.maps.Map | undefined;

  //localidad 
  ArrayLocalidadesFiltro: any = []
//Validar Persona
  ArrayPersona: any = []
//validar Usuario En la tabla 
  ArrayValidar: any = []

//Varables para navegar entre los usuario
  Flechas: any[] = [];
  DelanteAtras = 0;



  IdUsuario: string = '';

  constructor(private modalService: NgbModal, public ServiciosGenerales: ServiciosService,) {}

  ngOnInit(): void {
    this.cargasIniciales()

  }

  cargasIniciales(): void{
    this.ServiciosGenerales.consTipoLocalidad('3').subscribe(Resultado => {
      this.ArrayLocalidadesFiltro = Resultado;
      console.log(Resultado, 'lllllllll')
    });
    this.ServiciosGenerales.consValidaUsuario('1', '0', '0', '0', '0').subscribe(Rest => {
      this.ArrayValidar = Rest; 
      console.log(Rest, 'mmmmmmmm')
    });
    this.ServiciosGenerales.consPersonaValidador('1').subscribe( Rest =>{
      this.ArrayPersona = Rest;
      console.log(Rest, 'Val')
    })
  }

  ModalValidacionUsuario(): void {
     this.modalService.open(this.ModalValidarUsuario, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
    this.inicializarMapa()
  }

  inicializarMapa(): void {
    const mapElement = document.getElementById('mapaModal');
    if (mapElement && !this.mapa) {
      const opcionesMapa: google.maps.MapOptions = {
        center: { lat: 4.6097100, lng: -74.0817500 },
        zoom: 12,
      };
      this.mapa = new google.maps.Map(mapElement, opcionesMapa);
    }
  }
  BtnFlechas(direction: 'prev' | 'next'): void{
     this.Flechas.length;
    if (direction === 'prev') {
      this.DelanteAtras = (this.DelanteAtras);
    } else if (direction === 'next') {
      this.DelanteAtras = (this.DelanteAtras);
    }
  }
}
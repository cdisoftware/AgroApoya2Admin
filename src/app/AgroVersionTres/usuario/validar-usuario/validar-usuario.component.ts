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

  //Variables para los filtros
  ArrayLocalidadesFiltro: any = []
  ArrayPersona: any = []
  FiltroTelefono: string = '';
  FiltroUsucodig: string = '';
  FiltroLocalidad: string = '0';
  FiltroPersona: string = '0';

  //Informacion de Usuario En la tabla 
  ArrayResultadosPersona: any = []

  //Varables para navegar entre los usuario
  CountTabla: Number = 0; // Guardar la cantidad de items de la tabla
  DelanteAtras = 0;

  // Variables en el modal
  ItemAuxModal: any = [];
  mapa: google.maps.Map | undefined;
  geocoder = new google.maps.Geocoder();
  markers: google.maps.Marker[] = [];


  constructor(private modalService: NgbModal, public ServiciosGenerales: ServiciosService,) { }

  ngOnInit(): void {
    this.cargasIniciales()
  }

  cargasIniciales(): void {
    this.ServiciosGenerales.consTipoLocalidad('3').subscribe(Resultado => {
      this.ArrayLocalidadesFiltro = Resultado;
    });
    this.ServiciosGenerales.consPersonaValidador('1').subscribe(Rest => {
      this.ArrayPersona = Rest;
      console.log(Rest)
    })

  }

  //Accion Bontones filtros
  BtnLimpiarClick() {
    this.FiltroTelefono = '';
    this.FiltroUsucodig = '';
    this.FiltroLocalidad = '0';
    this.FiltroPersona = '0';
  }

  BtnBuscar() {
    var auxFiltroTelefono: string = '0';
    var auxFiltroUsucodig: string = '0';

    if (this.FiltroTelefono != '' && this.FiltroTelefono != undefined) {
      auxFiltroTelefono = this.FiltroTelefono;
    }

    if (this.FiltroUsucodig != '' && this.FiltroUsucodig != undefined) {
      auxFiltroUsucodig = this.FiltroUsucodig;
    }

    this.ServiciosGenerales.consValidaUsuario('1', this.FiltroLocalidad, this.FiltroPersona, auxFiltroTelefono, auxFiltroUsucodig).subscribe(Rest => {
      this.ArrayResultadosPersona = Rest;
      this.CountTabla = this.ArrayResultadosPersona.length;
      console.log(Rest)
    });

  }

  ModalValidacionUsuario(ItemConsulta: any) {
    //TODO
    // DelanteAtras DEBE GUARDAR LA POSISION DEL USUARIO SELECCIONADO EN ESTA VARIABLE
    this.ItemAuxModal = ItemConsulta;
    console.log(this.ItemAuxModal)
    this.modalService.open(this.ModalValidarUsuario, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
    this.inicializarMapa()
  }

  inicializarMapa(): void {
    this.geocoder.geocode({ address: 'Bogotá, Colombia' }).then((result) => {
      const { results } = result;
      var lati = results[0].geometry.location.lat();
      var longi = results[0].geometry.location.lng();
      this.mapa = new google.maps.Map(
        document.getElementById('mapaModal') as HTMLElement,
        {
          zoom: 13,
          center: { lat: lati, lng: longi },
        }
      );

      this.mapa.addListener("click", (e: any) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        alert(lat)
        alert(lng)
      });
    })
  }

  BtnFlechas(direction: 'prev' | 'next'): void {
    if (direction === 'prev') {
      this.DelanteAtras = this.DelanteAtras - 1;
      //todo
      //Validar que la variable DelanteAtras no sea menor que 0
    } else if (direction === 'next') {
      this.DelanteAtras = this.DelanteAtras + 1;
      this.ItemAuxModal = this.ArrayResultadosPersona[this.DelanteAtras];
      //todo
      //Validar que la variable DelanteAtras no sea mayor que la longitud del arreglo osea CountTabla
    }

    // TODO SI LA VARIABLE   this.DelanteAtras ES IGUAL A 0, NO ME MUESTRE LA FLECJHA PRIMERA
    // SI LA VARAIBALE DelanteAtras ES IGUAL A CountTabla NO ME MUESTE LA ULTIMA FLECHA
  }

}
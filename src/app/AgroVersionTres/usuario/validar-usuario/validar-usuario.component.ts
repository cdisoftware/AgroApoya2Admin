import { Component, ViewChild,NgZone  } from '@angular/core';
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
  MostrasTabla: string = '0';

  //Varables para navegar entre los usuario
  CountTabla: number = 0; // Guardar la cantidad de items de la tabla
  DelanteAtras = 0;

  // Variables en el modal
  ItemAuxModal: any = [];
  mapa: google.maps.Map | undefined;
  geocoder = new google.maps.Geocoder();
  markers: google.maps.Marker[] = [];

  MostrarFlecha: string = '0';

  constructor(private modalService: NgbModal, public ServiciosGenerales: ServiciosService,private ngZone: NgZone) { }

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
    this.MostrasTabla = '0';
  }

  BtnBuscar() {
    this.MostrasTabla = '1';

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

    // Variable para almacenar el marcador actual
    let marcadorActual: google.maps.Marker | null = null;

    // capturar clics en el mapa
    this.mapa.addListener('click', (marcadores: google.maps.MapMouseEvent) => {
      if (marcadores.latLng) {
        const lat = marcadores.latLng.lat();
        const lng = marcadores.latLng.lng();

        // Eliminar el marcador anterior si existe
        if (marcadorActual) {
          marcadorActual.setMap(null);
        }

        // Agregar un nuevo marcador al mapa
        marcadorActual = new google.maps.Marker({
          position: { lat, lng },
          map: this.mapa,
        });

        // Si ItemAuxModal 
        // existe, actualizamos sus coordenadas
        if (this.ItemAuxModal) {
          this.ngZone.run(() => {
            this.ItemAuxModal.Coordenadas = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          })
       }
      }
    });
  });
}

BtnFlechas(direction: 'prev' | 'next'): void {
  if (direction === 'prev') {
    if (this.DelanteAtras > 0) {
      this.DelanteAtras -= 1;
      this.ItemAuxModal = this.ArrayResultadosPersona[this.DelanteAtras];
    }
  } else if (direction === 'next') {
    if (this.DelanteAtras < this.CountTabla - 1) {
      this.DelanteAtras += 1;
      this.ItemAuxModal = this.ArrayResultadosPersona[this.DelanteAtras];
    }
  }
}

}
//todo
      //Validar que la variable DelanteAtras no sea mayor que la longitud del arreglo osea CountTabla

// TODO SI LA VARIABLE   this.DelanteAtras ES IGUAL A 0, NO ME MUESTRE LA FLECJHA PRIMERA
    // SI LA VARAIBALE DelanteAtras ES IGUAL A CountTabla NO ME MUESTE LA ULTIMA FLECHA
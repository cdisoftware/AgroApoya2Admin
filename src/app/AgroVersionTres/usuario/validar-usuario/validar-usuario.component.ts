import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, ViewChild, NgZone } from '@angular/core';
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

  // Variables en el modal
  ItemAuxModal: any = [];
  mapa: google.maps.Map | undefined;
  geocoder = new google.maps.Geocoder();
  markers: google.maps.Marker[] = [];
  CountTabla: number = 0; // Guardar la cantidad de items de la tabla
  PosicionArreglo = 0;
  MostrarFlecha: string = '0';
  ModalPersona: string = '0';

  constructor(
    private ngZone: NgZone,
    private modalService: NgbModal,
    public ServiciosGenerales: ServiciosService) { }

  ngOnInit(): void {
    this.cargasIniciales()
  }

  cargasIniciales(): void {
    this.ServiciosGenerales.consTipoLocalidad('3').subscribe(Resultado => {
      this.ArrayLocalidadesFiltro = Resultado;
    });
    this.ServiciosGenerales.consPersonaValidador('1').subscribe(Rest => {
      this.ArrayPersona = Rest;
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
      console.log(Rest)
      this.CountTabla = this.ArrayResultadosPersona.length;
    });
  }

  //Acciones de la tabla
  ModalValidacionUsuario(ItemConsulta: any) {
    this.ItemAuxModal = ItemConsulta;
    console.log(this.ItemAuxModal)

    for (var i = 0; i <= this.ArrayResultadosPersona.length; i++) {
      if (this.ArrayResultadosPersona[i].IdUsuario == ItemConsulta.IdUsuario) {
        this.PosicionArreglo = i;
        break;
      }
    }

    this.modalService.open(this.ModalValidarUsuario, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });

    this.InicializarMapa(ItemConsulta.Coordenadas)
  }

  //Acciones Modal
  InicializarMapa(positcion: string) {
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

      if (this.mapa != undefined) {
        const [lat, lng] = positcion.split(',').map(coord => parseFloat(coord.trim()));
        const latLng = new google.maps.LatLng(lat, lng);
        this.AgregarMarcador(latLng, this.mapa);
      }

      // capturar clik en el mapa
      this.mapa.addListener('click', (marcadores: google.maps.MapMouseEvent) => {
        if (marcadores.latLng) {
          const lat = marcadores.latLng.lat();
          const lng = marcadores.latLng.lng();
          this.ngZone.run(() => {
            this.ItemAuxModal.Coordenadas = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          })
          if (this.mapa != undefined) {
            this.AgregarMarcador(marcadores.latLng, this.mapa);
          }
        }
      });
    });
  }

  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    if (this.markers.length > 0) {
      this.markers[0].setMap(null)
    }
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers = [];
    this.markers.push(marker);
  }

  BuscarMapaDireccion() {
    this.geocoder.geocode({ address: 'Bogotá ' + this.ItemAuxModal.Direccion }).then((result) => {
      const { results } = result;
      var lati = results[0].geometry.location.lat();
      var longi = results[0].geometry.location.lng();

      if (this.mapa != undefined) {
        const latLng = new google.maps.LatLng(lati, longi);
        this.AgregarMarcador(latLng, this.mapa);
      }
    });
  }

  BtnFlechas(direction: 'prev' | 'next'): void {
    if (direction === 'prev') {
      if (this.PosicionArreglo > 0) {
        this.PosicionArreglo -= 1;
        this.ItemAuxModal = this.ArrayResultadosPersona[this.PosicionArreglo];
        console.log(this.ItemAuxModal)
      }
    } else if (direction === 'next') {
      if (this.PosicionArreglo < this.CountTabla - 1) {
        this.PosicionArreglo += 1;
        this.ItemAuxModal = this.ArrayResultadosPersona[this.PosicionArreglo];
        console.log(this.ItemAuxModal)
      }
    }
    this.InicializarMapa(this.ItemAuxModal.Coordenadas);
  }

  BtnActualizarUsuario() {
    if (this.ItemAuxModal.Direccion == '' || this.ItemAuxModal.Direccion == undefined) {
      alert('El campo Dirección es obligatorio')
    } else if (this.ItemAuxModal.Coordenadas == '' || this.ItemAuxModal.Coordenadas == undefined) {
      alert('El campo Coordenadas es obligatorio')
    } else {
      const body = {
        IdUsuario: this.ItemAuxModal.IdUsuario,
        NombrePersona: this.ItemAuxModal.NombrePersona,
        Direccion: this.ItemAuxModal.Direccion,
        ComplementoDireccion: this.ItemAuxModal.ComplementoDireccion,
        Coordenadas: this.ItemAuxModal.Coordenadas,
        UsuarioTraza: "Juan M",
        Correo: this.ItemAuxModal.Correo,
        Celular: this.ItemAuxModal.Celular,
        id_manychat: this.ItemAuxModal.id_manychat,
        Observacion: this.ItemAuxModal.Observacion
      }
      console.log(body)
      this.ServiciosGenerales.modActualizaInfoUsuario('1', body).subscribe(Rest => {
        alert(Rest)
        this.ServiciosGenerales.consValidaUsuario(this.ItemAuxModal.IdUsuario, '0', '0', '0', '0').subscribe(RestUsuario => {
          for (var i = 0; i <= RestUsuario.length; i++) {
            if (RestUsuario[i].IdUsuario == this.ItemAuxModal.IdUsuario) {
              this.ItemAuxModal = RestUsuario[i];
              console.log(this.ItemAuxModal)
              break;
            }
          }
        });
      });
    }
  }

}
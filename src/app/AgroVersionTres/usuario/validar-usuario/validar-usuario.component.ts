import * as fs from 'file-saver';
import { Workbook } from 'exceljs'
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
  @ViewChild('ModalAtualizarSector') ModalAtualizarSector!: any;

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

  // Variables en el modal para actualizar la direccion de la persona
  ItemAuxModal: any = [];
  mapa: google.maps.Map | undefined;
  geocoder = new google.maps.Geocoder();
  markers: google.maps.Marker[] = [];
  CountTabla: number = 0; // Guardar la cantidad de items de la tabla
  PosicionArreglo = 0;
  MostrarFlecha: string = '0';
  ModalPersona: string = '0';

  //Variables De sectores Modal 
  AuxPestanas: string = '1'
  ArrayLocalidaDefinidos: any = []
  ArrayLocalidadesOferta: any = []

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
    });
    this.ServiciosGenerales.consTipoLocalidad('4').subscribe(Resultado => {
      this.ArrayLocalidaDefinidos = Resultado;
    });
    this.ServiciosGenerales.consTipoLocalidad('5').subscribe(Resultado => {
      this.ArrayLocalidadesOferta = Resultado;
    })
  }

  //Accion Bontones filtros
  BtnLimpiarClick() {
    this.FiltroTelefono = '';
    this.FiltroUsucodig = '';
    this.FiltroLocalidad = '0';
    this.FiltroPersona = '0';
    this.MostrasTabla = '0';
    this.ArrayResultadosPersona = [];
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
    });
  }

  //Acciones de la tabla
  ModalValidacionUsuario(ItemConsulta: any) {
    this.ItemAuxModal = ItemConsulta;

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

  //Acciones Modal para actualizar la dirección del usuario
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
        this.ItemAuxModal.Coordenadas = `${lati.toFixed(6)}, ${longi.toFixed(6)}`;
      }
    });
  }

  BtnFlechas(direction: 'prev' | 'next'): void {
    if (direction === 'prev') {
      if (this.PosicionArreglo > 0) {
        this.PosicionArreglo -= 1;
        this.ItemAuxModal = this.ArrayResultadosPersona[this.PosicionArreglo];
      }
    } else if (direction === 'next') {
      if (this.PosicionArreglo < this.CountTabla - 1) {
        this.PosicionArreglo += 1;
        this.ItemAuxModal = this.ArrayResultadosPersona[this.PosicionArreglo];
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
      this.ServiciosGenerales.modActualizaInfoUsuario('1', body).subscribe(Rest => {
        alert(Rest)
        this.ServiciosGenerales.consValidaUsuario('1', '0', '0', '0', this.ItemAuxModal.IdUsuario).subscribe(RestUsuario => {
          console.log(RestUsuario)
          for (var i = 0; i <= RestUsuario.length; i++) {
            if (RestUsuario[i].IdUsuario == this.ItemAuxModal.IdUsuario) {
              console.log(RestUsuario[i].IdUsuario)
              this.ItemAuxModal = RestUsuario[i];
              break;
            }
          }
        });
      });
    }
  }

  DescargarExcelValidarUsuario() {
    if (this.ArrayResultadosPersona.length == 0) {
      alert('No se encontraron registros para descargar el excel')
    } else {
      // Crear nuevo archivo
      let workbook = new Workbook();

      // Crear una nueva hoja dentro del Excel
      let worksheet = workbook.addWorksheet("Validar Usuario"); // Nombre de la hoja
      let header = [
        'IdUsuario', 'FechaCreacion', 'Nombre', 'Correo',
        'Celular', 'LocalidadPrincipal', 'Direccion',
        'Complementos', 'Coordenadas', 'ObservacionUsuario'
      ];

      worksheet.addRow(header);
      ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1'].map(key => {
        worksheet.getCell(key).fill = {
          type: 'pattern',
          pattern: 'darkTrellis',
          fgColor: { argb: '397c97' },
          bgColor: { argb: '397c97' }
        };
        worksheet.getCell(key).font = {
          color: { argb: 'FFFFFF' }
        };
      });
      worksheet.columns = [
        { width: 20 }, { width: 20 }, { width: 25 }, { width: 30 },
        { width: 15 }, { width: 25 }, { width: 30 },
        { width: 20 }, { width: 40 }, { width: 30 }
      ];
      for (let x1 of this.ArrayResultadosPersona) {
        let temp = [];
        temp.push(x1['IdUsuario']);
        temp.push(x1['fechaRegistro']);
        temp.push(x1['NombrePersona']);
        temp.push(x1['Correo']);
        temp.push(x1['Celular']);
        temp.push(x1['LocalidadPrincipal']);
        temp.push(x1['Direccion']);
        temp.push(x1['ComplementoDireccion']);
        temp.push(x1['Coordenadas']);
        temp.push(x1['Observacion']);

        worksheet.addRow(temp);
      }

      // Guardar archivo Excel
      let fname = "Reporte-ValidarUsuario";
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname + '.xlsx');
      });
    }

  }

  //Secccion para actualizar el sector con las personas correspondientes
  AbrirModalAtualizar(): void {
    this.modalService.open(this.ModalAtualizarSector, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
  }

  BtnSectoresDefinidos(): void {
    this.AuxPestanas = '1'
  }

  BtnSectoresOferta(): void {
    this.AuxPestanas = '2'
  }

  BotonAtualizar(): void {
    this.ServiciosGenerales.conscvalidaususector('1', '350').subscribe(Rest => {
      alert(Rest)
    })
  }

}
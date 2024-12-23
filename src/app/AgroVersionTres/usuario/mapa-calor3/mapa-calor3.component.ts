import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';

@Component({
  selector: 'app-mapa-calor3',
  templateUrl: './mapa-calor3.component.html',
  styleUrls: ['./mapa-calor3.component.css'],
})
export class MapaCalor3Component implements OnInit {
  map: google.maps.Map | null = null; // Tipo opcional para evitar errores
  geocoder = new google.maps.Geocoder();

  // Variables para los filtros
  Comprasfiltros: any = [];
  ArrayLocalidadesFiltro: any = [];
  FiltroFechaIncioCompra: string = '';
  FiltroFechaFinCompra: string = '';
  FiltroFechaRegistro: string = '';
  FiltroLocalidad: string = '0';
  FiltroNumeroCompras: string = '0';

  // Datos para el mapa
  InfoConsMapa: any = [];

  markers: google.maps.Marker[] = [];
  AuxMostrarMapa: string = '0';

  constructor(private cdRef: ChangeDetectorRef, public ServiciosGenerales: ServiciosService) { }

  ngOnInit(): void {
    this.CargaIncialListas();
  }

  CargaIncialListas(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe((Resultado) => {
      this.ArrayLocalidadesFiltro = Resultado;
    });
    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe((Resultado) => {
      this.Comprasfiltros = Resultado;
    });
  }

  BtnLimpiar(): void {
    this.FiltroFechaIncioCompra = '';
    this.FiltroFechaFinCompra = '';
    this.FiltroFechaRegistro = '';
    this.FiltroLocalidad = '0';
    this.FiltroNumeroCompras = '0';
    // Limpiar marcadores del mapa
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
    this.AuxMostrarMapa = '0';
  }

  BtnBuscar(): void {
    var FiltroLocalidad: string = this.FiltroLocalidad && this.FiltroLocalidad.trim() !== '' ? this.FiltroLocalidad : '0';
    var FiltroNumeroCompras: string = this.FiltroNumeroCompras && this.FiltroNumeroCompras.trim() !== '' ? this.FiltroNumeroCompras : '0';

    const filtros = {
      FiltroFechaIncioCompra: this.FiltroFechaIncioCompra || '0',
      FiltroFechaFinCompra: this.FiltroFechaFinCompra || '0',
      FiltroFechaRegistro: this.FiltroFechaRegistro || '0',
    };

    console.log('Filtros enviados:', filtros);

    this.ServiciosGenerales.consMapaCalor('1', FiltroLocalidad, FiltroNumeroCompras, filtros).subscribe(Rest =>{
      this.InfoConsMapa = Rest
        if (Rest && Rest.length > 0) {
          console.log('Datos recibidos del servicio:', Rest);
          this.AuxMostrarMapa = '1'; // Asegura que el contenedor se muestra
          this.cdRef.detectChanges();
          // Una vez que el mapa se muestre, inicializa o centra
          this.Centramapa({ address: 'Bogotá, Colombia' }, Rest);
        } else {
          console.warn('No se encontraron datos para los filtros aplicados.');
          this.AuxMostrarMapa = '0';
        }
      });
  }

  // Centrar el mapa
  Centramapa(request: google.maps.GeocoderRequest, datos: any[]): void {
    const mapContainer = document.getElementById('map');

    if (!mapContainer) {
      console.error('No se encontró el contenedor del mapa.');
      return;
    }

    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      if (results.length > 0) {
        const centerLocation = results[0].geometry.location;
        // Inicializar el mapa si aún no existe
        if (!this.map) {
          this.map = new google.maps.Map(mapContainer, {
            zoom: 13,
            center: centerLocation,
            mapTypeId: 'roadmap',
          });
          console.log('Mapa inicializado.');
        } else {
          this.map.setCenter(centerLocation);
          console.log('Mapa centrado en:', centerLocation);
        }
        this.renderizarMapaConMarcadores(datos);
      } else {
        console.error('No se encontró una ubicación válida.');
      }
    }).catch((error) => {
      console.error('Error al geocodificar la ubicación:', error);
    });
  }

  // Renderizar marcadores en el mapa
  renderizarMapaConMarcadores(datos: any[]): void {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
    datos.forEach((item) => {
      const [lat, lng] = item.Coordenadas.split(',').map(Number);
      const position = new google.maps.LatLng(lat, lng);
      this.AgregarMarcador(position);
    });
    console.log('Se han añadido los nuevos marcadores al mapa.');
  }

  // Agregar marcadores al mapa
  AgregarMarcador(latLng: google.maps.LatLng): void {
    if (this.map) {
      const marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
      });
      this.markers.push(marker);
    }
  }


  BtnDescargarExcel(): void {
    // Crear un nuevo archivo Excel
    let workbook = new Workbook();

    // Crear una nueva hoja dentro del Excel
    let worksheet = workbook.addWorksheet("Reporte Vecinos"); // Nombre de la hoja
    let header = ['Direccion Completa','Cordenadas','correo','Destino Departamento','Localidad','cuidad','Documento','Registro',
      'Direccion','FechaCreacion','MinyChat','Nombre','Observaccion','Telefono','Tipo Cuidad','Tipo Departamento','Tipo Ducumento',
      'Tipo Notificacion','Tipo Persona','Descripcion Persona','Uso Codigo'
    ]; // Encabezados según las variables del componente

    worksheet.addRow(header); // Añade los estilos al encabezado
    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 
      'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1','U1'].map(key => {
      worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' },
      };
      worksheet.getCell(key).font = {
        color: { argb: 'FFFFFF' },
      };
    });

    worksheet.columns = [ // Define el tamaño de las columnas
      { width: 25 }, { width: 25 }, { width: 25 }, { width: 20 }, { width: 20 }, { width: 25 }, 
      { width: 25 }, { width: 25 },{ width: 25 }, { width: 20 }, { width: 20 },{ width: 25 }, { width: 25 },
      { width: 25 },{ width: 20 }, { width: 20 },{ width: 25 }, { width: 25 }, { width: 25 },
      { width: 20 }, {width: 20}
    ];

    // Parte dinámica: Recorrer los datos para el Excel
    if (this.InfoConsMapa && this.InfoConsMapa.length > 0) {
      for (let x1 of this.InfoConsMapa) {
        let temp = [];

        // Orden de las variables a incluir en cada fila del Excel
        temp.push(x1['CompleDireccion'])
        temp.push(x1['Coordenadas'])
        temp.push(x1['Correo'])
        temp.push(x1['DesTipoDepto'])
        temp.push(x1['DescTipoCiudad'])
        temp.push(x1['DescTipoDocumento'])
        temp.push(x1['DescTipoRegistro'])
        temp.push(x1['Direccion'])
        temp.push(x1['FechaCreacion'])
        temp.push(x1['Id_manychat'])
        temp.push(x1['Nombre'])
        temp.push(x1['Observacion'])
        temp.push(x1['Telefono'])
        temp.push(x1['TipoCiudad'])
        temp.push(x1['TipoDepto'])
        temp.push(x1['TipoDocumento'])
        temp.push(x1['TipoNotificacion'])
        temp.push(x1['TipoPersona'])
        temp.push(x1['desTipoPersona'])
        temp.push(x1['usucodig'])
        worksheet.addRow(temp);
      }
    }

    // Nombre del archivo
    let fname = "MapaCalor3";
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '.xlsx');
    });
  }
}

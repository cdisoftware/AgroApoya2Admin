import { ChangeDetectorRef } from '@angular/core';

import * as fs from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';
import { Workbook } from 'exceljs';

@Component({
  selector: 'app-mapa-calor3',
  templateUrl: './mapa-calor3.component.html',
  styleUrls: ['./mapa-calor3.component.css'],
})
export class MapaCalor3Component implements OnInit {
  map: google.maps.Map | null = null; // Tipo opcional para evitar errores
  geocoder = new google.maps.Geocoder();
  heatmap: google.maps.visualization.HeatmapLayer | undefined;

  // Variables para los filtros
  Comprasfiltros: any = [];
  ArrayLocalidadesFiltro: any = [];
  FiltroFechaIncioCompra: string = '';
  FiltroFechaFinCompra: string = '';
  FiltroFechaRegistro: string = '';
  FiltroLocalidad: string = '0';
  FiltroNumeroCompras: string = '0';

  // Datos para el mapa
  markers: google.maps.Marker[] = [];
  // variable para mostra el mapa
  AuxMostrarMapa: string = '0';

  constructor(private cdRef: ChangeDetectorRef, public ServiciosGenerales: ServiciosService) {}

  ngOnInit(): void {
    this.CargaIncialListas();
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }

  // Cargar listas iniciales
  CargaIncialListas(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe((Resultado) => {
      this.ArrayLocalidadesFiltro = Resultado;
    });
    this.ServiciosGenerales.consMultilistas('1', '0', '0').subscribe((Resultado) => {
      this.Comprasfiltros = Resultado;
    });
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

  // Limpiar filtros y eliminar el mapa
  BtnLimpiar(): void {
    this.FiltroFechaIncioCompra = '';
    this.FiltroFechaFinCompra = '';
    this.FiltroFechaRegistro = '';
    this.FiltroLocalidad = '0';
    this.FiltroNumeroCompras = '0';
  
    // Limpiar marcadores del mapa
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  
    // Resetear mapa y contenedor
    if (this.map) {
      this.map = null;
    }
  
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = ''; // Limpiar el contenedor del mapa
    }
  
    this.AuxMostrarMapa = '0';
  
    if (this.heatmap) {
      this.heatmap.setMap(null);
    }
  
    console.log('Mapa eliminado y filtros reseteados.');
  }
  
  BtnBuscar(): void {
    const filtros = {
      FiltroFechaIncioCompra: this.FiltroFechaIncioCompra || '',
      FiltroFechaFinCompra: this.FiltroFechaFinCompra || '',
      FiltroFechaRegistro: this.FiltroFechaRegistro || '',
      FiltroLocalidad: this.FiltroLocalidad !== '0' ? this.FiltroLocalidad : null,
      FiltroNumeroCompras: this.FiltroNumeroCompras !== '0' ? this.FiltroNumeroCompras : null,
    };
  
    console.log('Filtros enviados:', filtros);
  
    this.ServiciosGenerales.consMapaCalor('1',filtros.FiltroLocalidad || '0',filtros.FiltroNumeroCompras || '0',filtros
    ).subscribe((Rest) => {
      if (Rest && Rest.length > 0) {
        console.log('Datos recibidos del servicio:', Rest);
        this.AuxMostrarMapa = '1'; // Asegura que el contenedor se muestra
        this.cdRef.detectChanges();
        // Una vez que el mapa se muestre, inicializa o centra
        this.Centramapa({ address: 'Bogotá, Colombia' });
        this.renderizarMapaConMarcadores(Rest);
      } else {
        console.warn('No se encontraron datos para los filtros aplicados.');
        this.AuxMostrarMapa = '0';
      }
    });
  }
  

  // Centrar el mapa
  Centramapa(request: google.maps.GeocoderRequest): void {
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
  BtnDescargarExcel(): void {
    // Crear un nuevo archivo Excel
    let workbook = new Workbook();

    // Crear una nueva hoja dentro del Excel
    let worksheet = workbook.addWorksheet("Reporte Vecinos"); // Nombre de la hoja
    let header = [
      'FechaInicioCompra', 
      'FechaFinCompra', 
      'FechaRegistro', 
      'Localidad', 
      'NumeroCompras'
    ]; // Encabezados según las variables del componente

    worksheet.addRow(header); // Añade los estilos al encabezado
    ['A1', 'B1', 'C1', 'D1', 'E1'].map(key => {
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
      { width: 25 }, 
      { width: 25 }, 
      { width: 25 }, 
      { width: 20 }, 
      { width: 20 }
    ];

    // Parte dinámica: Recorrer los datos para el Excel
    if (this.Comprasfiltros && this.Comprasfiltros.length > 0) {
      for (let item of this.Comprasfiltros) {
        let temp = [];

        // Orden de las variables a incluir en cada fila del Excel
        temp.push(this.FiltroFechaIncioCompra || 'N/A');
        temp.push(this.FiltroFechaFinCompra || 'N/A');
        temp.push(this.FiltroFechaRegistro || 'N/A');
        temp.push(this.FiltroLocalidad !== '0' ? this.FiltroLocalidad : 'Sin localidad');
        temp.push(this.FiltroNumeroCompras !== '0' ? this.FiltroNumeroCompras : 'Sin compras');

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

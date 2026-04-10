import { Component, OnInit, NgZone } from '@angular/core';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mapacalor',
  templateUrl: './mapacalor.component.html',
  styleUrls: ['./mapacalor.component.css']
})
export class MapacalorComponent implements OnInit {

  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();
  markers: google.maps.Marker[] = [];
  numeroUsuarios: number | null = null;
  usuariosEnRadio: number = 0;
  compradoresEnRadio: number = 0;
  noCompradoresEnRadio: number = 0;
  isCalculating: boolean = false;
  isLoadingManual: boolean = false;
  tipoComprador: string = '0';

  totalCompradoresSector: number = 0;
  totalNoCompradoresSector: number = 0;

  metrosRedonda: number = 800;
  sectorSeleccionado: string = '0';
  circuloActual: google.maps.Circle | null = null;
  infoWindowActual: google.maps.InfoWindow | null = null;
  activeTab: number = 1;
  centroManualCoord: string = '';

  sectorAuto: string = '0';
  tipoCompradorAuto: string = '0';
  metrosAuto: number = 800;
  usuariosAuto: number = 0;
  compradoresAuto: number = 0;
  noCompradoresAuto: number = 0;
  centroAutoCoord: string = '';
  usuariosExportarAuto: any[] = [];

  sectores = [
    { id: '0', nombre: 'Seleccione' },
    { id: '354', nombre: 'Usaquén' },
    { id: '355', nombre: 'Suba' },
    { id: '356', nombre: 'Engativa' },
    { id: '357', nombre: 'Barrios Unidos' },
    { id: '358', nombre: 'Teusaquillo' },
    { id: '359', nombre: 'Fontibón' },
    { id: '360', nombre: 'Chapinero' },
    { id: '361', nombre: 'Kennedy' },
    { id: '362', nombre: 'Toda Bogotá' },
    { id: '364', nombre: 'Candelaria' },
    { id: '365', nombre: 'Martires' },
    { id: '366', nombre: 'Puente Aranda' },
    { id: '367', nombre: 'Antonio Nariño' },
    { id: '368', nombre: 'Usme' },
    { id: '369', nombre: 'Ciudad Bolivar' },
    { id: '370', nombre: 'Rafael Uribe Uribe' },
    { id: '371', nombre: 'Bosa' },
    { id: '372', nombre: 'Tunjuelito' },
    { id: '373', nombre: 'San Cristóbal' },
    { id: '374', nombre: 'Santa Fé' }
  ];

  constructor(public sevicesmilla: GrupoMillaServices, private ngZone: NgZone) { }

  ngOnInit(): void {
    // Inicializar el mapa vacío sin cargar datos
    this.InicializarMapa();
  }

  InicializarMapa(): void {
    const request: google.maps.GeocoderRequest = { address: 'Bogotá, Colombia' };
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      // Solo instanciamos el mapa si no existe para no perder el estado del elemento HTML
      if (!this.map) {
        this.map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          { zoom: 12 }
        );
      }
      this.map.setCenter(results[0].geometry.location);

      // Limpiamos listeners previos para no duplicar eventos si se llama varias veces
      google.maps.event.clearListeners(this.map, 'click');

      this.map.addListener('click', (e: any) => {
        if (this.activeTab === 1) {
          if (this.metrosRedonda && this.metrosRedonda > 0) {
            if (this.circuloActual) {
              this.circuloActual.setMap(null);
            }
            this.circuloActual = new google.maps.Circle({
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#0000FF",
              fillOpacity: 0.35,
              map: this.map,
              center: e.latLng,
              radius: this.metrosRedonda,
            });

            // Centrar el mapa en el clic y ajustar el zoom para que se vea todo el círculo
            this.map.panTo(e.latLng);
            if (this.circuloActual) {
              const bounds = this.circuloActual.getBounds();
              if (bounds) {
                this.map.fitBounds(bounds);
              }
            }

            // Mostrar InfoWindow con las coordenadas
            if (this.infoWindowActual) {
              this.infoWindowActual.close();
            }
            this.centroManualCoord = `${e.latLng.lat().toFixed(6)}, ${e.latLng.lng().toFixed(6)}`;
            this.infoWindowActual = new google.maps.InfoWindow({
              content: `<div style="padding: 5px; font-size: 13px; font-weight: bold; color: #333; text-align: center;">
                          <i class="fa fa-map-marker text-primary"></i> Centro Radio<br>
                          <span style="font-weight: normal; font-size: 11px;">${this.centroManualCoord}</span>
                        </div>`,
              position: e.latLng
            });
            this.infoWindowActual.open(this.map);

            this.ngZone.run(() => {
              this.isCalculating = true;
            });

            // Usamos un pequeño delay para permitir que el DOM repinte y muestre el "Cargando..."
            setTimeout(() => {
              let conteoCompradores = 0;
              let conteoNoCompradores = 0;
              let conteoTotal = 0;

              for (let i = 0; i < this.markers.length; i++) {
                const markerPos = this.markers[i].getPosition();
                if (markerPos) {
                  const distance = google.maps.geometry.spherical.computeDistanceBetween(e.latLng, markerPos);
                  if (distance <= this.metrosRedonda) {
                    conteoTotal++;
                    const valComprador = this.markers[i].get('comprador');
                    if (valComprador && valComprador !== '0') {
                      conteoCompradores++;
                    } else {
                      conteoNoCompradores++;
                    }
                  }
                }
              }
              // Devolver los resultados dentro de la zona de Angular
              this.ngZone.run(() => {
                this.usuariosEnRadio = conteoTotal;
                this.compradoresEnRadio = conteoCompradores;
                this.noCompradoresEnRadio = conteoNoCompradores;
                this.isCalculating = false;
              });
            }, 50);
          }
        }
      }); // Fin de map.addListener
      return results;
    }).catch((e) => {
      console.log("Geocode was not successful for the following reason: " + e);
    });
  }


  // Define la función Buscar explícitamente para el botón "Buscar" del Tab 1
  BuscarManual(): void {
    console.log('buscar manual')
    this.LimpiarMapa();

    // Ejecutar en zona Angular para que la UI se actualice
    this.ngZone.run(() => {
      this.isLoadingManual = true;
      console.log('ngZone run')
    });

    // Centrar mapa de vuelta a Bogotá como referencia inicial de la búsqueda
    const request: google.maps.GeocoderRequest = { address: 'Bogotá, Colombia' };
    this.geocoder.geocode(request).then((result) => {
      this.map.setCenter(result.results[0].geometry.location);
      this.map.setZoom(12);
    }).catch(e => console.log(e));

    this.sevicesmilla.consAdUserMapCalor(this.sectorSeleccionado, this.tipoComprador).subscribe(Resultado => {
      console.log('resultado servicio')
      const features = [];

      for (let i = 0; i < Resultado.length; i++) {
        var auxsplit = Resultado[i].CoordenadaPersona.split(',');
        var lat = parseFloat(auxsplit[0]);
        var long = parseFloat(auxsplit[1]);
        features.push({
          position: new google.maps.LatLng(lat, long),
          comprador: Resultado[i].comprador
        });
      }

      let compradoresCount = 0;
      let noCompradoresCount = 0;
      const bounds = new google.maps.LatLngBounds();

      for (let i = 0; i < features.length; i++) {
        this.AgregarMarcador(features[i].position, this.map, features[i].comprador);
        bounds.extend(features[i].position);
        if (features[i].comprador !== '0') {
          compradoresCount++;
        } else {
          noCompradoresCount++;
        }
      }

      console.log('Termina agregar marcadores')

      // Auto-centrar mapa en los pines resultantes conservando el zoom
      if (features.length > 0) {
        this.map.panTo(bounds.getCenter());
        this.map.setZoom(12);
      }

      this.ngZone.run(() => {
        this.numeroUsuarios = features.length;
        this.totalCompradoresSector = compradoresCount;
        this.totalNoCompradoresSector = noCompradoresCount;
        this.isLoadingManual = false;
        console.log('Termina ngZone run')
      });
    });
  }

  BuscarAuto(): void {
    if (this.sectorAuto === '0') {
      alert('¡Importante! Por favor selecciona un sector para realizar la búsqueda automática.');
      return;
    }

    this.LimpiarMapa();

    // Ejecutar en zona Angular para que la UI se actualice
    this.ngZone.run(() => {
      this.isCalculating = true;
    });

    this.sevicesmilla.consAdUserMapCalor(this.sectorAuto, this.tipoCompradorAuto).subscribe(Resultado => {
      console.log('resultado servicio')
      console.log(Resultado)
      const features: any[] = [];

      for (let i = 0; i < Resultado.length; i++) {
        var auxsplit = Resultado[i].CoordenadaPersona.split(',');
        var lat = parseFloat(auxsplit[0]);
        var long = parseFloat(auxsplit[1]);
        features.push({
          position: new google.maps.LatLng(lat, long),
          comprador: Resultado[i].comprador,
          usuarioData: Resultado[i]
        });
      }

      if (features.length === 0) {
        alert('No se encontraron usuarios con esos filtros.');
        this.ngZone.run(() => {
          this.isCalculating = false;
        });
        return;
      }

      let maxContTotal = 0;
      let bestCenter: google.maps.LatLng | null = null;
      let bestCompradores = 0;
      let bestNoCompradores = 0;

      // Algoritmo de densidad optimizado
      console.log('Iniciando cálculo de densidad para ' + features.length + ' usuarios...');

      // Una aproximación rápida para pre-filtrar: 1 grado de latitud y longitud equivale aprox a 111,320 metros.
      // Así que el límite en grados es aprox límiteEnMetros / 111320
      const limitInDegrees = this.metrosAuto / 111320;

      for (let i = 0; i < features.length; i++) {
        let centerPos = features[i].position;
        let contTotal = 0;
        let contCompradores = 0;
        let contNoCompradores = 0;
        let localUsuariosExportar: any[] = [];

        let centerLat = centerPos.lat();
        let centerLng = centerPos.lng();

        for (let j = 0; j < features.length; j++) {
          let testPos = features[j].position;

          // PRE-FILTRO: Bounding Box. 
          // Si la diferencia simple en grados ya es mayor al radio, no calculamos la distancia esférica.
          if (Math.abs(centerLat - testPos.lat()) > limitInDegrees ||
            Math.abs(centerLng - testPos.lng()) > limitInDegrees) {
            continue;
          }

          let distance = 0;
          if (google.maps.geometry && google.maps.geometry.spherical) {
            distance = google.maps.geometry.spherical.computeDistanceBetween(centerPos, testPos);
          } else {
            // Fallback: Haversine formula manual
            distance = this.calcularDistanciaManual(
              centerLat, centerLng,
              testPos.lat(), testPos.lng()
            );
          }

          if (distance <= this.metrosAuto) {
            contTotal++;
            if (features[j].comprador !== '0') {
              contCompradores++;
            } else {
              contNoCompradores++;
            }
            localUsuariosExportar.push(features[j].usuarioData);
          }
        }

        if (contTotal > maxContTotal) {
          maxContTotal = contTotal;
          bestCenter = centerPos;
          bestCompradores = contCompradores;
          bestNoCompradores = contNoCompradores;
          this.usuariosExportarAuto = localUsuariosExportar;
        }
      }
      console.log('Cálculo finalizado. Mejor centro:', bestCenter, 'con', maxContTotal, 'usuarios en radio.');

      // Dibujar marcadores
      for (let i = 0; i < features.length; i++) {
        this.AgregarMarcador(features[i].position, this.map, features[i].comprador);
      }

      // Dibujar círculo de mayor densidad
      if (bestCenter) {
        this.circuloActual = new google.maps.Circle({
          strokeColor: "#FF8C00", // Círculo Naranja
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF8C00",
          fillOpacity: 0.35,
          map: this.map,
          center: bestCenter,
          radius: this.metrosAuto,
        });

        this.map.panTo(bestCenter);
        const bounds = this.circuloActual.getBounds();
        if (bounds) {
          this.map.fitBounds(bounds);
        }

        // Mostrar InfoWindow con las coordenadas
        if (this.infoWindowActual) {
          this.infoWindowActual.close();
        }
        this.centroAutoCoord = `${bestCenter.lat().toFixed(6)}, ${bestCenter.lng().toFixed(6)}`;
        this.infoWindowActual = new google.maps.InfoWindow({
          content: `<div style="padding: 5px; font-size: 13px; font-weight: bold; color: #ff8c00; text-align: center;">
                      <i class="fa fa-dot-circle-o"></i> Mayor Densidad<br>
                      <span style="font-weight: normal; font-size: 11px; color: #333;">${this.centroAutoCoord}</span>
                    </div>`,
          position: bestCenter
        });
        this.infoWindowActual.open(this.map);
      }

      this.ngZone.run(() => {
        this.usuariosAuto = maxContTotal;
        this.compradoresAuto = bestCompradores;
        this.noCompradoresAuto = bestNoCompradores;
        this.isCalculating = false;
      });
    });
  }

  descargarExcel(): void {
    if (!this.usuariosExportarAuto || this.usuariosExportarAuto.length === 0) {
      alert('No hay datos para exportar.');
      return;
    }

    const dataToExport = this.usuariosExportarAuto.map(u => ({
      Usucodig: u.Usucodig,
      NombrePersona: u.NombrePersona ? u.NombrePersona.trim() : '',
      CoordenadaPersona: u.CoordenadaPersona,
      CelularPersona: u.CelularPersona,
      CorreoPersona: u.CorreoPersona,
      Comprador: u.comprador !== '0' ? 'Sí' : 'No'
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'UsuariosRadiodeBusqueda');
    XLSX.writeFile(wb, 'Reporte_Mapa_Calo.xlsx');
  }

  changeTab(tab: number): void {
    this.activeTab = tab;
    if (tab === 1) {
      this.LimpiarMapa();
      this.metrosRedonda = 800;
      this.sectorSeleccionado = '0';
      this.tipoComprador = '0';
      // NO llamamos a Buscar() para dejar el mapa limpio hasta que el usuario decida buscar
    } else if (tab === 2) {
      this.LimpiarMapa();
    }
  }

  LimpiarMapa(): void {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    if (this.circuloActual) {
      this.circuloActual.setMap(null);
      this.circuloActual = null;
    }
    if (this.infoWindowActual) {
      this.infoWindowActual.close();
      this.infoWindowActual = null;
    }
    this.numeroUsuarios = null;
    this.usuariosEnRadio = 0;
    this.compradoresEnRadio = 0;
    this.noCompradoresEnRadio = 0;
    this.usuariosAuto = 0;
    this.compradoresAuto = 0;
    this.noCompradoresAuto = 0;
    this.totalCompradoresSector = 0;
    this.totalNoCompradoresSector = 0;
    this.centroManualCoord = '';
    this.centroAutoCoord = '';
    this.usuariosExportarAuto = [];
  }


  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map, comprador: string) {
    let icon = '';
    if (comprador !== '0') {
      icon = '../../../../assets/ImagenesAgroApoya2Adm/Entregado.png';
    } else {
      icon = '../../../../assets/ImagenesAgroApoya2Adm/Devuelto.png';
    }
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: {
        url: icon,
        scaledSize: new google.maps.Size(20, 20) // Ajusta el tamaño aquí (ancho, alto)
      }
    });
    // Guardamos la propiedad nativamente en el marcador de Google Maps
    marker.set('comprador', comprador);
    this.markers.push(marker);
  }

  // Fallback function para calcular distancia en metros usando la fórmula de Haversine
  calcularDistanciaManual(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radio de la tierra en metros
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en metros
  }

}

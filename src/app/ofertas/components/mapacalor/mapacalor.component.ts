import { Component, OnInit, NgZone } from '@angular/core';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';

@Component({
  selector: 'app-mapacalor',
  templateUrl: './mapacalor.component.html',
  styleUrls: ['./mapacalor.component.css']
})
export class MapacalorComponent implements OnInit {

  map: google.maps.Map;
  geocoder = new google.maps.Geocoder();
  markers: google.maps.Marker[] = [];
  numeroUsuarios: number = 0;
  usuariosEnRadio: number = 0;
  compradoresEnRadio: number = 0;
  noCompradoresEnRadio: number = 0;
  isCalculating: boolean = false;
  tipoComprador: string = '0';

  metrosRedonda: number = 800;
  sectorSeleccionado: string = '0';
  circuloActual: google.maps.Circle | null = null;
  activeTab: number = 1;
  autoSearchMarkers: google.maps.Marker[] = [];

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
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }

  Buscar(): void {
    this.Centramapa({ address: 'Bogotá, Colombia' });
  }

  changeTab(tab: number): void {
    this.activeTab = tab;
    if (tab === 1) {
      this.LimpiarMapa();
      this.metrosRedonda = 800;
      this.sectorSeleccionado = '0';
      this.tipoComprador = '0';
      this.Buscar();
    } else if (tab === 3) {
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
    for (let i = 0; i < this.autoSearchMarkers.length; i++) {
      this.autoSearchMarkers[i].setMap(null);
    }
    this.autoSearchMarkers = [];
    this.usuariosEnRadio = 0;
    this.compradoresEnRadio = 0;
    this.noCompradoresEnRadio = 0;
  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        { zoom: 12 }
      );
      this.map.setCenter(results[0].geometry.location);

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
        } else if (this.activeTab === 3) {
          this.AgregarBanderaAuto(e.latLng);
        }
      });

      this.sevicesmilla.consAdUserMapCalor(this.sectorSeleccionado, this.tipoComprador).subscribe(Resultado => {
        const features = [];

        // Limpiamos marcadores previos para evitar conteos erróneos de otras consultas
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }
        this.markers = [];
        this.usuariosEnRadio = 0;
        if (this.circuloActual) {
          this.circuloActual.setMap(null);
          this.circuloActual = null;
        }

        for (let i = 0; i < Resultado.length; i++) {
          console.log(Resultado[i].CoordenadaPersona)
          var auxsplit = Resultado[i].CoordenadaPersona.split(',');
          var lat = parseFloat(auxsplit[0]);
          var long = parseFloat(auxsplit[1]);
          features.push({
            position: new google.maps.LatLng(lat, long),
            comprador: Resultado[i].comprador
          });
        }

        for (let i = 0; i < features.length; i++) {
          this.AgregarMarcador(features[i].position, this.map, features[i].comprador);
        }
        this.numeroUsuarios = features.length;
      });

      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
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

  AgregarBanderaAuto(latLng: google.maps.LatLng) {
    const flagIcon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    const marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: flagIcon,
      animation: google.maps.Animation.DROP,
      draggable: true
    });
    this.autoSearchMarkers.push(marker);
  }

}

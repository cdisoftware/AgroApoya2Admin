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
  isCalculating: boolean = false;
  compradoresChecked: boolean = false;

  metrosRedonda: number = 0;
  sectorSeleccionado: string = '0';
  circuloActual: google.maps.Circle | null = null;
  
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

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        { zoom: 15 }
      );
      this.map.setCenter(results[0].geometry.location);

      this.map.addListener('click', (e: any) => {
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

          this.ngZone.run(() => {
            this.isCalculating = true;
          });

          // Usamos un pequeño delay para permitir que el DOM repinte y muestre el "Cargando..."
          setTimeout(() => {
            let conteo = 0;
            for (let i = 0; i < this.markers.length; i++) {
              const markerPos = this.markers[i].getPosition();
              if (markerPos) {
                const distance = google.maps.geometry.spherical.computeDistanceBetween(e.latLng, markerPos);
                if (distance <= this.metrosRedonda) {
                  conteo++;
                }
              }
            }
            // Devolver los resultados dentro de la zona de Angular
            this.ngZone.run(() => {
              this.usuariosEnRadio = conteo;
              this.isCalculating = false;
            });
          }, 50);
        }
      });

      const paramCompradores = this.compradoresChecked ? '1' : '0';
      this.sevicesmilla.consAdUserMapCalor(this.sectorSeleccionado, paramCompradores).subscribe(Resultado => {
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
          features.push({ position: new google.maps.LatLng(lat, long) });
        }

        for (let i = 0; i < features.length; i++) {
          this.AgregarMarcador(features[i].position, this.map);
        }
        this.numeroUsuarios = features.length;
      });

      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }

  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers.push(marker);
  }

}

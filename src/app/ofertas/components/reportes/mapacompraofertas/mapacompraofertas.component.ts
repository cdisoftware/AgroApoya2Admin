import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-mapacompraofertas',
  templateUrl: './mapacompraofertas.component.html',
  styleUrls: ['./mapacompraofertas.component.css']
})

export class MapacompraofertasComponent implements OnInit {

  cd_cnsctivo: any;
  id_sector: any;

  map: google.maps.Map;
  mapRutaPolygon: google.maps.Map;
  ArrayEntregasDisponibles: any = [];
  geocoder = new google.maps.Geocoder();
  MarkersEntregasDisponibles: google.maps.Marker[] = [];


  constructor(
    public sevicesmilla: GrupoMillaServices,
    public sectoresservices: ValorarofertaService,
    private rutaActiva: ActivatedRoute) { }


  ngOnInit(): void {
    this.cd_cnsctivo = this.rutaActiva.snapshot.paramMap.get('cdcnsctivo');
    this.id_sector = this.rutaActiva.snapshot.paramMap.get('IdOferta');
    this.MuestraEntregasDisponibles(this.cd_cnsctivo, this.id_sector);
  }

  MuestraEntregasDisponibles(cd_cnsctivo: any, id_sector: any) {
    this.ArrayEntregasDisponibles = [];
    var cadenaOfertas = cd_cnsctivo + "-" + id_sector + "|";
    const body = {
      OfertaSector: cadenaOfertas
    }
    this.sevicesmilla.ConsultaEntregasDisponibles("2", body).subscribe(Respu => {
      this.ArrayEntregasDisponibles = Respu;
      this.IniciaMapa();
    });
  }

  IniciaMapa() {
    this.Centramapa({ address: 'Bogotá' + ',' + 'Bogotá' });
  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 4.70281065790573, lng: -74.05637826500855 },
          zoom: 12,
        }
      );
      this.AgregarSitiosRuta();
      return results;
    })
      .catch((e) => {
      });
  }

  AgregarSitiosRuta() {
    for (var i = 0; i < this.MarkersEntregasDisponibles.length; i++) {
      this.MarkersEntregasDisponibles[i].setMap(null);
    }
    this.MarkersEntregasDisponibles = [];

    const features = [];
    var lat: number;
    var long: number;

    for (var i = 0; i < this.ArrayEntregasDisponibles.length; i++) {
      var auxcoor = this.ArrayEntregasDisponibles[i].CoordenadasEntrega.split(",");
      lat = parseFloat(auxcoor[0]);
      long = parseFloat(auxcoor[1]);
      features.push({ position: new google.maps.LatLng(lat, long), NomCli: this.ArrayEntregasDisponibles[i].NombresCliente });
    }

    for (let i = 0; i < features.length; i++) {

      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.map,
        icon: '../../../../assets/ImagenesAgroApoya2Adm/Devuelto.png',
        zIndex: i,
        label: ''
      });
      var marker = new google.maps.Marker({
        title: features[i].NomCli,
        animation: google.maps.Animation.DROP,
        position: features[i].position,
        map: this.mapRutaPolygon,
        icon: '../../../../assets/ImagenesAgroApoya2Adm/Devuelto.png',
        zIndex: i,
        label: ''
      });
      this.MarkersEntregasDisponibles.push(marker);
    }
  }

}

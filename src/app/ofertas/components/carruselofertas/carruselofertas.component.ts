import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carruselofertas',
  templateUrl: './carruselofertas.component.html',
  styleUrls: ['./carruselofertas.component.css']
})
export class CarruselofertasComponent implements OnInit {

  imagen: string;

  constructor() { }

  ngOnInit(): void {
    this.imagen = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";
  }

  ocultarImg() {

    if (this.imagen == "../../../../assets/ImagenesAgroApoya2Adm/ver.png") {

      this.imagen = "../../../../assets/ImagenesAgroApoya2Adm/novisible.png";
    } else {

      this.imagen = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";
    }
  }




}

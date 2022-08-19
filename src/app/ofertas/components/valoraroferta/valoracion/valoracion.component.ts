import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {
  SessionOferta: string = '';
  DataOferta: any[] = [];


  constructor(private serviciosvaloracion: ValorarofertaService) { }  

  ngOnInit(): void {
    this.SessionOferta = '1011';
    this.ConsultaDetalleOferta();
  }

  ConsultaDetalleOferta() {
    this.serviciosvaloracion.ConsultaOferta('1', this.SessionOferta).subscribe(ResultConsu=>{
      this.DataOferta=ResultConsu;
      console.log(ResultConsu)
    })
  }

}

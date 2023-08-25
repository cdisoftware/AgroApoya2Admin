import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
@Component({
  selector: 'app-manychat',
  templateUrl: './manychat.component.html',
  styleUrls: ['./manychat.component.css']
})
export class ManychatComponent implements OnInit {

  constructor(private serviciosoferta: ValorarofertaService,
  ) { }

  //variables grilla
  DataQuery: any[];
  newQueryMC: string = '';

  VerOcultarCampos: string = '';

  ngOnInit(): void {
    this.DataQuery = [];
    this.VerOcultarCampos = "1"
  }

  consultaToppingsOferta() {
    const Body = {
      MSJ_AGROAMIGO: this.newQueryMC
    }
    this.serviciosoferta.EjecutaQueryManyChat('1', Body).subscribe(Resultcons => {
      
      if (Resultcons.length > 0) {
        this.DataQuery = Resultcons;
        this.VerOcultarCampos = "2"
      }
      else {  
        this.DataQuery = [];
      }
    })
  }
  Limpiar(){
    this.newQueryMC = '';
    this.DataQuery = [];
    this.VerOcultarCampos = "1"
  }


}

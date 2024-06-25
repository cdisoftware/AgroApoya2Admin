import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';

@Component({
  selector: 'app-enviosmsoferta',
  templateUrl: './enviosmsoferta.component.html',
  styleUrls: ['./enviosmsoferta.component.css']
})
export class EnviosmsofertaComponent implements OnInit {

  constructor(private serviciosvaloracion: ValorarofertaService,) { }

  ValorUni:string;
  ngOnInit(): void {
  }

  EnviarSms() {
    alert('Enviar')
    this.serviciosvaloracion.consAdminEnvioSMS('20', this.ValorUni).subscribe(ResultCorreo => {
      console.log(ResultCorreo)
      for (var i = 0; i < ResultCorreo.length; i++) {

        const body = {
          Telefono:ResultCorreo[i].CELULAR_PERSONA,
          Mensaje: ResultCorreo[i].CadenaUrl
        };

        this.serviciosvaloracion.EnvioSMSIndv(body).subscribe(Result => {
          console.log(body.Telefono)
          console.log(Result)
          console.log(body.Mensaje)
        });
      }
    });
  }
}

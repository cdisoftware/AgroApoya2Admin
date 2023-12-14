import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';
import { InteraccionMenyChat } from 'src/app/core/InteraccionMenyChat';

@Component({
  selector: 'app-adminmanychat',
  templateUrl: './adminmanychat.component.html',
  styleUrls: ['./adminmanychat.component.css']
})
export class AdminmanychatComponent implements OnInit {

  constructor(private service: ReporteService, private serviceintegracion: InteraccionMenyChat) {
    this.ConsultaUsers();
  }

  //#region VariablesConsultaUserManyChat
  Loader: boolean = false;
  ArrayUsers: any = [];
  NunMensajesEnviados: number = 0;
  //#endregion VariablesConsultaUserManyChat

  ngOnInit(): void {
  }


  //#region MetodosConsultaUserManyChat
  ConsultaUsers() {
    this.ArrayUsers = [];
    const body = {
      USUCODIG: "0",
      CORREO_PERSONA: "0",
      CELULAR_PERSONA: "0"
    }
    this.service.ConsultaUsers('1', '0', body).subscribe(Resultado => {
      console.log(Resultado)
      this.ArrayUsers = Resultado;
    });
  }

  async AsignaCampoMayChat() {
    this.Loader = true;
    var auxNombre: string = "";
    var splitNombre: any;

    for (var i = 0; i < this.ArrayUsers.length; i++) {
      auxNombre = this.ArrayUsers[i].NOMBRES_PERSONA.trim();
      splitNombre = auxNombre.split(" ");

      await new Promise((resolve, reject) => {
        const body = {
          subscriber_id: this.ArrayUsers[i].id_manychat,
          field_id: 9808606,
          field_value: splitNombre[0]
        }
        console.log(body)
        this.serviceintegracion.AsignaCampoManyChat(body).subscribe(Resultado => {
          console.log(Resultado)
          this.NunMensajesEnviados++;
          resolve(true);
        });
      });
    }
    this.Loader = false;
  }
  //#endregion MetodosConsultaUserManyChat
}

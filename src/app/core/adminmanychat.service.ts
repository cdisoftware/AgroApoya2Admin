import { Injectable } from '@angular/core';
import { InteraccionMenyChat } from './InteraccionMenyChat';

@Injectable({
  providedIn: 'root'
})
export class AdminmanychatService {

  constructor(private service: InteraccionMenyChat) { }

  //#region General
  async adminManyChat_Mtd(telefono: string, nombre: string): Promise<string> {
    try {
      let body: any = {};
      let respu: string = "";
  
      body = {
        field_value: "57" + telefono.trim()
      };
      const respuconsulta = (await this.consulta_Mtd(body)).toString().split("|");
  
      if (respuconsulta[0] == "1") {
        body = {
          correo_persona: telefono.trim(),
          ID_MANYCHAT: respuconsulta[1].trim()
        };
        respu = (await this.updateIdManyChatBDSqlServer(body)).toString() + "|" + respuconsulta[1].trim();
      } else {
        const auxNombre = nombre.trim().split(" ");
        body = {
          first_name: auxNombre[0].trim(),
          last_name: "",
          whatsapp_phone: "57" + telefono.trim(),
          has_opt_in_sms: true,
          has_opt_in_email: true,
          consent_phrase: "string"
        };
        const respuInserManyChat = (await this.creaUserManyChat_Mtd(body)).toString().split("|");
  
        if (respuInserManyChat[0] == "1") {
          body = {
            correo_persona: telefono.trim(),
            ID_MANYCHAT: respuInserManyChat[1].trim()
          };
          respu = (await this.updateIdManyChatBDSqlServer(body)).toString() + "|" + respuInserManyChat[1].trim();
        }
      }
  
      return respu;
    } catch (error) {
      console.error("Error en adminManyChat_Mtd:", error);
      throw error;
    }
  }
  //#endregion General

  //#region Consulta
  async consulta_Mtd(body: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const subscription = this.service.ConsultaSubscriberId(body).subscribe({
        next: (data) => {
          console.log(data);
          resolve(data);
        },
        error: (err) => {
          console.error(err);
          reject(err);
        },
        complete: () => {

        }
      });
    });
  }
  //#endregion Consulta


  //#region CreaManyChat
  async creaUserManyChat_Mtd(body: any) {
    return new Promise<string>((resolve, reject) => {
      const subscription = this.service.modmanychatcreateuser(body).subscribe({
        next: (data) => {
          console.log(data);
          resolve(data);
        },
        error: (err) => {
          console.error(err);
          reject(err);
        },
        complete: () => {

        }
      });
    });
  }
  //#endregion CreaManyChat


  //#region UpdateBDSql
  async updateIdManyChatBDSqlServer(body: any) {
    return new Promise<string>((resolve, reject) => {
      const subscription = this.service.ActualizaIdManyChat('3', body).subscribe({
        next: (data) => {
          console.log(data);
          resolve(data);
        },
        error: (err) => {
          console.error(err);
          reject(err);
        },
        complete: () => {

        }
      });
    });
  }
  //#endregion UpdateBDSql
}

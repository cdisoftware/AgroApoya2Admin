import { Injectable } from '@angular/core';
import { InteraccionMenyChat } from './InteraccionMenyChat';

@Injectable({
  providedIn: 'root'
})
export class AdminmanychatService {

  constructor(private service: InteraccionMenyChat) { }

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
}

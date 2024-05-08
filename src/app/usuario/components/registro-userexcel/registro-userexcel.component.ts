import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OperacionesDinamicas } from 'src/app/core/OperacionesDinamicas';
import { MetodosglobalesService } from 'src/app/core/metodosglobales.service';
import * as XLSX from 'xlsx';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminmanychatService } from 'src/app/core/adminmanychat.service';

@Component({
  selector: 'app-registro-userexcel',
  templateUrl: './registro-userexcel.component.html',
  styleUrls: ['./registro-userexcel.component.css']
})
export class RegistroUserexcelComponent implements OnInit {

  constructor(private Modalservices: NgbModal, private service: OperacionesDinamicas, private http: HttpClient, private MetodosServicio: MetodosglobalesService, private servadminManyChat: AdminmanychatService) { }

  @ViewChild('templateemai', { static: false }) ModalEmail: any;

  ngOnInit(): void {
  }

  ArrayDataInsert: any = [];
  ArrayRespuesta: any = [];
  NumberTotal: number = 0;
  numberinsertados: number = 0;
  numbernofueposible: number = 0;

  ArrInfoTotalCausaNoreguistro: any = [
    {
      name: "Correo electronico invalido",
      value: 0
    },
    {
      name: "Usuario ya registrado",
      value: 0
    },
    {
      name: "Nombre no registrado",
      value: 0
    },
    {
      name: "Dirección no registrada",
      value: 0
    },
    {
      name: "No fue posible encontrar la direccion",
      value: 0
    },
    {
      name: "Número de teléfono no válido",
      value: 0
    },
    {
      name: "Telefono ya existente",
      value: 0
    },
    {
      name: "Respuesta Servicio",
      value: 0,
    }
  ];
  vercausa: boolean = false;
  Operacion(event: any, bandera: number) {
    console.log(this.ArrInfoTotalCausaNoreguistro)

    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      this.ArrayDataInsert = XLSX.utils.sheet_to_json(worksheet, { header: 0 });
      if (bandera == 1) {
        this.insertDataUser();
      }
    };
    fileReader.readAsArrayBuffer(file);
  }


  async insertDataUser() {
    this.vercausa = true;
    this.ArrayRespuesta = [];
    let obj: { Respuesta: any; Email?: any; Nombre?: any; Direccion?: any; Complemento?: any; Telefono?: any; Estado?: boolean; IdManyChat: string};

    var auxcorreo: string = "";
    var auxnombre: string = "";
    var auxtelefono: string = "";
    var auxdireccion: string = "";
    var auxcoordenadas: string = "";
    var auxcomplemento: string = "";
    this.numberinsertados = 0;
    this.numbernofueposible = 0;
    this.NumberTotal = 0;

    for (var i = 0; i < this.ArrayDataInsert.length; i++) {
      this.Modalservices.dismissAll();

      auxcorreo = "";
      auxnombre = "";
      auxtelefono = "";
      auxdireccion = "";
      auxcoordenadas = "";
      auxcomplemento = "";

      try {

        if (this.ArrayDataInsert[i].Correoelectronico != undefined) {
          auxcorreo = this.ArrayDataInsert[i].Correoelectronico.toString().trim();
        }
        else {
          auxcorreo = "";
        }

        if (this.ArrayDataInsert[i].Complemento != undefined) {
          auxcomplemento = this.ArrayDataInsert[i].Complemento.toString().trim();
        }
        else {
          auxcomplemento = "";
        }
        if (this.ArrayDataInsert[i].Direccion != undefined) {
          auxdireccion = this.ArrayDataInsert[i].Direccion.toString().trim();
        }
        else {
          auxdireccion = "";
        }

        var tel: string = this.ArrayDataInsert[i].Telefono.toString().trim().replace('+57', '');
        if (this.ArrayDataInsert[i].Telefono != undefined) {
          var arrnum = tel.split("");
          if (arrnum.length > 9) {
            if (arrnum[0].toString() + arrnum[1].toString() == "57") {
              for (var j = 2; j < arrnum.length; j++) {
                auxtelefono = auxtelefono + arrnum[j];
              }
            } else {
              auxtelefono = tel;
            }
          } else {
            auxtelefono = "";
          }
        }
        else {
          auxtelefono = "";
        }
        if (this.ArrayDataInsert[i].Nombre != undefined) {
          auxnombre = this.ArrayDataInsert[i].Nombre.toString().trim();
        }
        else {
          auxnombre = "";
        }

        obj = {
          Email: auxcorreo,
          Nombre: auxnombre,
          Direccion: auxdireccion,
          Complemento: auxcomplemento,
          Telefono: auxtelefono,
          IdManyChat: "",
          Estado: false,
          Respuesta: ''
        }

        await new Promise((resolve, reject) => {
          if (this.ArrayDataInsert[i].Correoelectronico.toString().trim() != "") {
            const formatoValido = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.ArrayDataInsert[i].Correoelectronico.toString().trim());
            const bodyPost = {
              'USUCODIG': 0,
              'CorreoPersona': this.ArrayDataInsert[i].Correoelectronico.toString().trim().toLowerCase().replace(' ', '')
            }
            this.service.consLoginCliente('1', bodyPost).subscribe(async Resultado => {
              if (Resultado.length <= 0) {

                if (auxnombre != "") {

                  if (auxdireccion != "") {
                    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(auxdireccion)}&key=AIzaSyD_BcdT_heUpoSU7iFbndqI_rxmMbFsHAA`;
                    this.http.get(apiUrl).subscribe(async (response: any) => {
                      if (response && response.results && response.results.length > 0) {
                        auxcoordenadas = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng;
                        var num: number = parseInt(auxtelefono);
                        if (num > 2999999999 && num < 4000000000) {
                          this.service.conscvalidanumero('1', auxtelefono).subscribe(Resultado => {
                            var auxUno = Resultado.split('|');
                            var result = auxUno[0].replaceAll(' ', '');
                            if (result == '1') {
                              const bodyPost =
                              {
                                codUsuario: '0',
                                nombres: auxnombre,
                                apellido: '',
                                telefono: auxtelefono,
                                correo: auxcorreo.toLowerCase().replace(' ', ''),
                                tipo_identificacion: 1,
                                numero_identificacion: '0',
                                direccion: auxdireccion,
                                CMNTRIO: "Registro operacion automatica",
                                TOKEN: this.MetodosServicio.encryptUsingTripleDES('Temporal1'),
                                dpto: '261',
                                ciudad: '401',
                                Complemento_direccion: auxcomplemento,
                                RZON_SCIAL: '0',
                                NIT: null,
                                COORDENADAS: auxcoordenadas,
                                TPO_CLNTEINST: 5
                              }
                              this.service.modcpersonacliente('4', '0', bodyPost).subscribe(Resultado => {
                                var auxrespu = Resultado.toString().split("|");
                                if (auxrespu[0].toString().trim() == "1") {
                                  const bodyPost = {
                                    'USUCODIG': 0,
                                    'CorreoPersona': auxcorreo.toLowerCase().replace(' ', '')
                                  }
                                  this.service.consLoginCliente('1', bodyPost).subscribe(async Resultado => {
                                    //await this.AsociaSector(Resultado[0].USUCODIG);

                                    this.service.AsociarSectores('1', Resultado[0].USUCODIG).subscribe(async Resultado => {
                                      obj.Respuesta = auxrespu[1];
                                      this.numberinsertados++;
                                      this.NumberTotal++;
                                      obj.Estado = true;

                                      var respuadmin = (await this.servadminManyChat.adminManyChat_Mtd(tel, this.ArrayDataInsert[i].Nombre.toString().trim())).toString().trim().split("|");
                                      obj.IdManyChat = respuadmin[2];
                                      

                                      resolve(true);
                                    });
                                  })
                                } else {
                                  obj.Respuesta = auxrespu[1];
                                  this.ArrInfoTotalCausaNoreguistro[7].value++;
                                  this.numbernofueposible++;
                                  this.NumberTotal++;
                                  resolve(true);
                                }
                              });
                            } else {
                              obj.Respuesta = 'Tu teléfono ya se encuentra registrado en AgroApoya2.';
                              this.ArrInfoTotalCausaNoreguistro[6].value++;
                              this.numbernofueposible++;
                              this.NumberTotal++;
                              resolve(true);
                            }
                          });
                        } else {
                          obj.Respuesta = "Número de teléfono no válido: " + "'" + num + "'";
                          this.ArrInfoTotalCausaNoreguistro[5].value++;
                          this.numbernofueposible++;
                          this.NumberTotal++;
                          resolve(true);
                        }
                      } else {
                        obj.Respuesta = "No fue posible encontrar la direccion : " + "'" + auxdireccion + "'";
                        this.ArrInfoTotalCausaNoreguistro[4].value++;
                        this.numbernofueposible++;
                        this.NumberTotal++;
                        resolve(true);
                      }
                    });
                  } else {
                    obj.Respuesta = 'Dirección no registrada';
                    this.ArrInfoTotalCausaNoreguistro[3].value++;
                    this.numbernofueposible++;
                    this.NumberTotal++;
                    resolve(true);
                  }

                } else {
                  obj.Respuesta = 'Nombre no registrado';
                  this.ArrInfoTotalCausaNoreguistro[2].value++;
                  this.numbernofueposible++;
                  this.NumberTotal++;
                  resolve(true);
                }

              } else {
                obj.Respuesta = 'Usuario ya registrado';
                this.ArrInfoTotalCausaNoreguistro[1].value++;
                this.numbernofueposible++;
                this.NumberTotal++;
                resolve(true);
              }
            });
          } else {
            obj.Respuesta = 'Correo electronico invalido';
            this.ArrInfoTotalCausaNoreguistro[0].value++;
            this.numbernofueposible++;
            this.NumberTotal++;
            resolve(true);
          }
          this.ArrayRespuesta.push(obj);
        });

      } catch (error) {

      }
    }
    console.log(this.ArrInfoTotalCausaNoreguistro)
  }


  async obtieneCoordenadas_Mtd(direccion: string) {
    await new Promise((resolve, reject) => {
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direccion)}&key=AIzaSyD_BcdT_heUpoSU7iFbndqI_rxmMbFsHAA`;
      this.http.get(apiUrl).subscribe((response: any) => {
        return response;
        //return response.results[0].geometry.location;
      });
    });
  }

  AsociaSector(usucodig: string) {
    this.service.AsociarSectores('1', usucodig).subscribe(Resultado => {
    })
  }
}
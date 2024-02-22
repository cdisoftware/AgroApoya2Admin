import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/core/reporte.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private ServicioReporte: ReporteService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  DatosUsuarios: any = [];

  // VARIABLES USUARIOS LOCALIDAD MESES

  DatesUsers433: any = [];
  UsersCedritos: any = [];
  UsersCedritos1: number = 0;
  UsersCedritos2: number = 0;
  UsersCedritos3: number = 0;
  UsersCedritos4: number = 0;


  DatesUsers434: any = [];
  UsersFullBgta: any = [];
  UsersFullBgta1: number = 0;
  UsersFullBgta2: number = 0;
  UsersFullBgta3: number = 0;
  UsersFullBgta4: number = 0;


  DatesUsers436: any = [];
  UsersCentroBgta: any = [];
  UsersCentroBgta1: number = 0;
  UsersCentroBgta2: number = 0;
  UsersCentroBgta3: number = 0;
  UsersCentroBgta4: number = 0;



  FechasRegistro: any = [];
  UsuariosMesUno: number = 0;
  UsuariosMesDos: number = 0;
  UsuariosMesTres: number = 0;
  UsuariosMesCuatro: number = 0;


  // VARIABLES COMPRAS POR LOCALIDAD
  DatosCompras: any = [];
  DatesCompras433: any = [];
  ComprasCedritos: any = [];
  PromeCompCedritos: number = 0;
  DatesCompras434: any = [];
  ComprasFullBgta: any = [];
  PromeCompFullBgta: number = 0;
  DatesCompras436: any = [];
  ComprasCentroBgta: any = [];
  PromeCompCentroBgta: number = 0;




  // VARIABLES GRAFICO TOTAL USUARIOS
  MedidasGrafico: [number, number] = [500, 500];
  ColoresGrafico: any = {
    domain: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000']
  };
  ValorUsuariosTotales: number = 0;
  LegendaEtiqueta: string = '';

  // VARIABLES GRAFICO PROMEDIO COMPRAS POR LOCALIDAD
  MedidasBarrasProm: [number, number] = [1290, 350];
  ColoresBarrasProm: any = {
    domain: ['#397c97', '#67c04f', '#ecd444'],
  };
  DatosBarrasUsuariosProm: any = [];
  MostrarEjeXProm: boolean = true;
  MostrarEjeYProm: boolean = true;
  MostrarLeyendaProm: boolean = true;
  MostrarXLabelProm: boolean = true;
  MostrarYLabelProm: boolean = true;
  LabelXProm: string = 'Localidades';
  LabelYProm: string = 'Días';
  LeyendaTituloProm: string = 'Localidades';

  // VARIABLES GRAFICO USUARIOS CUATRO MESES
  MedidasBarras: [number, number] = [1290, 350];
  ColoresBarras: any = {
    domain: ['#397c97', '#67c04f', '#ecd444', '#a7cede'],
  };
  DatosBarrasUsuarios: any = [];
  MostrarEjeX: boolean = true;
  MostrarEjeY: boolean = true;
  MostrarLeyenda: boolean = true;
  MostrarXLabel: boolean = true;
  MostrarYLabel: boolean = true;
  LabelX: string = 'Localidades';
  LabelY: string = 'Numero de Usuarios';
  LeyendaTitulo: string = 'Meses';


  SlideBoton: boolean = false;
  NumeroUsuariosLocalidad: any = [];

  ngOnInit(): void {
    this.CargarInfoUsuarios();
  }

  Onchange(newValue: boolean): void {
    console.log(newValue);
    if (newValue) {
      this.document.querySelector('#OpcionUno')?.classList.add('OpcionUnoAfter');
      this.document.querySelector('#OpcionDos')?.classList.add('OpcionDosAfter');
    } else {
      this.document.querySelector('#OpcionUno')?.classList.remove('OpcionUnoAfter');
      this.document.querySelector('#OpcionDos')?.classList.remove('OpcionDosAfter');
    }
  }

  CargarInfoUsuarios() {
    this.InfoUsuarios();
  }

  // ActualizarUsuarios(j: number) {
  //   this.NumeroUsuariosLocalidad[j].NumeroUsuarios = this.NumeroUsuariosLocalidad[j].NumeroUsuarios + 1;
  // }

  // InsertarUsuarios(IdSector: number, Descripcion: string) {
  //   this.NumeroUsuariosLocalidad.push({ IdSector: IdSector, Descripcion: Descripcion, NumeroUsuarios: 1 });
  // }

  InfoUsuarios() {

    let SplitUno: any = 0;
    let SplitDos: any = 0;
    let DiferenciasDias: number = 0;
    let AcumuladorDias: number = 0;
    let Contador: number = 0;
    let j: number = 0;

    this.ServicioReporte.InfoUsuariosDash('1').subscribe(ResultObservable => {
      // for (var i = 0; i < ResultObservable.length; i++) {
      //   if (this.NumeroUsuariosLocalidad.length > 0) {
      //     for (var j = 0; j < this.NumeroUsuariosLocalidad.length; j++) {
      //       var AuxIdSectorArray = this.NumeroUsuariosLocalidad[j].IdSector;
      //       var AuxIdSectorObservable = ResultObservable[i].IdSector;
      //       if (AuxIdSectorArray == AuxIdSectorObservable) {
      //         // this.ActualizarUsuarios(j);
      //       } else {
      //         this.InsertarUsuarios(ResultObservable[i].IdSector, ResultObservable[i].DSCRPCION_SCTOR);
      //       }
      //     }
      //   } else {
      //     this.InsertarUsuarios(ResultObservable[i].IdSector, ResultObservable[i].DSCRPCION_SCTOR);
      //   }
      // }


      for (let i = 0; i < ResultObservable.length; i++) {
        if (this.NumeroUsuariosLocalidad.length > 0)  {
          while (j < i) {
            if (this.NumeroUsuariosLocalidad[j].IdSector == ResultObservable[i].IdSector) {
              this.NumeroUsuariosLocalidad[j].NumeroUsuarios = this.NumeroUsuariosLocalidad[j].NumeroUsuarios + 1;
            } else {
              this.NumeroUsuariosLocalidad.push({ "IdSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR, "NumeroUsuarios": 1 });
            }
            j = j + 1;
          }
        } else {
          this.NumeroUsuariosLocalidad.push({"IdSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR, "NumeroUsuarios": 1});
        } 
      }
      console.log(this.NumeroUsuariosLocalidad);


      // for (let i = 0; i < ResultObservable.length; i++) {
      //   if (this.NumeroUsuariosLocalidad.length == 0) {
      //     this.NumeroUsuariosLocalidad.push({ "IdSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR, "NumeroUsuarios": 1 });
      //   } else {
      //     const Existe = this.NumeroUsuariosLocalidad.findIndex((obj: any) => obj.IdSector == ResultObservable[i].IdSector);

      //     if (Existe !== -1) {
      //       this.NumeroUsuariosLocalidad[Existe] += ResultObservable[i].IdSector;
      //     } else {
      //       this.NumeroUsuariosLocalidad.push({ "IdSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR, "NumeroUsuarios": 1 });
      //     }
      //   }
      // }



      // for (let i = 0; i < ResultObservable.length; i++) {
      //   console.log("Resutlado ciclo For;" , this.NumeroUsuariosLocalidad);
      //   if (this.NumeroUsuariosLocalidad.length > 0)  {
      //     for (let j = 0; j < this.NumeroUsuariosLocalidad.length; j++) {
      //       if (this.NumeroUsuariosLocalidad[j].IdSector == ResultObservable[i].IdSector) {
      //         this.NumeroUsuariosLocalidad[j].NumeroUsuarios = this.NumeroUsuariosLocalidad[j].NumeroUsuarios + 1;
      //       } else {
      //         this.NumeroUsuariosLocalidad.push({"idSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR, "NumeroUsuarios": 1});
      //       }
      //     }
      //   } else {
      //     this.NumeroUsuariosLocalidad.push({"idSector": ResultObservable[i].IdSector, "Descripcion": ResultObservable[i].DSCRPCION_SCTOR, "NumeroUsuarios": 1});
      //   } 
      // }
      // console.log(this.NumeroUsuariosLocalidad);



      this.DatosUsuarios = ResultObservable;
      this.ValorUsuariosTotales = this.DatosUsuarios.length;
      this, this.LegendaEtiqueta = 'Numero Total de Usuarios';
      // console.log(this.DatosUsuarios);

      for (let i = 0; i < this.DatosUsuarios.length; i++) {
        if (this.DatosUsuarios[i].IdSector == '433') {
          SplitUno = this.DatosUsuarios[i].FECHA_CREACION.split('-');
          this.DatesUsers433[i] = new Date(SplitUno[0], SplitUno[1] - 1, SplitUno[2]);
          this.UsersCedritos.push({ "idSector": this.DatosUsuarios[i].IdSector, "Fecha": this.DatesUsers433[i] });
        }

        if (this.DatosUsuarios[i].IdSector == '434') {
          SplitUno = this.DatosUsuarios[i].FECHA_CREACION.split('-');
          this.DatesUsers434[i] = new Date(SplitUno[0], SplitUno[1] - 1, SplitUno[2]);
          this.UsersFullBgta.push({ "idSector": this.DatosUsuarios[i].IdSector, "Fecha": this.DatesUsers434[i] });
        }

        if (this.DatosUsuarios[i].IdSector == '436') {
          SplitUno = this.DatosUsuarios[i].FECHA_CREACION.split('-');
          this.DatesUsers436[i] = new Date(SplitUno[0], SplitUno[1] - 1, SplitUno[2]);
          this.UsersCentroBgta.push({ "idSector": this.DatosUsuarios[i].IdSector, "Fecha": this.DatesUsers436[i] });
        }
      }

      // console.log(this.UsersCedritos);

      for (let i = 0; i < this.UsersCedritos.length; i++) {
        if (this.UsersCedritos[i].Fecha >= new Date('2023-11-1') && this.UsersCedritos[i].Fecha <= new Date('2023-11-30') &&
          this.UsersCedritos[i].Fecha >= new Date('2023-11-1') && this.UsersCedritos[i + 1].Fecha <= new Date('2023-11-30')) {
          this.UsersCedritos1 = this.UsersCedritos1 + 1;
        }
        if (this.UsersCedritos[i].Fecha >= new Date('2023-12-1') && this.UsersCedritos[i].Fecha <= new Date('2023-12-31') &&
          this.UsersCedritos[i].Fecha >= new Date('2023-12-1') && this.UsersCedritos[i + 1].Fecha <= new Date('2023-12-31')) {
          this.UsersCedritos2 = this.UsersCedritos2 + 1;
        }
        if (this.UsersCedritos[i].Fecha >= new Date('2024-1-1') && this.UsersCedritos[i].Fecha <= new Date('2024-1-31') &&
          this.UsersCedritos[i].Fecha >= new Date('2024-1-1') && this.UsersCedritos[i + 1].Fecha <= new Date('2024-1-31')) {
          this.UsersCedritos3 = this.UsersCedritos3 + 1;
        }
        if (this.UsersCedritos[i].Fecha >= new Date('2024-2-1') && this.UsersCedritos[i].Fecha <= new Date('2024-02-29') &&
          this.UsersCedritos[i].Fecha >= new Date('2024-2-1') && this.UsersCedritos[i + 1].Fecha <= new Date('2024-02-29')) {
          this.UsersCedritos4 = this.UsersCedritos4 + 1;
        }
      }

      // console.log(this.UsersCedritos2);
      // console.log(this.UsersCedritos3);
      // console.log(this.UsersCedritos4);

      for (let i = 0; i < this.UsersFullBgta.length; i++) {
        if (this.UsersFullBgta[i].Fecha >= new Date('2023-11-1') && this.UsersFullBgta[i].Fecha <= new Date('2023-11-30') &&
          this.UsersFullBgta[i].Fecha >= new Date('2023-11-1') && this.UsersFullBgta[i + 1].Fecha <= new Date('2023-11-30')) {
          this.UsersFullBgta1 = this.UsersFullBgta1 + 1;
        }
        if (this.UsersFullBgta[i].Fecha >= new Date('2023-12-1') && this.UsersFullBgta[i].Fecha <= new Date('2023-12-31') &&
          this.UsersFullBgta[i].Fecha >= new Date('2023-12-1') && this.UsersFullBgta[i + 1].Fecha <= new Date('2023-12-31')) {
          this.UsersFullBgta2 = this.UsersFullBgta2 + 1;
        }
        if (this.UsersFullBgta[i].Fecha >= new Date('2024-1-1') && this.UsersFullBgta[i].Fecha <= new Date('2024-1-31') &&
          this.UsersFullBgta[i].Fecha >= new Date('2024-1-1') && this.UsersFullBgta[i + 1].Fecha <= new Date('2024-1-31')) {
          this.UsersFullBgta3 = this.UsersFullBgta3 + 1;
        }
        if (this.UsersFullBgta[i].Fecha >= new Date('2024-2-1') && this.UsersFullBgta[i].Fecha <= new Date('2024-2-29') &&
          this.UsersFullBgta[i].Fecha >= new Date('2024-2-1') && this.UsersFullBgta[i + 1].Fecha <= new Date('2024-2-29')) {
          this.UsersFullBgta4 = this.UsersFullBgta4 + 1;
        }
      }
      // console.log( this.UsersFullBgta1);
      // console.log(this.UsersFullBgta2);
      // console.log(this.UsersFullBgta3);
      // console.log(this.UsersFullBgta4);

      for (let i = 0; i < this.UsersCentroBgta.length; i++) {
        if (this.UsersCentroBgta[i].Fecha >= new Date('2023-11-1') && this.UsersCentroBgta[i].Fecha <= new Date('2023-11-30') &&
          this.UsersCentroBgta[i].Fecha >= new Date('2023-11-1') && this.UsersCentroBgta[i + 1].Fecha <= new Date('2023-11-30')) {
          this.UsersCentroBgta1 = this.UsersCentroBgta1 + 1;
        }
        if (this.UsersCentroBgta[i].Fecha >= new Date('2023-12-1') && this.UsersCentroBgta[i].Fecha <= new Date('2023-12-31') &&
          this.UsersCentroBgta[i].Fecha >= new Date('2023-12-1') && this.UsersCentroBgta[i + 1].Fecha <= new Date('2023-12-31')) {
          this.UsersCentroBgta2 = this.UsersCentroBgta2 + 1;
        }
        if (this.UsersCentroBgta[i].Fecha >= new Date('2024-1-1') && this.UsersCentroBgta[i].Fecha <= new Date('2024-1-31') &&
          this.UsersCentroBgta[i].Fecha >= new Date('2024-1-1') && this.UsersCentroBgta[i + 1].Fecha <= new Date('2024-1-31')) {
          this.UsersCentroBgta3 = this.UsersCentroBgta3 + 1;
        }
        if (this.UsersCentroBgta[i].Fecha >= new Date('2024-2-1') && this.UsersCentroBgta[i].Fecha <= new Date('2024-2-29') &&
          this.UsersCentroBgta[i].Fecha >= new Date('2024-2-1') && this.UsersCentroBgta[i + 1].Fecha <= new Date('2024-2-29')) {
          this.UsersCentroBgta4 = this.UsersCentroBgta4 + 1;
        }
      }

      this.DatosBarrasUsuarios = [
        {
          "name": "Cedritos",
          "series": [
            {
              "name": "Nov-23",
              "value": this.UsersCedritos1
            },
            {
              "name": "Dic-23",
              "value": this.UsersCedritos2
            },
            {
              "name": "Ene-24",
              "value": this.UsersCedritos3
            },
            {
              "name": "Feb-24",
              "value": this.UsersCedritos4
            }
          ]
        },
        {
          "name": "Toda Bogotá",
          "series": [
            {
              "name": "Nov-23",
              "value": this.UsersFullBgta1
            },
            {
              "name": "Dic-23",
              "value": this.UsersFullBgta2
            },
            {
              "name": "Ene-24",
              "value": this.UsersFullBgta3
            },
            {
              "name": "Feb-24",
              "value": this.UsersFullBgta4
            }
          ]
        },
        {
          "name": "Centro Bogotá",
          "series": [
            {
              "name": "Nov-23",
              "value": this.UsersCentroBgta1
            },
            {
              "name": "Dic-23",
              "value": this.UsersCentroBgta2
            },
            {
              "name": "Ene-24",
              "value": this.UsersCentroBgta3
            },
            {
              "name": "Feb-24",
              "value": this.UsersCentroBgta4
            }
          ]
        }
      ];
    });

    this.ServicioReporte.InfoUsuariosComprasDash('1').subscribe(ResultObservable => {
      this.DatosCompras = ResultObservable;
      // console.log(this.DatosCompras);

      for (let i = 0; i < this.DatosCompras.length; i++) {
        if (this.DatosCompras[i].IdSector == '433') {
          SplitDos = this.DatosCompras[i].FechaCompra.split('-');
          this.DatesCompras433[i] = new Date(SplitDos[0], SplitDos[1] - 1, SplitDos[2]);
          this.ComprasCedritos.push({ "idSector": this.DatosCompras[i].IdSector, "Fecha": this.DatesCompras433[i] })
        }

        if (this.DatosCompras[i].IdSector == '434') {
          SplitDos = this.DatosCompras[i].FechaCompra.split('-');
          this.DatesCompras434[i] = new Date(SplitDos[0], SplitDos[1] - 1, SplitDos[2]);
          this.ComprasFullBgta.push({ "idSector": this.DatosCompras[i].IdSector, "Fecha": this.DatesCompras434[i] });
        }

        if (this.DatosCompras[i].IdSector == '436') {
          SplitDos = this.DatosCompras[i].FechaCompra.split('-');
          this.DatesCompras436[i] = new Date(SplitDos[0], SplitDos[1] - 1, SplitDos[2]);
          this.ComprasCentroBgta.push({ "idSector": this.DatosCompras[i].IdSector, "Fecha": this.DatesCompras436[i] });
        }
      }

      // console.log(this.ComprasCentroBgta);


      for (let i = 0; i < this.ComprasCedritos.length; i++) {
        if (this.ComprasCedritos[i].Fecha >= new Date('2023-1-20') && this.ComprasCedritos[i].Fecha <= new Date('2024-02-29')
          && this.ComprasCedritos[i + 1].Fecha >= new Date('2023-1-20') && this.ComprasCedritos[i + 1].Fecha <= new Date('2024-02-29')) {
          Contador = Contador + 1;
          DiferenciasDias = (this.ComprasCedritos[i].Fecha - this.ComprasCedritos[i + 1].Fecha) / (1000 * 60 * 60 * 24);
          AcumuladorDias = AcumuladorDias + DiferenciasDias;
        }
      }

      this.PromeCompCedritos = AcumuladorDias / (Contador + 1);
      Contador = 0;
      DiferenciasDias = 0;
      AcumuladorDias = 0;

      for (let i = 0; i < this.ComprasFullBgta.length; i++) {
        if (this.ComprasFullBgta[i].Fecha >= new Date('2023-1-19') && this.ComprasFullBgta[i].Fecha <= new Date('2024-02-29')
          && this.ComprasFullBgta[i + 1].Fecha >= new Date('2023-1-19') && this.ComprasFullBgta[i + 1].Fecha <= new Date('2024-02-29')) {
          Contador = Contador + 1;
          DiferenciasDias = (this.ComprasFullBgta[i].Fecha - this.ComprasFullBgta[i + 1].Fecha) / (1000 * 60 * 60 * 24);
          AcumuladorDias = AcumuladorDias + DiferenciasDias;
        }
      }

      this.PromeCompFullBgta = AcumuladorDias / (Contador + 1);
      Contador = 0;
      DiferenciasDias = 0;
      AcumuladorDias = 0;

      for (let i = 0; i < this.ComprasCentroBgta.length; i++) {
        if (this.ComprasCentroBgta[i].Fecha >= new Date('2023-3-31') && this.ComprasCentroBgta[i].Fecha <= new Date('2024-02-29')
          && this.ComprasCentroBgta[i + 1].Fecha >= new Date('2023-3-31') && this.ComprasCentroBgta[i + 1].Fecha <= new Date('2024-02-29')) {
          Contador = Contador + 1;
          DiferenciasDias = (this.ComprasCentroBgta[i].Fecha - this.ComprasCentroBgta[i + 1].Fecha) / (1000 * 60 * 60 * 24);
          AcumuladorDias = AcumuladorDias + DiferenciasDias;
        }
      }

      this.PromeCompCentroBgta = AcumuladorDias / (Contador + 1);

      this.DatosBarrasUsuariosProm = [
        {
          "name": "Cedritos",
          "value": this.PromeCompCedritos
        },
        {
          "name": "Toda Bogotá",
          "value": this.PromeCompFullBgta
        },
        {
          "name": "Centro Bogotá",
          "value": this.PromeCompCentroBgta
        }
      ];
      // console.log(this.PromeCompCedritos);
      // console.log(this.PromeCompFullBgta);
      // console.log(this.PromeCompCentroBgta);
    })
  }

}

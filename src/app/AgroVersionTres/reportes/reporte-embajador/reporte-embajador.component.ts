import * as fs from 'file-saver';
import { Workbook } from 'exceljs'
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiciosService } from 'src/app/AgroVersionTres/core/servicios.service';

@Component({
  selector: 'app-reporte-embajador',
  templateUrl: './reporte-embajador.component.html',
  styleUrls: ['./reporte-embajador.component.css']
})

export class ReporteEmbajadorComponent implements OnInit {

  mostrarTabla: string = '0'; //por defecto esta oculta , 1--> Muestra, 0--> Oculta
  ListaLocalidad: any = [];
  ListaTabla: any = [];
  ListaVecinos: any = [];

  //VARIABLES DE LOS FILTROS
  FechaInicioEmba: string = '';
  FechaFinEmba: string = '';
  CodigoUsuarioEmba: string = '';
  CorreoEmba: string = '';
  telefonoEmbajador: string = '';
  CodigoUsuarioVecino: string = '';
  CorreoVeci: string = '';
  TelefonoVeci: string = '';
  localidad: string = '0';

  //VARIABLES DEL MODAL VECINOS
  Idusuario: any;
  Nombre: any;
  Correo: any;
  Fecharegistro: any;
  CelularPersona: any;
  IdManyChat: any;
  Direccion: any;
  Complementodireccion: any;
  NombreConjunto: any;
  Linkrelacionvecinos: any;
  Numerovecinos: any;
  Fechaincioembajador: any;
  ExelVecino: string;


  @ViewChild('ModalVecino', { static: false }) ModalVecino: any;

  constructor(public ServiciosGenerales: ServiciosService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.CargasIniciales();
  }

  CargasIniciales(): void {
    this.ServiciosGenerales.consTipoLocalidad('2').subscribe(rest => {
      this.ListaLocalidad = rest;
    });
  }

  //Metodos accion botones filtros
  BtnBuscar() {
    this.mostrarTabla = '1';

    const formatearFecha = (fecha: string): string => {
      if (fecha && fecha.includes('-')) {
        const partes = fecha.split('-'); // Divide la fecha en [año, mes, día]
        return partes.join('/'); // Une las partes con '/'
      }
      return '0'; // Devuelve '0' si la fecha es inválida
    };

    // Método auxiliar para verificar y asignar valores
    const validarValor = (valor: any): string => (valor && valor !== '' ? valor : '0');

    // Uso del método `formatearFecha` para las fechas
    var auxFechaIncio = formatearFecha(this.FechaInicioEmba);
    var auxFechaFin = formatearFecha(this.FechaFinEmba);

    // Asignación de valores con el método auxiliar
    auxFechaIncio = validarValor(auxFechaIncio);
    auxFechaFin = validarValor(auxFechaFin);
    const auxCodigoEmbajador = validarValor(this.CodigoUsuarioEmba);
    const auxCorreoEmbajador = validarValor(this.CorreoEmba);
    const auxTelefonoEmbajador = validarValor(this.telefonoEmbajador);
    const auxCodigoVecino = validarValor(this.CodigoUsuarioVecino);
    const auxCorreoVecino = validarValor(this.CorreoVeci);
    const auxTelefonoVecino = validarValor(this.TelefonoVeci);
    const auxLocalidad = validarValor(this.localidad);

    const body = {
      Fechainicio: auxFechaIncio,
      Fechafin: auxFechaFin,
    };

    this.ServiciosGenerales.consEmbajadorConjuntosReporte(
      '1', auxCodigoEmbajador, auxCorreoEmbajador, auxTelefonoEmbajador, auxCodigoVecino, auxCorreoVecino, auxTelefonoVecino, body
    ).subscribe(
      Rest => {
        console.log('Respuesta del Servicio:', Rest);
        this.ListaTabla = Rest;
      },
      error => {
        console.error('Error en el servicio:', error);
      }
    );
  }

  BtnLimpiar(): void {
    this.FechaInicioEmba = '';
    this.FechaFinEmba = '';
    this.CodigoUsuarioEmba = '';
    this.CorreoEmba = '';
    this.telefonoEmbajador = '';
    this.CodigoUsuarioVecino = '';
    this.CorreoVeci = '';
    this.TelefonoVeci = '';
    this.localidad = '0';
    this.mostrarTabla = '0';
  }

  AbrirModal(ListaTabla: any): void {
    this.modalService.open(this.ModalVecino, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })

    this.Idusuario = ListaTabla.IdUsuarioEmbajador
    this.Nombre = ListaTabla.NombrePersona
    this.Correo = ListaTabla.CorreoPersona
    this.Fecharegistro = ListaTabla.FechaCreacion
    this.CelularPersona = ListaTabla.CelularPersona
    this.IdManyChat = ListaTabla.id_manychat
    this.Direccion = ListaTabla.DRCCION
    this.Complementodireccion = ListaTabla.CMPLMNTO_DRRCCION
    this.NombreConjunto = ListaTabla.NombreConjunto
    this.Linkrelacionvecinos = ListaTabla.LinkCortoVecino
    this.Numerovecinos = ListaTabla.NumeroVecino
    this.Fechaincioembajador = ListaTabla.FechaCreacioncomoEmbajador
    
    console.log(ListaTabla)

    this.VecinosListas(ListaTabla.IdUsuarioEmbajador);
  }

  VecinosListas(UsucodigEmbajador: string): void {
    this.ServiciosGenerales.consEmbajadorVecinosReporte('1', UsucodigEmbajador).subscribe(Rest => {
      this.ListaVecinos = Rest;
      console.log(Rest);

      if (this.ListaVecinos.length == 0) {
        this.ExelVecino = '0';
      } else {
        this.ExelVecino = '1';
      }
    },
      (error) => {
        console.error('Error al obtener los datos:', error);
      });
  }

  DescargarExcelEmbajadorVecinos() {
    //Crear nuevo archiv
    let workbook = new Workbook();

    // crear una nueva hoja dentro del excel
    let worksheet = workbook.addWorksheet("Reporte Vecinos"); //Nombre de la hoja
     //Encabezado y se dejan las columnas que corresponden 
    let header = ['IdUsuarioEmbajador', 'Nombre', 'Correo', 'FechaCreacion', 'Celular', 'id_manychat', 'DRCCION',
      'CMPLMNTO_DRRCCION', 'id'];


    worksheet.addRow(header); //le da los estilos a  header de la tabla
    ['A1', 'B1', 'C1', 'D1', 'E1', 'G1', 'F1', 'H1', 'I1'].map(key => {
      worksheet.getCell(key).fill = {
        type: 'pattern',
        pattern: 'darkTrellis',
        fgColor: { argb: '397c97' },
        bgColor: { argb: '397c97' }
      };
      worksheet.getCell(key).font = {
        color: { argb: 'FFFFFF' }
      };
    });

    worksheet.columns = [ // le dan el tamaño a las columnas
      { width: 25 }, { width: 30 }, { width: 30 }, { width: 20 }, { width: 20 },
      { width: 20 }, { width: 25 }, { width: 30 }, { width: 30 }, { width: 20 },
      { width: 15 }, { width: 25 }
    ];
    //PARTE DINAMINCA!!
    //Recorre el arreglo que quiero poner en el excel
    for (let x1 of this.ListaVecinos) {
      let temp = []
      // EN EL ORDERN QUE LOS PONGAS ACA SE VAN A VER EN LA HOJA DEL EXCEL

      temp.push(x1['UsucodigEmbajador'])
      temp.push(x1['NombreVecino'])
      temp.push(x1['CorreoVecino'])
      temp.push(x1['FechaCreacionVecino'])
      temp.push(x1['CelularVecino'])
      temp.push(x1['IdManychatVecino'])
      temp.push(x1['DireccionVecino'])
      temp.push(x1['ComplementoVecino'])
      temp.push(x1['Id'])

      worksheet.addRow(temp)
    }

    let fname = "Reporte-Embajador";
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '.xlsx');
    });
  }
}
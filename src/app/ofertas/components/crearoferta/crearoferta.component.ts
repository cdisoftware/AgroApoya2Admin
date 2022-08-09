import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { CrearofertaService } from './../../../core/crearoferta.service'

@Component({
  selector: 'app-crearoferta',
  templateUrl: './crearoferta.component.html',
  styleUrls: ['./crearoferta.component.css']
})
export class CrearofertaComponent implements OnInit {

  public respuestaImagenEnviada: any;
  public resultadoCarga: any;
  //Declaracion de variables
  ArrayProductos: any = [];
  ArrayEmpaque: any = [];
  ArrayCondicion: any = [];
  ArrayTamano: any = [];
  ArrayDepa: any = [];
  ArrayCiud: any = [];
  IdProducto: string = '0';
  IdEmpaque: string = '0';
  IdCondicion: string = '0';
  IdTamano: string = '0';
  DesProducto: string = '';
  ValorOferta: number = 0;
  Unidades: number = 0;
  ValorTotalOferta: number = 0;
  Vigencia: string = '';
  IdDepartamento: string = '0';
  IdCiudad: string = '0';
  UbicacionPar: string = '';
  Imagen1: string = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
  Imagen2: string = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
  Imagen3: string = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
  Imagen4: string = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
  Imagen5: string = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
  RutaImagenes: string = '';
  ImagenCargada: string = '';
  file: FileList | undefined;

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosOferta: CrearofertaService
  ) { }

  ngOnInit(): void {
    this.RutaImagenes = this.SeriviciosGenerales.RecuperaRutaImagenes();
    this.CargaProductos();
    this.CargaDepartamento();
  }

  CargaProductos() {
    this.ServiciosOferta.ConsultaProductos('1').subscribe(Resultado => {
      this.ArrayProductos = Resultado;
    })
  }

  CargaEmpaques(idproducto: string) {
    this.ServiciosOferta.ConsultaEmpaque(idproducto).subscribe(Resultado => {
      this.ArrayEmpaque = Resultado;
      console.log(Resultado)
    })
  }

  CargaCondicion(idproducto: string) {
    this.ServiciosOferta.ConsultaCondicion(idproducto).subscribe(Resultado => {
      this.ArrayCondicion = Resultado;
      console.log(Resultado)
    })
  }

  CargaTamano(idproducto: string) {
    this.ServiciosOferta.ConsultaTamano(idproducto).subscribe(Resultado => {
      this.ArrayTamano = Resultado;
      console.log(Resultado)
    })
  }

  CargaDepartamento() {
    this.ServiciosOferta.ConsultaDepartamento('4').subscribe(Resultado => {
      this.ArrayDepa = Resultado;
      console.log(Resultado)
    })
  }

  CargarCiudad(idmun: string) {
    this.ServiciosOferta.ConsultaCiudad(idmun).subscribe(Resultado => {
      this.ArrayCiud = Resultado;
    })
  }


  SelProducto(idproducto: string) {
    this.IdProducto = idproducto;
    this.CargaEmpaques(this.IdProducto);
    this.CargaCondicion(this.IdProducto);
    this.CargaTamano(this.IdProducto);
  }

  SelEmpaque(idempaque: string) {
    this.IdEmpaque = idempaque;
  }

  SelCondicion(idcondicion: string) {
    this.IdCondicion = idcondicion;
  }

  SelTamano(idtamano: string) {
    this.IdTamano = idtamano;
  }

  SelDepa(iddepa: string) {
    this.IdDepartamento = iddepa;
    this.CargarCiudad(this.IdDepartamento);
  }

  SelCiud(idciudad: string) {
    this.IdCiudad = idciudad;
  }

  CalculaValorTotal() {
    this.ValorTotalOferta = this.ValorOferta * this.Unidades;
  }



  Guardar() {

  }

  Limpiar() {
    this.IdProducto = '0';
    this.IdEmpaque = '0';
    this.IdCondicion = '0';
    this.IdTamano = '0';
    this.DesProducto = '';
    this.ValorOferta = 0;
    this.Unidades = 0;
    this.ValorTotalOferta = 0;
    this.Vigencia = '';
    this.IdDepartamento = '0';
    this.IdCiudad = '0';
    this.UbicacionPar = '';
    this.Imagen1 = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
    this.Imagen2 = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
    this.Imagen3 = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
    this.Imagen4 = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
    this.Imagen5 = '../../../../assets/ImagenesAgroApoya2Admin/SubirImagen.png';
  }

  public CargaImagen(event: any, imagen: string) {
    this.ImagenCargada = imagen;
    this.file = event.target.files[0];
    console.log(event.target.files[0])
    this.ServiciosOferta.postFileImagen(event.target.files[0]).subscribe(
      response => {
        this.respuestaImagenEnviada = response;
        console.log(this.respuestaImagenEnviada);
        if (this.respuestaImagenEnviada <= 1) {
          console.log("Error en el servidor");
        } else {
          //console.log("Entra A Enviar");
          if (this.respuestaImagenEnviada == 'Archivo Subido Correctamente') {
            if (this.ImagenCargada == '1') {
              this.Imagen1 = this.RutaImagenes + event.target.files[0].name;
            }
            if (this.ImagenCargada == '2') {
              this.Imagen2 = this.RutaImagenes + event.target.files[0].name;
            }
            if (this.ImagenCargada == '3') {
              this.Imagen3 = this.RutaImagenes + event.target.files[0].name;
            }
            if (this.ImagenCargada == '4') {
              this.Imagen4 = this.RutaImagenes + event.target.files[0].name;
            }
            if (this.ImagenCargada == '5') {
              this.Imagen5 = this.RutaImagenes + event.target.files[0].name;
            }
          } else {
            this.resultadoCarga = 2;
            // console.log(this.resultadoCarga);
          }

        }
      },
      error => {

      }
    );
  }

}

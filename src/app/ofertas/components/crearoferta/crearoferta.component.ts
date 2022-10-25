import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { CrearofertaService } from './../../../core/crearoferta.service'
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearoferta',
  templateUrl: './crearoferta.component.html',
  styleUrls: ['./crearoferta.component.css']
})
export class CrearofertaComponent implements OnInit {

  public respuestaImagenEnviada: any;
  public resultadoCarga: any;
  productor = 'nombre_persona';
  //Declaracion de variables
  ArrayProductos: any = [];
  ArrayEmpaque: any = [];
  ArrayCondicion: any = [];
  ArrayTamano: any = [];
  ArrayDepa: any = [];
  ArrayCiud: any = [];
  ArrayProductor: any = [];
  IdProducto: string = '0';
  IdEmpaque: string = '0';
  IdCondicion: string = '0';
  IdTamano: string = '0';
  DesProducto: string = '';
  ValorOferta: number;
  Unidades: number;
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
  NomImagen1: string = '0';
  NomImagen2: string = '0';
  NomImagen3: string = '0';
  NomImagen4: string = '0';
  NomImagen5: string = '0';
  RutaImagenes: string = '';
  ImagenCargada: string = '';
  file: FileList | undefined;
  IdProductor: string = '';
  EJornada: string = '0';
  ArrayJornada: any = [];
  Respuesta: string = '';
  //mapas
  markers: google.maps.Marker[] = [];
  Coor1: string = '';
  Coor2: string = '';
  ValidaInsertSec: string = '1';
  CoordenadasParcela: string = ''
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  objCiudad: any = '0';
  NomCiudad: string = 'Antioquia, Barbosa';
  ValidaCam: string;
  ArrayCamposValida: { campo: string; campof: string; class: string; imagen: string; }[];


  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosOferta: CrearofertaService,
    private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService,
    private rutas: Router
  ) { }

  ngOnInit(): void {
    this.IdProductor = '';
    this.EJornada='';
    this.ValorOferta = 0;
    this.Unidades = 0;
    this.RutaImagenes = this.SeriviciosGenerales.RecuperaRutaImagenes();
    this.CargaProductos();
    this.CargaDepartamento();
    this.CargarObjetosIniciales();
  }

  CargarObjetosIniciales() {
    const datosproductor = {
      nombre_persona: ''
    }
    this.ServiciosValorar.ConsultaProductor('1', '1', datosproductor).subscribe(Resultado => {
      this.ArrayProductor = Resultado;
      console.log(this.ArrayProductor);
    })
    this.ServiciosValorar.ConsultaJornada('1').subscribe(Resultado => {
      this.ArrayJornada = Resultado;
    })
  }

  selectProductor(item: any) {
    this.IdProductor = item.codigo_persona;
  }

  LimpiarCampos(campo: string) {
    if (campo == 'pd') {
      this.IdProducto = '0';
    }
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

  SelCiud() {
    this.IdCiudad = this.objCiudad.CD_MNCPIO;
    this.NomCiudad = this.objCiudad.DSCRPCION;

  }

  CalculaValorTotal() {
    this.ValorTotalOferta = this.ValorOferta * this.Unidades;
  }

  Guardar(ModalRespuesta: any) {
    console.log(this.DesProducto)
    this.Respuesta = '';
    this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    if (this.IdProductor == '' || this.IdProducto == '0' || this.IdEmpaque =='0' || this.IdCondicion=='0'
    || this.IdTamano=='0' || this.DesProducto =='' || this.ValorOferta == 0 || this.Unidades== 0 
    || this.ValorTotalOferta ==0 || this.Vigencia=='' || this.EJornada == '' || this.IdDepartamento =='0'
    || this.IdCiudad == '0' || this.UbicacionPar =='' || this.CoordenadasParcela =='' || (this.NomImagen1 == '0' && this.NomImagen2 == '0' && this.NomImagen3 == '0' && this.NomImagen4 == '0' && this.NomImagen5 == '0'))
    {
      this.ValidaCam = '1';
      this.Respuesta = 'Favor valida las siguientes novedades en tu información.';
      this.ArrayCamposValida = [
        {
          campo: 'IdProductor',
          campof: 'Productor',
          class: '',
          imagen: ''
        },
        {
          campo: 'IdProducto',
          campof: 'Producto',
          class: '',
          imagen: ''
        },
        {
          campo: 'IdEmpaque',
          campof: 'Presentación empaque',
          class: '',
          imagen: ''
        },
        {
          campo: 'IdCondicion',
          campof: 'Condición',
          class: '',
          imagen: ''
        },
        {
          campo: 'IdTamano',
          campof: 'Tamaño',
          class: '',
          imagen: ''
        },
        {
          campo: 'DesProducto',
          campof: 'Caracteristicas',
          class: '',
          imagen: ''
        },
        {
          campo: 'ValorOferta',
          campof: 'Valor unidad empaque',
          class: '',
          imagen: ''
        },
        {
          campo: 'Unidades',
          campof: 'Unidades',
          class: '',
          imagen: ''
        },
        {
          campo: 'ValorTotalOferta',
          campof: 'Valor total oferta',
          class: '',
          imagen: ''
        },
        {
          campo: 'Vigencia',
          campof: 'Fecha recogida',
          class: '',
          imagen: ''
        },
        {
          campo: 'EJornada',
          campof: 'Jornada',
          class: '',
          imagen: ''
        },
        {
          campo: 'IdDepartamento',
          campof: 'Departamento',
          class: '',
          imagen: ''
        },
        {
          campo: 'IdCiudad',
          campof: 'Ciudad',
          class: '',
          imagen: ''
        },
        {
          campo: 'UbicacionPar',
          campof: 'Nombre parcela',
          class: '',
          imagen: ''
        },
        {
          campo: 'CoordenadasParcela',
          campof: 'Ubicación parcela',
          class: '',
          imagen: ''
        },
        {
          campo: 'Imagenes',
          campof: 'Imagen oferta',
          class: '',
          imagen: ''
        }

      ]
      for (var i = 0; i < this.ArrayCamposValida.length; i++) {
        if (this.ArrayCamposValida[i].campo == 'IdProductor') {
          if (this.IdProductor == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'IdProducto') {
          if (this.IdProducto == '0') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }  
        else if (this.ArrayCamposValida[i].campo == 'IdEmpaque') {
          if (this.IdEmpaque == '0') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'IdCondicion') {
          if (this.IdCondicion == '0') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'IdTamano') {
          if (this.IdTamano == '0') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'DesProducto') {
          if (this.DesProducto == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'ValorOferta') {
          if (this.ValorOferta == 0) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'Unidades') {
          if (this.Unidades == 0) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'ValorTotalOferta') {
          if (this.ValorTotalOferta == 0) {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'Vigencia') {
          if (this.Vigencia == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'EJornada') {
          if (this.EJornada == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'IdDepartamento') {
          if (this.IdDepartamento == '0') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'IdCiudad') {
          if (this.IdCiudad == '0') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'UbicacionPar') {
          if (this.UbicacionPar == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'CoordenadasParcela') {
          if (this.CoordenadasParcela == '') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }
        else if (this.ArrayCamposValida[i].campo == 'Imagenes') {
          if (this.NomImagen1 == '0' && this.NomImagen2 == '0' && this.NomImagen3 == '0' && this.NomImagen4 == '0' && this.NomImagen5 == '0') {
            this.ArrayCamposValida[i].class = 'TextAlert'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/rechazado.png'
          }
          else {
            this.ArrayCamposValida[i].class = 'TextFine'
            this.ArrayCamposValida[i].imagen = '../../../../../assets/ImagenesAgroApoya2Admin/aprobar.png'
          }
        }     
      }
    }
    else {
      this.ValidaCam = '0';
      this.ArrayCamposValida = [];
      const datosinsert = {
        CD_PRDCTO: this.IdProducto,
        UND_EMPQUE: '0',
        CD_CNDCION: this.IdCondicion,
        CD_TMNO: this.IdTamano,
        DSCRPCION_PRDCTO: this.DesProducto,
        VR_UNDAD_EMPQUE: this.ValorOferta,
        CD_UNDAD: this.Unidades,
        VR_TOTAL_OFRTA: this.ValorTotalOferta,
        VGNCIA_DESDE: this.Vigencia,
        CD_JRNDA: this.EJornada,
        CD_RGION: this.IdDepartamento,
        CD_MNCPIO: this.IdCiudad,
        UBCCION_PRCLA: this.UbicacionPar,
        COORDENADAS_PRCLA: this.CoordenadasParcela,
        USUCODIG: this.IdProductor,
        ID_PRODUCTOR: "0",
        CD_CNSCTVO: "0",
        CRCTRZCION: "0",
        OBS_EDICION: "0",
        IMAGEN1: this.NomImagen1,
        IMAGEN2: this.NomImagen2,
        IMAGEN3: this.NomImagen3,
        IMAGEN4: this.NomImagen4,
        IMAGEN5: this.NomImagen5
      }
      this.ServiciosOferta.CrearOferta('3', this.IdEmpaque, datosinsert).subscribe(Resultado => {
        var arrayrespuesta = Resultado.split('|');
        this.Respuesta = arrayrespuesta[1];
        if (arrayrespuesta[0] != '-1') {          
          this.rutas.navigateByUrl('home/buscaroferta');
        }        
      })
    }
  }

  SelEJornada(jornada: string) {
    this.EJornada = jornada;
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
    this.Coor1 = '';
    this.Coor2 = '';
    this.CoordenadasParcela = '';
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
              this.NomImagen1 = event.target.files[0].name;
            }
            if (this.ImagenCargada == '2') {
              this.Imagen2 = this.RutaImagenes + event.target.files[0].name;
              this.NomImagen2 = event.target.files[0].name;
            }
            if (this.ImagenCargada == '3') {
              this.Imagen3 = this.RutaImagenes + event.target.files[0].name;
              this.NomImagen3 = event.target.files[0].name;
            }
            if (this.ImagenCargada == '4') {
              this.Imagen4 = this.RutaImagenes + event.target.files[0].name;
              this.NomImagen4 = event.target.files[0].name;
            }
            if (this.ImagenCargada == '5') {
              this.Imagen5 = this.RutaImagenes + event.target.files[0].name;
              this.NomImagen5 = event.target.files[0].name;
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

  // CreaMapa() {
  //   this.map = new google.maps.Map(
  //     document.getElementById("map") as HTMLElement,
  //     {
  //       zoom: 15,
  //       center: {
  //         lat: 5.745986,
  //         lng: -73.003634
  //       },
  //     }
  //   );
  //   this.map.addListener("click", (e: any) => {
  //     this.AgregarMarcador(e.latLng, this.map);
  //     this.Coor1 = e.latLng.toString()
  //     this.Coor1 = this.Coor1.substring(1, 15)
  //     this.Coor2 = e.latLng.toString()
  //     this.Coor2 = this.Coor2.substring(this.Coor2.indexOf('-'), this.Coor2.length - 1)
  //   });
  // }

  AgregarMarcador(latLng: google.maps.LatLng, map: google.maps.Map) {
    if (this.markers.length > 0) {
      this.markers[0].setMap(null)
    }
    const marker = new google.maps.Marker({
      position: latLng,
      map: map,
    });
    this.markers = [];
    this.markers.push(marker);
  }

  AbrirMapa(modalMapa: any) {
    this.modalService.open(modalMapa, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
    this.Centramapa({ address: this.NomCiudad })
    //this.CreaMapa();
  }

  AceptarCoordenadas(modalRespuesta: any) {
    if (this.Coor1 != '' && this.Coor2 != '') {
      this.CoordenadasParcela = this.Coor1 + ' , ' + this.Coor2;
      this.modalService.dismissAll();
    } else {
      this.Respuesta = 'Debes seleccionar las coordenadas de tu parcela.';
      this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }

  }

  Centramapa(request: google.maps.GeocoderRequest): void {
    this.geocoder.geocode(request).then((result) => {
      const { results } = result;
      this.map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          zoom: 12,

        }
      );
      this.map.addListener("click", (e: any) => {
        this.AgregarMarcador(e.latLng, this.map);
        this.Coor1 = e.latLng.toString()
        this.Coor1 = this.Coor1.substring(1, 15)
        this.Coor2 = e.latLng.toString()
        this.Coor2 = this.Coor2.substring(this.Coor2.indexOf('-'), this.Coor2.length - 1)
      });
      this.map.setCenter(results[0].geometry.location);
      return results;
    })
      .catch((e) => {
        console.log("Geocode was not successful for the following reason: " + e);
      });
  }

  Cancelar() {
    this.rutas.navigateByUrl('/home')
  }

}

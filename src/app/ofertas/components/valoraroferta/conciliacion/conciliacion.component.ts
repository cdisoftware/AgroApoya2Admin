import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../../core/valoraroferta.service'
import { CrearofertaService } from './../../../../core/crearoferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.css']
})
export class ConciliacionComponent implements OnInit {

  NombreProductor: string = '';
  DesProducto: string = '';
  Tamano: string = '';
  Presentacion: string = '';
  Descripcion: string = '';
  Caracterizacion: string = '';
  ValorUnidad: string = '';
  Unidades: string = '';
  FechaRecogida: string = '';
  Jornada: string = '';
  Direccion: string = '';
  ValorTotal: string = '';
  IdOferta: string = '0';
  mcObservacion: string = '';
  IdUsuario: string = '';
  ArrayOferta: any = [];
  ImagenOferta: string = '';
  ArrayJornada: any = [];
  ValidaSiguiente: string = '0';
  IdACiudad: string = '0';
  maObservacion: string = '';
  ArrayCiudades: any = [];
  IdEJornada: string = '0';
  //Variables Editar Oferta
  ECaracteriza: string = '';
  IdEEmpaque: string = '0';
  EVUnidad: string = '';
  EUnidadesDis: string = '';
  EFechaRecogida: string = '';
  EDescripcion: string = '';
  EObservacion: string = '';
  ArrayUOfertas: any = [];
  IdProducto: string = '0';
  ArrayEmpaque: any = [];
  Respuesta: string = '';
  NomEstado: string = '';
  ValorSugerido: string = '';
  RutaImagen: string = this.SeriviciosGenerales.RecuperaRutaImagenes();
  IdEstadoOferta: string = '';
  RutaSiguiente: string = '';
  ValidaEnviaPropuesta: string = '';
  ValidaAprobar: string = '';
  ValidaDeclinar: string = '';
  maPrecioFinal: string = '';
  IdProductor: string = '';
  Valor: string;

  constructor(
    private SeriviciosGenerales: MetodosglobalesService,
    private ServiciosValorar: ValorarofertaService,
    private ServiciosCreaOferta: CrearofertaService,
    private modalService: NgbModal,
    public rutas: Router,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.ValidaSiguiente = '0';
    this.IdProducto = this.cookies.get('IDP');
    this.IdOferta = this.cookies.get('IDO');
    this.IdUsuario = this.cookies.get('IDU');
    if (this.IdUsuario == '') {
      this.rutas.navigateByUrl('');
    } else {
      if (this.IdOferta == '0' || this.IdOferta == '') {
        this.rutas.navigateByUrl('/home/buscaroferta')
      } else {
        this.CargaObjetosIniciales();
      }
    }



  }

  CargaObjetosIniciales() {
    //consulta y asigna variables de la oferta seleccionada
    this.ServiciosValorar.ConsultaOferta('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
      console.log(Resultado)
      this.IdProducto = Resultado[0].Producto;
      this.IdProductor = Resultado[0].Productor;
      this.NombreProductor = Resultado[0].Nombre_productor;
      this.DesProducto = Resultado[0].Nombre_Producto;
      this.Tamano = Resultado[0].Tamano;
      this.Presentacion = Resultado[0].Descripcion_empaque;
      this.Descripcion = Resultado[0].caracteristicas;
      this.Caracterizacion = Resultado[0].caracterizacion;
      this.ValorUnidad = Resultado[0].VR_UNDAD_EMPQUE;
      this.Unidades = Resultado[0].Unidades_disponibles;
      this.FechaRecogida = Resultado[0].fecha_recogida;
      this.Jornada = Resultado[0].Nombre_jornada;
      this.Direccion = Resultado[0].coordenadas_parcela;
      this.ValorTotal = Resultado[0].VR_TOTAL_OFRTA;
      this.IdEJornada = Resultado[0].jornada;
      this.IdEEmpaque = Resultado[0].Presentacion_emp;
      this.NomEstado = Resultado[0].Nombre_estado;
      this.IdEstadoOferta = Resultado[0].Estado;
      this.ImagenOferta = this.SeriviciosGenerales.RecuperaRutaImagenes() + Resultado[0].IMAGEN;
      this.ValidaRutaSiguiente(this.IdEstadoOferta)
    })
    //Consulta datos de las ultimas ofertas 
    const DatosOfertas =
    {
      UsuCodig: 1,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: 0,
      VigenciaHasta: 0,
      IdEstado_Oferta: 0,
      CD_RGION: 0,
      CD_MNCPIO: 0
    }
    this.ServiciosValorar.ConsultaUltimasOfertas('1', '0', this.IdProducto, '0', DatosOfertas).subscribe(Resultado => {
      this.ArrayUOfertas = Resultado;

      console.log(this.ArrayUOfertas)
    })
  }

  ValidaRutaSiguiente(estado: string) {
    if (estado == '1' || estado == '2' || estado == '3') {
      if (estado == '3') {
        this.ValidaEnviaPropuesta = '0'
      } else {
        this.ValidaEnviaPropuesta = '1'
      }
      this.ValidaSiguiente == '0';
      this.ValidaAprobar = '1';
      this.ValidaDeclinar = '1'
    } else if (estado == '5') {
      this.ValidaSiguiente = '1';
      this.ValidaEnviaPropuesta = '0';
      this.ValidaAprobar = '0';
      this.ValidaDeclinar = '0'
    }
  }

  Enviar(modalEditar: any) {
    //envia a la siguiente etapa de la valoracion
    //alert(this.ECaracteriza)
    this.rutas.navigateByUrl('/home/sectorizar')
  }

  EditaOferta(modalEditar: any) {
    //abre popup editar, carga campos oferta y ejecuta servicio para consulta de las jornadas
    this.ECaracteriza = this.Caracterizacion;
    this.EVUnidad = this.ValorUnidad;
    this.EUnidadesDis = this.Unidades;
    this.EFechaRecogida = this.FechaRecogida;
    this.EDescripcion = this.Descripcion;
    this.EObservacion = ''
    this.ServiciosValorar.ConsultaJornada('1').subscribe(Resultado => {
      this.ArrayJornada = Resultado;
      console.log(Resultado)
    })
    this.ServiciosCreaOferta.ConsultaEmpaque(this.IdProducto).subscribe(Resultado => {
      this.ArrayEmpaque = Resultado;
    })
    this.modalService.open(modalEditar, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
  }

  DeclinarOferta(modalDeclinar: any) {
    //abre modal declinar oferta
    this.modalService.open(modalDeclinar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }

  SelEJornada(seleccion: string) {
    //asocia jornada seleccionda para edicion de la oferta
    this.IdEJornada = seleccion
  }

  SelEEmpaque(seleccion: string) {
    this.IdEEmpaque = seleccion
  }

  AceptarDeclinar(modalRespuesta: any) {
    //ejecuta servicio para declinar oferta
    const datosdesclinar = {
      usucodig: this.IdUsuario,
      cnctivoOferta: this.IdOferta,
      ObsEstado: this.maObservacion,
      estado: 7,
      parametro1: "",
      parametro2: "",
      parametro3: ""
    }
    this.ServiciosValorar.ModificaEstadoOferta('3', datosdesclinar).subscribe(Resultado => {
      var arrayrespuesta = Resultado.split('|');
      this.Respuesta = arrayrespuesta[1];
      this.CargaObjetosIniciales();
    })
    this.modalService.dismissAll();
    this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    this.rutas.navigateByUrl('/home/buscaroferta')

  }

  AceptaEditar(modalRespuesta: any) {
    //realiza update de campos editados de la oferta en popup
    const datosUpdate = {
      CD_PRDCTO: '0',
      UND_EMPQUE: '0',
      CD_CNDCION: '0',
      CD_TMNO: '0',
      DSCRPCION_PRDCTO: this.EDescripcion,
      VR_UNDAD_EMPQUE: this.EVUnidad,
      CD_UNDAD: this.EUnidadesDis,
      VR_TOTAL_OFRTA: '0',
      VGNCIA_DESDE: this.EFechaRecogida,
      CD_JRNDA: this.IdEJornada,
      CD_RGION: '0',
      CD_MNCPIO: '0',
      UBCCION_PRCLA: '0',
      COORDENADAS_PRCLA: '0',
      USUCODIG: '0',
      ID_PRODUCTOR: '0',
      CD_CNSCTVO: this.IdOferta,
      CRCTRZCION: this.ECaracteriza,
      OBS_EDICION: this.EObservacion
    }
    console.log(datosUpdate)
    this.ServiciosValorar.EditarOfertaBusqueda('5', this.IdEEmpaque, datosUpdate).subscribe(Resultado => {
      var arrayrespuesta = Resultado.split('|');
      this.Respuesta = arrayrespuesta[1];
      if (arrayrespuesta[0] != '-1') {
        this.CargaObjetosIniciales();
        this.modalService.dismissAll();
        this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      } else {
        this.Respuesta = arrayrespuesta[1];
        this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      }


    })

  }


  AprobarOferta(modalAprobar: any) {
    //Abre popup de aprobar oferta y ejecuta servicio de consulta ciudades
    if (this.ValorSugerido != '') {
      this.maPrecioFinal = this.ValorSugerido.toString();
    } else {
      this.maPrecioFinal = this.ValorUnidad;
    }
    this.ServiciosValorar.ConsultaCiudades('6').subscribe(Resultado => {
      this.ArrayCiudades = Resultado;
    })
    this.modalService.open(modalAprobar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })

  }

  AceptarAprobar(ModalRespuesta: any) {
    //inserta oferta aprueba y actualiza o inserta ciudad aplica oferta
    const datosaprueba = {
      usucodig: this.IdUsuario,
      cnctivoOferta: this.IdOferta,
      ObsEstado: this.maObservacion,
      estado: 5,
      parametro1: this.maPrecioFinal,
      parametro2: "",
      parametro3: this.Caracterizacion
    }

    const datosciudad = {
      CD_CNSCTVO: this.IdOferta,
      CD_PAIS: "6",
      CD_DPTO: "261",
      CD_MNCPIO: this.IdACiudad
    }
    console.log(datosaprueba)
    if (this.IdACiudad == '0' || this.maObservacion == '' || this.maPrecioFinal == '' || this.Caracterizacion == '') {
      this.Respuesta = 'Debes completar todos los datos para aprobar la oferta.'
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    } else {
      console.log("Siiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      this.ServiciosValorar.ModificaEstadoOferta('3', datosaprueba).subscribe(Resultado => {
        var arrayrespuesta = Resultado.split('|');
        this.Respuesta = arrayrespuesta[1];
        if (arrayrespuesta[0] != '-1') {
          this.CargaObjetosIniciales();
          const datoscorreo = {
            IdPlantilla: 4,
            usucodig: this.IdProductor,
            Cd_cnctvo: this.IdOferta,
            id_conductor: 0
          }
          this.EnviarCorreo(datoscorreo);
          this.EnviarSms('1');
        }


      })
      this.ServiciosValorar.InsertaCiudadOferta('3', datosciudad).subscribe(Resultado => {
        console.log(Resultado)
      })

      this.modalService.dismissAll();
      this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.ValidaSiguiente = '1';
    }
  }

  SelACiudad(ciudad: string) {
    //Captura ciudad seleccionada
    this.IdACiudad = ciudad;
  }

  Formatovalor() {
    let valor = Number(this.ValorSugerido)
    this.Valor = formatCurrency(valor, 'en-US', '');
    console.log(this.ValorSugerido)
  }

  EnviarPropuesta(ModalRespuesta: any) {
    //enviar propuesta a campesino por sms pendiente servicio
    const DatosEditar = {
      usucodig: this.IdUsuario,
      cnctivoOferta: this.IdOferta,
      ObsEstado: "",
      estado: 3,
      parametro1: this.ValorSugerido,
      parametro2: "",
      parametro3: ""
    }
    console.log(DatosEditar);
    this.ServiciosValorar.ModificaEstadoOferta('3', DatosEditar).subscribe(Resultado => {
      console.log(Resultado)
      var arrayrespuesta = Resultado.split('|');
      this.Respuesta = arrayrespuesta[1];
      if (arrayrespuesta[0] != '-1') {
        this.CargaObjetosIniciales();
        const datoscorreo = {
          IdPlantilla: 3,
          usucodig: this.IdProductor,
          Cd_cnctvo: this.IdOferta,
          id_conductor: 0
        }
        this.EnviarCorreo(datoscorreo);
        this.EnviarSms('3');
      }
    })
    //this.Respuesta = 'No esta disponible en este momento'
    this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })

    ///enviar correo pendiente
  }

  EnviarCorreo(datoscorreo: any) {
    this.ServiciosValorar.EnviarCorreoIndividual('1', datoscorreo).subscribe(Resultado => {
      console.log(Resultado)
    })
  }

  EnviarSms(bandera: string) {
    this.ServiciosValorar.EnviarSms(bandera, this.IdUsuario, this.IdOferta, '0', '0').subscribe(Resultado => {
      console.log(Resultado)
    })
  }

  Atras() {
    this.rutas.navigateByUrl('/home/buscaroferta');
    this.cookies.delete('IDO');
    this.cookies.delete('IDP');
  }

}

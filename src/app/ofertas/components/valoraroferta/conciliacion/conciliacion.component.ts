import { Component, OnInit } from '@angular/core';
import { MetodosglobalesService } from './../../../../core/metodosglobales.service'
import { ValorarofertaService } from './../../../../core/valoraroferta.service'
import { CrearofertaService } from './../../../../core/crearoferta.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  ValorSugerido: string =''
  RutaImagen: string = this.SeriviciosGenerales.RecuperaRutaImagenes();
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
      this.ImagenOferta = this.SeriviciosGenerales.RecuperaRutaImagenes() + Resultado[0].IMAGEN;
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

  Enviar() {
    //envia a la siguiente etapa de la valoracion
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
      descripcion: this.mcObservacion,
      estado: 7
    }
    this.ServiciosValorar.ModificaEstadoOferta('3', datosdesclinar).subscribe(Resultado => {
      console.log(Resultado)
      this.Respuesta = Resultado.toString();
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
      this.CargaObjetosIniciales();
      this.Respuesta = Resultado.toString();
    })
    this.modalService.dismissAll();
    this.modalService.open(modalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }


  AprobarOferta(modalAprobar: any) {
    //Abre popup de aprobar oferta y ejecuta servicio de consulta ciudades
    this.ServiciosValorar.ConsultaCiudades('1').subscribe(Resultado => {
      this.ArrayCiudades = Resultado;
    })
    this.modalService.open(modalAprobar, { ariaLabelledBy: 'modal-basic-title', size: 'md' })

  }

  AceptarAprobar(ModalRespuesta: any) {
    //inserta oferta aprueba y actualiza o inserta ciudad aplica oferta
    const datosaprueba = {
      usucodig: this.IdUsuario,
      cnctivoOferta: this.IdOferta,
      descripcion: this.maObservacion,
      estado: 5
    }
    this.modalService.dismissAll();
    const datosciudad = {
      CD_CNSCTVO: this.IdOferta,
      CD_PAIS: "6",
      CD_DPTO: "261",
      CD_MNCPIO: this.IdACiudad
    }
    console.log(datosaprueba)
    this.ServiciosValorar.ModificaEstadoOferta('3', datosaprueba).subscribe(Resultado => {
      this.Respuesta = Resultado.toString()
    })
    this.ServiciosValorar.InsertaCiudadOferta('3', datosciudad).subscribe(Resultado => {
      console.log(Resultado)
    })
    this.modalService.dismissAll();
    this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    this.ValidaSiguiente = '1';
  }

  SelACiudad(ciudad: string) {
    //Captura ciudad seleccionada
    this.IdACiudad = ciudad;
  }

  EnviarPropuesta(ModalRespuesta: any) {
    //enviar propuesta a campesino por sms pendiente servicio
    const DatosEditar = {
      CD_PRDCTO: '0',
      UND_EMPQUE: "0",
      CD_CNDCION: "0",
      CD_TMNO: "0",
      DSCRPCION_PRDCTO: "0",
      VR_UNDAD_EMPQUE: this.ValorSugerido,
      CD_UNDAD: "0",
      VR_TOTAL_OFRTA: "0",
      VGNCIA_DESDE: '0',
      CD_JRNDA: '0',
      CD_RGION: "0",
      CD_MNCPIO: "0",
      UBCCION_PRCLA: "0",
      COORDENADAS_PRCLA: "0",
      USUCODIG: "0",
      ID_PRODUCTOR: '0',
      CD_CNSCTVO: this.IdOferta,
      CRCTRZCION: '0',
      OBS_EDICION: "0"
    }
    console.log(DatosEditar);
    this.ServiciosValorar.EditarOfertaBusqueda('6', '0', DatosEditar).subscribe(Resultado => {
      console.log(Resultado)
      this.Respuesta = Resultado.toString()
    })
    //this.Respuesta = 'No esta disponible en este momento'
    this.modalService.open(ModalRespuesta, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }
  Atras() {
    this.rutas.navigateByUrl('/home/buscaroferta');
    this.cookies.delete('IDO');
    this.cookies.delete('IDP');
  }

}

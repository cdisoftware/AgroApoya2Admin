import { Component, OnInit } from '@angular/core';
import { ValorarofertaService } from './../../../core/valoraroferta.service'
import { MetodosglobalesService } from './../../../core/metodosglobales.service'
import { NgbModal, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-duplicaroferta',
  templateUrl: './duplicaroferta.component.html',
  styleUrls: ['./duplicaroferta.component.css']
})

export class DuplicarofertaComponent implements OnInit {

  constructor(private ServiciosValorar: ValorarofertaService,
    private SeriviciosGenerales: MetodosglobalesService,
    private modalService: NgbModal,
    public rutas: Router,
    public cookies: CookieService,
    ConfigAcord: NgbAccordionConfig
  ) {
    ConfigAcord.closeOthers = true;

  }


  IdOfertaSeleccion: string = '0';
  arrayOfertas: any[] = []
  keywordSecOferta: string = 'Producto'

  ArrayOferta: any = [];
  ArrayResumenOferta: any = [];
  Producto: string = '';
  Productor: string = '';
  IdProducto: string = '0';
  IdProductor: string = '0';
  IdEstado: string = '0';
  FechaOferta: string = '';

  //Variables Detalle Oferta
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
  IdOferta: string = '';
  mcObservacion: string = '';
  IdUsuario: string = '';
  ArrayBusqueda: any = [];
  ImagenOferta: string = ''
  //Editar Oferta
  ArrayJornada: any = [];
  Respuesta: string = '';
  NomEstado: string = '';
  IdEstadoOferta: string = '';
  EstadoOferta: string = '';
  ImagenEstado: string = '';
  NoOferta: string = '';
  RutaImagen: string = this.SeriviciosGenerales.RecuperaRutaImagenes();

  //Resumen
  DataSectores: any[];
  keywordSec: string = '';
  CodigoOferSector: any;
  VlrFletSect: any;
  DataSectorOferta: any = [];
  DataTransOferta: any = [];
  ArrayCostos: any = [];
  ValTotCosteo: string = '';
  SessionSectorSel: string = '';

  //Valoracion Resumen
  VigenDesde: string = '';
  VigenHasta: string = '';
  HoraIni: string = '';
  HoraFin: string = '';
  FechaEntrega: string = '';
  Observaciones: string = '';
  ArrayTipoOferCon: any[];
  //Valortacion Individual
  ComInvid: string = '';
  ComGrup: string = '';
  MuestraIndividual: string = '';
  MuestraGrupal: string = '';
  MuestraCantIndiv: string = '';
  VlrComicionIndividual: string = '';
  MinUnidI: string = '';
  MaxUnidI: string = '';
  VlrDomiI: string = '';
  PreFinI: string = '';

  //ValoracionGrupal
  VlrComGrup: string = '';
  MinUnidLider: string = '';
  MaxUnidLider: string = '';
  MinUnidPart: string = '';
  MaxUnidPart: string = '';
  VlrDomiG: string = '';
  PorcDescLider: string = '';
  CantGrupos: string = '';
  UnidXGrupos: string = '';
  CantComprI: string = '';
  PrecioFinLider: string = '';
  PrecioFinPart: string = '';
  //Topings
  consultaimagen: string = '';
  RutaImagenTopping: string = '';
  DataToppings: any[];

  DataOferta: any = [];
  SessionFechaRecogida: any;
  VerTopping: string = '0';

  //Tazabilidad
  Trazabilidad: any = [];
  ValidaEnvio: any = '';
  AccionEnvio: string;

  TextoNotificacion: string = '';
  Plantilla: string = '';
  ImgCorreo: string = '';
  Previsucorreo: string = '';

  cdConsSectorResumen: string = "";
  SelectSect: boolean = false;

  EnvioSms: boolean = false;
  EnvioEmal: boolean = false;

  ngOnInit(): void {
    this.ListaOfertas();
  }

  ListaOfertas() {
    const datosbusqueda = {
      UsuCodig: 0,
      Producto: 0,
      NombreCompletoProductor: 0,
      DescripcionProducto: 0,
      Cd_cndcion: 0,
      Cd_tmno: 0,
      ID_EMPAQUE: 0,
      VigenciaDesde: '0',
      VigenciaHasta: '0',
      IdEstado_Oferta: '0',
      CD_RGION: 0,
      CD_MNCPIO: 0
    }

    this.ServiciosValorar.BusquedaOferta('6', '0', '0', '0', datosbusqueda).subscribe(Resultado => {
      console.log(Resultado)
      this.arrayOfertas = Resultado;
      this.keywordSecOferta = 'Producto'
    })
  }

  SeleccionarOferta(item: any, ModalResumen: any) {
    console.log(item)
    this.IdOfertaSeleccion = item.cd_cnsctvo;
    this.CargaBusqueda(item.cd_cnsctvo);
    this.modalService.open(ModalResumen, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true, backdrop: 'static', keyboard: false });

  }

  LimpiarOferta() {
    this.IdOfertaSeleccion = '0';
  }

  // RESUMEN DE LA OFERTA
  CargaBusqueda(IdOferta: string) {
    this.IdOferta = IdOferta;
    this.modalService.dismissAll();
    this.CargaInfoOferta();
    this.ConsultaSectores();
    this.ServiciosValorar.ConsultaMenuResumenOferta('1', IdOferta).subscribe(Resultado => {
      this.ArrayResumenOferta = Resultado;
    });
  }

  CargaInfoOferta() {
    this.ServiciosValorar.ConsultaOferta('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayOferta = Resultado;
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
      this.NomEstado = Resultado[0].Nombre_estado;
      this.ImagenOferta = this.SeriviciosGenerales.RecuperaRutaImagenes() + Resultado[0].IMAGEN;
      this.IdEstado = Resultado[0].Estado;
      this.ListasResumen();
    });
  }

  ConsultaSectores() {
    this.ServiciosValorar.ConsultaSectoresOferta('2', this.IdOferta).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        this.keywordSec = 'DSCRPCION_SCTOR';
        this.DataSectores = ResultConsulta;
        this.ValidaEnvio == ResultConsulta[0].EnvioSms;
      }
    })
  }

  LimpiarCampos(campo: string) {
    if (campo == 'pd') {
      this.IdProducto = '0';
    }
    if (campo == 'pt') {
      this.IdProductor = '0'
    }
    if (campo == 'es') {
      this.IdEstado = '0';
    }
    if (campo == 'fe') {
      this.FechaOferta = ''
    }
  }

  AbrirPopuPResumen(ModalResumen: any, respu: any) {
    this.SelectSect = false;
    this.modalService.dismissAll();
    this.modalService.open(ModalResumen, { ariaLabelledBy: 'modal-basic-title', size: 'xl', centered: true, backdrop: 'static', keyboard: false });
    this.ConsultaSectores();
    this.ServiciosValorar.ConsultaMenuResumenOferta('1', respu.Tramite).subscribe(Resultado => {
      this.ArrayResumenOferta = Resultado;
    });
  }

  selectSector(item: any) {
    this.SelectSect = true;
    this.CodigoOferSector = item.COD_OFERTA_SECTOR;
    this.VlrFletSect = item.VLOR_FLTE_SGRDOForm;
    this.SessionSectorSel = item.ID_SCTOR_OFRTA;
    this.cdConsSectorResumen = item.CD_CNSCTVO;
    this.ConsultaVigenciaOferta();
    this.ConsultaValoracionOferta();
    this.consultaToppingsOferta();
    this.ConsEnvioSmsEmail();
    this.ConsultaTextos();
    this.consultaValoresUni();
    this.ConsultaLink();
  }

  ConsEnvioSmsEmail() {
    this.ServiciosValorar.ConsultaSectoresOferta('1', this.cdConsSectorResumen).subscribe(ResultConsulta => {
      if (ResultConsulta.length > 0) {
        if (ResultConsulta[0].EnvioCorreo == "1") {
          this.EnvioEmal = true;
        }
        if (ResultConsulta[0].EnvioSms == "1") {
          this.EnvioSms = true;
        }
      }
    })
  }


  LimpiaSector() {
    this.SelectSect = false;
    this.CodigoOferSector = "";
    this.VlrFletSect = "";
    this.VigenDesde = "";
    this.VigenHasta = "";
    this.HoraIni = "";
    this.HoraFin = "";
    this.FechaEntrega = "";
    this.Observaciones = "";

    this.MuestraIndividual = '0';
    this.MuestraGrupal = '0';
    this.VerTopping = '0';
  }

  ListasResumen() {
    this.ConsSectorizacion();
    this.ConsTrans();
    this.ConsCosteo();
    this.ConsultaTrazabilidad();
  }
  
  ConsSectorizacion() {
    this.ServiciosValorar.ConsultaSectoresOferta('1', this.IdOferta).subscribe(ResultConsulta => {
      this.DataSectorOferta = ResultConsulta;
    });
  }
  ConsTrans() {
    this.ServiciosValorar.ConsultaConductoresOferta('1', this.IdOferta).subscribe(ResultConsult => {
      this.DataTransOferta = ResultConsult;
    })
  }
  ConsCosteo() {
    this.ServiciosValorar.ConsultaCosteo('1', this.IdOferta).subscribe(Resultado => {
      this.ArrayCostos = Resultado;
      if (Resultado.length > 0) {
        this.ValTotCosteo = '0'
        for (var a in Resultado) {
          if (Resultado[a].CD_TPO_VLOR == '1') {
            this.ValTotCosteo = (Number(this.ValTotCosteo) + Number(Resultado[a].VLOR) * Number(this.Unidades)).toString()
          } else {
            this.ValTotCosteo = (Number(this.ValTotCosteo) + Number(Resultado[a].VLOR)).toString()
          }
        }
      }
    })
  }
  ConsultaVigenciaOferta() {
    this.ServiciosValorar.ConsultaVigenciaOferta('1', this.IdOferta, this.SessionSectorSel).subscribe(ResultCons => {
      this.VigenDesde = ResultCons[0].vgncia_desde;
      this.VigenHasta = ResultCons[0].vgncia_hasta;
      this.HoraIni = ResultCons[0].hora_desde;
      this.HoraFin = ResultCons[0].hora_hasta;
      this.FechaEntrega = ResultCons[0].fcha_vgncia;
      this.Observaciones = ResultCons[0].observaciones;
    })
  }

  TipoDescuento: string = "";
  PorcentajeDescuento: string = "";
  MaximoUnidadesDescuento: string = "";
  ConsultaValoracionOferta() {
    this.ServiciosValorar.ConsultaValoracionOferta('1', this.IdOferta, this.SessionSectorSel).subscribe(ResultCons => {
      console.log(ResultCons)
      this.ComInvid = ResultCons[0].Nom_tpo_cmsion_indvdual;
      this.ComGrup = ResultCons[0].Nom_tpo_cmsion_grpal;
      this.TipoDescuento = ResultCons[0].tpo_descuento;
      this.PorcentajeDescuento = ResultCons[0].prcntje_dcto_lider;
      this.MaximoUnidadesDescuento = ResultCons[0].mnmo_prsnas_xgrupo;


      if (ResultCons[0].TPO_OFRTA == '1') {
        this.MuestraIndividual = '1';
        this.MuestraGrupal = '0';
        this.MuestraCantIndiv = '1';

        this.VlrComicionIndividual = ResultCons[0].vlor_cmsion_indvdual;

        this.MinUnidI = ResultCons[0].mnmo_unddes_indvdual;
        this.MaxUnidI = ResultCons[0].mxmo_unddes_indvdual;
        this.VlrDomiI = ResultCons[0].vlor_dmnclio_indvdual;
        this.PreFinI = ResultCons[0].vlor_fnal_indvdual;

      }
      else if (ResultCons[0].TPO_OFRTA == '2') {
        this.MuestraIndividual = '0';
        this.MuestraGrupal = '1';
        this.VlrComGrup = ResultCons[0].vlor_cmsion_grpal;

        this.MinUnidLider = ResultCons[0].mnmo_unddes_lider;
        this.MaxUnidLider = ResultCons[0].mxmo_unddes_lider;
        this.MinUnidPart = ResultCons[0].mnmo_unddes_prcpnte
        this.MaxUnidPart = ResultCons[0].mxmo_unddes_prcpnte;
        this.VlrDomiG = ResultCons[0].vlor_dmnclio_grpal;
        this.PorcDescLider = ResultCons[0].prcntje_dcto_lider;
        this.CantGrupos = ResultCons[0].cntdad_grpos;
        this.UnidXGrupos = ResultCons[0].mnmo_prsnas_xgrupo;
        this.CantComprI = ResultCons[0].cntdad_cmpras_indvdles;
        this.PrecioFinLider = ResultCons[0].vlor_arrnque_lider;
        this.PrecioFinPart = ResultCons[0].vlor_fnal_prtcpnte;
      }
      else if (ResultCons[0].TPO_OFRTA == 3) {
        this.MuestraIndividual = '1';
        this.MuestraGrupal = '1';
        this.MuestraCantIndiv = '1';

        this.VlrComicionIndividual = ResultCons[0].vlor_cmsion_indvdual;

        this.MinUnidI = ResultCons[0].mnmo_unddes_indvdual;
        this.MaxUnidI = ResultCons[0].mxmo_unddes_indvdual;
        this.VlrDomiI = ResultCons[0].vlor_dmnclio_indvdual;
        this.PreFinI = ResultCons[0].vlor_fnal_indvdual;


        this.VlrComGrup = ResultCons[0].vlor_cmsion_grpal;

        this.MinUnidLider = ResultCons[0].mnmo_unddes_lider;
        this.MaxUnidLider = ResultCons[0].mxmo_unddes_lider;
        this.MinUnidPart = ResultCons[0].mnmo_unddes_prcpnte
        this.MaxUnidPart = ResultCons[0].mxmo_unddes_prcpnte;
        this.VlrDomiG = ResultCons[0].vlor_dmnclio_grpal;
        this.PorcDescLider = ResultCons[0].prcntje_dcto_lider;
        this.CantGrupos = ResultCons[0].cntdad_grpos;
        this.UnidXGrupos = ResultCons[0].mnmo_prsnas_xgrupo;
        this.CantComprI = ResultCons[0].cntdad_cmpras_indvdles;
        this.PrecioFinLider = ResultCons[0].vlor_arrnque_lider;
        this.PrecioFinPart = ResultCons[0].vlor_fnal_prtcpnte;
      }
    })
  }
  visualizaImagenTopping(ModalImagen: any, imagenesAdicional: string) {
    this.consultaimagen = this.RutaImagenTopping + imagenesAdicional;
    console.log(this.consultaimagen)
    this.modalService.open(ModalImagen, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
  }
  consultaToppingsOferta() {
    console.log('1', this.SessionSectorSel, this.IdOferta, '0')
    this.ServiciosValorar.ConsultaToppingOfer('1', this.SessionSectorSel, this.IdOferta, '0').subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        console.log(Resultcons)
        this.DataToppings = Resultcons;
        this.VerTopping = '1';
      }
      else {
        this.VerTopping = '0';
        this.DataToppings = [];
      }
    })
  }

  DataValores: any = [];
  consultaValoresUni() {
    this.DataValores = [];
    this.ServiciosValorar.ConsultaValUnidades('1', this.IdOferta, this.SessionSectorSel).subscribe(Resultcons => {
      if (Resultcons.length > 0) {
        this.DataValores = Resultcons;
      }
      else {
        this.DataValores = [];
      }
    })
  }
  ConsultaLink() {
    this.ServiciosValorar.constextosoferta('1', this.IdOferta, this.SessionSectorSel).subscribe(ResultUpdate => {
      this.ServiciosValorar.ConsultaLinks('1', this.IdOferta, this.SessionSectorSel).subscribe(Resultado => {
        console.log(ResultUpdate)
        const inputLinkC: HTMLInputElement = document.getElementById('ResumenLinkCorto') as HTMLInputElement;
        inputLinkC.value = Resultado[0].link_corto;
        const inputLink: HTMLInputElement = document.getElementById('ResumenLink') as HTMLInputElement;
        inputLink.value = Resultado[0].link_largo;

        const inputWhatsapp: HTMLInputElement = document.getElementById('MsmWhatsap') as HTMLInputElement;
        inputWhatsapp.value = ResultUpdate[0].TextoWhat;
      });
    });
  }






  ConsultaTrazabilidad() {
    this.ServiciosValorar.ConsultaTrazabilidad('1', this.IdOferta).subscribe(Resultcons => {
      console.log(Resultcons)
      this.Trazabilidad = Resultcons;
    });
  }

  CerrarModal() {
    this.VerTopping = '0';
    this.MuestraIndividual = '0';
    this.MuestraGrupal = '0';
    this.MuestraCantIndiv = '0';
    this.modalService.dismissAll();
  }

  ConsultaTextos() {
    if (this.SessionSectorSel != '' && this.IdOferta != '') {
      this.ServiciosValorar.constextosoferta('1', this.IdOferta, this.SessionSectorSel).subscribe(Resultado => {
        console.log(Resultado)
        if (this.AccionEnvio == '1') {
          this.TextoNotificacion = Resultado[0].TextoCorreo;
          this.Plantilla = Resultado[0].Plantilla;
          this.ImgCorreo = Resultado[0].ImgCorreo;
        } else {
          this.TextoNotificacion = Resultado[0].TextoSms;
        }
      })
    }
  }

  PrevisualizaCorreo() {
    this.Previsucorreo = this.Plantilla.replace("[imgCorreoMasivo]", this.ImgCorreo.trim());
    this.Previsucorreo = this.Previsucorreo.replace("[ContenidoMasivo]", this.TextoNotificacion);

  }

  public CargaImagenCorreo(event: any, modalmensaje: any) {

    if (!(/\.(jpg|png|jpeg)$/i).test(event.target.files[0].name)) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, valide la extención, las permitidas son .jpg .png .jpeg";
    }
    else if (event.target.files[0].name.includes(" ")) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El archivo no pudo ser cargado, el nombre no debe contener espacios";
    }
    else if (event.target.files[0].size > 1300000) {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = "El peso del archivo no puede exceder 1.3 megabyte";
    } else {
      this.ServiciosValorar.postImgToppings(event.target.files[0]).subscribe(
        response => {

          if (response == 'Archivo Subido Correctamente') {
            this.ImgCorreo = this.RutaImagenTopping + event.target.files[0].name;
            console.log(this.ImgCorreo)

            const Bodymod = {
              idSector: this.SessionSectorSel,
              cd_cnctivo: this.IdOferta,
              TextoCorreo: "0",
              TextoWhat: "0",
              ImgCorreo: this.ImgCorreo
            }

            this.ServiciosValorar.TextosOferta('2', Bodymod).subscribe(ResultCorreo => {
              this.PrevisualizaCorreo()
            })

            this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
            this.Respuesta = "Imagen cargada correctamente.";
          } else {
            console.log(response)
          }

        },
        error => {
          console.log(<any>error);
          this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          this.Respuesta = "No hemos podido subir el archivo, intente nuevamente.";
        }
      );
    }
  }

  GuardarTexto(modalmensaje: any) {
    var bandera = '0';
    const Bodymod = {
      idSector: this.SessionSectorSel,
      cd_cnctivo: this.IdOferta,
      TextoCorreo: this.TextoNotificacion,
      TextoWhat: '',
      ImgCorreo: this.ImgCorreo,
      TextoSms: this.TextoNotificacion
    }
    //Bandera 3 actualiza solo correo y bandera 4 actualiza solo sms
    if (this.AccionEnvio == '1') {
      bandera = '3'
    } else if (this.AccionEnvio == '2') {
      bandera = '4'
    }
    this.ServiciosValorar.TextosOferta(bandera, Bodymod).subscribe(ResultCorreo => {
      this.modalService.open(modalmensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
      this.Respuesta = ResultCorreo;
      this.PrevisualizaCorreo()
    })

  }


}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';

@Injectable({
  providedIn: 'root'
})
export class ValorarofertaService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();

  ConsultaProductos(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consproductos/' + Bandera)
  }

  ConsultaEstado(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consestadosofertas/' + Bandera)
  }

  ConsultaProductor(Bandera: string, tipopersona: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'conscpersons/' + Bandera + '/' + tipopersona, datos)
  }

  ConsultaOferta(Bandera: string, idOferta: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscoferta/' + Bandera + '/' + idOferta)
  }
  ConsultaMenuResumenOferta(Bandera: string, CD_CNSCTVO: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscagrormenofertamenu/' + Bandera + '/' + CD_CNSCTVO)
  }
  ConsultaSectores(Bandera: string, NomSector: string, CdPais: string, Cd_Region: string, Cd_Mncpio: string) {
    return this.http.get<any[]>(this.url_servidor + 'consectores/' + Bandera + '/' + NomSector + '/' + CdPais + '/' + Cd_Region + '/' + Cd_Mncpio)
  }

  OperacionSectores(bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'csectorofertamod/' + bandera, Body)
  }

  ConsultaSectoresOferta(bandera: string, CD_CNSCTVO: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscsectoroferta/' + bandera + '/' + CD_CNSCTVO)
  }

  InsertarSector(bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'sectoresmod/' + bandera, Body)
  }

  ConsultaCiudadOferta(bandera: string, CD_CNSCTVO: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscciudadistcionofert/' + bandera + '/' + CD_CNSCTVO)
  }

  ConsultaConductoresSector(bandera: string, Cd_cnsctivo: string, CODIGO_TRANS: string, CD_PAIS: string, CD_RGION: string, CD_MNCPIO: string, BodyConsulta: any) {
    return this.http.post<any>(this.url_servidor + 'consconductor/' + bandera + '/' + Cd_cnsctivo + '/' + CODIGO_TRANS + '/' + CD_PAIS + '/' + CD_RGION + '/' + CD_MNCPIO, BodyConsulta)
  }

  OperacionTransportista(bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'cconductorofertamod/' + bandera, Body)
  }

  ModificaEstadoOferta(bandera: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'modccambiaestadoferta/' + bandera, datos)
  }

  EditaOferta(Bandera: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'conscpersons/' + Bandera, datos)
  }

  BusquedaOferta(bandera: string, cnctivoOferta: string, IdProducto: string, IdProductor: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'consaofertas/' + bandera + '/' + cnctivoOferta + '/' + IdProducto + '/' + IdProductor, datos)
  }
  ConscReporteOfertas(bandera: string, cd_cnscutivo: string, Id_Estado_oferta: string, cd_producto: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'conscreporteofertas/' + bandera + '/' + cd_cnscutivo + '/' + Id_Estado_oferta + '/' + cd_producto, Body)
  }

  ConsultaJornada(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consjorndofertas/' + Bandera)
  }

  EditarOfertaBusqueda(Bandera: string, idempaque: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'cofertamod/' + Bandera + '/' + idempaque, datos)
  }

  ConsultaConductoresOferta(bandera: string, CD_CNSCTVO: string) {
    return this.http.get<any[]>(this.url_servidor + 'consconductorsectorofert/' + bandera + '/' + CD_CNSCTVO)
  }

  ActualizarOfertaValoracion(bandera: string, bodyupdate: any) {
    return this.http.post<any>(this.url_servidor + 'cvaloracionofertamod/' + bandera, bodyupdate)
  }

  ConsultaValoracionOferta(BANDERA: string, CD_CNSCTVO: string, ID_SCTOR_OFRTA: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscvaloracionoferta/' + BANDERA + '/' + CD_CNSCTVO + '/' + ID_SCTOR_OFRTA)
  }

  ConsultaCiudades(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consciudadesactivs/' + Bandera)
  }

  InsertaCiudadOferta(Bandera: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'ciudadofertamod/' + Bandera, Datos)
  }

  ConsultaUltimasOfertas(Bandera: string, idoferta: string, idproducto: string, idproductor: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'consaofertas/' + Bandera + '/' + idoferta + '/' + idproducto + '/' + idproductor, Datos)

  }

  PublicarOferta(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'aestadofertamod/' + Bandera, Body)
  }

  InsertarCoordenadas(BANDERA: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'cordenadassectormod/' + BANDERA, Body)
  }

  ConsultaCoordenada(BANDERA: string, ID_SCTOR_OFRTA: string) {
    return this.http.get<any[]>(this.url_servidor + 'consccordenadasector/' + BANDERA + '/' + ID_SCTOR_OFRTA)
  }

  ConsultaCosteo(Bandera: string, idoferta: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscosteoferta/' + Bandera + '/' + idoferta)
  }

  ConsultaConceptos(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consctipocosteoferta/' + Bandera)
  }

  conscTipoCosteoXOferta(Bandera: string, Cd_Consecutivo: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscTipoCosteoXOferta/' + Bandera + '/' + Cd_Consecutivo)
  }

  ConsultaDetalleCond(Bandera: string, idtransportista: string, idconductor: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscdatostransportista/' + Bandera + '/' + idtransportista + '/' + idconductor)
  }

  OperacionConductor(BANDERA: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modconductoroferta/' + BANDERA, Body)
  }

  ConsultaEstadoOferta(bandera: string, idoferta: string) {
    return this.http.get<any[]>(this.url_servidor + 'consultestadoferta/' + bandera + '/' + idoferta)
  }

  ConsultaVigenciaOferta(BANDERA: string, CD_CNSCTVO: string, ID_SCTOR_OFRTA: String) {
    return this.http.get<any[]>(this.url_servidor + 'conscvigenciaoferta/' + BANDERA + '/' + CD_CNSCTVO + '/' + ID_SCTOR_OFRTA)
  }

  ModificarVigenciaOferta(BANDERA: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modcvigenciaoferta/' + BANDERA, Body)
  }

  CalculaPFIndividual(BANDERA: string, CD_CNSCTVO: string, ID_SCTOR_OFRTA: string, tpo_cmsion_indvdual: string, vlor_cmsion_indvdual: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscalculapreciofinindividual/' + BANDERA + '/' + CD_CNSCTVO + '/' + ID_SCTOR_OFRTA + '/' + tpo_cmsion_indvdual + '/' + vlor_cmsion_indvdual)
  }

  CalculaPreOferGrupal(BANDERA: string, CD_CNSCTVO: string, ID_SCTOR_OFRTA: string, tpo_cmsion_grupal: string, vlor_cmsion_grupal: string, vlor_dmcilio_grupal: string, mnmo_prsnas_xgrupo: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscalculapreciofingrupal/' + BANDERA + '/' + CD_CNSCTVO + '/' + ID_SCTOR_OFRTA + '/' + tpo_cmsion_grupal + '/' + vlor_cmsion_grupal + '/' + vlor_dmcilio_grupal + '/' + mnmo_prsnas_xgrupo)
  }

  ActualizaEstadoOferta(Bandera: string, BodyUpdate: any) {
    return this.http.post<any>(this.url_servidor + 'modccambiaestadoferta/' + Bandera, BodyUpdate)
  }

  AsociarCosteo(bandera: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'costeofertamod/' + bandera, datos)
  }


  CorreoMasivo(bandera: string, IdPlantilla: string, IdTipoUsuario: string, cd_cnctvo: string, id_sector: string) {
    return this.http.get<any[]>(this.url_servidor + 'correosmasivospanda/' + bandera + '/' + IdPlantilla + '/' + IdTipoUsuario + '/' + cd_cnctvo + '/' + id_sector)
  }

  EnviarCorreoIndividual(bandera: string, Id_Clnte: string, IdSctor: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'enviocorreoindividual/' + bandera + '/' + Id_Clnte + '/' + IdSctor, datos)

  }
  ModificaConcepto(Bandera: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'modctipocosteo/' + Bandera, datos)
  }

  EnviarSms(bandera: string, idusuario: string, idoferta: string, idsector: string, idcliente: string, telefono: string, codigo: string) {
    return this.http.get<any[]>(this.url_servidor + 'enviosmsindividual/' + bandera + '/' + idusuario + '/' + idoferta + '/' + idsector + '/' + idcliente + '/' + telefono + '/' + codigo)
  }

  ConsultaTipoTopping(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consctipotoppin/' + Bandera)
  }

  ConsultaToppingOfer(Bandera: string, Id_Sector: string, cd_cnctivo: string, usucodig: string) {
    return this.http.get<any[]>(this.url_servidor + 'consclistadotopping/' + Bandera + '/' + Id_Sector + '/' + cd_cnctivo + '/' + usucodig)
  }

  ModificaTopping(Bandera: string, Bodymod: any) {
    return this.http.post<any>(this.url_servidor + 'modctopping/' + Bandera, Bodymod)
  }
  ConsultaCompraPagos(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscagroestcompago/' + Bandera)
  }

  public postImgToppings(imagenParaSubir: File) {
    const formData = new FormData();
    formData.append('file', imagenParaSubir, imagenParaSubir.name);
    return this.http.post(this.url_servidor + 'uploadImgToppings', formData);
  }

  ConsultaSeguimiento(Bandera: string, IdOferta: string, IdSector: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscentregaseg/' + Bandera + '/' + IdOferta + '/' + IdSector)
  }

  ConsultaSeguimientoEntregas(Bandera: string, IdConductor: string, IdSector: string, IdOferta: string, Datos: any) {
    console.log(this.url_servidor + 'consSeguimientoEntregas/' + Bandera + '/' + IdConductor + '/' + IdSector + '/' + IdOferta, Datos)
    return this.http.post<any>(this.url_servidor + 'consSeguimientoEntregas/' + Bandera + '/' + IdConductor + '/' + IdSector + '/' + IdOferta, Datos)
  }

  ConsultaTrazabilidad(Bandera: string, cd_cnctivo: string) {
    return this.http.get<any[]>(this.url_servidor + 'constrazestoferta/' + Bandera + '/' + cd_cnctivo)
  }
  //EJEMPLO=1/0/0/2510
  ConsultaSectoresEtv(Bandera: string, nomSector: string, IdZona: string, cd_cnctivo: string) {
    return this.http.get<any[]>(this.url_servidor + 'constsectoresEtv/' + Bandera + '/' + nomSector + '/' + IdZona + '/' + cd_cnctivo)
  }
  ConsZona(Bandera: string, id: string, Municipio: string, Departamento: string, Bodymod: any) {
    return this.http.post<any>(this.url_servidor + 'consczonassector/' + Bandera + '/' + id + '/' + Municipio + '/' + Departamento, Bodymod)
  }

  ModificaSectorPoligono(BANDERA: string, ID_SCTOR: string) {
    return this.http.get<any>(this.url_servidor + 'modcsectorpoligono/' + BANDERA + '/' + ID_SCTOR)
  }

  ConsultaUsuarioSector(Bandera: string, IdSector: string) {
    return this.http.get<any>(this.url_servidor + 'conscvalidaususector/' + Bandera + '/' + IdSector)
  }

  ConsultaNumUsuariosSector(Bandera: string, IdSector: string) {
    return this.http.get<any>(this.url_servidor + 'conscnumususector/' + Bandera + '/' + IdSector)
  }

  constextosoferta(Bandera: string, idSector: string, cd_cnctivo: string) {
    return this.http.get<any>(this.url_servidor + 'constextosoferta/' + Bandera + '/' + cd_cnctivo + '/' + idSector)
  }

  TextosOferta(Bandera: string, Bodymod: any) {
    return this.http.post<any>(this.url_servidor + 'TextosOferta/' + Bandera, Bodymod)
  }


  InsertaLinks(Bandera: string, Bodymod: any) {
    return this.http.post<any>(this.url_servidor + 'modclinks/' + Bandera, Bodymod)
  }

  ConsultaLinks(Bandera: string, IdOferta: string, IdSector: string) {
    return this.http.get<any>(this.url_servidor + 'consclinksector/' + Bandera + '/' + IdOferta + '/' + IdSector)
  }

  consthorariotarea(Bandera: string) {
    return this.http.get<any>(this.url_servidor + 'consthorariotarea/' + Bandera)

  }

  ConsEntregasConductor(Bandera: string, ID_CNDCTOR: string, id_Sector: string, cd_cnctivo: string, coordernadas: string) {
    return this.http.get<any>(this.url_servidor + 'consentregasconductor/' + Bandera + '/' + ID_CNDCTOR + '/' + id_Sector + '/' + cd_cnctivo + '/' + coordernadas);
  }


  ConsInfoOfer(Bandera: string, CD_CNSCTVO: string, IdSector: string) {
    return this.http.get<any>(this.url_servidor + 'conscinfoferta/' + Bandera + '/' + CD_CNSCTVO + '/' + IdSector)
  }

  ConsOferEst(Bandera: string) {
    return this.http.get<any>(this.url_servidor + 'conscofertaestados/' + Bandera)
  }

  ConsPinsUltMilla(Bandera: string, CD_CNSCTVO: string, IdSector: string) {
    return this.http.get<any>(this.url_servidor + 'conscpinultimailla/' + Bandera + '/' + CD_CNSCTVO + '/' + IdSector)
  }

  ConsultaBodegas(Bandera: string, Departamento: string, Ciudad: string, idSector: string) {
    return this.http.get<any>(this.url_servidor + 'constbodegas/' + Bandera + '/' + Departamento + '/' + Ciudad + '/' + idSector);
  }

  AsociarBodega(Bandera: string, DatosBodega: any) {
    return this.http.post<any>(this.url_servidor + 'modcasignabodega/' + Bandera, DatosBodega)
  }

  ConsultaCargaAsociada(Bandera: string, IdSector: string, IdOferta: string, IdBodega: string) {
    return this.http.get<any>(this.url_servidor + 'conscdtlledescargas/' + Bandera + '/' + IdSector + '/' + IdOferta + '/' + IdBodega);
  }

  ModificaDetalleCargas(Bandera: string, DatosCarga: any) {
    return this.http.post<any>(this.url_servidor + 'modcdtlledescargas/' + Bandera, DatosCarga)
  }

  ModPinMilla(Bandera: string, body: any) {
    return this.http.post<any>(this.url_servidor + 'modcpinmilla/' + Bandera, body)
  }


  ConsGruposUltimaMilla(Bandera: string, CD_CNSCTVO: string, IdSector: string) {
    return this.http.get<any>(this.url_servidor + 'conscultimamilla/' + Bandera + '/' + CD_CNSCTVO + '/' + IdSector)
  }

  ConsParadasRutaUltMilla(Bandera: string, IdGrupo: string, CD_CNSCTVO: string, IdSector: string) {
    return this.http.get<any>(this.url_servidor + 'conscagrogruposultimamilla/' + Bandera + '/' + IdGrupo + '/' + CD_CNSCTVO + '/' + IdSector)
  }


  ModValorUberUltMilla(Bandera: string, body: any) {
    return this.http.post<any>(this.url_servidor + 'modcvaloruberoferta/' + Bandera, body)
  }

  ConsInfoValUber(Bandera: string, IdeDepto: string, IdCiudad: string) {
    return this.http.get<any>(this.url_servidor + 'conscvalorubersgen/' + Bandera + '/' + IdeDepto + '/' + IdCiudad)
  }
  ModRutasaUltimMilla(Bandera: string, body: any) {
    return this.http.post<any>(this.url_servidor + 'modcgrupomilla/' + Bandera, body)
  }


  ConsultaConductores(Bandera: string, IdOferta: string, Sector: string) {
    return this.http.get<any>(this.url_servidor + 'consclistaconductor/' + Bandera + '/' + IdOferta + '/' + Sector)
  }

  ConsultaConductoresAsociados(Bandera: string, IdOferta: string, Sector: string, TipoTrans: string) {
    return this.http.get<any>(this.url_servidor + 'consCondAsociadosOferta/' + Bandera + '/' + IdOferta + '/' + Sector + '/' + TipoTrans)
  }
  ModificaConductor(Bandera: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'modctorultmilla/' + Bandera, Datos)
  }

  //modcultimmillainicial
  ModUltimMillaIni(Bandera: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'modcultimmillainicial/' + Bandera, Datos)
  }

  ConsultaValUnidades(Bandera: string, Cd_cnsctvo: string, IdSector: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscvalores/' + Bandera + '/' + Cd_cnsctvo + '/' + IdSector)
  }

  ModValoresUnidades(Bandera: string, body: any) {
    return this.http.post<any>(this.url_servidor + 'modcanadorvalor/' + Bandera, body)
  }


  ConsentregasConductor(IdGrupoMilla: string, ID_CNDCTOR: string, IdSector: string, conscutivo: string) {
    return this.http.get<any[]>(this.url_servidor + 'consentregasconductor/' + IdGrupoMilla + '/' + ID_CNDCTOR + '/' + IdSector + '/' + conscutivo + '/0');
  }

  ConscGrupoMilla(bandera: string, IdSector: string, conscutivo: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscGrupoMilla/' + bandera + '/' + IdSector + '/' + conscutivo);
  }
  ModificarImagenSector(Bandera: string, body: any) {
    return this.http.post<any>(this.url_servidor + 'ModActualizaImgSector/' + Bandera, body)
  }

  ConsultaDetalleEntregas(Bandera: string, IdCarro: string) {
    return this.http.get<any[]>(this.url_servidor + 'consSeguimientoEntregaDell/' + Bandera + '/' + IdCarro)
  }

  ConsultaReporteEntregas(Bandera: string, IdOferta: string, IdSector: string, IdCondutor: string) {
    return this.http.get<any[]>(this.url_servidor + 'consRepEstEntrega/' + Bandera + '/' + IdOferta + '/' + IdSector + '/' + IdCondutor)
  }
  ConsCupon(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consTipoCupon/' + Bandera);
  }
  ModCBodega(Bandera: string, body: any) {
    return this.http.post<any>(this.url_servidor + 'ModCBodega/' + Bandera, body)
  }

  conSectorBodega(Bandera: string, idBodega: string) {
    return this.http.get<any>(this.url_servidor + 'conSectorBodega/' + Bandera + '/' + idBodega)

  }

  public postFilePdf(bandera: String, Id_Clnte: String, IdSctor: String, IdPlantilla: String, usucodig: String, Cd_cnctvo: String, pdfFile: File) {
    const formData: FormData = new FormData();
    formData.append('file', pdfFile, pdfFile.name);

    return this.http.post(this.url_servidor + 'EnvioPdfEmail/' + bandera + '/' + Id_Clnte + '/' + IdSctor + '/' + IdPlantilla + '/' + usucodig + '/' + Cd_cnctvo, formData);
  }

  ConsultaTipoCupon(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consTipoCuponDescGeneral/' + Bandera);
  }

  ConsultaAplicable(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consCTipoCuponCodigoAplicableGen/' + Bandera);
  }

  ConsultaCupones(Bandera: string, TCupon: string, CuponAplica: string, IdOferta: string, Estado: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'consCodigosDescuentos/' + Bandera + '/' + TCupon + '/' + CuponAplica + '/' + IdOferta + '/' + Estado, datos);
  }

  EjecutaQueryManyChat(bandera: string, datos: any) {
    return this.http.post<any>(this.url_servidor + 'ConsEjecutaSentenciaSQL/' + bandera, datos);
  }

  ModificaCupones(Bandera: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'ModCodigoCupon/' + Bandera, Datos);
  }

  ConsultaCuponesOferta(Bandera: string, IdOferta: string, Codigo: string) {
    return this.http.get<any[]>(this.url_servidor + 'consRelacionCuponOferta/' + Bandera + '/' + IdOferta + '/' + Codigo);
  }

  ModificarCupon(Bandera: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'ModRelaCuponOferta/' + Bandera, Datos);
  }
  consTipoDomicilio(Bandera: string){
    return this.http.get<any[]>(this.url_servidor + 'consTipoDomicilio/' + Bandera);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MetodosglobalesService } from './metodosglobales.service';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient, private metodosglobales: MetodosglobalesService) { }

  url_servidor = this.metodosglobales.SeleccionAmbiente();


  private libro: Workbook

  ConsultaUsuario(Bandera: string) {

    return this.http.get<any>(this.url_servidor + 'consctipousuario/' + Bandera)
  }
  ReporteUsuarios(Bandera: string, FechaDesde: string, FechaHasta: string, Datos: any) {
    return this.http.post<any>(this.url_servidor + 'conscreporteusuarios/' + Bandera + '/' + FechaDesde + '/' + FechaHasta, Datos)
  }
  ConsultaTipoCliente(Bandera: string, usuCodigo: string) {
    return this.http.get<any>(this.url_servidor + 'consctipocliente/' + Bandera + '/' + usuCodigo)
  }
  ConsultaTipoConductor(Bandera: string, usuCodigo: string) {
    return this.http.get<any>(this.url_servidor + 'consctipoconductor/' + Bandera + '/' + usuCodigo)
  }
  ConsultaTipoTranspor(Bandera: string, usuCodigo: string) {
    return this.http.get<any>(this.url_servidor + 'consctipotransport/' + Bandera + '/' + usuCodigo)
  }
  ConsultaComprasXOfer(Bandera: string, cd_cnscutivo: string, IdSector: string, IdCompra: string, IdPago: string, body: any) {
    return this.http.post<any>(this.url_servidor + 'conscreporteventas/' + Bandera + '/' + cd_cnscutivo + '/' + IdSector + '/' + IdCompra + '/' + IdPago, body)
  }

  consAdminReporteVentas(Bandera: string, cd_cnscutivo: string, IdSector: string, IdCompra: string, IdPago: string, body: any) {
    return this.http.post<any>(this.url_servidor + 'consAdminReporteVentas/' + Bandera + '/' + cd_cnscutivo + '/' + IdSector + '/' + IdCompra + '/' + IdPago, body)
  }

  ConsultaParticipantesGrupo(Bandera: string, IdGrupo: string, Usucodig: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscparticipantegrupo/' + Bandera + '/' + IdGrupo + '/' + Usucodig)
  }

  ConsultaPerfil(Usucodig: string) {
    return this.http.get<any[]>(this.url_servidor + 'conscperfilcampesino/' + Usucodig)
  }

  AgregaInfoPerfil(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'modPerfilCampesino/' + Bandera, Body)
  }

  ConsultaListaPersona(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'consclistapersona/' + Bandera, Body)
  }

  ConsultaImagenesProductor(Bandera: string, Usucodig: string) {
    return this.http.get<any[]>(this.url_servidor + 'consImagenesAdminUsers/' + Bandera + '/' + Usucodig)
  }

  ActualizaImagen(Bandera: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'mosAdminImgUsers/' + Bandera, Body)
  }

  //Métodos para descargar el Excel

  async decargarExcel(data: any): Promise<void> {
    this.libro = new Workbook();

    this.libro.creator = 'CDI software'

    await this.crearTabla(data);

    this.crearTabla(data)
    this.libro.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data])
      FileSaver.saveAs(blob, "UsuariosAgro.xlsx");
    })
  }




  async crearTabla(data: any): Promise<void> {
    const sheet = this.libro.addWorksheet("Reporte");
    sheet.getColumn("A").width = 8;
    sheet.getColumn("B").width = 17;
    sheet.getColumn("C").width = 22;
    sheet.getColumn("D").width = 12;
    sheet.getColumn("E").width = 34;
    sheet.getColumn("F").width = 20;
    sheet.getColumn("G").width = 20;
    sheet.getColumn("H").width = 12;
    sheet.getColumn("I").width = 12;
    sheet.getColumn("J").width = 12;
    sheet.getColumn("K").width = 34;
    sheet.getColumn("L").width = 34;
    const header = sheet.getRow(1);

    header.values = [
      'UsuCodig',
      'Tipo Persona',
      'Nombre',
      'Celular',
      'Correo',
      'Fecha Creación',
      'Tipo Documento',
      'Número documento',
      'Departamento',
      'Ciudad',
      'Dirección',
      'Observacion'
    ]

    const filas = sheet.getRows(2, data.length)!;

    for (let index = 0; index < data.length; index++) {
      const fila = filas[index];
      const itemData = data[index]

      fila.values = [
        itemData.Usucodig,
        itemData.DesTipoPersona,
        itemData.NombrePersona + itemData.ApellidoPersona,
        itemData.NumeroCelular,
        itemData.CorreoPersona,
        itemData.FechaCreacion,
        itemData.DesTipoDocumento,
        itemData.NumeroDoc,
        itemData.DesDepto,
        itemData.DesCiudad,
        itemData.Direccion,
        itemData.Observacion,
      ]
    }
  }


  consAdminReporteCantTotal(Bandera: string, IdOferta: any) {
    return this.http.get<any[]>(this.url_servidor + 'consAdminReporteCantTotal/' + Bandera + '/' + IdOferta)
  }

  consAdReporteCantTotalxLibras(Bandera: string, IdOferta: any) {
    return this.http.get<any[]>(this.url_servidor + 'consAdReporteCantTotalxLibras/' + Bandera + '/' + IdOferta)
  }

  ConsultaUsers(Bandera: string, TipoUser: string, Body: any) {
    return this.http.post<any>(this.url_servidor + 'ConsCUsersAA2/' + Bandera + '/' + TipoUser, Body);
  }

  ListaLocalidades(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consLocalidades/' + Bandera);
  }

  UsuariosRegistrados(Bandera: string, IdLocalidad: any, Body: any) {
    return this.http.post<any>(this.url_servidor + 'consReporteUsuarios/' + Bandera + '/' + IdLocalidad, Body);
  }

  InfoUsuariosDash(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consCUserLocalidad/' + Bandera);
  }

  InfoDashUsuarios(Bandera: number) {
    return this.http.get<any[]>(this.url_servidor + 'consAdDashUsuarios/' + Bandera);
  }

  InfoUsuariosComprasDash(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consCUserLocalidadCompras/' + Bandera);
  }

  InfoVentasDash(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consAdDashVentas/' + Bandera);
  }

  InfoVentasProdDash(Bandera: string) {
    return this.http.get<any[]>(this.url_servidor + 'consAdDashProducts/' + Bandera);
  }

  InfoDashProdLibras(Bandera: number) {
    return this.http.get<any[]>(this.url_servidor + 'consadDashProductosLibras/' + Bandera)
  }

  InfoDashProdPesos(Bandera: number) {
    return this.http.get<any[]>(this.url_servidor + 'consadDashProductosPesos/' + Bandera);
  }

  conschistorialcompras(Bandera: string, Usucodig: string, ID_CARRO: string) {
    return this.http.get<any[]>(this.url_servidor + 'conschistorialcompras/' + Bandera + '/' + Usucodig + '/' + ID_CARRO)
  }

}

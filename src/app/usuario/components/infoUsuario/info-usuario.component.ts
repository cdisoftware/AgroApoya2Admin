import { Component, OnInit } from '@angular/core';
import { InteraccionMenyChat } from 'src/app/core/InteraccionMenyChat';
import { ValorarofertaService } from './../../../core/valoraroferta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {
  usuariosEncontrados: any[] = [];
  telefonosNoEncontrados: any[] = [];
  cargando: boolean = false;
  actualizandoBD: boolean = false;
  creandoUsuarios: boolean = false;
  usuariosFallidosAcumulados: any[] = [];

  // Variables para filtros
  DataSectores: any[] = [];
  keywordSec: string = 'DSCRPCION_SCTOR';
  Sector: any;
  IdSector: any = '0';
  FiltroCompradores: string = '0';
  FiltroIdManychat: string = '0';
  DataQuery: any[] = [];

  constructor(
    private serviceintegracion: InteraccionMenyChat,
    private modalService: NgbModal,
    private ServiciosValorar: ValorarofertaService
  ) { }

  ngOnInit(): void {
    this.CargaSectores();
  }

  CargaSectores() {
    this.ServiciosValorar.ListaSectores('1', '0', '0').subscribe(Resultado => {
      this.DataSectores = Resultado;
    });
  }

  selectSector(item: any) {
    this.IdSector = item.ID;
  }

  LimpiaSector(campo: string) {
    this.IdSector = '0';
    this.Sector = campo;
  }


  ConstruirYConsultarQuery() {
    this.cargando = true;
    this.DataQuery = [];
    
    let query = `SELECT DISTINCT a.USUCODIG AS ID, a.USUCODIG AS USUCODIG, a.NOMBRES_PERSONA AS USUARIO, 
      a.CELULAR_PERSONA AS CELULAR, a.id_manychat AS ID_MANYCHAT, b.idsector as IDSECTOR, '' as QueryPre,
      a.CORREO_PERSONA as CORREO_PERSONA, 0 as id_carro
      from agro_personas a
      left join Agro_poligono_usuario b on a.usucodig = b.IdUsuario
      where 1=1 `;
    
    // Filtro Sector
    if (this.IdSector && this.IdSector !== '0') {
      query += ` and b.idsector = ${this.IdSector} `;
    }

    // Filtro ManyChat
    if (this.FiltroIdManychat === '1') { // Con idmanychat
      query += ` and ISNULL(a.id_manychat,'00') <> '00' `;
    } else if (this.FiltroIdManychat === '2') { // Sin idmanychat
      query += ` and (ISNULL(a.id_manychat,'00') = '00' OR a.id_manychat = '') `;
    }

    // Filtro Compradores
    if (this.FiltroCompradores === '1') { // Compradores
      query += ` and a.usucodig in (select pras.usucodig from agro_carrocompras pras) `;
    } else if (this.FiltroCompradores === '2') { // No compradores
      query += ` and a.usucodig not in (select pras.usucodig from agro_carrocompras pras) `;
    }

    const Body = {
      QueryPre: query,
      ID_MANYCHAT: "0"
    };

    this.ServiciosValorar.ConsultaUsersAdminManychat('1', Body).subscribe(Resultado => {
      // Filtrar duplicados por USUCODIG (en caso de que tengan varios sectores)
      const unicos = new Map();
      Resultado.forEach((item: any) => {
        if (!unicos.has(item.USUCODIG)) {
          unicos.set(item.USUCODIG, item);
        }
      });
      
      this.DataQuery = Array.from(unicos.values());
      this.cargando = false;
    }, error => {
      console.error('Error ejecutando query:', error);
      this.cargando = false;
    });
  }

  ProcesarUsuariosTabla() {
    if (!this.DataQuery || this.DataQuery.length === 0) return;
    
    this.usuariosEncontrados = [];
    this.telefonosNoEncontrados = [];
    this.cargando = true;
    
    let procesados = 0;

    for (const data of this.DataQuery) {
      let email = data.CORREO_PERSONA || '';
      let phone = data.CELULAR || '';
      let nombreStr = data.USUARIO || '';
      
      let telConPrefijo = '';
      if (phone) {
         telConPrefijo = phone.startsWith('+') ? phone : (phone.startsWith('57') && phone.length === 12 ? '+' + phone : '+57' + phone);
      }
      
      const body = {
        email: email,
        phone: telConPrefijo
      };

      this.serviceintegracion.BuscaUserCorreoTelefono(body).subscribe(
        (Resultado: any) => {
          procesados++;
          
          if (Resultado && Resultado !== "Usuario NO existe") {
             let idManychat = typeof Resultado === 'string' ? Resultado : (Resultado.id || 'Encontrado');
             
             let userObj = {
               datoOriginal: `ID BD: ${data.USUCODIG}`,
               emailBusqueda: email,
               telefonoBusqueda: telConPrefijo,
               nombreBusqueda: nombreStr,
               telefonoRaw: phone,
               idManychat: idManychat,
               actualizadoBD: 'Pendiente'
             };

             this.usuariosEncontrados.push(userObj);
          } else {
             this.telefonosNoEncontrados.push({
               datoOriginal: `ID BD: ${data.USUCODIG}`,
               emailBusqueda: email,
               telefonoBusqueda: telConPrefijo,
               nombreBusqueda: nombreStr,
               telefonoRaw: phone,
               estadoCreacion: 'Pendiente'
             });
          }

          if (procesados === this.DataQuery.length) {
            this.cargando = false;
          }
        },
        (error: any) => {
          procesados++;
          this.telefonosNoEncontrados.push({
             datoOriginal: `ID BD: ${data.USUCODIG}`,
             emailBusqueda: email,
             telefonoBusqueda: telConPrefijo,
             error: true
          });
          if (procesados === this.DataQuery.length) {
            this.cargando = false;
          }
        }
      );
    }
  }

  actualizarBD() {
    this.actualizandoBD = true;
    let procesadosBD = 0;
    
    const pendientes = this.usuariosEncontrados.filter(u => u.actualizadoBD !== '✅ Exitoso');
    
    if (pendientes.length === 0) {
      this.actualizandoBD = false;
      return;
    }

    for (const user of pendientes) {
      user.actualizadoBD = 'Cargando...';
      
      const updateBody = {
        correo_persona: user.telefonoRaw,
        ID_MANYCHAT: user.idManychat
      };

      this.serviceintegracion.ActualizaIdManyChat('3', updateBody).subscribe(
         (resUpdate: any) => {
            console.log(`BD Actualizada para ${user.telefonoRaw}:`, resUpdate);
            user.actualizadoBD = '✅ Exitoso';
            procesadosBD++;
            if (procesadosBD === pendientes.length) this.actualizandoBD = false;
         },
         (errUpdate: any) => {
            console.error(`Error actualizando BD para ${user.telefonoRaw}:`, errUpdate);
            user.actualizadoBD = '❌ Error';
            procesadosBD++;
            if (procesadosBD === pendientes.length) this.actualizandoBD = false;
         }
      );
    }
  }

  crearUsuariosManychat() {
    this.creandoUsuarios = true;
    let procesados = 0;
    
    const pendientes = this.telefonosNoEncontrados.filter(u => u.estadoCreacion !== '✅ Creado y Guardado' && u.estadoCreacion !== '⚠️ Creado, Error BD');
    
    if (pendientes.length === 0) {
      this.creandoUsuarios = false;
      return;
    }

    for (const user of pendientes) {
      user.estadoCreacion = 'Creando en Manychat...';
      
      const createBody = {
        first_name: user.nombreBusqueda || "Usuario",
        last_name: "",
        whatsapp_phone: user.telefonoBusqueda.replace('+', ''),
        has_opt_in_sms: true,
        has_opt_in_email: true,
        consent_phrase: "string"
      };

      this.serviceintegracion.modmanychatcreateuser(createBody).subscribe(
         (resCreate: any) => {
            console.log(`Usuario creado en Manychat para ${user.telefonoRaw}:`, resCreate);
            
            let respuArray = resCreate ? resCreate.toString().split("|") : [];
            let nuevoId = '';
            if (respuArray.length > 1 && respuArray[0] === '1') {
                nuevoId = respuArray[1].trim();
            } else if (respuArray.length > 1 && respuArray[0] === '-1') {
                user.estadoCreacion = '⚠️ Usuario ya existe';
                this.agregarFalloAcumulado(user, 'Usuario ya existe en Manychat');
                procesados++;
                if (procesados === pendientes.length) this.creandoUsuarios = false;
                return;
            } else if (resCreate && resCreate.data && resCreate.data.id) {
                nuevoId = resCreate.data.id;
            } else if (typeof resCreate === 'string' && resCreate !== '0') {
                nuevoId = resCreate;
            }

            if (nuevoId && nuevoId !== '0') {
                user.estadoCreacion = 'Actualizando BD...';
                
                const updateBody = {
                   correo_persona: user.telefonoRaw,
                   ID_MANYCHAT: nuevoId
                };
                
                this.serviceintegracion.ActualizaIdManyChat('3', updateBody).subscribe(
                   (resUpdate) => {
                      user.estadoCreacion = '✅ Creado y Guardado';
                      procesados++;
                      if (procesados === pendientes.length) this.creandoUsuarios = false;
                   },
                   (errUpdate) => {
                      user.estadoCreacion = '⚠️ Creado, Error BD';
                      this.agregarFalloAcumulado(user, 'Se creó pero falló al guardar en BD');
                      procesados++;
                      if (procesados === pendientes.length) this.creandoUsuarios = false;
                   }
                );
            } else {
                user.estadoCreacion = '❌ Error Manychat';
                this.agregarFalloAcumulado(user, 'No se generó ID válido');
                procesados++;
                if (procesados === pendientes.length) this.creandoUsuarios = false;
            }
         },
         (errCreate: any) => {
            console.error(`Error creando en Manychat para ${user.telefonoRaw}:`, errCreate);
            user.estadoCreacion = '❌ Error Manychat';
            this.agregarFalloAcumulado(user, 'Fallo de conexión o servicio al crear');
            procesados++;
            if (procesados === pendientes.length) this.creandoUsuarios = false;
         }
      );
    }
  }

  limpiar() {
    this.usuariosEncontrados = [];
    this.telefonosNoEncontrados = [];
    this.DataQuery = [];
    this.IdSector = '0';
    this.Sector = '';
    this.FiltroCompradores = '0';
    this.FiltroIdManychat = '0';
    this.actualizandoBD = false;
    this.creandoUsuarios = false;
  }

  getResumenCreacion() {
    const exitosos = this.telefonosNoEncontrados.filter(x => x.estadoCreacion && x.estadoCreacion.includes('✅')).length;
    const conError = this.telefonosNoEncontrados.filter(x => x.estadoCreacion && (x.estadoCreacion.includes('❌') || x.estadoCreacion.includes('⚠️'))).length;
    const pendientes = this.telefonosNoEncontrados.filter(x => x.estadoCreacion === 'Pendiente').length;
    return { exitosos, conError, pendientes };
  }

  ordenAscendente: boolean = true;
  ordenarPorEstado() {
    this.ordenAscendente = !this.ordenAscendente;
    this.telefonosNoEncontrados.sort((a, b) => {
       const estA = a.estadoCreacion || '';
       const estB = b.estadoCreacion || '';
       if (estA < estB) return this.ordenAscendente ? -1 : 1;
       if (estA > estB) return this.ordenAscendente ? 1 : -1;
       return 0;
    });
  }

  agregarFalloAcumulado(user: any, motivo: string) {
    // Evitar duplicados exactos si le dan click varias veces
    const yaExiste = this.usuariosFallidosAcumulados.find(f => f.user.telefonoRaw === user.telefonoRaw);
    if (!yaExiste) {
      this.usuariosFallidosAcumulados.push({ user: user, motivo: motivo });
    }
  }

  abrirModalErrores(modalTemplate: any) {
    this.modalService.open(modalTemplate, { size: 'lg', centered: true });
  }

  descargarErroresCSV() {
    if (this.usuariosFallidosAcumulados.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF"; // BOM for excel
    csvContent += "Correo,Teléfono Original,Nombre,Motivo Error\r\n";

    this.usuariosFallidosAcumulados.forEach(row => {
        const correo = row.user.emailBusqueda || '';
        const tel = row.user.telefonoRaw || '';
        const nombre = row.user.nombreBusqueda || '';
        const motivo = row.motivo || '';
        csvContent += `"${correo}","${tel}","${nombre}","${motivo}"\r\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios_no_creados.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  limpiarErroresAcumulados() {
    this.usuariosFallidosAcumulados = [];
  }
}

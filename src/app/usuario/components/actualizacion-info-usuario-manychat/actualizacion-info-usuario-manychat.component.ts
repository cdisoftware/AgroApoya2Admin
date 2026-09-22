import { Component, OnInit } from '@angular/core';
import { InteraccionMenyChat } from 'src/app/core/InteraccionMenyChat';
import { ValorarofertaService } from 'src/app/core/valoraroferta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-actualizacion-info-usuario-manychat',
  templateUrl: './actualizacion-info-usuario-manychat.component.html',
  styleUrls: ['./actualizacion-info-usuario-manychat.component.css']
})
export class ActualizacionInfoUsuarioManychatComponent implements OnInit {

  // Variables de estado
  cargando: boolean = false;
  procesandoManychat: boolean = false;
  
  // Variables para filtros de BD
  DataSectores: any[] = [];
  keywordSec: string = 'DSCRPCION_SCTOR';
  Sector: any;
  IdSector: any = '0';
  FiltroCompradores: string = '0';
  FiltroIdManychat: string = '0'; // '0' para permitir ver todos los que correspondan al filtro
  FiltroUsuCodig: string = '';
  DataQuery: any[] = [];

  // Modo de actualización: 'personalizado' (usucodig - valor) o 'unico' (mismo valor)
  modoActualizacion: 'personalizado' | 'unico' = 'personalizado';

  // Variables para actualización de campo en Manychat
  campoManychat: any = '';
  valorCampo: string = ''; // Usado cuando el modo es 'unico'
  textoMapeo: string = ''; // Usado cuando el modo es 'personalizado' (ej: 6895 - valor1; 685 - valor2;)
  mapaValores: Map<string, string> = new Map();
  codigosNoEncontrados: string[] = [];
  todosSeleccionados: boolean = true;

  // Contadores y progreso
  progresoActual: number = 0;
  totalAProcesar: number = 0;
  mensajeAlerta: string = '';
  tipoAlerta: string = '';

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

  // Parser robusto para texto tipo "6895 - valor1; 685 - valor2;" o líneas separadas
  parsearMapeoTexto(texto: string): Map<string, string> {
    const mapa = new Map<string, string>();
    if (!texto || texto.toString().trim() === '') return mapa;

    // Divide por ';' o saltos de línea
    const segmentos = texto.toString().split(/[;\n\r]+/).map(s => s.trim()).filter(s => s !== '');

    for (const seg of segmentos) {
      let separadorIdx = seg.indexOf('-');
      if (separadorIdx === -1) separadorIdx = seg.indexOf(':');
      if (separadorIdx === -1) separadorIdx = seg.indexOf('\t');

      if (separadorIdx !== -1) {
        const usuStr = seg.substring(0, separadorIdx).trim();
        const valStr = seg.substring(separadorIdx + 1).trim();
        if (usuStr !== '') {
          mapa.set(usuStr, valStr);
        }
      }
    }
    return mapa;
  }

  // Carga automáticamente los usuarios de la base de datos a partir del texto de mapeo
  cargarUsuariosDesdeMapeo() {
    this.mensajeAlerta = '';
    this.mapaValores = this.parsearMapeoTexto(this.textoMapeo);
    if (this.mapaValores.size === 0) {
      this.mostrarMensaje('Por favor escribe al menos un par de "usucodig - valor" (ej: 6895 - valor1; 685 - valor2;).', 'warning');
      return;
    }

    const codigos = Array.from(this.mapaValores.keys()).filter(c => !isNaN(Number(c)));
    if (codigos.length === 0) {
      this.mostrarMensaje('No se encontraron códigos de usuario numéricos válidos en el texto.', 'warning');
      return;
    }

    this.FiltroUsuCodig = codigos.join(',');
    this.FiltroIdManychat = '0'; // Traer todos los códigos independientemente de si tienen o no ID Manychat para mostrar estado real
    this.ConstruirYConsultarQuery();
  }

  // Aplica el mapeo del textarea a los registros que ya estén en la tabla
  aplicarMapeoATabla() {
    this.mapaValores = this.parsearMapeoTexto(this.textoMapeo);
    if (this.mapaValores.size === 0) {
      this.mostrarMensaje('No se detectaron valores válidos en el texto de mapeo.', 'warning');
      return;
    }

    let asignados = 0;
    for (const user of this.DataQuery) {
      const usuStr = user.USUCODIG ? user.USUCODIG.toString().trim() : '';
      if (this.mapaValores.has(usuStr)) {
        user.valorPersonalizado = this.mapaValores.get(usuStr);
        if (user.ID_MANYCHAT && user.ID_MANYCHAT !== '00') {
          user.seleccionado = true;
        }
        asignados++;
      }
    }

    const encontradosSet = new Set(this.DataQuery.map(u => u.USUCODIG.toString().trim()));
    this.codigosNoEncontrados = Array.from(this.mapaValores.keys()).filter(k => !encontradosSet.has(k.toString().trim()));

    this.mostrarMensaje(`Se mapearon ${asignados} usuarios con sus valores específicos.`, 'success');
  }

  ConstruirYConsultarQuery() {
    this.cargando = true;
    this.DataQuery = [];
    this.mensajeAlerta = '';
    this.codigosNoEncontrados = [];

    // Parsear mapa si estamos en modo personalizado
    if (this.modoActualizacion === 'personalizado') {
      this.mapaValores = this.parsearMapeoTexto(this.textoMapeo);
    }
    
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

    // Filtro UsuCodig
    if (this.FiltroUsuCodig && this.FiltroUsuCodig.trim() !== '') {
      const codigos = this.FiltroUsuCodig
        .split(',')
        .map(c => c.trim())
        .filter(c => c !== '' && !isNaN(Number(c)));

      if (codigos.length > 0) {
        query += ` and a.usucodig in (${codigos.join(',')}) `;
      }
    }

    const Body = {
      QueryPre: query,
      ID_MANYCHAT: "0"
    };

    this.ServiciosValorar.ConsultaUsersAdminManychat('1', Body).subscribe(Resultado => {
      // Filtrar duplicados por USUCODIG
      const unicos = new Map();
      Resultado.forEach((item: any) => {
        if (!unicos.has(item.USUCODIG)) {
          const tieneManychat = item.ID_MANYCHAT && item.ID_MANYCHAT !== '00' && item.ID_MANYCHAT.toString().trim() !== '';
          const usuStr = item.USUCODIG ? item.USUCODIG.toString().trim() : '';
          
          let valMapeado = '';
          if (this.mapaValores.has(usuStr)) {
            valMapeado = this.mapaValores.get(usuStr)!;
          } else if (!isNaN(Number(usuStr)) && this.mapaValores.has(Number(usuStr).toString())) {
            valMapeado = this.mapaValores.get(Number(usuStr).toString())!;
          }

          unicos.set(item.USUCODIG, {
            ...item,
            valorPersonalizado: valMapeado,
            seleccionado: tieneManychat, // Seleccionado por defecto si tiene ManyChat ID
            estadoActualizacion: tieneManychat ? 'Pendiente' : '⚠️ Sin ManyChat ID',
            detalleRespuesta: ''
          });
        }
      });
      
      this.DataQuery = Array.from(unicos.values());
      this.todosSeleccionados = this.DataQuery.length > 0 && this.DataQuery.every(u => u.seleccionado);
      this.cargando = false;

      // Detectar códigos que se pusieron en el texto pero no se encontraron en BD
      if (this.modoActualizacion === 'personalizado' && this.mapaValores.size > 0) {
        const encontradosSet = new Set(Array.from(unicos.keys()).map(k => k.toString().trim()));
        this.codigosNoEncontrados = Array.from(this.mapaValores.keys()).filter(k => !encontradosSet.has(k.toString().trim()));
      }
      
      if (this.DataQuery.length === 0) {
        this.mostrarMensaje('No se encontraron registros en la BD con los códigos/filtros indicados.', 'warning');
      } else {
        const conManychat = this.DataQuery.filter(u => u.ID_MANYCHAT && u.ID_MANYCHAT !== '00').length;
        this.mostrarMensaje(`Se cargaron ${this.DataQuery.length} usuarios (${conManychat} listos con ID ManyChat).`, 'info');
      }
    }, error => {
      console.error('Error ejecutando query:', error);
      this.mostrarMensaje('Ocurrió un error al consultar en la base de datos.', 'danger');
      this.cargando = false;
    });
  }

  limpiar() {
    this.DataQuery = [];
    this.IdSector = '0';
    this.Sector = '';
    this.FiltroCompradores = '0';
    this.FiltroIdManychat = '0';
    this.FiltroUsuCodig = '';
    this.campoManychat = '';
    this.valorCampo = '';
    this.textoMapeo = '';
    this.mapaValores.clear();
    this.codigosNoEncontrados = [];
    this.procesandoManychat = false;
    this.progresoActual = 0;
    this.totalAProcesar = 0;
    this.mensajeAlerta = '';
  }

  toggleSeleccionarTodos() {
    for (const user of this.DataQuery) {
      if (user.ID_MANYCHAT && user.ID_MANYCHAT !== '00' && user.ID_MANYCHAT.toString().trim() !== '') {
        user.seleccionado = this.todosSeleccionados;
      }
    }
  }

  actualizarSeleccionIndividual() {
    const habilitados = this.DataQuery.filter(u => u.ID_MANYCHAT && u.ID_MANYCHAT !== '00' && u.ID_MANYCHAT.toString().trim() !== '');
    this.todosSeleccionados = habilitados.length > 0 && habilitados.every(u => u.seleccionado);
  }

  get cantidadSeleccionados(): number {
    return this.DataQuery.filter(u => u.seleccionado).length;
  }

  get resumenProceso() {
    const exitosos = this.DataQuery.filter(u => u.estadoActualizacion === '✅ Exitoso').length;
    const conError = this.DataQuery.filter(u => u.estadoActualizacion === '❌ Error').length;
    const pendientes = this.DataQuery.filter(u => u.estadoActualizacion === 'Pendiente' && u.seleccionado).length;
    return { exitosos, conError, pendientes };
  }

  async ejecutarActualizacionManychat() {
    if (this.procesandoManychat) return;

    if (!this.campoManychat || this.campoManychat.toString().trim() === '') {
      this.mostrarMensaje('Por favor ingresa el ID numérico del campo en ManyChat (ej. 9844106).', 'danger');
      return;
    }

    const campoTrim = this.campoManychat.toString().trim();
    const numFieldId = Number(campoTrim);
    if (isNaN(numFieldId) || numFieldId <= 0) {
      this.mostrarMensaje('El ID del campo en ManyChat debe ser un número válido (ej. 9844106).', 'danger');
      return;
    }

    if (this.DataQuery.length === 0) {
      this.mostrarMensaje('Primero debes cargar los usuarios con el botón "1. Cargar Usuarios desde Texto" o "Buscar en BD".', 'warning');
      return;
    }

    if (this.modoActualizacion === 'unico') {
      if (this.valorCampo === null || this.valorCampo === undefined || this.valorCampo.toString().trim() === '') {
        this.mostrarMensaje('Por favor ingresa el valor a asignar en el campo de ManyChat.', 'danger');
        return;
      }
    }

    const usuariosAProcesar = this.DataQuery.filter(u => 
      u.seleccionado && 
      u.ID_MANYCHAT && 
      u.ID_MANYCHAT !== '00' && 
      u.ID_MANYCHAT.toString().trim() !== ''
    );

    if (usuariosAProcesar.length === 0) {
      this.mostrarMensaje('No hay usuarios seleccionados con un ID ManyChat válido. Asegúrate de marcar la casilla de los usuarios que deseas actualizar.', 'warning');
      return;
    }

    this.procesandoManychat = true;
    try {
      this.totalAProcesar = usuariosAProcesar.length;
      this.progresoActual = 0;
      this.mensajeAlerta = '';

      for (const user of usuariosAProcesar) {
        // Determinar el valor que corresponde a este usuario
        let valorFinal = '';
        if (this.modoActualizacion === 'personalizado') {
          valorFinal = user.valorPersonalizado ? user.valorPersonalizado.toString().trim() : '';
        } else {
          valorFinal = this.valorCampo ? this.valorCampo.toString().trim() : '';
        }

        if (!valorFinal) {
          user.estadoActualizacion = '⚠️ Sin valor';
          user.detalleRespuesta = 'No se definió ningún valor para este usuario';
          this.progresoActual++;
          continue;
        }

        user.estadoActualizacion = 'Actualizando...';

        const idManychatTrim = user.ID_MANYCHAT ? user.ID_MANYCHAT.toString().trim() : '';
        const subscriberId = !isNaN(Number(idManychatTrim)) ? Number(idManychatTrim) : idManychatTrim;

        const body = {
          subscriber_id: subscriberId,
          field_id: numFieldId,
          field_value: valorFinal
        };

        console.log(`Enviando actualización para ${user.USUCODIG}:`, body);

        await new Promise<void>((resolve) => {
          this.serviceintegracion.AsignaCampoManyChat(body).subscribe(
            (resultado: any) => {
              console.log(`Respuesta ManyChat para usuario ${user.USUCODIG} (${user.ID_MANYCHAT}):`, resultado);
              
              let esError = false;
              if (resultado) {
                if (typeof resultado === 'string' && resultado.toLowerCase().includes('error')) {
                  esError = true;
                } else if (typeof resultado === 'object' && resultado.status === 'error') {
                  esError = true;
                }
              }

              if (esError) {
                user.estadoActualizacion = '❌ Error';
                user.detalleRespuesta = typeof resultado === 'string' ? resultado : (resultado.message || JSON.stringify(resultado));
              } else {
                user.estadoActualizacion = '✅ Exitoso';
                user.detalleRespuesta = `Actualizado con: "${valorFinal}"`;
              }

              this.progresoActual++;
              resolve();
            },
            (error: any) => {
              console.error(`Error actualizando ManyChat para usuario ${user.USUCODIG}:`, error);
              user.estadoActualizacion = '❌ Error';
              
              let errorMsg = 'Error al actualizar';
              if (error?.error) {
                if (typeof error.error === 'string') {
                  errorMsg = error.error;
                } else if (error.error.message) {
                  errorMsg = error.error.message;
                } else if (error.error.errors) {
                  errorMsg = JSON.stringify(error.error.errors);
                } else {
                  errorMsg = JSON.stringify(error.error);
                }
              } else if (error?.message) {
                errorMsg = error.message;
              }
              
              user.detalleRespuesta = errorMsg;
              this.progresoActual++;
              resolve();
            }
          );
        });
      }

      const { exitosos, conError } = this.resumenProceso;
      this.mostrarMensaje(`Proceso finalizado. Exitosos: ${exitosos}, Errores: ${conError}.`, conError > 0 ? 'warning' : 'success');
    } catch (err: any) {
      console.error('Error general en ejecución ManyChat:', err);
      this.mostrarMensaje(`Error inesperado durante la ejecución: ${err?.message || err}`, 'danger');
    } finally {
      this.procesandoManychat = false;
    }
  }

  mostrarMensaje(mensaje: string, tipo: string) {
    this.mensajeAlerta = mensaje;
    this.tipoAlerta = tipo;
  }
}

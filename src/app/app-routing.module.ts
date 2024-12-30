import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearofertaComponent } from './ofertas/components/crearoferta/crearoferta.component';
import { LoginComponent } from './usuario/components/login/login.component';
import { BuscarofertaComponent } from './ofertas/components/valoraroferta/buscaroferta/buscaroferta.component';
import { SectorizacionComponent } from './ofertas/components/valoraroferta/sectorizacion/sectorizacion.component';
import { TransportistaComponent } from './ofertas/components/valoraroferta/transportista/transportista.component';
import { LayoutprincipalComponent } from './shared/layoutprincipal/layoutprincipal.component';
import { ConciliacionComponent } from './ofertas/components/valoraroferta/conciliacion/conciliacion.component'
import { ValoracionComponent } from './ofertas/components/valoraroferta/valoracion/valoracion.component';
import { PlantillascorreoComponent } from './usuario/components/plantillascorreo/plantillascorreo.component';
import { CosteoComponent } from './ofertas/components/valoraroferta/costeo/costeo.component';
import { ReporteComponent } from './usuario/components/reporte/reporte.component';
import { RepComprasComponent } from './ofertas/components/reportes/rep-compras/rep-compras.component';
import { ComprasComponent } from './usuario/components/compras/compras.component';
import { UsuariosComponent } from './usuario/components/usuarios/usuarios.component';
import { DatosBasicosComponent } from './usuario/components/datosBasicos/datosBasicos.component';
import { CarguepublicidadComponent } from './usuario/components/carguepublicidad/carguepublicidad.component';
import { EvaluacionofertaComponent } from './ofertas/components/evaluacionoferta/evaluacionoferta.component';
import { SeguimientoComponent } from './ofertas/components/seguimiento/seguimiento.component';
import { CarruselofertasComponent } from './ofertas/components/carruselofertas/carruselofertas.component';
import { ComboofertasComponent } from './ofertas/components/comboofertas/comboofertas.component';
import { EnviocorreosComponent } from './usuario/components/enviocorreos/enviocorreos.component';
import { ConsultacorreosComponent } from './usuario/components/consultacorreos/consultacorreos.component';
import { AdminUltMillaComponent } from './ofertas/components/admin-ult-milla/admin-ult-milla.component';
import { RepOfertasComponent } from './ofertas/components/reportes/rep-ofertas/rep-ofertas.component';
import { AsignaTransUltMillaComponent } from './ofertas/components/asigna-trans-ult-milla/asigna-trans-ult-milla.component';
import { AdminsectoresComponent } from './ofertas/components/adminsectores/adminsectores.component';
import { AdminusuariosComponent } from './usuario/components/adminusuarios/adminusuarios.component';
import { ReporteentregasComponent } from './ofertas/components/reportes/reporteentregas/reporteentregas.component';
import { ManychatComponent } from './usuario/components/manychat/manychat.component';
import { AdminCodigosComponent } from './ofertas/components/admin-codigos/admin-codigos.component';
import { EnviosmanychatComponent } from './usuario/components/enviosmanychat/enviosmanychat.component';
import { SeguimientosComponent } from './ofertas/components/seguimientos/seguimientos.component';
import { UltimamillamultientregasComponent } from './ofertas/components/ultimamillamultientregas/ultimamillamultientregas.component';
import { MapacalorComponent } from './ofertas/components/mapacalor/mapacalor.component';
import { ModificarOfertaPublicaComponent } from './ofertas/components/modificar-oferta-publica/modificar-oferta-publica.component';
import { DuplicarofertaComponent } from './ofertas/components/duplicaroferta/duplicaroferta.component';
import { RepEntregasComponent } from './ofertas/components/reportes/rep-entregas/rep-entregas.component';
import { AdminmanychatComponent } from './ofertas/components/adminmanychat/adminmanychat.component';
import { CoordenadasusuariosComponent } from './usuario/components/coordenadasusuarios/coordenadasusuarios.component';
import { AsignaTransCampoCiudadComponent } from './ofertas/components/asigna-trans-campo-ciudad/asigna-trans-campo-ciudad.component';
import { RepusuariosComponent } from './ofertas/components/reportes/repusuarios/repusuarios.component';
import { DashboardComponent } from './ofertas/components/reportes/dashboard/dashboard.component';
import { RegistroUserexcelComponent } from './usuario/components/registro-userexcel/registro-userexcel.component';
import { MapacompraofertasComponent } from './ofertas/components/reportes/mapacompraofertas/mapacompraofertas.component';
import { EnviosmsofertaComponent } from './ofertas/components/sms-envio/enviosmsoferta/enviosmsoferta.component';


//Version 3 AgroApoyados
import { CreacionofertaComponent } from './AgroVersionTres/Oferta/creacionoferta/creacionoferta.component';
import { ReporteVentasComponent } from './AgroVersionTres/reportes/reporte-ventas/reporte-ventas.component';
import { ReporteUsuarioComponent } from './AgroVersionTres/reportes/reporte-usuario/reporte-usuario.component';
import { MapaCalor3Component } from './AgroVersionTres/usuario/mapa-calor3/mapa-calor3.component';
import { UsomanychatComponent } from './AgroVersionTres/documentacion/usomanychat/usomanychat.component';
import { IndexComponent } from './AgroVersionTres/documentacion/index/index.component';
import { ReporteEmbajadorComponent } from './AgroVersionTres/reportes/reporte-embajador/reporte-embajador.component';
import { ReporteYoFioComponent } from './AgroVersionTres/reportes/reporte-yo-fio/reporte-yo-fio.component';
import { CarruselComponent } from './AgroVersionTres/carrusel/carrusel.component';
import { MenuLateralComponent } from './AgroVersionTres/menu-lateral/menu-lateral.component';
import { InicioComponent } from './AgroVersionTres/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'rep-ofertas',
    component: RepOfertasComponent
  },
  {
    path: 'Enviosmsoferta',
    component: EnviosmsofertaComponent
  },
  {
    path: 'home',
    component: LayoutprincipalComponent,
    children: [
      {
        path: 'buscar',
        component: BuscarofertaComponent
      },
      {
        path: 'crearoferta',
        component: CrearofertaComponent
      },
      {
        path: 'buscaroferta',
        component: BuscarofertaComponent
      },
      {
        path: 'conciliacion',
        component: ConciliacionComponent
      },
      {
        path: 'sectorizar',
        component: SectorizacionComponent
      },
      {
        path: 'transportista',
        component: TransportistaComponent
      },
      {
        path: 'valoracion',
        component: ValoracionComponent
      },
      {
        path: 'costeo',
        component: CosteoComponent
      },
      {
        path: 'plantillaCorreo',
        component: PlantillascorreoComponent
      },
      {
        path: 'rep-compra',
        component: RepComprasComponent
      },
      {
        path: 'compras',
        component: ComprasComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'rep-usuarios',
        component: ReporteComponent
      },
      {
        path: 'carguepublicidad',
        component: CarguepublicidadComponent
      },
      {
        path: 'evaluacion-oferta',
        component: EvaluacionofertaComponent
      },
      {
        path: 'seguimiento',
        component: SeguimientoComponent
      },
      {
        path: 'carrusel',
        component: CarruselofertasComponent
      },
      {
        path: 'reporte',
        component: ReporteComponent
      },
      {
        path: 'combo',
        component: ComboofertasComponent
      },
      {
        path: 'datos',
        component: DatosBasicosComponent
      },
      {
        path: 'enviocorreos',
        component: EnviocorreosComponent
      },
      {
        path: 'consultacorreos',
        component: ConsultacorreosComponent
      },
      {
        path: 'AdminUltimaMilla',
        component: AdminUltMillaComponent
      },
      {
        path: 'transultimamilla/:IdOferta/:IdSector',
        component: AsignaTransUltMillaComponent
      },
      {
        path: 'AdminSectores',
        component: AdminsectoresComponent
      },
      {
        path: 'AdminUsuarios',
        component: AdminusuariosComponent
      },
      {
        path: 'RepCompras',
        component: ReporteentregasComponent
      },
      {
        path: 'modulomanychat',
        component: ManychatComponent
      },
      {
        path: 'admincode',
        component: AdminCodigosComponent
      },
      {
        path: 'EnviosManyChat',
        component: EnviosmanychatComponent
      },
      {
        path: 'Seguimientos',
        component: SeguimientosComponent
      },
      {
        path: 'Ultimamillamultientregas',
        component: UltimamillamultientregasComponent
      },
      {
        path: 'MapaCalor',
        component: MapacalorComponent
      },
      {
        path: 'ModificarOferta',
        component: ModificarOfertaPublicaComponent
      },
      {
        path: 'DuplicarOferta',
        component: DuplicarofertaComponent
      },
      {
        path: 'ReporteEntregas',
        component: RepEntregasComponent
       },
      {
        path: 'AdminManyChat',
        component: AdminmanychatComponent
      },
      {
        path: 'CoordenadasUsuarios',
        component: CoordenadasusuariosComponent
      },
      {
        path: 'Asigna-trans-campo',
        component: AsignaTransCampoCiudadComponent
      },
      {
        path: 'ReporteUsuarios',
        component: RepusuariosComponent
      },
      {
        path: 'DashboardAdmin',
        component: DashboardComponent
      },
      {
        path: 'OperAutomatizadas',
        component: RegistroUserexcelComponent
      },
      {
        path: 'MapaCompras/:cdcnsctivo/:IdOferta',
        component: MapacompraofertasComponent
      }
    ]
  },
  {
    path: 'admincod',
    component: AdminCodigosComponent
  },
  //Version tres AgroApoyados
  {
    path: 'Home3',
    component: CreacionofertaComponent
  },
  {
    path: 'mapa-calor3',
    component: MapaCalor3Component
  }, {
    path: 'reporte-usuario',
    component: ReporteUsuarioComponent
  }, 
  {
    path: 'reporte-ventas',
    component: ReporteVentasComponent
  },
  {
    path: 'Index',
    component: IndexComponent
  },
  {
    path: 'UsoMany',
    component: UsomanychatComponent
  },
  {
    path: 'reporte-Embajador',
    component: ReporteEmbajadorComponent
  },
  {
    path: 'reporteYoFio',
    component: ReporteYoFioComponent
  },
  {
    path: 'carrusel',
    component: CarruselComponent
  },
  {
    path: 'Menu-Lateral',
    component: MenuLateralComponent
  },
  {
    path: 'Inicio',
    component: InicioComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


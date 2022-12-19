import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearofertaComponent } from './ofertas/components/crearoferta/crearoferta.component';
import { LoginComponent } from './usuario/components/login/login.component';
import { BuscarofertaComponent } from './ofertas/components/valoraroferta/buscaroferta/buscaroferta.component';
import { MenuComponent } from './usuario/components/menu/menu.component';
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
import { CarguepublicidadComponent } from './usuario/components/carguepublicidad/carguepublicidad.component';
import { EvaluacionofertaComponent } from './ofertas/components/evaluacionoferta/evaluacionoferta.component';
import { PruebasmapsComponent } from './ofertas/components/pruebasmaps/pruebasmaps.component';
import { SeguimientoComponent } from './ofertas/components/seguimiento/seguimiento.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
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
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

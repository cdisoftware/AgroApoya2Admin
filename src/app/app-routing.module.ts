import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearofertaComponent } from './ofertas/components/crearoferta/crearoferta.component';
import { LoginComponent } from './usuario/components/login/login.component';
import { BuscarofertaComponent } from './ofertas/components/valoraroferta/buscaroferta/buscaroferta.component';
import { MenuComponent } from './usuario/components/menu/menu.component';
import { SectorizacionComponent } from './ofertas/components/valoraroferta/sectorizacion/sectorizacion.component';
import { TransportistaComponent } from './ofertas/components/valoraroferta/transportista/transportista.component';
import { LayoutprincipalComponent } from './shared/layoutprincipal/layoutprincipal.component';
import { ConciliacionComponent} from './ofertas/components/valoraroferta/conciliacion/conciliacion.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: LayoutprincipalComponent,
    children:[
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
        path:'conciliacion',
        component: ConciliacionComponent
      },
      {
        path: 'sectorizar',
        component: SectorizacionComponent
      },
      {
        path: 'transportista',
        component: TransportistaComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

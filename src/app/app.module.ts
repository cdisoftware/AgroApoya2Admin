import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearofertaComponent } from './ofertas/components/crearoferta/crearoferta.component';
import { LoginComponent } from './usuario/components/login/login.component';
import { CommonModule, HashLocationStrategy, LocationStrategy, DatePipe } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDragDropModule } from 'ng-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BuscarofertaComponent } from './ofertas/components/valoraroferta/buscaroferta/buscaroferta.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SidebarModule } from 'ng-sidebar';
import { SectorizacionComponent } from './ofertas/components/valoraroferta/sectorizacion/sectorizacion.component';
import { TransportistaComponent } from './ofertas/components/valoraroferta/transportista/transportista.component';
import { ConciliacionComponent } from './ofertas/components/valoraroferta/conciliacion/conciliacion.component';
import { ValoracionComponent } from './ofertas/components/valoraroferta/valoracion/valoracion.component';
import { CookieService } from 'ngx-cookie-service';
import { PlantillascorreoComponent } from './usuario/components/plantillascorreo/plantillascorreo.component'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GoogleMapsModule } from '@angular/google-maps';
import { CosteoComponent } from './ofertas/components/valoraroferta/costeo/costeo.component';
import { ReporteComponent } from './usuario/components/reporte/reporte.component';
import { RepComprasComponent } from './ofertas/components/reportes/rep-compras/rep-compras.component';
import { DatosBasicosComponent } from './usuario/components/datosBasicos/datosBasicos.component';
import { OlvidepasswordComponent } from './usuario/components/olvidepassword/olvidepassword.component';
import { CarguepublicidadComponent } from './usuario/components/carguepublicidad/carguepublicidad.component';
import { EvaluacionofertaComponent } from './ofertas/components/evaluacionoferta/evaluacionoferta.component';
import { SeguimientoComponent } from './ofertas/components/seguimiento/seguimiento.component';
import { ComboofertasComponent } from './ofertas/components/comboofertas/comboofertas.component';
import { EnviocorreosComponent } from './usuario/components/enviocorreos/enviocorreos.component';
import { ConsultacorreosComponent } from './usuario/components/consultacorreos/consultacorreos.component';
import { AdminUltMillaComponent } from './ofertas/components/admin-ult-milla/admin-ult-milla.component';
import { RepOfertasComponent } from './ofertas/components/reportes/rep-ofertas/rep-ofertas.component';
import { AsignaTransUltMillaComponent } from './ofertas/components/asigna-trans-ult-milla/asigna-trans-ult-milla.component';
import { AdminsectoresComponent } from './ofertas/components/adminsectores/adminsectores.component';
import { AdminusuariosComponent } from './usuario/components/adminusuarios/adminusuarios.component';
import { ReporteentregasComponent } from './ofertas/components/reportes/reporteentregas/reporteentregas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ManychatComponent } from './usuario/components/manychat/manychat.component';
import { AdminCodigosComponent } from './ofertas/components/admin-codigos/admin-codigos.component';
import { EnviosmanychatComponent } from './usuario/components/enviosmanychat/enviosmanychat.component';
import { SeguimientosComponent } from './ofertas/components/seguimientos/seguimientos.component';
import { UltimamillamultientregasComponent } from './ofertas/components/ultimamillamultientregas/ultimamillamultientregas.component';
import { MapacalorComponent } from './ofertas/components/mapacalor/mapacalor.component';
import { DuplicarofertaComponent } from './ofertas/components/duplicaroferta/duplicaroferta.component';
import { ModificarOfertaPublicaComponent } from './ofertas/components/modificar-oferta-publica/modificar-oferta-publica.component';
import { RepEntregasComponent } from './ofertas/components/reportes/rep-entregas/rep-entregas.component';
import { AdminmanychatComponent } from './ofertas/components/adminmanychat/adminmanychat.component';
import { CoordenadasusuariosComponent } from './usuario/components/coordenadasusuarios/coordenadasusuarios.component';
import { AsignaTransCampoCiudadComponent } from './ofertas/components/asigna-trans-campo-ciudad/asigna-trans-campo-ciudad.component';
import { RepusuariosComponent } from './ofertas/components/reportes/repusuarios/repusuarios.component';
import { DashboardComponent } from './ofertas/components/reportes/dashboard/dashboard.component';
import { RegistroUserexcelComponent } from './usuario/components/registro-userexcel/registro-userexcel.component';
import { EnviosmsofertaComponent } from './ofertas/components/sms-envio/enviosmsoferta/enviosmsoferta.component';
import { CreacionofertaComponent } from './AgroVersionTres/Oferta/creacionoferta/creacionoferta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapaCalor3Component } from './AgroVersionTres/usuario/mapa-calor3/mapa-calor3.component';
import { ReporteUsuarioComponent } from './AgroVersionTres/reportes/reporte-usuario/reporte-usuario.component'
import { ReporteVentasComponent } from './AgroVersionTres/reportes/reporte-ventas/reporte-ventas.component';
import { UsomanychatComponent } from './AgroVersionTres/documentacion/usomanychat/usomanychat.component';
import { IndexComponent } from './AgroVersionTres/documentacion/index/index.component';
import { ReporteEmbajadorComponent } from './AgroVersionTres/reportes/reporte-embajador/reporte-embajador.component';
import { ReporteYoFioComponent } from './AgroVersionTres/reportes/reporte-yo-fio/reporte-yo-fio.component';
import { CarruselComponent } from './AgroVersionTres/carrusel/carrusel.component';
import { MenuLateralComponent } from './AgroVersionTres/menu-lateral/menu-lateral.component';
import { InicioComponent } from './AgroVersionTres/inicio/inicio.component';
import { ValidarUsuarioComponent } from './AgroVersionTres/usuario/validar-usuario/validar-usuario.component'
import { MinimocompratotalComponent } from './ofertas/components/minimocompratotal/minimocompratotal.component'


export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    AppComponent,ReporteEmbajadorComponent,
    CrearofertaComponent,
    BuscarofertaComponent,
    SectorizacionComponent,
    TransportistaComponent,
    ConciliacionComponent,
    ValoracionComponent,
    LoginComponent,
    PlantillascorreoComponent,
    CosteoComponent,
    ReporteComponent,
    RepComprasComponent,
    RepOfertasComponent,
    DatosBasicosComponent,
    OlvidepasswordComponent,
    CarguepublicidadComponent,
    EvaluacionofertaComponent,
    SeguimientoComponent,
    SeguimientosComponent,
    ComboofertasComponent,
    EnviocorreosComponent,
    ConsultacorreosComponent,
    AdminUltMillaComponent,
    AsignaTransUltMillaComponent,
    AdminsectoresComponent,
    AdminusuariosComponent,
    ReporteentregasComponent,
    ManychatComponent,
    AdminCodigosComponent,
    EnviosmanychatComponent,
    UltimamillamultientregasComponent,
    MapacalorComponent,
    ModificarOfertaPublicaComponent,
    DuplicarofertaComponent,
    RepEntregasComponent,
    AdminmanychatComponent,
    CoordenadasusuariosComponent,
    AsignaTransCampoCiudadComponent,
    RepusuariosComponent,
    DashboardComponent,
    RegistroUserexcelComponent,
    EnviosmsofertaComponent,
    CreacionofertaComponent,
    MapaCalor3Component,
    ReporteUsuarioComponent,
    ReporteVentasComponent,
    UsomanychatComponent,
    IndexComponent,
    ReporteEmbajadorComponent,
    ReporteYoFioComponent,
    CarruselComponent,
    MenuLateralComponent,
    InicioComponent,
    ValidarUsuarioComponent,
    MinimocompratotalComponent
  
  ],
  imports: [
    NgxMaskModule.forRoot(options),
    BrowserModule,
    NgDragDropModule.forRoot(),
    DragDropModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    AutocompleteLibModule,
    SidebarModule.forRoot(),
    AngularEditorModule,
    GoogleMapsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CookieService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearofertaComponent } from './ofertas/components/crearoferta/crearoferta.component';
import { LoginComponent} from './usuario/components/login/login.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarofertaComponent } from './ofertas/components/valoraroferta/buscaroferta/buscaroferta.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SidebarModule } from 'ng-sidebar'

@NgModule({
  declarations: [
    AppComponent,
    CrearofertaComponent,
    LoginComponent,
    BuscarofertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    AutocompleteLibModule,
    SidebarModule.forRoot()
  ],
  providers: [
    
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

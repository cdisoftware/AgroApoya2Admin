import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../../core/login.service';
import { MetodosglobalesService } from './../../../core/metodosglobales.service';
import { EncryptionService } from './encryption.service';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Usuario: string;
  Password: string;
  IdUsuario: string = '12';
  loading = false;

  modalMensaje: BsModalRef;
  lblModalMsaje: string = '';



  constructor(public rutas: Router,
    private servicioslogin: LoginService,
    private ServiciosGlobales: MetodosglobalesService,
    private encryption: EncryptionService,
    private cookies: CookieService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.desencrip();
  }

  Login(templateMensaje: TemplateRef<any>) {
    if (this.Usuario !='' && this.Password != '') {
      const DatosLogin = {
        USUCODIG: 0,
        CORREO_PERSONA: this.Usuario
      }
      this.servicioslogin.ConsultaUsuario('2', DatosLogin).subscribe(Resultado => {
        this.Encripta = this.encryption.encryptUsingTripleDES(this.Password, true);
        if (this.Encripta == Resultado[0].TOKEN_PERSONA) {
          this.ServiciosGlobales.CrearCookie('IDU', this.IdUsuario);
          this.rutas.navigateByUrl('/home', { skipLocationChange: true })
          this.cookies.set("USUCODIG", Resultado[0].USUCODIG);
          this.cookies.set("id_TipoPersona", Resultado[0].id_TipoPersona);
          this.cookies.set("NOMBRES_PERSONA", Resultado[0].NOMBRES_PERSONA);
          this.cookies.set("APELLIDOS_PERSONA", Resultado[0].APELLIDOS_PERSONA);
          this.cookies.set("CORREO_PERSONA", Resultado[0].CORREO_PERSONA);
          this.cookies.set("TOKEN_PERSONA", Resultado[0].TOKEN_PERSONA);

        } else {
          //modal usuario no existe
          this.modalMensaje = this.modalService.show(templateMensaje);
          this.lblModalMsaje = 'No pudimos traer tu información, por favor valide las credenciales que ingreso.';
        }

      })
    }else{
      this.modalMensaje = this.modalService.show(templateMensaje);
      this.lblModalMsaje = "El campo usuario y contraseña son obligatorios";
    }
  }

  //Encriptar
  Encripta: string = '';
  des: string = '';

  encrip(Token: string) {
    this.Encripta = this.encryption.encryptUsingTripleDES(Token, true);
    return this.Encripta;
  }

  desencrip() {
    this.des = this.encryption.decryptUsingTripleDES('UQH9au4y/DA=');
    console.log(this.des)
  }
}

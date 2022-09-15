import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../../core/login.service';
import { MetodosglobalesService } from './../../../core/metodosglobales.service';
import { EncryptionService } from './encryption.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = '';
  pass: string = '';
  nombre: string = '';
  IdUsuario: string = '';
  loading: boolean = false;
  Respuesta: string = '';
  lblModalMsaje: string = '';
  Encripta: string = '';
  des: string = '';

  password: string;
  ver: string;
  verUno: string;
  verDos: string;


  constructor(public rutas: Router,
    private servicioslogin: LoginService,
    private ServiciosGlobales: MetodosglobalesService,
    private encryption: EncryptionService,
    private modalService: NgbModal,
    public cookies: CookieService) { }

  ngOnInit(): void {
    this.cookies.deleteAll();
    this.password = '';
    this.ver = '2';
    this.verUno = '2';
    this.verDos = '2';
  }

  login(templateMensaje: any) {
    if (this.user != '' && this.pass != '') {
      const DatosLogin = {
        CorreoPersona: this.user
      }
      this.servicioslogin.ConsultaUsuario('1', DatosLogin).subscribe(Resultado => {

        this.Encripta = this.encryption.encryptUsingTripleDES(this.pass, true);
        if (this.Encripta == Resultado[0].Token) {
          this.IdUsuario = Resultado[0].Usucodig;
          this.nombre = Resultado[0].NombrePersona + ' ' + Resultado[0].ApellidoPersona;
          this.ServiciosGlobales.CrearCookie('IDU', this.IdUsuario);
          this.ServiciosGlobales.CrearCookie('nombreuser', this.nombre);
          this.rutas.navigateByUrl('/home')
        }
        else {
          this.Respuesta = 'Credenciales invalidas, valida tus datos.';
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        }

      })
    } else {
      this.Respuesta = "Los campos usuario y contraseña son obligatorios";
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }
  }

  cambiarType(Bandera: string) {
    if (Bandera == "1") {
      let elemento: any = document.getElementById('Password');
      if (elemento.type == "text") {
        elemento.type = "password";
        this.ver = '2';
      } else {
        elemento.type = "text";
        this.ver = '1';
      }
    }

    if (Bandera == "2") {
      let elemento: any = document.getElementById('PasswordUno');
      if (elemento.type == "text") {
        elemento.type = "password";
        this.verUno = '2';
      } else {
        elemento.type = "text";
        this.verUno = '1';
      }
    }

    if (Bandera == "3") {
      let elemento: any = document.getElementById('PasswordDos');
      if (elemento.type == "text") {
        elemento.type = "password";
        this.verDos = '2';
      } else {
        elemento.type = "text";
        this.verDos = '1';
      }
    }

  }

}

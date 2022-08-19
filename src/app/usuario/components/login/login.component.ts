import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../../core/login.service';
import { MetodosglobalesService } from './../../../core/metodosglobales.service';
import { EncryptionService } from './encryption.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Usuario: string = '';
  Password: string = '';
  IdUsuario: string = '12';
  loading = false;

  constructor(public rutas: Router,
    private servicioslogin: LoginService,
    private ServiciosGlobales: MetodosglobalesService,
    private encryption: EncryptionService,
    private router: Router,
    private cookies: CookieService) { }

  ngOnInit(): void {
    this.desencrip();
  }

  Login() {
    const DatosLogin = {
      USUCODIG: 0,
      CORREO_PERSONA: this.Usuario
    }
    this.servicioslogin.ConsultaUsuario('2', DatosLogin).subscribe(Resultado => {
      console.log(Resultado)
      this.Encripta = this.encryption.encryptUsingTripleDES(this.Password, true);
      if (this.Encripta == Resultado[0].TOKEN_PERSONA ) {
        this.ServiciosGlobales.CrearCookie('IDU', this.IdUsuario);
        this.rutas.navigateByUrl('/home')
      } else {
        //modal usuario no existe
        console.log('no existe')
      }

    })

    //this.rutas.navigateByUrl('/home')
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

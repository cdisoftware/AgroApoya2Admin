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

  Usuario: string = '';
  Password: string = '';
  IdUsuario: string = '';
  loading: boolean = false;
  Respuesta: string = '';
  lblModalMsaje: string = '';
  Encripta: string = '';
  des: string = '';



  constructor(public rutas: Router,
    private servicioslogin: LoginService,
    private ServiciosGlobales: MetodosglobalesService,
    private encryption: EncryptionService,
    private modalService: NgbModal,
    public cookies: CookieService) { }

  ngOnInit(): void {
    this.cookies.deleteAll();
  }

  Login(templateMensaje: any) {
    if (this.Usuario != '' && this.Password != '') {
      const DatosLogin = {
        USUCODIG: 0,
        CORREO_PERSONA: this.Usuario
      }
      this.servicioslogin.ConsultaUsuario('2', DatosLogin).subscribe(Resultado => {
        console.log(Resultado)
        this.Encripta = this.encryption.encryptUsingTripleDES(this.Password, true);
        if (this.Encripta == Resultado[0].TOKEN_PERSONA) {
          this.IdUsuario = Resultado[0].USUCODIG;
          this.ServiciosGlobales.CrearCookie('IDU', this.IdUsuario);
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

}

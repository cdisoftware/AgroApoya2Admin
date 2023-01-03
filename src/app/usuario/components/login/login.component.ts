import { Component, OnInit, TemplateRef } from '@angular/core';
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
  Respuesta: string = '';
  Encripta: string = '';

  imagen: string;
  TituloModal: string;

  constructor(public rutas: Router,
    private servicioslogin: LoginService,
    private ServiciosGlobales: MetodosglobalesService,
    private encryption: EncryptionService,
    private modalService: NgbModal,
    public cookies: CookieService) { }

  ngOnInit(): void {
    this.cookies.deleteAll();
    this.imagen = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";
  }

  login(templateMensaje: any) {
    if (this.user != '' && this.pass != '') {
      const DatosLogin = {
        CorreoPersona: this.user
      }

      this.servicioslogin.ConsultaUsuario('1', DatosLogin).subscribe(Resultado => {
        if (Resultado == null || Resultado == undefined) {
          this.Respuesta = 'Usuario no existe.';
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        } else if (Resultado.length < 1) {
          this.Respuesta = 'Usuario no existe.';
          this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
        } else {
          this.Encripta = this.encryption.encryptUsingTripleDES(this.pass, true);
          if (this.Encripta == Resultado[0].Token) {
            this.ServiciosGlobales.CrearCookie('IDU', Resultado[0].Usucodig);
            this.ServiciosGlobales.CrearCookie('nombreuser', Resultado[0].NombrePersona + ' ' + Resultado[0].ApellidoPersona);
            this.rutas.navigateByUrl('/home/buscar')
          } else {
            this.Respuesta = 'Credenciales invalidas, valida tus datos.';
            this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
          }
        }
      })
    } else {
      this.Respuesta = "Los campos usuario y contraseña son obligatorios";
      this.modalService.open(templateMensaje, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
    }
    let elemento: any = document.getElementById('Password');
    elemento.type = "password";
    this.imagen = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";
  }
  ocultarPass() {
    let elemento: any = document.getElementById('Password');
    if (this.imagen == "../../../../assets/ImagenesAgroApoya2Adm/ver.png") {
      elemento.type = "text";
      this.imagen = "../../../../assets/ImagenesAgroApoya2Adm/novisible.png";
    } else {
      elemento.type = "password";
      this.imagen = "../../../../assets/ImagenesAgroApoya2Adm/ver.png";
    }
  }

  OlvidoPassword(ModalOlvidePassword: TemplateRef<any>) {
    this.modalService.open(ModalOlvidePassword, { centered: true, backdrop: 'static', keyboard: false });
    this.TituloModal = "AgroApoya2";
  }
  
  public cerrarPOpUpOlvidePassword() {
    this.modalService.dismissAll('Cross click');
  }
}

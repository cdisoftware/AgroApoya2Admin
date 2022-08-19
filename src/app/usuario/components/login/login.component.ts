import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../../../core/login.service';
import { MetodosglobalesService } from './../../../core/metodosglobales.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Usuario: string = '';
  Password: string = '';
  IdUsuario: string = '12';

  constructor(public rutas: Router, private servicioslogin: LoginService, private ServiciosGlobales: MetodosglobalesService) { }

  ngOnInit(): void {
  }

  Login() {
    const DatosLogin = {
      USUCODIG: 773,
      CORREO_PERSONA: this.Usuario
    }
    this.servicioslogin.ConsultaUsuario('4', DatosLogin).subscribe(Resultado => {
      console.log(Resultado)
      //if (Resultado.length < 0) {
        //si existe hace asignaciones de variables y reenvio a home
        this.ServiciosGlobales.CrearCookie('IDU', this.IdUsuario);
        this.rutas.navigateByUrl('/home')
      //} else {
        //modal usuario no existe
      //}

    })

    //this.rutas.navigateByUrl('/home')
  }

}

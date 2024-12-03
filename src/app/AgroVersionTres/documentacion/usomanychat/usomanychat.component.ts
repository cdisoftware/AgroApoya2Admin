import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usomanychat',
  templateUrl: './usomanychat.component.html',
  styleUrls: ['./usomanychat.component.css']
})
export class UsomanychatComponent implements OnInit {

  constructor() {
  }

  Auxmenu: string = '1';
 

  ngOnInit(): void {

  }
  BtnEncontrarUsuario (){
    this.Auxmenu = '1';
  }
  BtnEnvioMensajes (){
    this.Auxmenu = '2';
  }
  BtnVariables(){
    this.Auxmenu = '3';
  }
}
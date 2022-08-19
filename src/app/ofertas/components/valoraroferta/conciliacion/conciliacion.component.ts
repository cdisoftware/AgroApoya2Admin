import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-conciliacion',
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.css']
})
export class ConciliacionComponent implements OnInit {

  constructor(public rutas: Router) { }

  ngOnInit(): void {
  }

  Enviar(){
    this.rutas.navigateByUrl('/home/sectorizar')
  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GrupoMillaServices } from 'src/app/core/GrupoMillaServices';

@Component({
  selector: 'app-ultimamillamultientregas',
  templateUrl: './ultimamillamultientregas.component.html',
  styleUrls: ['./ultimamillamultientregas.component.css']
})
export class UltimamillamultientregasComponent  implements OnInit,AfterViewInit {

  constructor(public sevicesmilla: GrupoMillaServices) { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
  }
  
}

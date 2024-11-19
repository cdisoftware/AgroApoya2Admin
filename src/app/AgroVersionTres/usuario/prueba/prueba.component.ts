import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  menuOpen: boolean = true; 


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit(): void {
  }

}

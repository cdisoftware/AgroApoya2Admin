import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  Personajes: any[] = [];
  currentIndex = 0; // Índice del personaje actualmente visible

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://rickandmortyapi.com/api/character').subscribe({
      next: (data) => {
        this.Personajes = data.results; // Accedemos a la lista de personajes
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  btnCarrusel(direction: 'prev' | 'next'): void {
    const total = this.Personajes.length;

    if (direction === 'prev') {
      this.currentIndex = (this.currentIndex - 1 + total) % total;
    } else if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % total;
    }
  }
}

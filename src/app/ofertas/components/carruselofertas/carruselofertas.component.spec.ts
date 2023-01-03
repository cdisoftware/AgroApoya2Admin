import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselofertasComponent } from './carruselofertas.component';

describe('CarruselofertasComponent', () => {
  let component: CarruselofertasComponent;
  let fixture: ComponentFixture<CarruselofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarruselofertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

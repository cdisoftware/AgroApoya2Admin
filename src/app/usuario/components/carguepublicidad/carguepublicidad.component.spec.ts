import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarguepublicidadComponent } from './carguepublicidad.component';

describe('CarguepublicidadComponent', () => {
  let component: CarguepublicidadComponent;
  let fixture: ComponentFixture<CarguepublicidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarguepublicidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarguepublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOfertaPublicaComponent } from './modificar-oferta-publica.component';

describe('ModificarOfertaPublicaComponent', () => {
  let component: ModificarOfertaPublicaComponent;
  let fixture: ComponentFixture<ModificarOfertaPublicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarOfertaPublicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarOfertaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

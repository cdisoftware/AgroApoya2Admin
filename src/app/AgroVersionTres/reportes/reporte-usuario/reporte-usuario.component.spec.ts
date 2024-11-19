import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUsuarioComponent } from './reporte-usuario.component';

describe('ReporteUsuarioComponent', () => {
  let component: ReporteUsuarioComponent;
  let fixture: ComponentFixture<ReporteUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

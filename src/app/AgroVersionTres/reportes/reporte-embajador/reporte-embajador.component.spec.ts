import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEmbajadorComponent } from './reporte-embajador.component';

describe('ReporteEmbajadorComponent', () => {
  let component: ReporteEmbajadorComponent;
  let fixture: ComponentFixture<ReporteEmbajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEmbajadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteEmbajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

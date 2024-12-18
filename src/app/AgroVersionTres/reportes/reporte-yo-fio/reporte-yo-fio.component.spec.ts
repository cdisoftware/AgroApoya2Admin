import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteYoFioComponent } from './reporte-yo-fio.component';

describe('ReporteYoFioComponent', () => {
  let component: ReporteYoFioComponent;
  let fixture: ComponentFixture<ReporteYoFioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteYoFioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteYoFioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteentregasComponent } from './reporteentregas.component';

describe('ReporteentregasComponent', () => {
  let component: ReporteentregasComponent;
  let fixture: ComponentFixture<ReporteentregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteentregasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteentregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

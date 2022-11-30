import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionofertaComponent } from './evaluacionoferta.component';

describe('EvaluacionofertaComponent', () => {
  let component: EvaluacionofertaComponent;
  let fixture: ComponentFixture<EvaluacionofertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionofertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

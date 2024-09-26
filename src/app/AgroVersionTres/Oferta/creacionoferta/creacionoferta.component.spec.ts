import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionofertaComponent } from './creacionoferta.component';

describe('CreacionofertaComponent', () => {
  let component: CreacionofertaComponent;
  let fixture: ComponentFixture<CreacionofertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionofertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

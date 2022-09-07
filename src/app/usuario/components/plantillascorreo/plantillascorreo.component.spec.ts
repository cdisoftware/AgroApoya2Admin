import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillascorreoComponent } from './plantillascorreo.component';

describe('PlantillascorreoComponent', () => {
  let component: PlantillascorreoComponent;
  let fixture: ComponentFixture<PlantillascorreoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillascorreoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillascorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

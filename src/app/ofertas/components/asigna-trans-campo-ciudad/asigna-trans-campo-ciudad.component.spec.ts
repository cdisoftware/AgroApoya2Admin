import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaTransCampoCiudadComponent } from './asigna-trans-campo-ciudad.component';

describe('AsignaTransCampoCiudadComponent', () => {
  let component: AsignaTransCampoCiudadComponent;
  let fixture: ComponentFixture<AsignaTransCampoCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaTransCampoCiudadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaTransCampoCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

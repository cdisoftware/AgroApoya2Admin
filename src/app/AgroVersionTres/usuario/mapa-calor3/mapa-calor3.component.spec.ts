import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaCalor3Component } from './mapa-calor3.component';

describe('MapaCalor3Component', () => {
  let component: MapaCalor3Component;
  let fixture: ComponentFixture<MapaCalor3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaCalor3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaCalor3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

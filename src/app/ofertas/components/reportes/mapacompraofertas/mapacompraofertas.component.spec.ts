import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapacompraofertasComponent } from './mapacompraofertas.component';

describe('MapacompraofertasComponent', () => {
  let component: MapacompraofertasComponent;
  let fixture: ComponentFixture<MapacompraofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapacompraofertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapacompraofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

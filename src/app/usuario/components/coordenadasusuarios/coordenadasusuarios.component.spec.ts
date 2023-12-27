import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordenadasusuariosComponent } from './coordenadasusuarios.component';

describe('CoordenadasusuariosComponent', () => {
  let component: CoordenadasusuariosComponent;
  let fixture: ComponentFixture<CoordenadasusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordenadasusuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordenadasusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

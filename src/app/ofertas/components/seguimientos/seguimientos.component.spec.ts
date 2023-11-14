import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientosComponent } from './seguimientos.component';

describe('SeguimientosComponent', () => {
  let component: SeguimientosComponent;
  let fixture: ComponentFixture<SeguimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

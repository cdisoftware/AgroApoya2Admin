import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarofertaComponent } from './buscaroferta.component';

describe('BuscarofertaComponent', () => {
  let component: BuscarofertaComponent;
  let fixture: ComponentFixture<BuscarofertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarofertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

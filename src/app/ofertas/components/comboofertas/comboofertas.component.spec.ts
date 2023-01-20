import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboofertasComponent } from './comboofertas.component';

describe('ComboofertasComponent', () => {
  let component: ComboofertasComponent;
  let fixture: ComponentFixture<ComboofertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboofertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboofertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasmapsComponent } from './pruebasmaps.component';

describe('PruebasmapsComponent', () => {
  let component: PruebasmapsComponent;
  let fixture: ComponentFixture<PruebasmapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebasmapsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebasmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

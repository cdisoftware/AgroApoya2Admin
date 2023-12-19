import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepEntregasComponent } from './rep-entregas.component';

describe('RepEntregasComponent', () => {
  let component: RepEntregasComponent;
  let fixture: ComponentFixture<RepEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepEntregasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

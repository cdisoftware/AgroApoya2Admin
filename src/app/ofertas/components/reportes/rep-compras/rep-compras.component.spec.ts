import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepComprasComponent } from './rep-compras.component';

describe('RepComprasComponent', () => {
  let component: RepComprasComponent;
  let fixture: ComponentFixture<RepComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepComprasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

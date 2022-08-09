import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsiliacionComponent } from './consiliacion.component';

describe('ConsiliacionComponent', () => {
  let component: ConsiliacionComponent;
  let fixture: ComponentFixture<ConsiliacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsiliacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

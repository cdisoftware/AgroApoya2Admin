import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepusuariosComponent } from './repusuarios.component';

describe('RepusuariosComponent', () => {
  let component: RepusuariosComponent;
  let fixture: ComponentFixture<RepusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepusuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

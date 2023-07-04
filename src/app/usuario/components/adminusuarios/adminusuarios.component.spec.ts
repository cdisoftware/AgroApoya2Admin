import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminusuariosComponent } from './adminusuarios.component';

describe('AdminusuariosComponent', () => {
  let component: AdminusuariosComponent;
  let fixture: ComponentFixture<AdminusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminusuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

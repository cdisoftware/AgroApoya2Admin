import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsectoresComponent } from './adminsectores.component';

describe('AdminsectoresComponent', () => {
  let component: AdminsectoresComponent;
  let fixture: ComponentFixture<AdminsectoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminsectoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

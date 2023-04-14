import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUltMillaComponent } from './admin-ult-milla.component';

describe('AdminUltMillaComponent', () => {
  let component: AdminUltMillaComponent;
  let fixture: ComponentFixture<AdminUltMillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUltMillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUltMillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

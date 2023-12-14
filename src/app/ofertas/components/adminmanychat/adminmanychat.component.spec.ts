import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanychatComponent } from './adminmanychat.component';

describe('AdminmanychatComponent', () => {
  let component: AdminmanychatComponent;
  let fixture: ComponentFixture<AdminmanychatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminmanychatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmanychatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

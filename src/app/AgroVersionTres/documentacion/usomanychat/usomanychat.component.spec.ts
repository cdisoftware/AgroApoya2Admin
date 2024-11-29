import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsomanychatComponent } from './usomanychat.component';

describe('UsomanychatComponent', () => {
  let component: UsomanychatComponent;
  let fixture: ComponentFixture<UsomanychatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsomanychatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsomanychatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

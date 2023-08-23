import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManychatComponent } from './manychat.component';

describe('ManychatComponent', () => {
  let component: ManychatComponent;
  let fixture: ComponentFixture<ManychatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManychatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManychatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosmanychatComponent } from './enviosmanychat.component';

describe('EnviosmanychatComponent', () => {
  let component: EnviosmanychatComponent;
  let fixture: ComponentFixture<EnviosmanychatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviosmanychatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviosmanychatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

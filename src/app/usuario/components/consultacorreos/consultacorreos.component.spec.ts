import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultacorreosComponent } from './consultacorreos.component';

describe('ConsultacorreosComponent', () => {
  let component: ConsultacorreosComponent;
  let fixture: ComponentFixture<ConsultacorreosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultacorreosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultacorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

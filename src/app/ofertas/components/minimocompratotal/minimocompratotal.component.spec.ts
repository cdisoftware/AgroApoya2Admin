import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimocompratotalComponent } from './minimocompratotal.component';

describe('MinimocompratotalComponent', () => {
  let component: MinimocompratotalComponent;
  let fixture: ComponentFixture<MinimocompratotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimocompratotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimocompratotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

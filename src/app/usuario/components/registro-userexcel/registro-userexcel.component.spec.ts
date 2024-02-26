import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUserexcelComponent } from './registro-userexcel.component';

describe('RegistroUserexcelComponent', () => {
  let component: RegistroUserexcelComponent;
  let fixture: ComponentFixture<RegistroUserexcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUserexcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUserexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

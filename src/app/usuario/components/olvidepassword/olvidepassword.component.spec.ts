import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidepasswordComponent } from './olvidepassword.component';

describe('OlvidepasswordComponent', () => {
  let component: OlvidepasswordComponent;
  let fixture: ComponentFixture<OlvidepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlvidepasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlvidepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

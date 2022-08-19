import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutprincipalComponent } from './layoutprincipal.component';

describe('LayoutprincipalComponent', () => {
  let component: LayoutprincipalComponent;
  let fixture: ComponentFixture<LayoutprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutprincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorizacionComponent } from './sectorizacion.component';

describe('SectorizacionComponent', () => {
  let component: SectorizacionComponent;
  let fixture: ComponentFixture<SectorizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

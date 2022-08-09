import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportistaComponent } from './transportista.component';

describe('TransportistaComponent', () => {
  let component: TransportistaComponent;
  let fixture: ComponentFixture<TransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

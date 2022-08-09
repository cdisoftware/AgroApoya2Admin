import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearofertaComponent } from './crearoferta.component';

describe('CrearofertaComponent', () => {
  let component: CrearofertaComponent;
  let fixture: ComponentFixture<CrearofertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearofertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

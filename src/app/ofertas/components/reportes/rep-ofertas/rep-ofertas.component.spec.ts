import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepOfertasComponent } from './rep-ofertas.component';

describe('RepOfertasComponent', () => {
  let component: RepOfertasComponent;
  let fixture: ComponentFixture<RepOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepOfertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

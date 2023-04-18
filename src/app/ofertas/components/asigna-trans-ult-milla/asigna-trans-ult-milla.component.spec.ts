import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaTransUltMillaComponent } from './asigna-trans-ult-milla.component';

describe('AsignaTransUltMillaComponent', () => {
  let component: AsignaTransUltMillaComponent;
  let fixture: ComponentFixture<AsignaTransUltMillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaTransUltMillaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaTransUltMillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

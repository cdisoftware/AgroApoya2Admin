import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviocorreosComponent } from './enviocorreos.component';

describe('EnviocorreosComponent', () => {
  let component: EnviocorreosComponent;
  let fixture: ComponentFixture<EnviocorreosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviocorreosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviocorreosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosmsofertaComponent } from './enviosmsoferta.component';

describe('EnviosmsofertaComponent', () => {
  let component: EnviosmsofertaComponent;
  let fixture: ComponentFixture<EnviosmsofertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviosmsofertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviosmsofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

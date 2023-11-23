import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicarofertaComponent } from './duplicaroferta.component';

describe('DuplicarofertaComponent', () => {
  let component: DuplicarofertaComponent;
  let fixture: ComponentFixture<DuplicarofertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuplicarofertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuplicarofertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

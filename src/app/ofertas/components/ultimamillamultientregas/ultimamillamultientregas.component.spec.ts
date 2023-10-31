import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimamillamultientregasComponent } from './ultimamillamultientregas.component';

describe('UltimamillamultientregasComponent', () => {
  let component: UltimamillamultientregasComponent;
  let fixture: ComponentFixture<UltimamillamultientregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltimamillamultientregasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimamillamultientregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

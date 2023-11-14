import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapacalorComponent } from './mapacalor.component';

describe('MapacalorComponent', () => {
  let component: MapacalorComponent;
  let fixture: ComponentFixture<MapacalorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapacalorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapacalorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

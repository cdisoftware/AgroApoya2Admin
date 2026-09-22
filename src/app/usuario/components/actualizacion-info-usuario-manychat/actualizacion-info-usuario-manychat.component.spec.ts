import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionInfoUsuarioManychatComponent } from './actualizacion-info-usuario-manychat.component';

describe('ActualizacionInfoUsuarioManychatComponent', () => {
  let component: ActualizacionInfoUsuarioManychatComponent;
  let fixture: ComponentFixture<ActualizacionInfoUsuarioManychatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizacionInfoUsuarioManychatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionInfoUsuarioManychatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaqueteDetallePage } from './paquete-detalle.page';

describe('PaqueteDetallePage', () => {
  let component: PaqueteDetallePage;
  let fixture: ComponentFixture<PaqueteDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaqueteDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

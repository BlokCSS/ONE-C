import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepartidorDetallePage } from './repartidor-detalle.page';

describe('RepartidorDetallePage', () => {
  let component: RepartidorDetallePage;
  let fixture: ComponentFixture<RepartidorDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RepartidorDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeDepotComponent } from './vehicule-depot.component';

describe('VehiculeDepotComponent', () => {
  let component: VehiculeDepotComponent;
  let fixture: ComponentFixture<VehiculeDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeDepotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

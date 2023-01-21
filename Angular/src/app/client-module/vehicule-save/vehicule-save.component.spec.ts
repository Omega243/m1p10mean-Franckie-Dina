import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeSaveComponent } from './vehicule-save.component';

describe('VehiculeSaveComponent', () => {
  let component: VehiculeSaveComponent;
  let fixture: ComponentFixture<VehiculeSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

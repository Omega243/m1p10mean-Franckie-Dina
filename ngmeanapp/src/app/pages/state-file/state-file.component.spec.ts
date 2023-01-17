import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFileComponent } from './state-file.component';

describe('StateFileComponent', () => {
  let component: StateFileComponent;
  let fixture: ComponentFixture<StateFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

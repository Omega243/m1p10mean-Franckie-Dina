import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonReceptionComponent } from './non-reception.component';

describe('NonReceptionComponent', () => {
  let component: NonReceptionComponent;
  let fixture: ComponentFixture<NonReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

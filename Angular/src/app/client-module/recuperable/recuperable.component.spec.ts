import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperableComponent } from './recuperable.component';

describe('RecuperableComponent', () => {
  let component: RecuperableComponent;
  let fixture: ComponentFixture<RecuperableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

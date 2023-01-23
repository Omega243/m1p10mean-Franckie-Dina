import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenteRecuperationComponent } from './attente-recuperation.component';

describe('AttenteRecuperationComponent', () => {
  let component: AttenteRecuperationComponent;
  let fixture: ComponentFixture<AttenteRecuperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttenteRecuperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttenteRecuperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

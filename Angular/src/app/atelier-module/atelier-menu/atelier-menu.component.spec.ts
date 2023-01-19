import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelierMenuComponent } from './atelier-menu.component';

describe('AtelierMenuComponent', () => {
  let component: AtelierMenuComponent;
  let fixture: ComponentFixture<AtelierMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtelierMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtelierMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

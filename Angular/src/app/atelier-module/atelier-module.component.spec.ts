import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelierModuleComponent } from './atelier-module.component';

describe('AtelierModuleComponent', () => {
  let component: AtelierModuleComponent;
  let fixture: ComponentFixture<AtelierModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtelierModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtelierModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

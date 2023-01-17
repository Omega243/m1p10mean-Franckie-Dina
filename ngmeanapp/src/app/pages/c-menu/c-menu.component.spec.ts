import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMenuComponent } from './c-menu.component';

describe('CMenuComponent', () => {
  let component: CMenuComponent;
  let fixture: ComponentFixture<CMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

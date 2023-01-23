import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanMensuelComponent } from './bilan-mensuel.component';

describe('BilanMensuelComponent', () => {
  let component: BilanMensuelComponent;
  let fixture: ComponentFixture<BilanMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanMensuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilanMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreJournalierComponent } from './chiffre-journalier.component';

describe('ChiffreJournalierComponent', () => {
  let component: ChiffreJournalierComponent;
  let fixture: ComponentFixture<ChiffreJournalierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiffreJournalierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiffreJournalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvAddDialogComponent } from './csv-add-dialog.component';

describe('CsvAddDialogComponent', () => {
  let component: CsvAddDialogComponent;
  let fixture: ComponentFixture<CsvAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CsvAddDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

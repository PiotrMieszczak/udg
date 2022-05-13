import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CsvTableComponent } from './csv-table.component';

describe('CsvTableComponent', () => {
  let spectator: Spectator<CsvTableComponent>;
  const createComponent = createComponentFactory(CsvTableComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

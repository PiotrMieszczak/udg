import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CsvWrapperComponent } from './csv-wrapper.component';

describe('CsvWrapperComponent', () => {
  let spectator: Spectator<CsvWrapperComponent>;
  const createComponent = createComponentFactory(CsvWrapperComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

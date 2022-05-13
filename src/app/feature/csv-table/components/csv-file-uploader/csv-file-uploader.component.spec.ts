import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CsvFileUploaderComponent } from './csv-file-uploader.component';

describe('CsvFileUploaderComponent', () => {
  let spectator: Spectator<CsvFileUploaderComponent>;
  const createComponent = createComponentFactory(CsvFileUploaderComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

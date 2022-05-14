import { CsvActionsComponent } from './csv-actions.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

describe('CsvActionsComponent', () => {
  let spectator: Spectator<CsvActionsComponent>;
  const createComponent = createComponentFactory({
    component: CsvActionsComponent,
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});

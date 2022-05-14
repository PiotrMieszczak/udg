import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { CsvAddDialogComponent } from './csv-add-dialog.component';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiDialogContext } from '@taiga-ui/core';
import { Article } from '../../state/csv-table.model';

describe('CsvAddDialogComponent', () => {
  let spectator: Spectator<CsvAddDialogComponent>;
  let context: TuiDialogContext<boolean | Article>;

  const createComponent = createComponentFactory({
    component: CsvAddDialogComponent,
    imports: [ReactiveFormsModule, TuiInputModule],
    providers: [
      {
        provide: POLYMORPHEUS_CONTEXT,
        useValue: { completeWith: jest.fn() },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    // @ts-ignore
    context = spectator.inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
      boolean | Article
    >;
  });

  it('should create component with form ', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.form).toBeTruthy();
  });

  it('should close dialog on dismiss ', () => {
    const spy = jest.spyOn(context, 'completeWith');
    spectator.component.dismiss();

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should send data to parent component ', () => {
    const spy = jest.spyOn(context, 'completeWith');
    spectator.component.addData();

    expect(spy).toHaveBeenCalledWith(spectator.component.form.getRawValue());
  });
});

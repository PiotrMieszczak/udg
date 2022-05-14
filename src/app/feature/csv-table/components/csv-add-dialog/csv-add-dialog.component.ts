import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Article } from '../../state/csv-table.model';

@Component({
  selector: 'app-csv-add-dialog',
  templateUrl: './csv-add-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsvAddDialogComponent {
  form: FormGroup;
  get shouldAddBeDisabled(): boolean {
    return Object.values(this.form.getRawValue()).some((value) => !!value);
  }

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<boolean | Article>,
    private readonly _fb: FormBuilder
  ) {
    this.form = this.createForm();
  }

  dismiss(): void {
    this._context.completeWith(false);
  }

  addData(): void {
    const newArtikle = new Article(this.form.getRawValue());
    this._context.completeWith(newArtikle);
  }

  private createForm(): FormGroup {
    return this._fb.group({
      hauptartikelnr: new FormControl(''),
      artikelname: new FormControl(''),
      hersteller: new FormControl(''),
      beschreibung: new FormControl(''),
      materialangaben: new FormControl(''),
      geschlecht: new FormControl(''),
      produktart: new FormControl(''),
      ärmel: new FormControl(''),
      bein: new FormControl(''),
      kragen: new FormControl(''),
      herstellung: new FormControl(''),
      taschenart: new FormControl(''),
      grammatur: new FormControl(''),
      material: new FormControl(''),
      ursprungsland: new FormControl(''),
      bildname: new FormControl(''),
    });
  }
}

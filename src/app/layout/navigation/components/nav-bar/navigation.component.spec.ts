import { NavigationComponent } from './navigation.component';
import {
  byText,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { TuiTabsModule } from '@taiga-ui/kit';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavigationComponent', () => {
  let spectator: Spectator<NavigationComponent>;

  const createComponent = createComponentFactory({
    component: NavigationComponent,
    imports: [TuiTabsModule, RouterTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should to have navigation to csv editor', () => {
    const csvEditorLink = spectator.queryAll(RouterLinkWithHref)[0];

    expect(csvEditorLink.href).toEqual('/csv-editor');
  });

  it('should to have navigation to charts', () => {
    const csvEditorLink = spectator.queryAll(RouterLinkWithHref)[1];

    expect(csvEditorLink.href).toEqual('/charts');
  });
});

import { Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { FormControlName, FormGroupName } from '@angular/forms';
import { I18NEXT_NAMESPACE } from 'angular-i18next';

import { ValidationMessageComponent } from '../../components/ValidationMessageComponent';

@Component({
    selector: 'i18next-validation-message',
    template: `
      <div class="error-container">{{ i18nextKey | i18nextCap: firstMessage.params }}</div>
    `,
    styles: [`
      i18next-validation-message {
        display: none;
        width: 100%;
        position: relative;
      }
      i18next-validation-message.standalone,
      .ng-dirty.ng-invalid + i18next-validation-message {
        display: block;
      }
    `],
    encapsulation: ViewEncapsulation.None
})
export class I18NextValidationMessageComponent extends ValidationMessageComponent {

  private VALIDATION: string = 'validation';

  constructor(
    @Inject(I18NEXT_NAMESPACE) private i18nextNamespace: string | string[],
    @Optional() public formControlName: FormControlName,
    @Optional() public formGroupName: FormGroupName
  ) {
    super(formControlName, formGroupName);
  }

  get i18nextKey(): string | string[] {
    if (!this.firstMessage.key)
      return '';

    let specificKey = [this.VALIDATION, ['control_specific', this.controlPath, this.firstMessage.key].join('.')].join(':');
    let commonKey = [this.VALIDATION, this.firstMessage.key].join(':');

    let i18nextKeys = [];

    if (this.i18nextNamespace && this.i18nextNamespace !== this.VALIDATION)
    {
      i18nextKeys.push([this.i18nextNamespace, specificKey].join('.'));
      i18nextKeys.push([this.i18nextNamespace, commonKey].join('.'));
    }
    i18nextKeys.push(specificKey);
    i18nextKeys.push(commonKey);

    return i18nextKeys;
  }
}

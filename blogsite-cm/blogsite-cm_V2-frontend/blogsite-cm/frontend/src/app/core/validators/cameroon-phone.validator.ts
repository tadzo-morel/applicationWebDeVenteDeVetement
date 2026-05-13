import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const CM_PHONE_REGEX = /^\+237[26][0-9]{8}$/;

export function normalizeCmPhone(input: string): string {
  if (!input) return input;
  let digits = input.replace(/[\s\-.()]/g, '').trim();
  if (digits.startsWith('00237')) {
    digits = '+' + digits.substring(2);
  } else if (digits.startsWith('237')) {
    digits = '+' + digits;
  } else if (digits.startsWith('0')) {
    digits = '+237' + digits.substring(1);
  } else if (!digits.startsWith('+')) {
    digits = '+237' + digits;
  }
  return digits;
}

export const cameroonPhoneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as string;
  if (!value) return null;
  const normalized = normalizeCmPhone(value);
  return CM_PHONE_REGEX.test(normalized) ? null : { cameroonPhone: true };
};

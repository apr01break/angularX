import { AbstractControl } from '@angular/forms';
export function dateReleaseValidator(control: AbstractControl) {
  if (control.value === null || control.value === '') {
    return null; 
  }
  const selectedDate = new Date(control.value);
  const today = new Date();

  if (selectedDate >= today) {
    return null;
  } else {
    return { dateNotEqualOrHigherThanToday: true };
  }
}
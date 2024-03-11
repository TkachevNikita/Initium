import {AbstractControl} from '@angular/forms';

export function phoneValidator(control: AbstractControl): {invalidPhone: boolean} | null {
    const phoneNumberRegex = /^\+7\d{10}$/;

    if (!control.value) {
        return null;
    }

    if (phoneNumberRegex.test(control.value)) {
        return null;
    } else {
        return { invalidPhone: true };
    }
}

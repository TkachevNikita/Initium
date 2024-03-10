import {Component, forwardRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: 'ICheckbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() checked = false;

    private _onTouched: () => void = () => {};
    public onChange: (value: boolean) => void = () => {};

    writeValue(value: any): void {
        this.checked = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setChecked(value: boolean): void {
        this.checked = value;
        this.onChange(this.checked);
    }

    onCheckboxChange(event: any): void {
        this.setChecked(event.target.checked);
    }

    onTouched(): void {
        this._onTouched();
    }

}

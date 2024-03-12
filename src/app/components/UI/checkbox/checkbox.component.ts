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
    @Input() public checked: boolean = false;
    @Input() indeterminate: boolean = false;

    private _onTouched: () => void = () => {};
    public onChange: (value: boolean) => void = () => {};

    public writeValue(value: boolean): void {
        this.checked = value;
    }

    public registerOnChange(fn: (value: boolean) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    public setChecked(value: boolean): void {
        this.checked = value;
        this.onChange(this.checked);
    }

    public onCheckboxChange(event: any): void {
        this.setChecked(event.target.checked);
    }

    public onTouched(): void {
        this._onTouched();
    }

}

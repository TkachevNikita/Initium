import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    selector: 'IButton',
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class ButtonComponent implements AfterViewInit {
    @Input() public variant!: string;
    @Input() public disabled!: boolean;
    @ViewChild('buttonElement') public buttonElement!: ElementRef;

    public ngAfterViewInit() {
        switch (this.variant) {
            case 'basic':
                this.buttonElement.nativeElement.classList.add('button__basic');
                return;
            case 'primary':
                this.buttonElement.nativeElement.classList.add('button__primary');
                return;
            default:
                this.buttonElement.nativeElement.classList.add('button__basic');
                return;
        }
    }
}

import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class IconButtonComponent {
    @Input() public disabled!: boolean;
    @Input() public type!: string;

}

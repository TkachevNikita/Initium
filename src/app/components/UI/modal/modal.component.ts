import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentPortal} from "@angular/cdk/portal";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input() contentPortal!: ComponentPortal<any>;
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    public setPortal(portal: ComponentPortal<any>) {
        this.contentPortal = portal;
    }

    public onClose() {
        this.close.emit();
    }
}

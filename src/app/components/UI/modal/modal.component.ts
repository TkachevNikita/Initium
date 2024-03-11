import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentPortal} from "@angular/cdk/portal";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    animations: [
        trigger('modalAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.8)' }),
                animate('300ms ease-in', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
            transition(':leave', [
                animate('300ms ease-out', style({ opacity: 0, transform: 'scale(0.8)' })),
            ]),
        ])
    ]
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

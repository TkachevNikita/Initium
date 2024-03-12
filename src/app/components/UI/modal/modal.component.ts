import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ComponentPortal} from "@angular/cdk/portal";
import {animate, style, transition, trigger} from "@angular/animations";
import {ClientModel} from "../../../models/client.model";

export interface ModalData {
    title: string;
    type: string;
    client?: ClientModel
    selectedClients?: ClientModel[]
}

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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
    @Input() contentPortal!: ComponentPortal<any>;
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    @HostListener('document:keydown.escape', ['$event'])
    public onEscKeydown(): void {
        this.onClose();
    }

    public setPortal(portal: ComponentPortal<any>): void {
        this.contentPortal = portal;
    }

    public onOverlayClick(event: MouseEvent): void {
        if (event.target === event.currentTarget) {
            this.onClose();
        }
    }
    private onClose(): void {
        this.close.emit();
    }
}

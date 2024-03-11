import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentPortal} from "@angular/cdk/portal";
import {animate, style, transition, trigger} from "@angular/animations";
import {Subject} from "rxjs";
import {ClientModel} from "../../../models/client.model";

export interface ModalData {
    title: string;
    type: string;
    client?: ClientModel
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
    ]
})
export class ModalComponent {
    public data$: Subject<ModalData> = new Subject<ModalData>();
    @Input() contentPortal!: ComponentPortal<any>;
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    public setPortal(portal: ComponentPortal<any>) {
        this.contentPortal = portal;
    }

    public setData(data: ModalData): void {
        this.data$.next(data);
    }

    public onClose() {
        this.close.emit();
    }
}

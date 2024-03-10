import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalComponent } from '../components/UI/modal/modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(private _overlay: Overlay) {}

    openModal(component: any) {
        const overlayRef = this._overlay.create();
        const portal = new ComponentPortal(ModalComponent);
        const modalComponentRef = overlayRef.attach(portal);

        const modalContentPortal = new ComponentPortal(component);
        modalComponentRef.instance.setPortal(modalContentPortal);

        modalComponentRef.instance.close.subscribe(() => {
            overlayRef.dispose();
        });
    }
}

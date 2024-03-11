import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ModalComponent } from '../components/UI/modal/modal.component';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private _overlayRef!: OverlayRef;

    constructor(private overlay: Overlay) {}

    openModal(component: any) {
        this._overlayRef = this.overlay.create();
        const portal = new ComponentPortal(ModalComponent);
        const modalComponentRef = this._overlayRef.attach(portal);

        const modalContentPortal = new ComponentPortal(component);
        modalComponentRef.instance.setPortal(modalContentPortal);

        modalComponentRef.instance.close.subscribe(() => {
            this.closeModal();
        });
    }

    closeModal() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }
}

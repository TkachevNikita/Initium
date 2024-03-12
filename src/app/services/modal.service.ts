import { Injectable, OnDestroy} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {ModalComponent, ModalData} from '../components/UI/modal/modal.component';
import {BehaviorSubject, Subject, takeUntil} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModalService implements OnDestroy {
    private _overlayRef!: OverlayRef;
    private _subscription$: Subject<void> = new Subject<void>();
    private _data$: BehaviorSubject<ModalData> = new BehaviorSubject<ModalData>({title: '', type: ''});
    constructor(private overlay: Overlay) {}

    public openModal(component: any, data: ModalData) {
        this._overlayRef = this.overlay.create();
        const portal = new ComponentPortal(ModalComponent);
        const modalComponentRef = this._overlayRef.attach(portal);

        const modalContentPortal = new ComponentPortal(component);
        modalComponentRef.instance.setPortal(modalContentPortal);
        this.setFormData(data);

        modalComponentRef.instance.close.pipe(takeUntil(this._subscription$)).subscribe(() => {
            this.closeModal();
        });
    }

    public setFormData(data: ModalData) {
        this._data$.next(data);
    }

    public getFormData(): ModalData {
        return this._data$.getValue();
    }

    public closeModal() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    public ngOnDestroy() {
        this._subscription$.unsubscribe();
    }
}

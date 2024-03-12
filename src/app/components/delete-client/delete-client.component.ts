import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {ClientsService} from "../../services/clients.service";
import {ModalService} from "../../services/modal.service";

@Component({
    templateUrl: './delete-client.component.html',
    styleUrls: ['./delete-client.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteClientComponent implements OnInit {
    public deleteCount: number = 0;

    constructor(
        private _clientsService: ClientsService,
        private _modalService: ModalService
    ) { }

    public ngOnInit() {
        this.deleteCount = this._modalService.getFormData().selectedClients!.length;
    }

    public cancelModal(): void {
        this._modalService.closeModal();
    }

    public deleteClients(): void {
        this._clientsService.deleteClients(this._modalService.getFormData().selectedClients!);
        this._modalService.closeModal();
    }
}

import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CheckboxComponent} from "../UI/checkbox/checkbox.component";
import {ClientModel} from "../../models/client.model";
import {BehaviorSubject} from "rxjs";
import {IconButtonComponent} from "../UI/icon-button/icon-button.component";
import {ModalService} from "../../services/modal.service";
import {NewClientFormComponent} from "../forms/new-client-form.component";
import {ClientsService} from "../../services/clients.service";
import {DeleteClientComponent} from "../delete-client/delete-client.component";

@Component({
    selector: 'ITable',
    templateUrl: './clients-table.component.html',
    styleUrls: ['./clients-table.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        CheckboxComponent,
        IconButtonComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsTableComponent {
    @Input() public data$!: BehaviorSubject<ClientModel[]>;
    constructor(private _modalService: ModalService, private _service: ClientsService) {  }

    public toggleAll(): void {
        const allSelected = this.isAnyChecked();

        this.data$.next(
            this.data$.getValue().map((client: ClientModel) => {
                client.selected = !allSelected;
                return client;
            })
        );
    }

    public isAnyChecked(): boolean {
        return this.data$.getValue().some((client: ClientModel) => client.selected);
    }

    public openDeleteModal() {
        this._modalService.openModal(DeleteClientComponent, {
            title: 'Удаление строк',
            type: 'delete',
            selectedClients: this.data$.getValue().filter((client: ClientModel) => client.selected)
        });
    }

    public openEditModal(client: ClientModel): void {
        this._modalService.openModal(NewClientFormComponent, {title: 'Редактирование', type: 'edit', client: client});
    }

    public openAddModal(): void {
        this._modalService.openModal(NewClientFormComponent, {title: 'Новый клиент', type: 'create'});
    }
}

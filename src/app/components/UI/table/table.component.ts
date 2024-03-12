import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {ClientModel} from "../../../models/client.model";
import {BehaviorSubject} from "rxjs";
import {IconButtonComponent} from "../icon-button/icon-button.component";
import {ModalService} from "../../../services/modal.service";
import {NewClientFormComponent} from "../../forms/new-client-form.component";
import {ClientsService} from "../../../services/clients.service";

@Component({
    selector: 'ITable',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        CheckboxComponent,
        IconButtonComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    @Input() public data$!: BehaviorSubject<ClientModel[]>;
    constructor(private _modalService: ModalService, private _service: ClientsService) {  }

    public openDeleteModal() {
        this._service.deleteClients(this.data$.getValue().filter((client: ClientModel) => client.selected))
    }

    public openEditModal(client: ClientModel): void {
        this._modalService.openModal(NewClientFormComponent, {title: 'Редактирование', type: 'edit', client: client});
    }

    public openAddModal(): void {
        this._modalService.openModal(NewClientFormComponent, {title: 'Новый клиент', type: 'create'});
    }
}

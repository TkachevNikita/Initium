import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CheckboxComponent} from "../checkbox/checkbox.component";
import {ClientModel} from "../../../models/client.model";
import {BehaviorSubject} from "rxjs";
import {IconButtonComponent} from "../icon-button/icon-button.component";
import {ModalService} from "../../../services/modal.service";
import {NewClientFormComponent} from "../../forms/new-client-form.component";

@Component({
    selector: 'ITable',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        CheckboxComponent,
        IconButtonComponent
    ]
})
export class TableComponent {
    @Input() public data$!: BehaviorSubject<ClientModel[]>;

    constructor(private _modalService: ModalService) { }

    public openAddModal() {
        this._modalService.openModal(NewClientFormComponent);
    }
}

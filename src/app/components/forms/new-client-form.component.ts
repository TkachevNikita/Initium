import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {phoneValidator} from "./validators/phone.validator";
import {ClientsService} from "../../services/clients.service";

@Component({
    selector: 'app-new-client-form',
    templateUrl: './new-client-form.component.html',
    styleUrls: ['./new-client-form.component.scss']
})
export class NewClientFormComponent {
    public form: FormGroup;

    constructor(private _modalService: ModalService, private _clientsService: ClientsService) {
        this.form = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            surname: new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
            phone: new FormControl('', [
                Validators.required,
                phoneValidator
            ])
        })
    }

    public addClient(): void {
        this._clientsService.addClient(this.form.value)
        this.cancelModal();
    }

    public cancelModal(): void {
        this._modalService.closeModal();
    }
}

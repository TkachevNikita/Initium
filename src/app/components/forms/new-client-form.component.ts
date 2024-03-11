import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {phoneValidator} from "./validators/phone.validator";
import {ClientsService} from "../../services/clients.service";

@Component({
    selector: 'app-new-client-form',
    templateUrl: './new-client-form.component.html',
    styleUrls: ['./new-client-form.component.scss']
})
export class NewClientFormComponent implements OnInit {
    public form: FormGroup;
    public title!: string;
    public type!: string;

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

    public ngOnInit(): void {
        this.title = this._modalService.getFormData().title;
        this.type = this._modalService.getFormData().type;
        if (this._modalService.getFormData().type === 'edit') {
            this.form.controls['name'].setValue(this._modalService.getFormData().client!.name);
            this.form.controls['surname'].setValue(this._modalService.getFormData().client!.surname);
            this.form.controls['email'].setValue(this._modalService.getFormData().client!.email);
            this.form.controls['phone'].setValue(this._modalService.getFormData().client!.phone);
        }
    }

    public editClient() {
        this._clientsService.editClient(this._modalService.getFormData().client!, this.form.value);
        this.cancelModal();
    }

    public addClient(): void {
        this._clientsService.addClient(this.form.value);
        this.cancelModal();
    }

    public cancelModal(): void {
        this._modalService.closeModal();
    }
}

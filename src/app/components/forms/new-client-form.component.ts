import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";

@Component({
    selector: 'app-new-client-form',
    templateUrl: './new-client-form.component.html',
    styleUrls: ['./new-client-form.component.scss']
})
export class NewClientFormComponent {
    public form: FormGroup;

    constructor(private _modalService: ModalService) {
        this.form = new FormGroup({
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            surname: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            phone: new FormControl('', Validators.required)
        })
    }

    public cancelModal(): void {
        this._modalService.closeModal();
    }
}

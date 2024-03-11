import {Component, OnInit} from "@angular/core";
import {ClientsService} from "../../services/clients.service";
import {BehaviorSubject} from "rxjs";
import {ClientModel} from "../../models/client.model";

@Component({
    selector: 'app-contacts',
    templateUrl: './client-page.component.html',
    styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {
    public clients$: BehaviorSubject<ClientModel[]> = new BehaviorSubject<ClientModel[]>([]);
    constructor(private _clientsService: ClientsService) { }

    public ngOnInit() {
        this._clientsService.getClients()
            .subscribe(
                (clients: ClientModel[])  => this.clients$.next(clients)
            )
    }
}

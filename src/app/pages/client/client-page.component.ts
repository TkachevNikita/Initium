import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {ClientsService} from "../../services/clients.service";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {ClientModel} from "../../models/client.model";

@Component({
    selector: 'app-contacts',
    templateUrl: './client-page.component.html',
    styleUrls: ['./client-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientPageComponent implements OnInit, OnDestroy {
    public clients$: BehaviorSubject<ClientModel[]> = new BehaviorSubject<ClientModel[]>([]);
    private _subscription$: Subject<void> = new Subject<void>();

    constructor(private _clientsService: ClientsService) { }

    public ngOnInit() {
        this._clientsService.getClients();
        this._clientsService.clients$
            .pipe(
                takeUntil(this._subscription$)
            )
            .subscribe({
                next: (clients: ClientModel[]) => this.clients$.next(clients)
            });
    }

    public ngOnDestroy() {
        this._subscription$.unsubscribe();
    }
}

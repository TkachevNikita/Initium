import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroment";
import {IClient} from "../interfaces/client.interface";
import {BehaviorSubject, map, Observable, Subject, takeUntil} from "rxjs";
import {ClientModel} from "../models/client.model";
import {UserDto} from "../interfaces/dto/user.dto";

@Injectable()
export class ClientsService implements OnDestroy {
    public clients$: BehaviorSubject<ClientModel[]> = new BehaviorSubject<ClientModel[]>([]);
    private _subscription$: Subject<void> = new Subject<void>();

    constructor(private _http: HttpClient) { }

    public addClient(client: ClientModel): void {
        if (localStorage.getItem('clients')) {
            localStorage.setItem('clients', JSON.stringify([...JSON.parse(localStorage.getItem('clients')!), client]));
        } else {
            localStorage.setItem('clients', JSON.stringify([client]));
        }

        this.getClients();
    }

    public getClients(): void {
        this.requestClients()
            .pipe(
                takeUntil(this._subscription$),
                map((response: UserDto) => [...response.users, ...this.getStorageClients()].map((client: IClient) => {
                    return new ClientModel(client);
                }))
            )
            .subscribe((clients) => this.clients$.next(clients));
    }

    private getStorageClients(): IClient[] {
        return localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')!) : [];
    }

    private requestClients(): Observable<UserDto> {
        return this._http.get<UserDto>(`${environment.apiUrl}/task1`);
    }

    public ngOnDestroy() {
        this._subscription$.unsubscribe();
    }
}

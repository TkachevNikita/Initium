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
        const clients: IClient[] = this.getStorageClients();
        clients.push(client);
        localStorage.setItem('clients', JSON.stringify(clients)); // Сохраняем список с новым клиентом
        this.clients$.next(clients);
    }

    public getClients(): void {
        this.requestClients()
            .pipe(
                takeUntil(this._subscription$),
                map((response: UserDto) => {
                    const serverClients: ClientModel[] = response.users.map((client: IClient) => new ClientModel(client));
                    const deletedClients: IClient[] = this.getStorageDeletedClients();

                    // Фильтруем удаленных клиентов из списка с сервера
                    const remainingClients: ClientModel[] = serverClients.filter((serverClient) => !deletedClients.find((deletedClient) => deletedClient.phone === serverClient.phone));

                    localStorage.setItem('clients', JSON.stringify(remainingClients)); // Сохраняем в локальное хранилище
                    return remainingClients;
                })
            )
            .subscribe((clients: ClientModel[]) => this.clients$.next(clients));
    }




    public deleteClients(removedClients: ClientModel[]): void {
        const updatedClients: ClientModel[] = this.clients$.getValue().filter((client: ClientModel) => {
            client.selected = false;
            return !removedClients.includes(client)
        });
        this.clients$.next(updatedClients);

        this.getStorageDeletedClients().length > 0 ?
            localStorage.setItem('deletedClients', JSON.stringify([...JSON.parse(localStorage.getItem('deletedClients')!), ...removedClients]))
            :
            localStorage.setItem('deletedClients', JSON.stringify(removedClients));
    }


    private getStorageDeletedClients(): ClientModel[] {
        return localStorage.getItem('deletedClients') ? JSON.parse(localStorage.getItem('deletedClients')!) : [];
    }


    public editClient(currentClient: ClientModel, newClientData: IClient): void {
        this.clients$
            .pipe(
                takeUntil(this._subscription$),
                map((clients: ClientModel[]) =>
                    clients.map((client: ClientModel) => client.phone === currentClient.phone ? { ...client, ...newClientData } : client)
                )
            ).subscribe((updatedClients: ClientModel[]) => {
                this.clients$.next(updatedClients);
                localStorage.setItem('clients', JSON.stringify(updatedClients));
            });
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

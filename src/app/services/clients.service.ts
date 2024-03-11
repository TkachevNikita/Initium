import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../enviroments/enviroment";
import {IClient} from "../interfaces/client.interface";
import {map, Observable} from "rxjs";
import {ClientModel} from "../models/client.model";
import {UserDto} from "../interfaces/dto/user.dto";

@Injectable()
export class ClientsService {
    constructor(private _http: HttpClient) { }

    public getClients(): Observable<ClientModel[]> {
        return this.requestClients()
            .pipe(
                map((response: UserDto) => response.users.map((client: IClient) => new ClientModel(client)))
            );
    }

    private requestClients(): Observable<UserDto> {
        return this._http.get<UserDto>(`${environment.apiUrl}/task1`);
    }
}

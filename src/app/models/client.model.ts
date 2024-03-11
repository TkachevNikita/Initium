import {IClient} from "../interfaces/client.interface";

export class ClientModel {
    public readonly name: string;
    public readonly surname: string;
    public readonly email: string;
    public readonly phone: string;

    constructor(client: IClient) {
        this.name = client.name;
        this.surname = client.surname;
        this.email = client.email;
        this.phone = client.phone;
    }
}

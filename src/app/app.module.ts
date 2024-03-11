import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonComponent} from "./components/UI/button/button.component";
import {ClientPageComponent} from "./pages/client/client-page.component";
import {TableComponent} from "./components/UI/table/table.component";
import {ClientsService} from "./services/clients.service";
import {HttpClientModule} from "@angular/common/http";
import {ModalComponent} from "./components/UI/modal/modal.component";
import {PortalModule} from "@angular/cdk/portal";
import {NewClientFormComponent} from "./components/forms/new-client-form.component";
import {InputComponent} from "./components/UI/input/input.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        ClientPageComponent,
        ModalComponent,
        NewClientFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonComponent,
        TableComponent,
        HttpClientModule,
        PortalModule,
        InputComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [
        ClientsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonComponent} from "./components/UI/button/button.component";
import {ClientPageComponent} from "./pages/client/client-page.component";

@NgModule({
    declarations: [
        AppComponent,
        ClientPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

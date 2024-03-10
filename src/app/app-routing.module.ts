import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientPageComponent} from "./pages/client/client-page.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'clients',
                component: ClientPageComponent
            }
        ]
    },
    {
        path: '*',
        redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

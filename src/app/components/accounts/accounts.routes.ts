import { Routes } from "@angular/router";
import { AccountsComponent } from "./pages/list/accounts";
import { AccountDetails } from "./pages/account-details/account-details";

export const AccountsRoutes: Routes = [
    {
        path: '', component: AccountsComponent
    },
    {
        path: ':id', component: AccountDetails
    }
]
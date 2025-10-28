import { Routes } from "@angular/router";
import { TransactionsComponent } from "./pages/list/transactions";
import { TransactionComponent } from "./pages/details/transaction/transaction";

export const transactionsRoutes: Routes = [
    {
        path: "",
        component: TransactionsComponent
    },
    {
        path: ":id",
        component: TransactionComponent
    }
];
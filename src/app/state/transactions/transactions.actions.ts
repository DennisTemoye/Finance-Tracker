import { createAction, props } from "@ngrx/store";
import { Transaction } from "./transactions.state";

export const loadTransactions = createAction('[Transactions] Load Transactions', props<{ transactions: Transaction[] }>())
export const addTransaction = createAction('[Transactions] Add Transactions', props<{ transaction: any }>())
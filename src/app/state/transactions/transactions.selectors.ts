import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.state';


export const selectTransactionsState =
    createFeatureSelector<TransactionsState>('transactions');

export const selectAllTransactions = createSelector(
    selectTransactionsState,
    (state) => state.transactions
);

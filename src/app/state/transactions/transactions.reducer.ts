import { createReducer, on } from "@ngrx/store";
import { initialState } from "./transactions.state";
import { addTransaction, loadTransactions } from "./transactions.actions";


export const transactionsReducer = createReducer(
    initialState,
    on(loadTransactions, (state, { transactions }) => ({
        ...state,
        transactions
    })),
    on(addTransaction, (state, { transaction }) => ({
        ...state,
        transactions: [...state.transactions, transaction]
    }))
)
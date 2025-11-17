export interface Transaction {
    name: string;
    amount: number;
    method: string;
    status: string;
    date: string;
}

export interface TransactionsState {
    transactions: Transaction[];
}

export const initialState: TransactionsState = {
    transactions: [],
}
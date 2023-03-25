import { Action, ActionCreator, createSelector, createSlice } from "@reduxjs/toolkit";
import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { RootState } from "../../core/store";
import apiSlice, { Endpoints, queryFrom, QueryRequest } from "../api/apiSlice";

interface BankStatementLine {

}

interface BankStatement {

}

interface BankStatements {
  statements: BankStatement[]    
}

export const initialState: BankStatements = {
  statements: []
};

export const selector = createSelector(
  (state: RootState) => state.bankStatements,
  (statements: BankStatements) => statements.statements
);

const extendedApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBankStatements: builder.query({
      query: queryFrom(Endpoints.bankStatements)
    })
  })
});

const { useGetBankStatementsQuery } = extendedApi;

const slice = createSlice({
  name: 'bankStatements',
  initialState,
  reducers: {
    addStatement: (state, action) => {
      //state
    }
  }
});


export const { addStatement } = slice.actions;

export default slice.reducer;

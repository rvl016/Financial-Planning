import { configureStore, ThunkAction, Action, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import bankStatementsReducer from '../features/bankStatement/bankStatementSlice';
import { logOnAction } from './middlewares';

const store = configureStore({
  reducer: combineReducers({
    bankStatements: bankStatementsReducer,
  }),
  enhancers: [
    applyMiddleware(logOnAction),
  ],
  middleware: []
});


export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

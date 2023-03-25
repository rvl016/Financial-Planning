import { Action, AnyAction, Middleware } from "@reduxjs/toolkit";

export const logOnAction: Middleware = store => next => (action: AnyAction) => {
  console.info("Running Store Dispatch...");
  const res = next(action);
  console.info("Running Store ...");
  return res;
};

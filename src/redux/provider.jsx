import store from "./store";
import { Provider } from "react-redux";
import React from "react";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

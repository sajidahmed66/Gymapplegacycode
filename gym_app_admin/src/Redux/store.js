import { createStore, applyMiddleware } from "redux";
// import { createLogger } from "redux-logger";
// import reduxLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./rootReducer";

// const loggerMiddleware = reduxLogger.createLogger();
// const loggerMiddleware = createLogger();

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);
// import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';

// // import rootReducer from "fe-common/reducers";
// // import rootSaga from "fe-common/sagas";

// const sagaMiddleware = createSagaMiddleware();
// let middlewares: any[] = [];

// let composeEnhancers = compose

// //add logger middleware on development
// if(__DEV__){
//     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//     const { createLogger } = require('redux-logger');
//     const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
//     // uncomment kapag need
//     // middlewares.push(loggerMiddleware);
// }

// //add redux saga middleware
// middlewares.push(sagaMiddleware);

// function configureStore() {
//     const enhancer = composeEnhancers(
//         applyMiddleware(...middlewares)
//     );
//     return createStore(
//         rootReducer,
//         enhancer
//     );
// }

// const store = configureStore({});
// // sagaMiddleware.run(rootSaga)

// export default store;
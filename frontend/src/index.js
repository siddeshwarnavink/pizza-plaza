import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import './index.scss';
import cartReducer from './store/reducers/cart';
import pizzaListReducer from './store/reducers/pizza-list';
import flashNotificationReducer from './store/reducers/flashNotification';
import pizzaToppingsReducer from './store/reducers/pizza-toppings';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({
  cart: cartReducer,
  pizzaList: pizzaListReducer,
  flashNotification: flashNotificationReducer,
  pizzaToppings: pizzaToppingsReducer,
  orders: ordersReducer,
  auth: authReducer
});

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

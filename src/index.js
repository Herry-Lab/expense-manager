import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UsersProvider from './provider/users-provider';
import UserProvider from './provider/user-provider';
import IncomesProvider from './provider/incomes-provider';
import ExpenseProvider from './provider/expenses-provider';

// using node-style package resolution in a CSS file: 
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

ReactDOM.render(
  <React.StrictMode>
    <UsersProvider>
      <UserProvider>
        <IncomesProvider>
          <ExpenseProvider>
            <App />
          </ExpenseProvider>
        </IncomesProvider>
      </UserProvider>
    </UsersProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

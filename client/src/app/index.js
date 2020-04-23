import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { NavBar } from "../components";
import {
  StockList,
  StockInsert,
  StockUpdate,
  BBrosList,
  BBrosInsert,
  BBrosUpdate,
  PickTransactionsList,
  PickTransactionsInsert,
  PickTransactionsUpdate,
  PickFileList,
  PickFileInsert,
  PickFileUpdate
} from "../pages";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/stocks/list" exact component={StockList} />
        <Route path="/stocks/create" exact component={StockInsert} />
        <Route path="/stocks/update/:id" exact component={StockUpdate} />
        <Route path="/bbros/list" exact component={BBrosList} />
        <Route path="/bbros/create" exact component={BBrosInsert} />
        <Route path="/bbros/update/:id" exact component={BBrosUpdate} />
        <Route
          path="/picktransactions/list"
          exact
          component={PickTransactionsList}
        />
        <Route
          path="/picktransactions/create"
          exact
          component={PickTransactionsInsert}
        />
        <Route
          path="/picktransactions/update/:id"
          exact
          component={PickTransactionsUpdate}
        />

        <Route path="/pickfiles/list" exact component={PickFileList} />
        <Route path="/pickfiles/create" exact component={PickFileInsert} />
        <Route path="/pickfiles/update/:id" exact component={PickFileUpdate} />
        <div style={{ textAlign: "center" }}>
          <img src="logo512.png" alt="BartBros" style={{ opacity: 0.05 }} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;

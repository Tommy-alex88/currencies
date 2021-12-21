import { useEffect, useCallback } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Currencies from "./components/Currencies/Currencies";
import { currenciesActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const baseCurrency = useSelector((state) => state.baseCurrency);

  // fetching list of currencies for storing in global state (redux store)
  // based on selected base currency (RUB by default)
  const fetchCurrenciesList = useCallback(() => {
    dispatch(currenciesActions.updateLoadingStatus(true));
    const url = `https://api.exchangerate.host/latest?base=${baseCurrency}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        const curRates = [];
        for (const [key, value] of Object.entries(data.rates)) {
          curRates.push({
            name: key,
            value: value,
          });
        }
        dispatch(currenciesActions.update(curRates));
        dispatch(currenciesActions.updateLoadingStatus(false));
      })
      .catch((err) => console.log(err.message));
  }, [baseCurrency, dispatch]);

  useEffect(() => {
    fetchCurrenciesList();
  }, [fetchCurrenciesList]);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/currencies" exact>
          <Currencies />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

import { useSelector, useDispatch } from "react-redux";

import Card from "../UI/Card/Card";
import Spinner from "../UI/Spinner/Spinner";
import { currenciesActions } from "../../store";
import classes from "./Currencies.module.css";

// gives a list of currency exchange rates (from store)
// and opportunity to change base currency
const Currencies = () => {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.currencies);
  const baseCurrency = useSelector((state) => state.baseCurrency);
  const loading = useSelector((state) => state.loading);

  //change base currency in the redux store. List is fetched again in App.js,
  // where baseCurrency is set as dependancy in useEffect/useCallback
  const baseChangeHandler = (event) => {
    dispatch(currenciesActions.changeBaseCurrency(event.target.value));
  };
  // rendered list of currencies with adding gray-color styling for even rows
  let listItem = null;
  let i = 0;
  const curList = currencies.map((el) => {
    if (i % 2 === 0) {
      listItem = (
        <li
          className={classes.even}
          key={el.name}
        >{`${el.name} = ${el.value} ${baseCurrency}`}</li>
      );
    } else {
      listItem = (
        <li key={el.name}>{`${el.name} = ${el.value} ${baseCurrency}`}</li>
      );
    }
    i++;
    return listItem;
  });

  return (
    <section className={classes.container}>
      <Card>
        <div className={classes.info}>
          Exhange rates for different currency pairs
        </div>
        <div className={classes.base}>
          <p>Select base currency: </p>
          <select size="1" value={baseCurrency} onChange={baseChangeHandler}>
            {currencies.map((el) => (
              <option key={el.name} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.rates}>
          {loading && <Spinner />}
          {!loading && <ul>{curList}</ul>}
        </div>
      </Card>
    </section>
  );
};
export default Currencies;

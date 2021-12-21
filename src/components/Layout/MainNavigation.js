import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

// navbar with logo and two links
const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <NavLink to="/" exact={true} className={classes.logo}>
        Exchange Rate
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact={true} activeClassName={classes.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/currencies"
              exact={true}
              activeClassName={classes.active}
            >
              Currencies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;

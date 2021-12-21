import classes from "./Card.module.css";

//wrapper component for styling
const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;

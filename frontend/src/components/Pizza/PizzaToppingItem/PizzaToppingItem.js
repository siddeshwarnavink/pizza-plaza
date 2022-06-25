import Button from '../../UI/Button/Button';
import classes from './PizzaToppingItem.module.scss';

const PizzaToppingItem = props => {
    const onAddOrRemoveHandler = () => {
        if(props.isAdded) {
            props.onRemoveTopping();
        } else {
            props.onAddTopping();
        }
    }

    return (
        <li className={classes.PizzaToppingItem} data-testid="app-pizza-topping-item">
            <div className={classes.PizzaToppingItem__Icon}>
                <img alt="topping image" src={props.image} />
            </div>

            <div className={classes.PizzaToppingItem__Detail}>
                <span className={classes.PizzaToppingItem_Detail__Title}>{props.name}</span>
                <span className={classes.PizzaToppingItem_Detail__Cost}>${props.price} each</span>
            </div>

            <div className={classes.PizzaToppingItem__Spacer}></div>

            <div className={classes.PizzaToppingItem__Action}>
                <Button
                    rectangle
                    small
                    hollow={props.isAdded}
                    onClick={onAddOrRemoveHandler}
                >
                    {props.isAdded ? "- Remove" : "+ Add"}
                </Button>
            </div>
        </li>
    )
};

export default PizzaToppingItem;
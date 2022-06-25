import classes from './CartContainer.module.scss';

const CartContainer = props => (
    <div className={classes.CartContainer} data-testid="cart-container-component">
        {props.children}
    </div>
);

export default CartContainer;
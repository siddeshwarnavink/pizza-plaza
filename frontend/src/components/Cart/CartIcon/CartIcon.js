import classes from './CartIcon.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses'
import ShoppingBasketIcon from '../../../components/Icons/ShoppingBasketIcon';

const CartIcon = props => {
    return (
        <div
            className={joinCssClasses([
                classes.CartIcon,
                props.shakeCart && classes.Shake
            ])}
            onClick={props.toggleCart}
            data-testid="cart-icon-container"
        >
            <button className={classes.CartIcon__Button} data-testid="cart-icon">
                <ShoppingBasketIcon />
            </button>

            {props.cartItemCount > 0 ? (
                <div className={classes.CartIcon__ItemCout} data-testid="cart-quantity">
                    {props.cartItemCount}
                </div>
            ) : null}
        </div>
    );
};

export default CartIcon;
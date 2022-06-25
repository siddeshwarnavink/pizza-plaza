import emptyCartImage from '../../../images/empty_cart.svg';
import classes from './EmptyCart.module.scss';
import CartContainer from '../../../hoc/Cart/CartContainer/CartContainer';

const EmptyCart = () => {
    return (
        <div className={classes.EmptyCart} data-testid="empty-cart">
            <CartContainer>
                <img src={emptyCartImage} alt="Empty cart" />
                <div className={classes.EmptyCart__Text}>Cart is empty :(</div>
            </CartContainer>
        </div>
    );
};

export default EmptyCart;
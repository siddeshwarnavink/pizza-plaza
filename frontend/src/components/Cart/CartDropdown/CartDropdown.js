import classes from './CartDropdown.module.scss'
import joinCssClasses from '../../../utils/joinCssClasses';
import EmptyCart from '../EmptyCart/EmptyCart';
import MobileSwipeBar from '../../UI/MobileSwipeBar/MobileSwipeBar';
import CartList from '../CartList/CartList';

const CartDropdown = props => {
    return (
        <div
            className={joinCssClasses([
                classes.CartDropdown,
                props.mobile && classes.Mobile,
                props.isExpandToTop && classes.ExpandToTop
            ])}
            data-testid="cart-dropdown"
        >
            {props.mobile && props.cartList.length > 1 ? (
                <MobileSwipeBar
                    onSwipeUp={props.onSwipeUp}
                    onSwipeDown={props.onSwipeDown}
                    toggleSwipe={props.toggleSwipe}
                />
            ) : null}
            {props.cartList.length > 0 ? (
                <CartList
                    isExpandToTop={props.isExpandToTop && props.cartList.length > 1}
                    mobile={props.mobile}
                    cartList={props.cartList}
                    updateCartItemQuantity={props.updateCartItemQuantity}
                    clearCart={props.clearCart}
                    cartTotalPrice={props.cartTotalPrice}
                    removeToppingFromCartItem={props.removeToppingFromCartItem}
                    locked={false}
                    isAuthenticated={props.isAuthenticated}
                    setAuthRedirectPath={props.setAuthRedirectPath}
                    pushNewFlashMessage={props.pushNewFlashMessage}
                />
            ) : (
                <EmptyCart />
            )}
        </div>
    );
};

CartDropdown.defaultProps = {
    mobile: false
};

export default CartDropdown;
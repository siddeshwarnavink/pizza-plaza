import { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { BrowserView, MobileOnlyView, isMobile } from 'react-device-detect';
import { connect } from 'react-redux';

import classes from './Cart.module.scss';
import * as actions from '../../store/actions';
import joinCssClasses from '../../utils/joinCssClasses';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import CartDropdown from '../../components/Cart/CartDropdown/CartDropdown';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

export const Cart = props => {
    const [isExpandToTop, setIsExpandToTop] = useState(false);

    useEffect(() => {
        if (props.cartList.length <= 1 && isMobile) {
            setIsExpandToTop(false);
        }
    }, [props.cartList])

    const onSwipeUpMobileBarHandler = () => {
        setIsExpandToTop(true);
    };

    const onSwipeDownMobileBarHandler = () => {
        setIsExpandToTop(false);
    }

    const toggleSwipeHandler = () => {
        setIsExpandToTop(state => !state);
    }

    return (
        <Auxiliary>
            <BrowserView className={classes.CartBrowserContainer} data-testid="app-cart">
                {props.isCartOpen ? (
                    <Backdrop moreZIndex onClick={props.toggleCart} />
                ) : null}
                <Transition
                    in={props.isCartOpen}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                >
                    {state => (
                        <div className={joinCssClasses([
                            classes.Cart,
                            state === "entering" || state === "entered" ? classes.Cart__Open : classes.Cart__Close
                        ])}>
                            <CartDropdown
                                cartList={props.cartList}
                                clearCart={props.clearCart}
                                updateCartItemQuantity={props.modifyCartItemQuantity}
                                cartTotalPrice={props.cartTotalPrice}
                                removeToppingFromCartItem={props.removeToppingFromCartItem}
                                isAuthenticated={props.isAuthenticated}
                                setAuthRedirectPath={props.setAuthRedirectPath}
                                pushNewFlashMessage={props.pushNewFlashMessage}
                            />
                        </div>
                    )}
                </Transition>
            </BrowserView>
            <MobileOnlyView className={classes.CartMobileContainer} data-testid="app-cart">
                <Transition
                    in={props.isCartOpen}
                    timeout={500}
                >
                    {state => (
                        <div>
                            <div className={joinCssClasses([
                                classes.Cart,
                                state === "entering" || state === "entered" ? classes.Cart__Open : classes.Cart__Close
                            ])}>
                                <CartDropdown
                                    cartList={props.cartList}
                                    clearCart={props.clearCart}
                                    cartTotalPrice={props.cartTotalPrice}
                                    onSwipeUp={onSwipeUpMobileBarHandler}
                                    onSwipeDown={onSwipeDownMobileBarHandler}
                                    toggleSwipe={toggleSwipeHandler}
                                    isExpandToTop={isExpandToTop}
                                    updateCartItemQuantity={props.modifyCartItemQuantity}
                                    removeToppingFromCartItem={props.removeToppingFromCartItem}
                                    isAuthenticated={props.isAuthenticated}
                                    setAuthRedirectPath={props.setAuthRedirectPath}
                                    pushNewFlashMessage={props.pushNewFlashMessage}
                                    mobile
                                />
                            </div>
                            {state === "entering" || state === "entered" || state === "exiting" ? (
                                <Backdrop
                                    onClick={props.toggleCart}
                                    shade
                                />
                            ) : null}
                        </div>
                    )}
                </Transition>
            </MobileOnlyView>
        </Auxiliary>
    );
};

const mapStateToProps = state => ({
    cartList: state.cart.cartList,
    cartTotalPrice: state.cart.totalPrice,
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    modifyCartItemQuantity: (index, newQty) => dispatch(actions.modifyCartItemQuantity(index, newQty)),
    clearCart: () => dispatch(actions.clearCart()),
    removeToppingFromCartItem: (cartItemId, toppingId) => dispatch(actions.removeToppingFromCartItem(cartItemId, toppingId)),
    setAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
    pushNewFlashMessage: (newMessage) => dispatch(actions.pushNewFlashMessage(newMessage)),
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';

import classes from './CartList.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';
import CartOpenContext from '../../../context/CartOpenContext';
import CartContainer from "../../../hoc/Cart/CartContainer/CartContainer";
import CartListItem from './CartListItem/CartListItem';
import Button from '../../UI/Button/Button';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const CartList = props => {
    const navigate = useNavigate();
    const cartOpenCtx = useContext(CartOpenContext)

    const increaseCartItemQtyHandler = (index) => {
        props.updateCartItemQuantity(index, props.cartList[index].quantity + 1);
    }

    const decreaseCartItemQtyHandler = (index) => {
        props.updateCartItemQuantity(index, props.cartList[index].quantity - 1)
    }

    const onCheckoutHandler = () => {
        // props.clearCart();

        if (props.mobile) {
            window.scrollTo(0, 0);
        }

        cartOpenCtx.toggleCartOpen();

        if (props.isAuthenticated) {
            navigate('/cart/checkout', { replace: true });
        } else {
            props.setAuthRedirectPath('/cart/checkout');
            navigate('/auth/login', { replace: true });

            props.pushNewFlashMessage({
                text: "Sign in first to place order",
                type: 'info'
            });
        }
    }

    const ContainerComponent = props.noContainer ? Auxiliary : CartContainer;

    return (
        <ContainerComponent data-testid="cart-list">
            <div className={joinCssClasses([
                classes.CartList,
                !props.isExpandToTop && classes.CompressedToBottom,
                props.mobile && classes.Mobile
            ])}>
                {!props.locked ? (
                    <div className={classes.CartList__Title}>Your cart</div>
                ) : null}

                <TransitionGroup
                    component="ul"
                    className={classes.CartList__List}
                    data-testid="cart-list"
                    style={props.noFixedListHeight ? { height: 'unset' } : null}
                >
                    {props.cartList.map((cartItem, index) => (
                        <CSSTransition
                            key={index}
                            classNames={{
                                enter: classes.FadeAnimation_Enter,
                                enterActive: classes.FadeAnimation_EnterActive,
                                exit: classes.FadeAnimation_Exit,
                                exitActive: classes.FadeAnimation_ExitActive
                            }}
                            timeout={300}
                        >
                            <CartListItem
                                mobile={props.mobile}
                                cartIndex={index}
                                {...cartItem}
                                editable={!props.locked}
                                increaseCartItemQty={() => increaseCartItemQtyHandler(index)}
                                decreaseCartItemQty={() => decreaseCartItemQtyHandler(index)}
                                removeToppingFromCartItem={props.removeToppingFromCartItem}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>

                <div className={classes.CartList__Action} >
                    <div className={classes.CartList_Action__Subtotal}>
                        <div className={classes.CartList_Subtotal__Label}>Subtotal:</div>
                        <div className={classes.CartList_Subtotal__Spacer} />
                        <div className={classes.CartList_Subtotal__Value}>${props.cartTotalPrice}</div>
                    </div>

                    {!props.locked ? (
                        <Auxiliary>
                            <section data-testid="checkout-btn">
                                <Button onClick={onCheckoutHandler}>Checkout</Button>
                            </section>
                        </Auxiliary>
                    ) : null}
                </div>
            </div>
        </ContainerComponent>
    );
};

export default CartList;
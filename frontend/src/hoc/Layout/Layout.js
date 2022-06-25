import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useSwipeable } from 'react-swipeable';
import { Transition } from 'react-transition-group';
import { MobileView, BrowserView } from 'react-device-detect';

import classes from './Layout.module.scss';
import * as actions from '../../store/actions';
import joinCssClasses from '../../utils/joinCssClasses';
import animationClassWithState from '../../utils/animationClassWithState';
import useScrollPosition from '../../hooks/useScrollPosition';
import useToggle from '../../hooks/useToggle';
import CartOpenContext from '../../context/CartOpenContext';
import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Cart from "../../containers/Cart/Cart";
import FlashNotification from "../../components/FlashNotification/FlashNotification";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Backdrop from '../../components/UI/Backdrop/Backdrop';

export const Layout = (props) => {
    const [isCartOpen, toggleCartPopupHandler] = useToggle(false);
    const [shakeCart, setShakeCart] = useState(false);
    const [showStickyToolbar, setShowStickyToolbar] = useState(false);
    const [isSidedrawOpen, toggleSidedrawHandler] = useToggle(false);

    const scrollPosition = useScrollPosition();

    useEffect(() => {
        if (props.cartList.length > 0) {
            setShakeCart(true);

            setTimeout(() => {
                setShakeCart(false);
            }, 300);
        }
    }, [props.cartList.length]);

    const swipeHandler = useSwipeable({
        onSwipedUp: () => {
            setShowStickyToolbar(false);
        },
        onSwipedDown: () => {
            if (scrollPosition > 30) {
                setShowStickyToolbar(true);
            } else {
                setShowStickyToolbar(false);
            }
        }
    });

    if (scrollPosition <= 15 && showStickyToolbar) {
        setShowStickyToolbar(false);
    }

    const toolbar = (
        <Auxiliary>
            <Toolbar
                toggleCart={toggleCartPopupHandler}
                toggleSidedraw={toggleSidedrawHandler}
                cartItemCount={props.cartList.length}
                shakeCartIcon={shakeCart}
                isSidedrawOpen={isSidedrawOpen}
                isAuthenticated={props.isAuthenticated}
            />
            <SideDrawer
                isOpen={isSidedrawOpen}
                toggleSidedraw={toggleSidedrawHandler}
                isAuthenticated={props.isAuthenticated}
            />
            {isSidedrawOpen ? (
                <Backdrop shade moreZIndex onClick={toggleSidedrawHandler} />
            ) : null}
        </Auxiliary>
    );

    return (
        <Auxiliary>
            <BrowserView style={{ paddingBottom: 80 }}>
                <div className={classes.FixedToolbar}>
                    {toolbar}
                </div>
            </BrowserView>
            <MobileView>
                {(!showStickyToolbar || scrollPosition === 0) ? toolbar : null}
                <Transition
                    in={showStickyToolbar}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                >
                    {state => (
                        <div className={joinCssClasses(animationClassWithState([classes.StickyToolbar], [
                            classes.StickyToolbar__Entering,
                            classes.StickyToolbar__Entered,
                            classes.StickyToolbar__Exiting,
                            classes.StickyToolbar__Exited
                        ], state))}>
                            {toolbar}
                        </div>
                    )}
                </Transition>
            </MobileView>

            <CartOpenContext.Provider value={{
                isCartOpen,
                toggleCartOpen: toggleCartPopupHandler
            }}>
                <Auxiliary>
                    <Cart
                        isCartOpen={isCartOpen}
                        toggleCart={toggleCartPopupHandler}
                    />

                    <main {...swipeHandler}>
                        {props.children}
                    </main>
                </Auxiliary>
            </CartOpenContext.Provider>

            {props.flashNotificationMessages.map((notificationMessage, index) => (
                <FlashNotification
                    key={index}
                    visible={notificationMessage.visible}
                    dismissMessage={() => props.dismissFlashNotification(index)}
                    message={notificationMessage.text}
                    messageType={notificationMessage.type || "success"}
                    action={notificationMessage.action || false}
                />
            ))}

        </Auxiliary>
    );
};

const mapStateToProps = state => ({
    cartList: state.cart.cartList,
    flashNotificationMessages: state.flashNotification.messages
});

const mapDispatchToProps = dispatch => ({
    dismissFlashNotification: (index) => dispatch(actions.removeNotification(index + 1)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);
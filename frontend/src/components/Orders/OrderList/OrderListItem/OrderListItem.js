import { useState } from 'react';
import { Transition } from 'react-transition-group';
import { BrowserView } from 'react-device-detect';

import classes from './OrderListItem.module.scss';
import joinCssClasses from '../../../../utils/joinCssClasses';
import animationClassWithState from '../../../../utils/animationClassWithState';
import OrderStatus from '../../OrderStatus/OrderStatus';
import CartList from '../../../Cart/CartList/CartList';
import ExpandMoreIcon from '../../../Icons/ExpandMoreIcon';

const OrderListItem = props => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpandedHandler = () => {
        setIsExpanded(state => !state);
    }

    let orderDescription = '';

    props.orderList.forEach(pizza => {
        orderDescription = `${orderDescription} ${pizza.quantity}x ${pizza.name}`;
    });

    return (
        <li
            className={joinCssClasses([
                classes.OrderListItem,
                props.status === 'closed' && classes.ClosedStatus
            ])}
        >
            <div className={classes.OrderDetail}>
                <span className={classes.OrderDetail__id}>Order #{props.id}</span>

                <BrowserView className={classes.OrderDetail__Status}>
                    <OrderStatus status={props.status} />
                </BrowserView>

                <div className={classes.OrderDetail__Spacer} />

                <div className={[classes.OrderDetail__ExpandToggle, isExpanded ? classes.Expanded : null].filter(n => n).join(' ')} onClick={toggleExpandedHandler}>
                    <ExpandMoreIcon />
                </div>
            </div>

            <div className={classes.OrderDescription}>
                {orderDescription}
            </div>

            <Transition
                in={isExpanded}
                timeout={500}
                mountOnEnter
                unmountOnExit
            >
                {state => (
                    <div
                        className={joinCssClasses(animationClassWithState([classes.OrderList], [
                            classes.OrderList__Entering,
                            classes.OrderList__Entered,
                            classes.OrderList__Exiting,
                            classes.OrderList__Exited,
                        ], state))}
                    >
                        <CartList
                            noContainer
                            cartList={props.orderList}
                            cartTotalPrice={props.totalPrice}
                            locked
                            noFixedListHeight
                        />
                    </div>
                )
                }
            </Transition>
        </li>
    );
}

export default OrderListItem
import classes from './OrderList.module.scss';
import OrderListItem from "./OrderListItem/OrderListItem";

const OrderList = props => {
    return (
        <ul className={classes.OrderList}>
            {props.orderList.map(order => {
                return (
                    <OrderListItem
                        key={order.id}
                        status={order.status}
                        id={order.id}
                        orderList={order.order}
                        totalPrice={order.totalPrice}
                    />
                );
            })}
        </ul>
    );
};

export default OrderList;
import joinCssClasses from '../../../utils/joinCssClasses';
import classes from './OrderStatus.module.scss';

const OrderStatus = props => {
    return (
        <div className={joinCssClasses([
            classes.OrderStatus,
            props.status === 'closed' && classes.Closed
        ])}>
            {props.status === 'closed' ? 'Closed' : 'Processing'}
        </div>
    );
};

export default OrderStatus;
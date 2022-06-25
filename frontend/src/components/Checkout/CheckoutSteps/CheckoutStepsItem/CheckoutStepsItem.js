import classes from './CheckoutStepsItem.module.scss';
import joinCssClasses from '../../../../utils/joinCssClasses';

const CheckoutStepsItem = props => {
    return (
        <div
            className={joinCssClasses([
                classes.CheckoutStepsItem,
                props.selected && classes.Selected
            ])}
            onClick={props.onClick
            }>
            <props.IconComponent />
        </div>
    );
};

export default CheckoutStepsItem;
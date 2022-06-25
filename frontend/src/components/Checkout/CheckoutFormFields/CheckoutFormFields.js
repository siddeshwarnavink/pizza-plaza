import classes from './CheckoutFormFields.module.scss';

const CheckoutFormFields = props => {
    return (
        <div className={classes.CheckoutFormFields}>
            {props.children}
        </div>
    );
};

export default CheckoutFormFields;
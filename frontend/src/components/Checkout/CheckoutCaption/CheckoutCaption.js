import classes from './CheckoutCaption.module.scss';

const CheckoutCaption = props => {
    return (
        <h1 className={classes.CheckoutCaption}>
            {props.children}
        </h1>
    );
};

export default CheckoutCaption;
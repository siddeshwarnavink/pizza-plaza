import Button from "../../UI/Button/Button";
import classes from './CheckoutFormAction.module.scss';

const CheckoutFormAction = props => {
    return (
        <section className={classes.CheckoutFormAction}>
            {props.displayPrevButton ? (
                <div className={classes.CheckoutFormAction__Button}>
                    <Button
                        flat
                        buttonType="button"
                        onClick={props.onClickPrevBtn}
                    >
                        Previous
                    </Button>
                </div>
            ) : null}
            <div className={classes.CheckoutFormAction__Spacer}></div>
            <div className={classes.CheckoutFormAction__Button}>
                <Button disable={props.isNextButtonDisable}>Next</Button>
            </div>
        </section>
    );
}

export default CheckoutFormAction;
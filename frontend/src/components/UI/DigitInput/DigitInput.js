import classes from './DigitInput.module.scss';

const DigitInput = props => {
    const onIncreaseHandler = () => {
        if (!props.maxVal) {
            props.onIncrease();
        } else if (props.maxVal !== props.value) {
            props.onIncrease();
        }
    };

    const onDecreaseHandler = () => {
        if (!props.minVal) {
            props.onDecrease();
        } else if (props.minVal !== (props.value - 1)) {
            props.onDecrease();
        }
    }

    return (
        <div className={classes.DigitInput} data-testid="app-digitinput">
            <button className={classes.DigitInput__Control} onClick={onDecreaseHandler}>-</button>
            <div className={classes.DigitInput__Digit}>{props.value}</div>
            <button className={classes.DigitInput__Control} onClick={onIncreaseHandler}>+</button>
        </div>
    );
};

export default DigitInput;
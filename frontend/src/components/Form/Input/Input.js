import classes from './Input.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';

const Input = props => {
    return (
        <div className={joinCssClasses([
            classes.InputContainer,
            props.error && classes.Error
        ])}>
            <input
                name={props.name}
                className={classes.Input}
                type={props.inputType || "text"}
                autoComplete="off"
                onChange={props.onChange}
            />
            <span className={classes.Bar}></span>
            <label className={classes.Label}>
                {props.label}
            </label>
            {props.error ? (
                <div className={classes.ErrorMessage}>{props.label} is invalid</div>
            ) : null}
        </div>
    );
}

export default Input;
import classes from './Button.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';

const Button = props => {
    return (
        <button
            className={joinCssClasses([
                classes.Button,
                props.icon && classes.IconedButton,
                props.theme === "secondary" && classes.Secondary,
                props.hollow && classes.Hollow,
                props.rectangle && classes.Rectangle,
                props.flat && classes.Flat,
                props.small && classes.Small,
                props.disable && classes.Disable
            ])}
            onClick={props.onClick}
            type={props.buttonType || 'submit'}
            disabled={props.disable}
        >
            {props.icon ? (
                <div className={classes.Button__Icon}>
                    <props.icon></props.icon>
                </div>
            ) : null}
            <div className={classes.Button__Text}>
                {props.children}
            </div>
        </button>
    );
};

export default Button;
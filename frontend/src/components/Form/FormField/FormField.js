import classes from './FormField.module.scss';

const FormField = props => {
    return (
        <div className={classes.FormField}>
            <label className={classes.FormField__Label}>{props.label}</label>
            <div>
                {props.children}
            </div>
            {props.isError ? (
                <div className={classes.FormField__Error}>
                    This field is required
                </div>
            ) : null}
        </div>
    );
}

export default FormField;
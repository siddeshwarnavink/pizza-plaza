import classes from './AuthAnimation.module.scss';

const AuthAnimation = props => {
    return (
        <div className={classes.AuthAnimation}>
            {props.children}
        </div>
    );
};

export default AuthAnimation;
import classes from './AuthContainer.module.scss';

import AuthAnimation from '../AuthAnimation/AuthAnimation';

const AuthContainer = props => {
    return (
        <div className={classes.AuthContainer}>
            <AuthAnimation>
                {props.children}
            </AuthAnimation>
        </div>
    )
}

export default AuthContainer;
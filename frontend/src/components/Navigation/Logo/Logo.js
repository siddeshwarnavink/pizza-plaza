import { useNavigate } from 'react-router-dom';

import classes from './Logo.module.scss';

const Logo = () => {
    const navigate = useNavigate();

    const redirectToHomeHandler = () => {
        navigate('/', { replace: true });
    }

    return (
        <div className={classes.Logo} data-testid="brand-logo" onClick={redirectToHomeHandler}>
            <span className={classes.Logo__Text}>Pizza Plaza</span>
        </div>
    );
}

export default Logo;
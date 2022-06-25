import { BrowserView, MobileView } from 'react-device-detect';

import classes from './Toolbar.module.scss';
import Logo from '../Logo/Logo';
import CartIcon from '../../Cart/CartIcon/CartIcon';
import Navigation from '../Navigation';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

const Toolbar = props => {
    return (
        <div className={classes.Toolbar} data-testid="app-toolbar">
            <MobileView className={classes.Toolbar__HamburgerIcon}>
                <HamburgerIcon
                    isSidedrawOpen={props.isSidedrawOpen}
                    onClick={props.toggleSidedraw}
                />
            </MobileView>

            <div className={classes.Toolbar__Logo}>
                <Logo />
            </div>

            <div className={classes.Toolbar__Spacer}></div>

            <BrowserView className={classes.Toolbar__Navigation}>
                <Navigation isAuthenticated={props.isAuthenticated} />
            </BrowserView>

            <div className={classes.Toolbar__RightNav}>
                <CartIcon
                    toggleCart={props.toggleCart}
                    cartItemCount={props.cartItemCount}
                    shakeCart={props.shakeCartIcon}
                />
            </div>
        </div>
    );
};

export default Toolbar;
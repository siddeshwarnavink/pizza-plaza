import classes from './Navigation.module.scss';
import joinCssClasses from '../../utils/joinCssClasses';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import NavigationItem from "./NavigationItem/NavigationItem";

const Navigation = props => {
    return (
        <div
            data-testid="app-navigation"
            className={joinCssClasses([
                classes.Navigation,
                props.sidedraw && classes.Sidedraw
            ])}>
            {props.sidedraw ? (
                <NavigationItem sidedraw={props.sidedraw} to="/">
                    Home
                </NavigationItem>
            ) : null}

            {!props.isAuthenticated ? (
                <NavigationItem sidedraw={props.sidedraw} to="/auth/login">
                    Sign in
                </NavigationItem>
            ) : (
                <Auxiliary>
                    <NavigationItem sidedraw={props.sidedraw} to="/customer/orders">
                        Orders
                    </NavigationItem>

                    <NavigationItem sidedraw={props.sidedraw} to="/auth/logout">
                        Logout
                    </NavigationItem>
                </Auxiliary>
            )}
        </div>
    );
};

Navigation.defaultProps = {
    isAuthenticated: false
}

export default Navigation;
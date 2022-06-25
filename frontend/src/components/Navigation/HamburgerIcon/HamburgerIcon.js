import classes from './HamburgerIcon.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';

const HamburgerIcon = props => {
    const toggleHamburgerHandler = () => {
        props.onClick();
    }

    return (
        <div
            data-testid="app-hamburgericon"
            className={joinCssClasses([
                classes.HamburgerIcon,
                props.isSidedrawOpen && classes.Open
            ])}
            onClick={toggleHamburgerHandler}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default HamburgerIcon
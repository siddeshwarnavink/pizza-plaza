import { Link } from 'react-router-dom';

import classes from './NavigationItem.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';

const NavigationItem = props => {
    return (
        <Link data-testid="app-navigation-item" to={props.to} className={joinCssClasses([
            classes.NavigationItem,
            props.sidedraw && classes.Sidedraw
        ])}>
            {props.children}
        </Link>
    );
}

export default NavigationItem;
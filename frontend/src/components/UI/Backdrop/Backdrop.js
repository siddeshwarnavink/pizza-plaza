import { useEffect } from 'react';

import classes from './Backdrop.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';

const Backdrop = props => {
    useEffect(() => () => {
        if (props.shade) {
            document.body.style.overflow = "unset";
        }
    }, []);

    if (props.shade) {
        document.body.style.overflow = "hidden";
    }

    return (
        <div
            className={joinCssClasses([
                classes.Backdrop,
                props.shade && classes.Shade,
                props.moreZIndex && classes.MoreZIndex
            ])}
            onClick={props.onClick}
            data-testid="app-backdrop"
        />
    );
};

Backdrop.defaultProps = {
    shade: false
}

export default Backdrop;
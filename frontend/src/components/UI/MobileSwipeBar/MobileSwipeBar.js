import { useSwipeable } from 'react-swipeable';

import classes from './MobileSwipeBar.module.scss';

const MobileSwipeBar = props => {
    const swipeHandler = useSwipeable({
        onSwipedUp: () => {
            props.onSwipeUp();
        },
        onSwipedDown: () => {
            props.onSwipeDown();
        }
    });

    return (
        <div
            data-testid="mobile-swipebar"
            className={classes.MobileSwipeBar}
            {...swipeHandler}
            onClick={props.toggleSwipe}
        ></div>
    );
};

export default MobileSwipeBar;
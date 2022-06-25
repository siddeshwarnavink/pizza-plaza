import { Transition } from 'react-transition-group';

import classes from './FlashNotification.module.scss';
import joinCssClasses from '../../utils/joinCssClasses';
import animationClassWithState from '../../utils/animationClassWithState';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const FlashNotification = props => {
    const onActionClickHandler = () => {
        props.action.onClick();
        props.dismissMessage();
    }

    return (
        <Transition
            in={props.visible}
            timeout={300}
        >
            {state => (
                <div className={joinCssClasses([
                    classes.FlashNotification,
                    classes.Success,

                    props.messageType === 'info' && classes.Info,
                    props.messageType === 'danger' && classes.Danger,
                    props.messageType === 'warning' && classes.Info,

                    ...animationClassWithState([], [
                        null,
                        classes.Animation__Entered,
                        classes.Animation__Exiting,
                        classes.Animation__Exited
                    ], state)

                ])} data-testid="app-flashnotification">
                    <div className={classes.FlashNotification__Message}>
                        {props.message}
                    </div>

                    {props.action ? (
                        <Auxiliary>
                            <div className={classes.FlashNotification__Spacer}></div>

                            <button className={classes.FlashNotification__Action} onClick={onActionClickHandler} data-testid="flashnotification-action-button">
                                {props.action.text || "View"}
                            </button>
                        </Auxiliary>
                    ) : null}
                </div>
            )}
        </Transition>
    );
};

export default FlashNotification;
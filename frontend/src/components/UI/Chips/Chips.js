import { Transition } from 'react-transition-group';
import { useState } from 'react';

import classes from './Chips.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';
import animationClassWithState from '../../../utils/animationClassWithState';

const Chips = props => {
    const [displayChip, setDisplayChip] = useState(true);

    const onRemoveHandler = () => {
        setDisplayChip(false);
        setTimeout(() => {
            props.onRemove();
        }, 400);
    }

    return (
        <Transition
            in={displayChip}
            timeout={200}
        >
            {state => (
                <div
                    className={joinCssClasses(animationClassWithState([classes.Chips], [
                        null,
                        null,
                        classes.Chips__Exiting,
                        classes.Chips__Exited
                    ], state))}
                    data-testid="app-chips"
                >
                    {props.editable ? (
                        <button className={classes.Chip__Close} onClick={onRemoveHandler}>x</button>
                    ) : null}
                    <span>{props.label}</span>
                </div>
            )}
        </Transition>
    );
}

export default Chips;
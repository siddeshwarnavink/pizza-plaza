import { Transition } from 'react-transition-group';

import classes from './Modal.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';
import animationClassWithState from '../../../utils/animationClassWithState';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    return (
        <Auxiliary>
            <Transition
                in={props.isOpen}
                timeout={300}
                mountOnEnter
                unmountOnExit
            >
                {state => (
                    <div>
                        {state !== "exited" ? <Backdrop shade moreZIndex onClick={props.onClose} /> : null}
                        <div className={joinCssClasses(animationClassWithState([classes.Modal], [
                            classes.Modal__Entering,
                            classes.Modal__Entered,
                            classes.Modal__Exiting,
                            classes.Modal__Exited
                        ], state))}>
                            <button type='button' className={classes.Modal__Close} onClick={props.onClose}>X</button>
                            {props.children}
                        </div>
                    </div>
                )}
            </Transition>
        </Auxiliary>
    );
};

export default Modal;
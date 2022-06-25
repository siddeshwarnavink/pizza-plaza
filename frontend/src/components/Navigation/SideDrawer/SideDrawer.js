import { Transition } from 'react-transition-group';

import classes from './SideDrawer.module.scss';
import joinCssClasses from '../../../utils/joinCssClasses';
import animationClassWithState from '../../../utils/animationClassWithState';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Navigation from '../Navigation';

const SideDrawer = props => {
    return (
        <Auxiliary>
            <Transition
                in={props.isOpen}
                timeout={500}
                mountOnEnter
                unmountOnExit
            >
                {state => (
                    <div className={joinCssClasses(animationClassWithState([classes.SideDrawer], [
                        classes.SideDrawer__Entering,
                        classes.SideDrawer__Entered,
                        classes.SideDrawer__Exiting,
                        classes.SideDrawer__Exited
                    ], state))} onClick={props.toggleSidedraw}>
                        <Navigation isAuthenticated={props.isAuthenticated} sidedraw />
                    </div>
                )}
            </Transition>
        </Auxiliary>
    );
};

export default SideDrawer;
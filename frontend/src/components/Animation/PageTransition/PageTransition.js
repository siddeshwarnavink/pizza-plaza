import { TransitionGroup, CSSTransition } from "react-transition-group";

import classes from './PageTransition.module.scss';

const PageTransition = props => {
    return (
        <TransitionGroup component={null}>
            <CSSTransition
                key={props.locationKey}
                classNames={{
                    enter: classes.PageTransition_Enter,
                    enterActive: classes.PageTransition_EnterActive,
                    exit: classes.PageTransition_Exit,
                    exitActive: classes.PageTransition_ExitActive
                }}
                timeout={750}
            >
                {props.children}
            </CSSTransition>
        </TransitionGroup>
    );
}

export default PageTransition;
import { useState } from 'react';
import { Transition } from 'react-transition-group';

import classes from './PizzaDetailDropdown.module.scss';
import joinCssClasses from '../../../../../utils/joinCssClasses';
import Backdrop from '../../../../UI/Backdrop/Backdrop';

const PizzaDetailDropdown = props => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenuHandler = () => {
        setShowMenu(value => !value);
    }

    return (
        <div className={classes.PizzaDetailDropdown__Wrapper} onClick={toggleMenuHandler} data-testid="pizza-detail-dropdown">
            <div className={classes.PizzaDetailDropdown}>
                <div className={classes.PizzaDetailDropdown__Value}>
                    <div className={classes.PizzaDetailDropdown_Value__Label}>{props.label}</div>
                    <div className={classes.PizzaDetailDropdown_Value__Value}>{props.options[props.value].text}</div>
                </div>

                <div className={classes.PizzaDetailDropdown__Spacer} />

                <div className={classes.PizzaDetailDropdown__Dropdown}>
                    ▼
                </div>
            </div>
            <Transition
                in={showMenu}
                timeout={200}
                mountOnEnter
                unmountOnExit
            >
                {state => (
                    <div>
                        <ul
                            className={joinCssClasses([
                                classes.PizzaDetailDropdownMenu,
                                state === "exiting" && classes.Hidden
                            ])
                            }>
                            {props.options.map((option, index) => (
                                <li key={index} className={classes.PizzaDetailDropdownMenu__Item} onClick={() => props.selectItem(index)}>
                                    <div>{option.text}</div>
                                    <div className={classes.PizzaDetailDropdownMenu_Item__Spacer} />
                                    <div className={classes.PizzaDetailDropdownMenu_Item__Price}>${option.price}</div>
                                </li>
                            ))}
                        </ul>
                        <Backdrop onClick={() => setShowMenu(true)} />
                    </div>
                )}
            </Transition>
        </div>
    );
};

PizzaDetailDropdown.defaultProps = {
    options: [],
}

export default PizzaDetailDropdown
import { useState } from 'react';

import classes from './CheckoutSteps.module.scss';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import CheckoutStepsItem from './CheckoutStepsItem/CheckoutStepsItem';
import PencilIcon from '../../Icons/PencilIcon';
import MapLocationIcon from '../../Icons/MapLocationIcon';
import DeliveryScooterIcon from '../../Icons/DeliveryScooterIcon';

const CheckoutSteps = props => {
    // const [currentSelected, setCurrentSelected] = useState(0);
    const [currentAnimatedSplit, setCurrentAnimatedSplit] = useState(null);

    const switchToSelectHandler = toIndex => {
        setCurrentAnimatedSplit({ fromIndex: props.currentSelected, toIndex });
        setTimeout(() => {
            props.setCurrentSelected(toIndex);
            setCurrentAnimatedSplit(null);
        }, 300);
    }

    const splitItems = [
        { icon: PencilIcon },
        { icon: MapLocationIcon },
        { icon: DeliveryScooterIcon }
    ];

    props.pullSwitchToSelectCtrl(switchToSelectHandler);

    return (
        <div className={classes.CheckoutSteps}>
            {splitItems.map((splitItem, index) => {
                const splitCssClasses = [classes.CheckoutSteps__Split];

                if (currentAnimatedSplit) {
                    if (currentAnimatedSplit.fromIndex === index && currentAnimatedSplit.toIndex === index + 1) {
                        splitCssClasses.push(classes.Animate__Forward)
                    }
                    else if (currentAnimatedSplit.fromIndex === index + 1 && currentAnimatedSplit.toIndex === index) {
                        splitCssClasses.push(classes.Animate__Reverse);
                    }
                }

                return (
                    <Auxiliary key={index}>
                        <CheckoutStepsItem
                            selected={props.currentSelected === index}
                            IconComponent={splitItem.icon}
                            onClick={props.lockNavigation ? () => { } : () => switchToSelectHandler(index)}
                        />
                        {(index + 1) !== splitItems.length ? (
                            <div className={splitCssClasses.join(' ')}></div>
                        ) : null}
                    </Auxiliary>
                )
            })}
        </div>
    );
}

export default CheckoutSteps;
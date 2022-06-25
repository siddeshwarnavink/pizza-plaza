import classes from './CartListItem.module.scss';
import randomIdGenerator from '../../../../utils/randomIdGenerator';
import joinCssClasses from '../../../../utils/joinCssClasses';
import DigitInput from '../../../UI/DigitInput/DigitInput';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import Chips from '../../../UI/Chips/Chips';

const CartListItem = props => {
    const pizzaSizeOptions = [
        { text: "Regular", price: 200 },
        { text: "Medium", price: 250 },
        { text: "Large", price: 400 }
    ];

    const pizzaCrustOptions = [
        { text: "New Hand Tossed", price: 200 }
    ];

    let itemPrice = (props.price + pizzaSizeOptions[props.size].price + pizzaCrustOptions[props.crust].price) * props.quantity;

    if (props.toppings && props.toppings.length > 0) {
        if (props.toppings.length > 1) {
            itemPrice += props.toppings.reduce((prevPopping, curentTopping) => prevPopping.price + curentTopping.price);
        } else {
            itemPrice += props.toppings[0].price;
        }
    }

    return (
        <li
            className={joinCssClasses([
                classes.CartListItem,
                props.mobile && classes.Mobile
            ])}
            data-testid="cart-list-item"
        >
            <div className={classes.CartListItem__Icon}>
                <img src={props.image} alt="Pizza image" />
            </div>

            <div className={classes.CartListItem__Detail}>
                <div className={classes.CartListItem_Detail__Title}>{props.name}</div>
                <div className={classes.CartListItem_Detail__SubTitle}>{pizzaSizeOptions[props.size].text} | {pizzaCrustOptions[props.crust].text}</div>
                <div className={classes.CartListItem_Detail__Input}>
                    {props.editable ? (
                        <DigitInput
                            value={props.quantity}
                            onIncrease={props.increaseCartItemQty}
                            onDecrease={props.decreaseCartItemQty}
                        />
                    ) : null}

                    <div className={classes.CartListItem_Detail_Input__Spacer} />

                    <div className={classes.CartListItem_Detail_Input__Price}>${itemPrice}</div>
                </div>
            </div>


            {props.toppings ? (
                <Auxiliary>
                    <div className={classes.CartListItem__FlexBreak}></div>

                    <div className={classes.CartListItem__Toppings}>
                        {props.toppings.map((topping, index) => (
                            <Chips
                                key={`${randomIdGenerator()}_${index}`}
                                editable={props.editable}
                                label={topping.name}
                                onRemove={() => props.removeToppingFromCartItem(props.cartIndex, topping.id)}
                            />
                        ))}
                    </div>
                </Auxiliary>
            ) : null}
        </li>
    );
};

export default CartListItem;
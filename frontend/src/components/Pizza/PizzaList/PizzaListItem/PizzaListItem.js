import { useState, useContext } from 'react';

import classes from './PizzaListItem.module.scss';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import CartOpenContext from '../../../../context/CartOpenContext';
import Button from '../../../UI/Button/Button';
import PizzaDetailDropdown from './PizzaDetailDropdown/PizzaDetailDropdown';
import Modal from '../../../UI/Modal/Modal';
import PizzaToppings from '../../../../containers/PizzaToppings/PizzaToppings';

const PizzaListItem = props => {
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedCrust, setSelectedCrust] = useState(0);
    const [isToppingsModalOpen, setIsToppingsModalOpen] = useState(false);
    const cartOpenCtx = useContext(CartOpenContext);

    const pizzaSizeOptions = [
        { text: "Regular", price: 200 },
        { text: "Medium", price: 250 },
        { text: "Large", price: 400 }
    ];

    const pizzaCrustOptions = [
        { text: "New Hand Tossed", price: 200 }
    ];

    const addToCartHandler = () => {
        props.addPizzaToCart({
            ...props.pizzaDetail,
            size: selectedSize,
            crust: selectedCrust,
            quantity: 1
        });

        props.pushNewFlashMessage({
            text: "Pizza added to cart!",
            action: {
                text: "View cart",
                onClick: cartOpenCtx.toggleCartOpen
            }
        });
    }

    const openToppingsModalHandler = () => {
        setIsToppingsModalOpen(true);
    }

    const closeToppingsModalHandler = () => {
        setIsToppingsModalOpen(false);
    }

    return (
        <Auxiliary>

            <div className={classes.PizzaListItem} data-testid="pizza-item">
                <Modal isOpen={isToppingsModalOpen} onClose={closeToppingsModalHandler}>
                    <PizzaToppings
                        closeModal={closeToppingsModalHandler}
                        pizzaDetail={props.pizzaDetail}
                        selectedSize={selectedSize}
                        selectedCrust={selectedCrust}
                    />
                </Modal>

                <div className={classes.PizzaListItem__Image} style={{ backgroundImage: `url("${props.pizzaDetail.image}")` }}>
                    <div className={classes.PizzaListItem_Image__Caption}>
                        <div className={classes.PizzaListItem_Caption__Price}>
                            ${props.pizzaDetail.price}
                        </div>

                        <div className={classes.PizzaListItem_Caption__Spacer} />

                        <div className={classes.PizzaListItem_Caption__Customize}>
                            <button onClick={openToppingsModalHandler}>
                                Customize ➜
                            </button>
                        </div>
                    </div>
                </div>

                <div className={classes.PizzaListItem__Detail}>
                    <div className={classes.PizzaListItem_Detail__Name}>{props.pizzaDetail.name}</div>
                    <div className={classes.PizzaListItem_Detail__Description}>{props.pizzaDetail.description}</div>

                    <div className={classes.PizzaListItem_Detail__Options}>
                        <PizzaDetailDropdown
                            label="Size"
                            options={pizzaSizeOptions}
                            value={selectedSize}
                            selectItem={(index) => setSelectedSize(index)}
                        />

                        <div className={classes.PizzaListItem_Detail__Options__Spacer} />

                        <PizzaDetailDropdown
                            label="Crust"
                            options={pizzaCrustOptions}
                            value={selectedCrust}
                            selectItem={(index) => setSelectedCrust(index)}
                        />
                    </div>

                    <div className={classes.PizzaListItem_Detail__Action} data-testid="add-to-cart">
                        <Button hollow theme="primary" onClick={addToCartHandler}>Add to cart</Button>
                    </div>
                </div>
            </div>
        </Auxiliary>
    );
};

export default PizzaListItem;
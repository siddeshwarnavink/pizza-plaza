import { connect } from 'react-redux';
import { useState, useContext, useEffect } from 'react';

import classes from './PizzaToppings.module.scss';
import * as actions from '../../store/actions';
import CartOpenContext from '../../context/CartOpenContext';
import Button from "../../components/UI/Button/Button";
import PizzaToppingItem from '../../components/Pizza/PizzaToppingItem/PizzaToppingItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

export const PizzaToppings = props => {
    const [addedToppings, setAddedToppings] = useState([]);
    const cartOpenCtx = useContext(CartOpenContext);

    useEffect(() => {
        props.fetchPizzaToppings();
    }, []);

    const addToppingHandler = (topping) => {
        setAddedToppings(currentToppings => {
            return [
                ...currentToppings,
                topping
            ];
        });
    }

    const removeToppingHandler = (topping) => {
        setAddedToppings(currentToppings => {
            return currentToppings.filter(searchTopping => searchTopping.id !== topping.id)
        });
    }

    const addToCartHandler = () => {
        props.addPizzaToCart({
            ...props.pizzaDetail,
            quantity: 1,
            size: props.selectedSize,
            crust: props.selectedCrust,
            toppings: addedToppings
        });

        props.pushNewFlashMessage({
            text: "Pizza added to cart!",
            action: {
                text: "View cart",
                onClick: cartOpenCtx.toggleCartOpen
            }
        });

        props.closeModal();
    }

    return (
        <div className={classes.PizzaToppings}>
            <h1 className={classes.PizzaToppings__Caption}>Add extra toppings</h1>

            {props.toppingListLoading ? <Spinner /> : (
                <Auxiliary>
                    <ul className={classes.PizzaToppings__List}>
                        {props.toppingList.map((topping, index) => (
                            <PizzaToppingItem
                                key={index}
                                name={topping.name}
                                image={topping.image}
                                price={topping.price}
                                isAdded={addedToppings.find(searchTopping => searchTopping.id === topping.id)}
                                onAddTopping={() => addToppingHandler(topping)}
                                onRemoveTopping={() => removeToppingHandler(topping)}
                            />
                        ))}
                    </ul>
                    <div className={classes.PizzaToppings__Action}>
                        <Button flat onClick={props.closeModal}>Cancel</Button>
                        <Button onClick={addToCartHandler}>Add to cart</Button>
                    </div>
                </Auxiliary>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    toppingList: state.pizzaToppings.toppingList,
    toppingListLoading: state.pizzaToppings.isLoading
});

const mapDispatchToProps = dispatch => ({
    addPizzaToCart: (pizzaDetail) => dispatch(actions.addPizzaToCart(pizzaDetail)),
    pushNewFlashMessage: (newMessage) => dispatch(actions.pushNewFlashMessage(newMessage)),
    fetchPizzaToppings: () => dispatch(actions.fetchPizzaToppings())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PizzaToppings);
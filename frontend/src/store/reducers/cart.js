import updateObject from '../../utils/updateObject';
import * as actionType from '../actions/actionTypes';

const initialState = {
    cartList: [],
    totalPrice: 0
};

const pizzaSizeOptions = [
    { text: "Regular", price: 200 },
    { text: "Medium", price: 250 },
    { text: "Large", price: 400 }
];

const pizzaCrustOptions = [
    { text: "New Hand Tossed", price: 200 }
];

const updateCartItem = (state, action) => {
    const updatingCartItem = state.cartList.find((_, index) => index === action.index);
    let totalPrice = state.totalPrice;

    if (action.update.quantity) {
        totalPrice -= (updatingCartItem.price + pizzaSizeOptions[updatingCartItem.size].price + pizzaCrustOptions[updatingCartItem.crust].price) * updatingCartItem.quantity;
        totalPrice += (updatingCartItem.price + pizzaSizeOptions[updatingCartItem.size].price + pizzaCrustOptions[updatingCartItem.crust].price) * action.update.quantity;
    }

    if (action.update.toppings) {
        updatingCartItem.toppings.forEach(topping => {
            totalPrice -= topping.price;
        });
        action.update.toppings.forEach(topping => {
            totalPrice += topping.price;
        });
    }

    return updateObject(state, {
        totalPrice,
        cartList: state.cartList.map((cartItem, index) => {
            if (index === action.index) {
                return {
                    ...cartItem,
                    ...action.update
                }
            }

            return cartItem;
        })
    });
}

const removeCartItem = (state, action) => {
    const deleteCartItem = state.cartList.find((_, index) => index === action.index);

    return {
        ...state,
        totalPrice: state.totalPrice - ((deleteCartItem.price + pizzaSizeOptions[deleteCartItem.size].price + pizzaCrustOptions[deleteCartItem.crust].price) * deleteCartItem.quantity),
        cartList: state.cartList.filter((_, index) => index !== action.index)
    }
}

const addCartItem = (state, action) => {
    let totalPrice = state.totalPrice + action.pizzaDetails.price + pizzaSizeOptions[action.pizzaDetails.size].price + pizzaCrustOptions[action.pizzaDetails.crust].price;

    if (action.pizzaDetails.toppings && action.pizzaDetails.toppings.length > 0) {
        if (action.pizzaDetails.toppings.length > 1) {
            totalPrice += action.pizzaDetails.toppings.reduce((prevPopping, curentTopping) => prevPopping.price + curentTopping.price);
        } else {
            totalPrice += action.pizzaDetails.toppings[0].price;
        }
    }

    return updateObject(state, {
        totalPrice,
        cartList: [
            ...state.cartList,
            {
                toppings: [],
                ...action.pizzaDetails
            }
        ]
    });
};

const clearCartItems = (state) => {
    return updateObject(state, {
        totalPrice: 0,
        cartList: []
    });
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.UPDATE_CART_ITEM:
            return updateCartItem(state, action);

        case actionType.REMOVE_CART_ITEM:
            return removeCartItem(state, action);

        case actionType.ADD_CART_ITEM:
            return addCartItem(state, action)

        case actionType.CLEAR_CART_ITEMS:
            return clearCartItems(state, action);

        default:
            return state;
    }
};

export default cartReducer;
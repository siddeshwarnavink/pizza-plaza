import * as actionType from './actionTypes';

const updateCartItem = (index, update) => ({
    type: actionType.UPDATE_CART_ITEM,
    index,
    update
});

const removeCartItem = (index) => ({
    type: actionType.REMOVE_CART_ITEM,
    index
});

const addCartItem = (pizzaDetails) => ({
    type: actionType.ADD_CART_ITEM,
    pizzaDetails
});

const clearCartItems = () => ({
    type: actionType.CLEAR_CART_ITEMS
})

export const clearCart = () => dispatch => {
    dispatch(clearCartItems());
}

export const modifyCartItemQuantity = (index, newQty) => dispatch => {
    if (newQty < 1) {
        dispatch(removeCartItem(index));
    } else {
        dispatch(updateCartItem(index, { quantity: newQty }));
    }
}

export const addPizzaToCart = (pizzaDetail) => (dispatch, getState) => {
    if (!getState().cart.cartList.find(cartItem => (
        cartItem.id === pizzaDetail.id
        && cartItem.size === pizzaDetail.size
        && cartItem.crust === pizzaDetail.crust
    ))) {
        dispatch(addCartItem(pizzaDetail));
    } else {
        getState().cart.cartList.forEach((cartItem, index) => {
            if (cartItem.id === pizzaDetail.id) {
                dispatch(updateCartItem(index, { 
                    // id: randomIdGenerator(),
                    quantity: cartItem.quantity + 1 
                }));
            }
        });
    }
};

export const removeToppingFromCartItem = (cartItemId, toppingId) => (dispatch, getState) => {
    dispatch(updateCartItem(cartItemId, { 
        // id: randomIdGenerator(),
        toppings: getState().cart.cartList[cartItemId].toppings.filter(topping => topping.id !== toppingId)
    }));
};
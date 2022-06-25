import * as actionType from './actionTypes';
import * as constants from '../../constants'

const pizzaToppingsLoading = () => ({
    type: actionType.PIZZA_TOPPINGS_LOADING,
});

const pizzaToppingsSuccess = (toppingList) => ({
    type: actionType.PIZZA_TOPPINGS_SUCCESS,
    toppingList
});

const pizzaToppingsFailed = (error) => ({
    type: actionType.PIZZA_TOPPINGS_FAILED,
    error
});

export const fetchPizzaToppings = () => async dispatch => {
    dispatch(pizzaToppingsLoading());

    try {
        const response = await fetch(`${constants.API_URL}/ingredients/list`);
        const data = await response.json();

        dispatch(pizzaToppingsSuccess(data));
    } catch (error) {
        dispatch(pizzaToppingsFailed(error));
    }
}
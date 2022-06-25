import updateObject from '../../utils/updateObject';
import * as actionType from '../actions/actionTypes';

const initialState = {
    ordersList: [],
    isLoading: false,
    error: null
};

const ordersLoading = state => {
    return updateObject(state, {
        isLoading: true,
        error: null,
        ordersList: []
    });
}

const ordersSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
        ordersList: action.ordersList
    });
}

const ordersFailed = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error,
        ordersList: []
    });
}


const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ORDERS_LOADING:
            return ordersLoading(state, action);

        case actionType.ORDERS_SUCCESS:
            return ordersSuccess(state, action);

        case actionType.ORDERS_FAILED:
            return ordersFailed(state, action);

        default:
            return state;
    }
};

export default ordersReducer;
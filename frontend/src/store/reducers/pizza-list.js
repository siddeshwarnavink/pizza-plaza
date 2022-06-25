import updateObject from '../../utils/updateObject';
import * as actionType from '../actions/actionTypes';

const initialState = {
    pizzaList: [],
    lazyLoad: null,
    isLoading: false,
    isLazyLoading: false,
    error: null
};

const pizzaListLoading = state => {
    return updateObject(state, {
        isLoading: true,
        error: null,
        pizzaList: []
    });
}

const pizzaListSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
        pizzaList: action.pizzaList,
        lazyLoad: action.lazyLoad
    });
}

const pizzaListFailed = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error,
        pizzaList: []
    });
}

const lazyPizzaListStart = state => {
    return updateObject(state, {
        isLazyLoading: true
    });
}

const lazyPizzaListSuccess = (state, action) => {
    return updateObject(state, {
        isLazyLoading: false,
        pizzaList: [
            ...state.pizzaList,
            ...action.pizzaList
        ],
        lazyLoad: action.lazyLoad
    });
}

const pizzaReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PIZZA_LIST_LOADING:
            return pizzaListLoading(state, action);

        case actionType.PIZZA_LIST_SUCCESS:
            return pizzaListSuccess(state, action);

        case actionType.PIZZA_LIST_FAILED:
            return pizzaListFailed(state, action);

        case actionType.LAZY_PIZZA_LIST_START:
            return lazyPizzaListStart(state, action);

        case actionType.LAZY_PIZZA_LIST_SUCCESS:
            return lazyPizzaListSuccess(state, action);

        default:
            return state;
    }
};

export default pizzaReducer;
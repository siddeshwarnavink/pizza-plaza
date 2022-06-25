import updateObject from "../../utils/updateObject";
import * as actionType from '../actions/actionTypes';

const initialState = {
    toppingList: [
        {
            id: 1,
            name: "Cheese",
            image: "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2017/10/thumb_720_450_Swiss_Cheesedreamstime_xl_20274250.jpg",
            price: 2
        },
        {
            id: 2,
            name: 'Pepperoni',
            image: 'https://media.istockphoto.com/photos/heap-of-pepperoni-picture-id169943249?k=20&m=169943249&s=612x612&w=0&h=EzhEoQaW8B3w356cQjmXXJC6yQnhvgwxLdC7Z9IIUhQ=',
            price: 3
        }
    ],
    isLoading: false,
    error: null
};

const pizzaToppingsLoading = state => {
    return updateObject(state, {
        isLoading: true,
        error: null,
        toppingList: []
    });
}

const pizzaToppingsSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
        toppingList: action.toppingList
    });
}

const pizzaToppingsFailed = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error,
        toppingList: []
    });
}

const pizzaToppingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PIZZA_TOPPINGS_LOADING:
            return pizzaToppingsLoading(state, action);

        case actionType.PIZZA_TOPPINGS_SUCCESS:
            return pizzaToppingsSuccess(state, action);

        case actionType.PIZZA_TOPPINGS_FAILED:
            return pizzaToppingsFailed(state, action);

        default:
            return state;
    }
};

export default pizzaToppingsReducer;
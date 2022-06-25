import * as actionType from './actionTypes';
import * as constants from '../../constants'

const pizzaListLoading = () => ({
    type: actionType.PIZZA_LIST_LOADING,
});

const pizzaListSuccess = (pizzaList, lazyLoad) => ({
    type: actionType.PIZZA_LIST_SUCCESS,
    pizzaList,
    lazyLoad
});

const pizzaListFailed = (error) => ({
    type: actionType.PIZZA_LIST_FAILED,
    error
});

const pizzaListLazyLoading = () => ({
    type: actionType.LAZY_PIZZA_LIST_START
});

const pizzaListLazySuccess = (pizzaList, lazyLoad) => ({
    type: actionType.LAZY_PIZZA_LIST_SUCCESS,
    pizzaList,
    lazyLoad
});

export const fetchPizzaList = (perPage = 5) => async dispatch => {
    dispatch(pizzaListLoading());

    try {
        const response = await fetch(`${constants.API_URL}/pizza/list?page=1&limit=${perPage}`);
        const data = await response.json();

        dispatch(pizzaListSuccess(data.pizzaList, {
            ...data.lazyLoad,
            perPage
        }));
    } catch (error) {
        dispatch(pizzaListFailed(error));
    }
}

export const fetchNextPizzaList = (page) => async (dispatch, getState) => {
    dispatch(pizzaListLazyLoading());

    const perPage = getState().pizzaList.lazyLoad.perPage;

    try {
        const response = await fetch(`${constants.API_URL}/pizza/list?page=${page}&limit=${perPage}`);
        const data = await response.json();

        dispatch(pizzaListLazySuccess(data.pizzaList, {
            ...data.lazyLoad,
            perPage
        }));
    } catch (error) {
        dispatch(pizzaListFailed(error));
    }
}
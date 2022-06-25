import * as actionType from './actionTypes';
import * as constants from '../../constants'

const ordersLoading = () => ({
    type: actionType.ORDERS_LOADING,
});

const ordersSuccess = (ordersList) => ({
    type: actionType.ORDERS_SUCCESS,
    ordersList
});

const ordersFailed = (error) => ({
    type: actionType.ORDERS_FAILED,
    error
});

export const fetchOrders = () => async (dispatch, getState) => {
    dispatch(ordersLoading());

    try {
        const response = await fetch(`${constants.API_URL}/orders/list?token=${getState().auth.token}`);
        const data = await response.json();

        dispatch(ordersSuccess(data));
    } catch (error) {
        dispatch(ordersFailed(error));
    }
}

export const placeOrder = (orderDetail) => (dispatch, getState) => {
    Promise.resolve().then(async () => {
        dispatch(ordersLoading());

        try {
            const response = await fetch(`${constants.API_URL}/orders/place?token=${getState().auth.token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: orderDetail.name,
                    email: orderDetail.email,
                    address: orderDetail.address,
                    phone: orderDetail.phone,
                    order: orderDetail.order
                })
            });

            const data = await response.json();

            if (response.status === 400) {
                throw {
                    message: data.message
                };
            }

            dispatch(ordersSuccess([]));
        } catch (error) {
            dispatch(ordersFailed(error));
        }
    });
}
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from '../../store/actions';
import PageContainer from "../../hoc/PageContainer/PageContainer";
import OrderList from '../../components/Orders/OrderList/OrderList';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Spinner from '../../components/UI/Spinner/Spinner';
import RetryFallback from '../../components/RetryFallback/RetryFallback';

export const CustomerOrders = props => {
    useEffect(() => {
        props.fetchOrders();
    }, []);

    const retryFetchingHandler = () => {
        props.fetchOrders();
    }

    return (
        <PageContainer>
            {!props.isAuthenticated ? (
                <Navigate to="/auth/login" replace />
            ) : null}
            {props.ordersLoading ? <Spinner /> : props.ordersError ? <RetryFallback onRetry={retryFetchingHandler} /> : (
                <Auxiliary>
                    <h1>Orders</h1>

                    <OrderList
                        orderList={props.ordersList}
                    />
                </Auxiliary>
            )}
        </PageContainer>
    );
};



const mapStateToProps = state => ({
    ordersList: state.orders.ordersList,
    ordersLoading: state.orders.isLoading,
    ordersError: state.orders.error,
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerOrders);
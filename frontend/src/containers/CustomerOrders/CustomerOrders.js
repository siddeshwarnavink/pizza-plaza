import { Navigate } from 'react-router-dom';
import { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from '../../store/actions';
import PageContainer from "../../hoc/PageContainer/PageContainer";
import OrderList from '../../components/Orders/OrderList/OrderList';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Spinner from '../../components/UI/Spinner/Spinner';

export const CustomerOrders = props => {
    useEffect(() => {
        props.fetchOrders();
    }, []);

    return (
        <PageContainer>
            {!props.isAuthenticated ? (
                <Navigate to="/auth/login" replace />
            ) : null}
            {props.ordersLoading ? <Spinner /> : (
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
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerOrders);
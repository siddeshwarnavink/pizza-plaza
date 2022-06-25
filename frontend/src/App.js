import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';
import Layout from "./hoc/Layout/Layout";
import CustomerHome from './containers/CustomerHome/CustomerHome';
import CartCheckout from './containers/CartCheckout/CartCheckout';
import CustomerOrders from './containers/CustomerOrders/CustomerOrders';
import Auth from './containers/Auth/Auth';
import AuthLogout from './containers/Auth/AuthLogout/AuthLogout';
import PageTransition from './components/Animation/PageTransition/PageTransition';

const App = props => {
    const location = useLocation();

    useEffect(() => {
        props.onTryAutoSignup();
    }, []);

    return (
        <Layout isAuthenticated={props.isAuthenticated}>
            <PageTransition locationKey={location.key}>
                <Routes>
                    <Route path="auth">
                        <Route path="logout" element={<AuthLogout />} />
                        <Route path="login" element={<Auth isSignin />} />
                        <Route path="createAccount" element={<Auth isSignin={false} />} />
                    </Route>

                    <Route path="customer">
                        <Route path="home" element={<CustomerHome />} />
                        <Route path="orders" element={<CustomerOrders />} />
                    </Route>

                    <Route path="cart">
                        <Route path="checkout" element={<CartCheckout />} />
                    </Route>

                    <Route
                        path="*"
                        element={<Navigate to="/customer/home" replace />}
                    />
                </Routes>
            </PageTransition>
        </Layout>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
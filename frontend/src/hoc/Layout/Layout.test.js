import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { Layout } from './Layout';
import cartIconClasses from '../../components/Cart/CartIcon/CartIcon.module.scss';

const mockPizzaList = [
    { name: 'Pizza A', size: 0, crust: 0, quantity: 3 },
    { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
];

const mockStore = configureStore([]);

describe('<Layout />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            cart: { cartList: [] },
        });
    });

    test('should render the <Toolbar />', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Layout cartList={mockPizzaList} flashNotificationMessages={[]}>
                        <p>hello world!</p>
                    </Layout>
                </Router>
            </Provider>
        );
        const toolbarEl = screen.getByTestId('app-toolbar');

        expect(toolbarEl).toBeInTheDocument();
    });

    test('should render the <Cart />', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Layout cartList={mockPizzaList} flashNotificationMessages={[]}>
                        <p>hello world!</p>
                    </Layout>
                </Router>
            </Provider>
        );
        const cartEl = screen.getByTestId('app-cart');

        expect(cartEl).toBeInTheDocument();
    });

    test('should render two <FlashNotification /> if there are two notifications', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Layout cartList={mockPizzaList} flashNotificationMessages={[1, 2]}>
                        <p>hello world!</p>
                    </Layout>
                </Router>
            </Provider>
        );
        const flashNotificationEls = screen.queryAllByTestId('app-flashnotification');

        expect(flashNotificationEls.length).toBe(2);
    });

    test('should render the children content', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Layout cartList={mockPizzaList} flashNotificationMessages={[]}>
                        <p>hello world!</p>
                    </Layout>
                </Router>
            </Provider>
        );
        const textEl = screen.getByText('hello world!');

        expect(textEl).toBeInTheDocument();
    });

    test('should trigger setTimeout() and add shake effect to cart icon if cartList length is more than 0', () => {
        let isTriggered = false;
        let receivedCallback;

        window.setTimeout = (callback) => {
            isTriggered = true;
            receivedCallback = callback;
        }

        render(
            <Provider store={store}>
                <Router>
                    <Layout cartList={mockPizzaList} flashNotificationMessages={[]}>
                        <p>hello world!</p>
                    </Layout>
                </Router>
            </Provider>
        );

        const cartIconEl = screen.getByTestId('cart-icon-container');

        expect(isTriggered).toBe(true);
        expect(cartIconEl).toHaveClass(`${cartIconClasses.CartIcon} ${cartIconClasses.Shake}`);

        receivedCallback();

        expect(cartIconEl).toHaveClass(`${cartIconClasses.CartIcon}`);
    });
});
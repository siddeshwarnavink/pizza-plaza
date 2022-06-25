import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import CartList from './CartList';

describe('<CartList />', () => {
    test('should be wrapped by <CartContainer /> HOC', () => {
        render(
            <Router>
                <CartList cartList={[]} />
            </Router>
        );

        const CartContainerEl = screen.getByTestId('cart-container-component')
        expect(CartContainerEl).toBeInTheDocument();
    });

    test('renders text "your cart"', () => {
        render(
            <Router>
                <CartList cartList={[]} />
            </Router>
        );

        const textEl = screen.getByText('your cart', { exact: false });
        expect(textEl).toBeInTheDocument();
    });

    test('renders checkout button', () => {
        render(
            <Router>
                <CartList cartList={[]} />
            </Router>
        );

        const checkoutButtonEl = screen.getByTestId('checkout-btn');
        expect(checkoutButtonEl).toBeInTheDocument();
        expect(checkoutButtonEl).toHaveTextContent('Checkout', { exact: false });
    });

    test('renders <CartListItem />', () => {
        const randomNumber = Math.random();
        const mockPizzaList = [
            { name: 'Pizza A', size: 0, crust: 0, quantity: randomNumber }
        ]

        render(
            <Router>
                <CartList cartList={mockPizzaList} />
            </Router>
        );

        const cartListItemEl = screen.getByTestId('cart-list-item');
        expect(cartListItemEl).toBeInTheDocument();
    });
});
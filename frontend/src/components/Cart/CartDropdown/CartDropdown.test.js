import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import CartDropdown from './CartDropdown';

describe('<CartDropdown />', () => {
    test('should render <MobileSwipeBar /> if mobile', () => {
        const mockPizzaList = [
            { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
            { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
            { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
        ]
        render(
            <Router>
                <CartDropdown mobile cartList={mockPizzaList} />
            </Router>
        );

        const mobileSwipebarEl = screen.getByTestId('mobile-swipebar');
        expect(mobileSwipebarEl).toBeInTheDocument();
    });

    test('should not render <MobileSwipeBar /> if mobile and the cart has only one item', () => {
        const mockPizzaList = [
            { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
        ]
        render(
            <Router>
                <CartDropdown mobile cartList={mockPizzaList} />
            </Router>
        );

        const mobileSwipebarEl = screen.queryByTestId('mobile-swipebar');
        expect(mobileSwipebarEl).toBeNull();
    });

    test('should not render <EmptyCart /> if the cart is empty', () => {
        const mockPizzaList = [];
        render(
            <Router>
                <CartDropdown mobile cartList={mockPizzaList} />
            </Router>
        );

        const emptyCartEl = screen.getByTestId('empty-cart');
        expect(emptyCartEl).toBeInTheDocument();
    });

    test('should not render <CartList /> if the cart is not empty', () => {
        const mockPizzaList = [
            { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
            { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
            { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
        ];
        render(
            <Router>
                <CartDropdown mobile cartList={mockPizzaList} />
            </Router>
        );

        const emptyCartEl = screen.getByTestId('cart-list');
        expect(emptyCartEl).toBeInTheDocument();
    });
});
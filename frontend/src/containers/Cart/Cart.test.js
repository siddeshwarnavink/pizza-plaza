import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Cart } from './Cart';

const mockPizzaList = [
    { name: 'Pizza A', size: 0, crust: 0, quantity: 3 },
    { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
]

describe('<Cart />', () => {
    test('should render <CartDropdown />', () => {
        render(
            <Router>
                <Cart
                    cartList={mockPizzaList}
                />
            </Router>
        );
        const cartDropdownEl = screen.getByTestId('cart-dropdown');

        expect(cartDropdownEl).toBeInTheDocument();
    });

    test('should render <Backdrop /> if the cart is open', () => {
        render(
            <Router>
                <Cart
                    cartList={mockPizzaList}
                    isCartOpen
                />
            </Router>
        );
        const cartDropdownEl = screen.getByTestId('app-backdrop');

        expect(cartDropdownEl).toBeInTheDocument();
    })

    test('should not render <Backdrop /> if the cart is not open', () => {
        render(
            <Router>
                <Cart
                    cartList={mockPizzaList}
                    isCartOpen={false}
                />
            </Router>
        );
        const cartDropdownEl = screen.queryAllByTestId('app-backdrop');

        expect(cartDropdownEl.length).toBe(0);
    })
});
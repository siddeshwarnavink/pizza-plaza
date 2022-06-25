import { render, screen } from '@testing-library/react';

import emptyCartImage from '../../../images/empty_cart.svg';
import EmptyCart from './EmptyCart';

describe('<EmptyCart />', () => {
    test('should be wrapped by <CartContainer /> HOC', () => {
        render(<EmptyCart />);

        const CartContainerEl = screen.getByTestId('cart-container-component')
        expect(CartContainerEl).toBeInTheDocument();
    });

    test('renders text "cart is empty"', () => {
        render(<EmptyCart />);

        const textEl = screen.getByText('cart is empty', { exact: false });
        expect(textEl).toBeInTheDocument();
    });

    test('renders correct empty cart image', () => {
        render(<EmptyCart />);

        const emptyCartImageEl = screen.getByRole('img');
        expect(emptyCartImageEl).toHaveAttribute('src', emptyCartImage);
        expect(emptyCartImageEl).toHaveAttribute('alt', 'Empty cart')
    });
});
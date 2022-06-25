import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CartIcon from './CartIcon';

describe('<CartIcon />', () => {
    test('renders the cart icon', () => {
        render(<CartIcon />);

        const cartIconEl = screen.getByTestId('cart-icon');
        expect(cartIconEl).toBeInTheDocument();
    });

    test('renders the cart item count', () => {
        const randomNumber = Math.random();
        render(<CartIcon cartItemCount={randomNumber} />);

        const textEl = screen.getByTestId('cart-quantity');
        expect(textEl).toHaveTextContent(randomNumber, { exact: false });
    });

    test('executes toggleCart on click', () => {
        let isClicked = false;

        const onClickHandler = () => {
            isClicked = true;
        }

        render(<CartIcon toggleCart={onClickHandler} />);

        const iconContanerEl = screen.getByTestId('cart-icon-container');
        userEvent.click(iconContanerEl)

        expect(isClicked).toBe(true);
    });
});
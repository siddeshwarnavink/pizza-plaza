import { render, screen } from '@testing-library/react';

import CartContainer from './CartContainer';

describe('<CartContainer />', () => {
    test('should render the children content', () => {
        render(
            <CartContainer>
                <p>hello world!</p>
            </CartContainer>
        );
        const textEl = screen.getByText('hello world!');

        expect(textEl).toBeInTheDocument();
    });
});
import { render, screen } from '@testing-library/react';

import CartListItem from './CartListItem';

describe('<CartListItem />', () => {
    test('should render the pizza name', () => {
        render(<CartListItem name="Pizza A" size={0} crust={0} quantity={0} />);

        const textEl = screen.getByText('Pizza A', { exact: false });
        expect(textEl).toBeInTheDocument();
    });

    test('should render the pizza size', () => {
        render(<CartListItem name="Pizza A" size={0} crust={0} quantity={0} />);

        const textEl = screen.getByText('Regular', { exact: false });
        expect(textEl).toBeInTheDocument();
    });

    test('should render the pizza quantity if editable', () => {
        const randomNumber = Math.random();
        render(<CartListItem name="Pizza A" size={0} crust={0} quantity={randomNumber} editable />);

        const textEl = screen.getByText(randomNumber, { exact: false });
        expect(textEl).toBeInTheDocument();
    });

    test('should render a <DigitInput /> if editable', () => {
        const randomNumber = Math.random();
        render(<CartListItem name="Pizza A" toppings={[1, 2]} size={0} crust={0} quantity={randomNumber} editable />);

        const DigitInputEls = screen.queryAllByTestId('app-digitinput');
        expect(DigitInputEls.length).toBe(1);
    });

    test('should render two <Chips /> if the item has two toppings', () => {
        const randomNumber = Math.random();
        render(<CartListItem name="Pizza A" toppings={[1, 2]} size={0} crust={0} quantity={randomNumber} />);

        const chipsEls = screen.queryAllByTestId('app-chips');
        expect(chipsEls.length).toBe(2);
    });

    test('should render two <Chips /> if the item has two toppings', () => {
        const randomNumber = Math.random();
        render(<CartListItem name="Pizza A" toppings={[1, 2]} size={0} crust={0} quantity={randomNumber} />);

        const chipsEls = screen.queryAllByTestId('app-chips');
        expect(chipsEls.length).toBe(2);
    });

    test('should not render any <Chips /> if there are no toppings', () => {
        const randomNumber = Math.random();
        render(<CartListItem name="Pizza A" toppings={[]} size={0} crust={0} quantity={randomNumber} />);

        const chipsEls = screen.queryAllByTestId('app-chips');
        expect(chipsEls.length).toBe(0);
    });
});
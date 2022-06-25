import { render, screen } from '@testing-library/react';

import { PizzaToppings } from './PizzaToppings';

describe('<PizzaToppings />', () => {
    test('should render the caption "Add extra toppings"', () => {
        render(<PizzaToppings toppingList={[]} />);

        const textEl = screen.getByText('Add extra toppings', { exact: false });
        expect(textEl).toBeInTheDocument();
    });

    test('should render two <PizzaToppingItem /> for two topping', () => {
        render(<PizzaToppings toppingList={[1, 2]} />);

        const toppingItemEls = screen.queryAllByTestId('app-pizza-topping-item');
        expect(toppingItemEls.length).toBe(2)
    });

    test('should render two <Button /> "Add to cart" and "Cancel"', () => {
        render(<PizzaToppings toppingList={[]} />);

        const textEl = screen.getByText('Add to cart');
        const textEl2 = screen.getByText('Cancel');
        expect(textEl).toBeInTheDocument();
        expect(textEl2).toBeInTheDocument();
    });
});
import { render, screen } from '@testing-library/react';

import PizzaList from './PizzaList';

describe('<PizzaList />', () => {
    test('should render two <PizzaListItem />', () => {
        const mockPizzaList = [
            { name: 'Pizza A', size: 0, crust: 0, quantity: 3 },
            { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
        ]

        render(<PizzaList pizzaList={mockPizzaList} />);
        const pizzaItemEls = screen.queryAllByTestId('pizza-item');

        expect(pizzaItemEls).toHaveLength(2);
    });
});
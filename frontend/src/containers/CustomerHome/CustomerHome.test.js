import { render, screen } from '@testing-library/react';

import { CustomerHome } from './CustomerHome';

const mockPizzaList = [
    { name: 'Pizza A', size: 0, crust: 0, quantity: 3 },
    { name: 'Pizza A', size: 0, crust: 0, quantity: 2 },
]

describe('<CustomerHome />', () => {
    test('should be wrapped by <PageContainer /> HOC', () => {
        render(
            <CustomerHome 
                pizzaList={mockPizzaList}
            />
        );
        const pageWrapperEl = screen.getByTestId('app-page-container');

        expect(pageWrapperEl).toBeInTheDocument();
    });
});
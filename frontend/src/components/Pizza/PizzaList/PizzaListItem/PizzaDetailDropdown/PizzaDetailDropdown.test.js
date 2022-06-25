import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PizzaDetailDropdown from './PizzaDetailDropdown';

const pizzaSizeOptions = [
    { text: "Regular", price: 200 },
    { text: "Medium", price: 250 },
    { text: "Large", price: 400 }
];

describe('<PizzaDetailDropdown />', () => {
    test('should render the label', () => {
        render(
            <PizzaDetailDropdown
                label="My custom label"
                options={pizzaSizeOptions}
                value={1}
            />
        );
        const textEl = screen.getByText('My custom label');

        expect(textEl).toBeInTheDocument();
    });

    test('should render the default value', () => {
        render(
            <PizzaDetailDropdown
                label="My custom label"
                options={pizzaSizeOptions}
                value={1}
            />
        );
        const textEl = screen.getByText('Medium');

        expect(textEl).toBeInTheDocument();
    });

    test('should render the all options on click', () => {
        render(
            <PizzaDetailDropdown
                label="My custom label"
                options={pizzaSizeOptions}
                value={1}
            />
        );
        const dropdownEl = screen.getByTestId('pizza-detail-dropdown');

        userEvent.click(dropdownEl);

        const textEl = screen.getByText('Regular');
        const textEl2 = screen.getByText('Large');
        expect(textEl).toBeInTheDocument();
        expect(textEl2).toBeInTheDocument();
    });

    test('should select item if option is clicked', () => {
        let isItemSelected = false;

        render(
            <PizzaDetailDropdown
                label="My custom label"
                options={pizzaSizeOptions}
                value={1}
                selectItem={() => { isItemSelected = true; }}
            />
        );
        const dropdownEl = screen.getByTestId('pizza-detail-dropdown');

        userEvent.click(dropdownEl);
        const textEl = screen.getByText('Regular');
        userEvent.click(textEl);

        const textEl2 = screen.getByText('Regular');

        expect(isItemSelected).toBe(true);
        expect(textEl2).toBeInTheDocument();
    });
});
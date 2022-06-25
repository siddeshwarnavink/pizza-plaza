import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PizzaToppingItem from './PizzaToppingItem';

describe('<PizzaToppingItem />', () => {
    test('should render the name of the topping', () => {
        render(
            <PizzaToppingItem isAdded={false} name="my text" />
        );
        const textEl = screen.getByText('my text');

        expect(textEl).toBeInTheDocument();
    });

    test('should display "Add" button when the topping is not already added', () => {
        render(
            <PizzaToppingItem isAdded={false} name="my text" />
        );
        const textEl = screen.getByText('+ Add');

        expect(textEl).toBeInTheDocument();
    });

    test('should display "Remove" button when the topping is already added', () => {
        render(
            <PizzaToppingItem isAdded={true} name="my text" />
        );
        const textEl = screen.getByText('- Remove');

        expect(textEl).toBeInTheDocument();
    });

    test('should trigger onAddTopping when "Add" is clicked', () => {
        let isTriggered = false;

        render(
            <PizzaToppingItem isAdded={false} name="my text" onAddTopping={() => { isTriggered = true }} />
        );
        const addButtonEl = screen.getByRole('button');

        userEvent.click(addButtonEl);

        expect(isTriggered).toBe(true);
    });

    test('should trigger onRemoveTopping when "Remove" is clicked', () => {
        let isTriggered = false;

        render(
            <PizzaToppingItem isAdded={true} name="my text" onRemoveTopping={() => { isTriggered = true }} />
        );
        const addButtonEl = screen.getByRole('button');

        userEvent.click(addButtonEl);

        expect(isTriggered).toBe(true);
    });
});
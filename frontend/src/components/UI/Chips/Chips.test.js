import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Chips from './Chips';

describe('<Chips />', () => {
    test('should render the label text', () => {
        render(
            <Chips label="my text" editable />
        );
        const textEl = screen.getByText('my text');

        expect(textEl).toBeInTheDocument();
    });

    test('should trigger onRemove when "X" is clicked', () => {
        let isTriggered = false;

        window.setTimeout = callback => {
            callback();
        };

        render(
            <Chips label="my text" onRemove={() => { isTriggered = true; }} editable />
        );
        const closeBtnEl = screen.getByRole('button');

        userEvent.click(closeBtnEl);

        expect(isTriggered).toBe(true);
    });
});
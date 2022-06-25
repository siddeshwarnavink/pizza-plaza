import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DigitInput from './DigitInput';

describe('<DigitInput />', () => {
    test('should render the digit value', () => {
        const randomNumber = Math.random();
        render(
            <DigitInput value={randomNumber} />
        );
        const textEl = screen.getByText(randomNumber);

        expect(textEl).toBeInTheDocument();
    });

    test('should trigger onIncrease when "+" button is clicked', () => {
        let isTriggered = false

        render(
            <DigitInput
                value={2}
                maxVal={5}
                onIncrease={() => { isTriggered = true; }}
            />
        );
        const textEl = screen.getByText('+');

        userEvent.click(textEl);

        expect(isTriggered).toBe(true);
    });

    test('should trigger onDecrease when "-" button is clicked', () => {
        let isTriggered = false

        render(
            <DigitInput
                value={2}
                maxVal={5}
                onDecrease={() => { isTriggered = true; }}
            />
        );
        const textEl = screen.getByText('-');

        userEvent.click(textEl);

        expect(isTriggered).toBe(true);
    });

    test('should not trigger onIncrease if the maximum value is reached', () => {
        let isTriggered = false

        render(
            <DigitInput
                value={20}
                maxVal={20}
                onIncrease={() => { isTriggered = true; }}
            />
        );
        const textEl = screen.getByText('+');

        userEvent.click(textEl);

        expect(isTriggered).toBe(false);
    });

    test('should not trigger onDecrease if the minimum value is reached', () => {
        let isTriggered = false

        render(
            <DigitInput
                value={21}
                minVal={20}
                onDecrease={() => { isTriggered = true; }}
            />
        );
        const textEl = screen.getByText('-');

        userEvent.click(textEl);

        expect(isTriggered).toBe(false);
    });
});
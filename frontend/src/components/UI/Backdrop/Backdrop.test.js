import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Backdrop from './Backdrop';

describe('<Backdrop />', () => {
    test('should render the backdrop', () => {
        render(
            <Backdrop />
        );
        const backdropEl = screen.getByTestId('app-backdrop');

        expect(backdropEl).toBeInTheDocument();
    });

    test('should trigger onClick when it is clicked', () => {
        let isTriggered = false;

        render(
            <Backdrop onClick={() => { isTriggered = true; }} />
        );
        const backdropEl = screen.getByTestId('app-backdrop');

        userEvent.click(backdropEl);

        expect(isTriggered).toBe(true);
    });
});
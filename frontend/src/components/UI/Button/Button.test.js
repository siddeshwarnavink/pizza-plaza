import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('<Button />', () => {
    test('should render the children text', () => {
        render(
            <Button>my text</Button>
        );
        const textEl = screen.getByText('my text');

        expect(textEl).toBeInTheDocument();
    });

    test('should trigger onClick when being clicked', () => {
        let isClicked = false;
        render(
            <Button onClick={() => { isClicked = true; }}>my text</Button>
        );
        const textEl = screen.getByText('my text');

        userEvent.click(textEl);

        expect(isClicked).toBe(true);
    });
});
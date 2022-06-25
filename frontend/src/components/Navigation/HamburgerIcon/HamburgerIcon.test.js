import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import HamburgerIcon from './HamburgerIcon';
import classes from './HamburgerIcon.module.scss';

describe('<HamburgerIcon />', () => {
    test('should trigger onClick if its clicked', () => {
        let isTriggered = false;

        render(
            <HamburgerIcon onClick={() => { isTriggered = true; }} />
        );
        const hamburgerEl = screen.getByTestId('app-hamburgericon');

        userEvent.click(hamburgerEl);

        expect(isTriggered).toBe(true);
    });

    test('should add special css style if the side draw is open', () => {
        render(
            <HamburgerIcon isSidedrawOpen={true} />
        );
        const hamburgerEl = screen.getByTestId('app-hamburgericon');

        expect(hamburgerEl).toHaveClass(`${classes.HamburgerIcon} ${classes.Open}`);
    });

    test('should not add special css style if the side draw is open', () => {
        render(
            <HamburgerIcon isSidedrawOpen={true} />
        );
        const hamburgerEl = screen.getByTestId('app-hamburgericon');

        expect(hamburgerEl).toHaveClass(classes.HamburgerIcon);
    });
});
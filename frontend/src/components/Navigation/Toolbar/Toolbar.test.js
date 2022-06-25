import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
    test('should render <Logo />', () => {
        render(
            <Router>
                <Toolbar />
            </Router>
        );
        const LogoEl = screen.getByTestId('brand-logo');

        expect(LogoEl).toBeInTheDocument();
    });

    test('should render <CartIcon />', () => {
        render(
            <Router>
                <Toolbar />
            </Router>
        );
        const LogoEl = screen.getByTestId('cart-icon-container');

        expect(LogoEl).toBeInTheDocument();
    });
});
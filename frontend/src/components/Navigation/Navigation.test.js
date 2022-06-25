import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './Navigation';
import classes from './Navigation.module.scss';

describe('<Navigation />', () => {
    test('should render one <NavigationItem /> if this component is not used in sidedraw', () => {
        render(
            <Router>
                <Navigation sidedraw={false} />
            </Router>
        );
        const navigationItemsEl = screen.queryAllByTestId('app-navigation-item');

        expect(navigationItemsEl.length).toBe(1);
    });

    test('should render two <NavigationItem /> if this component is not used in sidedraw', () => {
        render(
            <Router>
                <Navigation sidedraw={true} />
            </Router>
        );
        const navigationItemsEl = screen.queryAllByTestId('app-navigation-item');

        expect(navigationItemsEl.length).toBe(2);
    });

    test('should render <NavigationItem /> with "Home" if rendered in sidebar', () => {
        render(
            <Router>
                <Navigation sidedraw={true} isAuthenticated={false} />
            </Router>
        );
        const textEl = screen.getByText('Home');

        expect(textEl).toBeInTheDocument();
    });

    test('should render <NavigationItem /> with "Sign in" if not authenticated', () => {
        render(
            <Router>
                <Navigation sidedraw={true} isAuthenticated={false} />
            </Router>
        );
        const textEl = screen.getByText('Sign in');

        expect(textEl).toBeInTheDocument();
    });

    test('should render <NavigationItem /> with "Orders" if authenticated', () => {
        render(
            <Router>
                <Navigation sidedraw={true} isAuthenticated={true} />
            </Router>
        );
        const textEl = screen.getByText('Orders');

        expect(textEl).toBeInTheDocument();
    });

    test('should add special css style if its rendered in sidedraw', () => {
        render(
            <Router>
                <Navigation sidedraw={true} isAuthenticated={true} />
            </Router>
        );
        const navigationItemEl = screen.getByTestId('app-navigation');

        expect(navigationItemEl).toHaveClass(classes.Sidedraw);
    });
});
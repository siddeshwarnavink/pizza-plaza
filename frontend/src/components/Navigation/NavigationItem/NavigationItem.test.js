import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavigationItem from './NavigationItem';
import classes from './NavigationItem.module.scss';

describe('<NavigationItem />', () => {
    test('should render children text', () => {
        render(
            <Router>
                <NavigationItem to="/">
                    my text
                </NavigationItem>
            </Router>
        );
        const textEl = screen.getByText('my text');

        expect(textEl).toBeInTheDocument(1);
    });

    test('should add special css style if its rendered in sidedraw', () => {
        render(
            <Router>
                <NavigationItem to="/" sidedraw={true}>
                    my text
                </NavigationItem>
            </Router>
        );
        const navigationItemEl = screen.getByTestId('app-navigation-item');

        expect(navigationItemEl).toHaveClass(`${classes.NavigationItem} ${classes.Sidedraw}`);
    });
});
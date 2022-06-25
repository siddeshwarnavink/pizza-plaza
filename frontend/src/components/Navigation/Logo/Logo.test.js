import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Logo from './Logo';

describe('<Logo />', () => {
    test('should render the brand name', () => {
        render(<Router><Logo /></Router>);
        const textEl = screen.getByText('Pizza Plaza');

        expect(textEl).toBeInTheDocument();
    });
});